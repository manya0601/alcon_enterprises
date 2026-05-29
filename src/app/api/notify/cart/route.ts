import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { productName, price } = await req.json();

    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Resend sandbox default
      to: ['alconenterprises445@gmail.com'], // Replace with owner email
      subject: '🛒 Item added to Cart!',
      html: `
        <h2>Someone just added an item to their cart!</h2>
        <p><strong>Item:</strong> ${productName}</p>
        <p><strong>Value:</strong> ₹${price}</p>
        <p>Keep an eye out for a checkout!</p>
      `,
    });

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Cart Notification Error:", error);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
  }
}
