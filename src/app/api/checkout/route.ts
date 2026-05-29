import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { supabase } from '@/lib/supabase';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, items } = body;

    // Razorpay amount is in paise (multiply by 100)
    const orderOptions = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(orderOptions);

    // Save order status as 'created' in Supabase
    const { error } = await supabase.from('orders').insert([
      {
        razorpay_order_id: order.id,
        amount: amount,
        status: 'created',
        items: items
      }
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      // We continue even if supabase fails so the user can pay, 
      // but ideally this should be atomic.
    }

    return NextResponse.json({ orderId: order.id, amount: orderOptions.amount, currency: "INR" });
  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
