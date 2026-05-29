import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const textBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET!;

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(textBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(textBody);

    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const orderId = payment.order_id;

      // Update Supabase Database
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'paid',
          razorpay_payment_id: payment.id,
          customer_email: payment.email,
          customer_phone: payment.contact
        })
        .eq('razorpay_order_id', orderId);

      if (error) {
        console.error("Supabase update error:", error);
      }

      // Send Email Notification to Store Owner
      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>', // Resend sandbox default
        to: ['your-email@example.com'], // In production, replace with actual owner email
        subject: 'New Order Received! 🛍️',
        html: `
          <h2>New Sale Received!</h2>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Amount:</strong> ₹${payment.amount / 100}</p>
          <p><strong>Customer Email:</strong> ${payment.email}</p>
          <p><strong>Customer Phone:</strong> ${payment.contact}</p>
        `,
      });
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
