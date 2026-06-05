import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Supabase (Admin client to bypass RLS if needed, or anon)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { brand, model_number, condition, expected_price, notes, full_name, email, phone, image_urls } = data;

    // 1. Insert into database
    const { data: requestRecord, error: dbError } = await supabase
      .from('sell_requests')
      .insert([
        { 
          brand, 
          model_number, 
          condition, 
          expected_price: Number(expected_price), 
          notes, 
          full_name, 
          email, 
          phone, 
          image_urls 
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: "Failed to save request to database" }, { status: 500 });
    }

    // 2. Send Email Notification
    const imagesHtml = image_urls.length > 0 
      ? image_urls.map((url: string) => `<a href="${url}">View Uploaded Image</a><br/>`).join("")
      : "No images uploaded";

    const emailContent = `
      <h2>New Sell Request!</h2>
      <p><strong>Name:</strong> ${full_name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <hr />
      <h3>Device Details:</h3>
      <p><strong>Brand:</strong> ${brand}</p>
      <p><strong>Model:</strong> ${model_number}</p>
      <p><strong>Condition:</strong> ${condition}</p>
      <p><strong>Expected Price:</strong> ₹${expected_price}</p>
      <p><strong>Notes:</strong> ${notes || 'N/A'}</p>
      <hr />
      <h3>Images:</h3>
      ${imagesHtml}
    `;

    // Send using Resend to the default testing email or a specific admin
    // If you have a verified domain, you can change 'delivered@resend.dev' to your real email.
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev', email], // Sending a copy to the user and the test inbox
      subject: `New Sell Request - ${brand} ${model_number}`,
      html: emailContent,
    });

    if (emailError) {
      console.error("Email error:", emailError);
      // Still return success since DB insertion worked, but log it
      return NextResponse.json({ success: true, warning: "Saved, but failed to send email." });
    }

    return NextResponse.json({ success: true, data: requestRecord });
  } catch (error: any) {
    console.error("Sell request error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
