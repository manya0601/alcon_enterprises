"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Loader2, Phone, KeyRound } from "lucide-react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Format phone number to include country code if missing (assuming India +91 for this demo)
    const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;

    const { error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setStep("OTP");
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;

    const { error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: "sms",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-soft-gray flex flex-col pt-8 pb-16 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <Link href="/" className="flex items-center justify-center gap-2 text-sm font-medium text-slate-text hover:text-brand transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-dark-text tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-text">
          Don't have an account?{" "}
          <Link href="/signup" className="font-bold text-brand hover:text-brand-dark">
            Sign up
          </Link>
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:rounded-3xl sm:px-10 border border-border-gray">
          
          {step === "PHONE" ? (
            <form className="space-y-6" onSubmit={handleSendOtp}>
              {error && (
                <div className="bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-[13px] font-bold text-dark-text mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-border-gray"
                    placeholder="9876543210"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">We will send you a one-time password (OTP)</p>
              </div>

              <Button
                type="submit"
                disabled={loading || phone.length < 10}
                className="w-full h-12 rounded-xl bg-brand hover:bg-brand-dark text-white font-bold"
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending OTP...</>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleVerifyOtp}>
              {error && (
                <div className="bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}
              
              <div className="bg-soft-gray p-4 rounded-xl mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-text">Code sent to</p>
                  <p className="font-bold text-dark-text">{phone.startsWith("+") ? phone : `+91 ${phone}`}</p>
                </div>
                <button type="button" onClick={() => setStep("PHONE")} className="text-sm text-brand font-bold hover:underline">Edit</button>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-dark-text mb-1.5">
                  Enter 6-digit OTP
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-border-gray tracking-[0.5em] font-bold text-lg"
                    placeholder="••••••"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full h-12 rounded-xl bg-brand hover:bg-brand-dark text-white font-bold"
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Verifying...</>
                ) : (
                  "Verify & Sign In"
                )}
              </Button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
