-- Create OTP requests table to store temporary OTP sessions
CREATE TABLE IF NOT EXISTS public.otp_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    phone_number TEXT NOT NULL,
    otp_hash TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    verified BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Index for faster lookups by phone number
CREATE INDEX IF NOT EXISTS otp_requests_phone_idx ON public.otp_requests(phone_number);

-- Enable RLS
ALTER TABLE public.otp_requests ENABLE ROW LEVEL SECURITY;

-- OTPs should only be managed by the service role (Next.js API backend)
-- No public policies needed for insert/select as it will be accessed via Supabase Admin Key in the API routes.
