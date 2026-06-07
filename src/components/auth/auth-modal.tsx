"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { Loader2, Phone, KeyRound, X } from "lucide-react";
import { useUIStore } from "@/store";

export function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen } = useUIStore();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const supabase = createClient();

  // Reset state when modal closes
  useEffect(() => {
    if (!isAuthModalOpen) {
      setTimeout(() => {
        setPhone("");
        setOtp("");
        setStep("PHONE");
        setError(null);
        setLoading(false);
      }, 300);
    }
  }, [isAuthModalOpen]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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

    // Success
    setLoading(false);
    setAuthModalOpen(false);
    // User is automatically tracked by supabase auth listener in navbar/store
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAuthModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-text hover:text-dark-text hover:bg-soft-gray rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 sm:p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-extrabold text-dark-text tracking-tight mb-2">
                  Sign in to continue
                </h2>
                <p className="text-sm text-slate-text">
                  Please verify your phone number to access cart and checkout features.
                </p>
              </div>

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
                        className="pl-10 h-12 rounded-xl border-border-gray tracking-[0.5em] font-bold text-lg text-center"
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
