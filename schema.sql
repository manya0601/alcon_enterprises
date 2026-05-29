-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    razorpay_order_id TEXT UNIQUE NOT NULL,
    razorpay_payment_id TEXT UNIQUE,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'INR' NOT NULL,
    status TEXT DEFAULT 'created' NOT NULL,
    customer_email TEXT,
    customer_phone TEXT,
    items JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for checkout creation
CREATE POLICY "Allow anonymous inserts" ON public.orders FOR INSERT TO anon WITH CHECK (true);

-- Allow reads only for authenticated users (admin dashboard)
CREATE POLICY "Allow authenticated reads" ON public.orders FOR SELECT TO authenticated USING (true);
