"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Loader2, Mail, Lock, User } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
          full_name: fullName,
        },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    
    // Automatically redirect after a few seconds if no email verification is required by Supabase project settings
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-soft-gray flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <Link href="/" className="flex items-center justify-center gap-2 text-sm font-medium text-slate-text hover:text-brand transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-dark-text tracking-tight">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-text">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-brand hover:text-brand-dark">
            Sign in
          </Link>
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:rounded-3xl sm:px-10 border border-border-gray">
          
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-dark-text mb-2">Account created!</h3>
              <p className="text-slate-text text-sm">You are being redirected to your dashboard...</p>
              <p className="text-xs text-muted-foreground mt-4">(If email confirmation is required, please check your inbox)</p>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSignup}>
              {error && (
                <div className="bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-[13px] font-bold text-dark-text mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-border-gray"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-dark-text mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-muted-foreground font-bold">@</span>
                  </div>
                  <Input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-border-gray"
                    placeholder="johndoe123"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-dark-text mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-border-gray"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-dark-text mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-border-gray"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-brand hover:bg-brand-dark text-white font-bold mt-2"
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating account...</>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
