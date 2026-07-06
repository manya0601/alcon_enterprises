import { NextResponse } from 'next/server';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: "Phone and OTP are required" }, { status: 400 });
    }

    let normalizedPhone = phone.replace(/\D/g, '');
    if (normalizedPhone.length === 10) normalizedPhone = '91' + normalizedPhone;

    const hash = crypto.createHash('sha256').update(otp).digest('hex');

    // 1. Verify OTP from DB
    const { data: otpReqs, error: otpError } = await supabaseAdmin
      .from('otp_requests')
      .select('id, expires_at')
      .eq('phone_number', normalizedPhone)
      .eq('otp_hash', hash)
      .eq('verified', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1);

    if (otpError || !otpReqs || otpReqs.length === 0) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 });
    }

    // Mark as verified
    await supabaseAdmin
      .from('otp_requests')
      .update({ verified: true })
      .eq('id', otpReqs[0].id);

    // 2. Find or Create User in Supabase Auth
    // Because Supabase Admin doesn't have a direct "getUserByPhone", we will query all users or use a custom users table.
    // However, if we just try to create the user, it will fail if they exist.
    let user_id;
    
    // First, check if there's a profile with this phone number? The profiles table doesn't have phone by default.
    // Let's use Supabase Admin API to create the user. If it fails due to existing phone, we can just login.
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      phone: normalizedPhone,
      phone_confirm: true,
      user_metadata: { phone: normalizedPhone }
    });

    if (createError && createError.message.includes('already exists')) {
      // User exists. We need to find their ID.
      // Since listUsers can be slow, a better architectural choice in production is to query a custom table,
      // but for this implementation we can list users or assume we have a synced `users` table.
      // We will use listUsers for simplicity.
      const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
      const existingUser = usersData.users.find(u => u.phone === normalizedPhone);
      
      if (!existingUser) {
        return NextResponse.json({ error: "Could not fetch existing user profile" }, { status: 500 });
      }
      user_id = existingUser.id;
    } else if (newUser?.user) {
      user_id = newUser.user.id;
    } else {
      console.error("Supabase create user error:", createError);
      return NextResponse.json({ error: "Failed to create user account" }, { status: 500 });
    }

    // 3. Generate Custom JWT compatible with Supabase RLS
    const jwtSecret = process.env.SUPABASE_JWT_SECRET || 'super-secret-jwt-token-with-at-least-32-characters-long';
    
    const tokenPayload = {
      aud: "authenticated",
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7), // 1 week
      sub: user_id,
      phone: normalizedPhone,
      app_metadata: { provider: "sms" },
      user_metadata: { phone: normalizedPhone },
      role: "authenticated"
    };

    const token = jwt.sign(tokenPayload, jwtSecret);

    // 4. Return token (Optionally set it as a cookie)
    const response = NextResponse.json({ 
      success: true, 
      message: "Authentication successful",
      token,
      user_id
    });

    // Set HttpOnly cookie for Next.js SSR Auth
    response.cookies.set('sb-access-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return response;
  } catch (error) {
    console.error("Verify OTP API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
