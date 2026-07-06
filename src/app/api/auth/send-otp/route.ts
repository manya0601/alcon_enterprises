import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';
import { sendOTP } from '@/lib/springedge';

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ error: "Valid phone number is required" }, { status: 400 });
    }

    // Normalize phone number (e.g. assume India +91 if length is 10)
    let normalizedPhone = phone.replace(/\D/g, '');
    if (normalizedPhone.length === 10) {
      normalizedPhone = '91' + normalizedPhone; // SpringEdge often uses international format without +
    }

    // 1. Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Hash the OTP for DB storage
    const hash = crypto.createHash('sha256').update(otp).digest('hex');

    // 3. Store OTP request in database
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes expiration
    
    const { error: dbError } = await supabaseAdmin
      .from('otp_requests')
      .insert({
        phone_number: normalizedPhone,
        otp_hash: hash,
        expires_at: expiresAt
      });

    if (dbError) {
      console.error("Supabase insert error for OTP:", dbError);
      return NextResponse.json({ error: "Failed to create OTP session" }, { status: 500 });
    }

    // 4. Send the OTP via SpringEdge
    const smsSent = await sendOTP(normalizedPhone, otp);
    
    if (!smsSent) {
      return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "OTP sent successfully" 
    });
    
  } catch (error) {
    console.error("Send OTP API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
