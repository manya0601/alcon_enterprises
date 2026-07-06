import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error("RAZORPAY_KEY_SECRET is not configured");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Generate expected signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(text)
      .digest('hex');

    // Compare signatures
    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Update order status in Supabase if signature is valid
    const { data: orderData, error } = await supabase
      .from('orders')
      .update({ status: 'paid', razorpay_payment_id: razorpay_payment_id })
      .eq('razorpay_order_id', razorpay_order_id)
      .select('amount, customer_phone')
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      // We still return success to the client because the payment itself is verified,
      // but log the error for backend consistency.
    } else if (orderData && orderData.customer_phone) {
      // Send Payment Success SMS
      import('@/lib/springedge').then(({ sendPaymentSMS }) => {
        sendPaymentSMS(orderData.customer_phone, razorpay_order_id, orderData.amount)
          .catch(err => console.error("Failed to send payment SMS:", err));
      });
    }

    return NextResponse.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Verify Payment API Error:", error);
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
  }
}
