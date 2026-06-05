"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Package, TrendingUp, CreditCard, ArrowRight, ExternalLink, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DashboardOverview() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Profile Completion State
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        
        // If we have a profile in DB with a username, use it.
        if (profileData?.username) {
          setProfile(profileData);
        } else if (user.user_metadata?.username) {
          // If DB profile lacks username but user_metadata has it (from signup), auto-upsert silently
          const autoProfile = {
            id: user.id,
            username: user.user_metadata.username,
            full_name: user.user_metadata.full_name || '',
            updated_at: new Date().toISOString()
          };
          await supabase.from('profiles').upsert(autoProfile);
          setProfile(autoProfile);
        } else {
          // No username anywhere
          setProfile(profileData || { id: user.id });
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [supabase]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);
    setError(null);

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      username,
      full_name: fullName,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      setError(error.message);
      setUpdatingProfile(false);
      return;
    }

    const { data: updatedProfile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    setProfile(updatedProfile);
    setUpdatingProfile(false);
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  // Profile Completion Gate: Show if user exists but lacks username
  if (user && profile && !profile.username) {
    return (
      <div className="max-w-md mx-auto py-2">
        <div className="bg-white rounded-3xl p-8 border border-border-gray shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="w-16 h-16 bg-brand/10 text-brand rounded-full flex items-center justify-center mb-6 mx-auto">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-dark-text text-center mb-2">Complete Your Profile</h2>
          <p className="text-slate-text text-center mb-8 text-sm">Please choose a username and enter your full name to continue using your dashboard.</p>
          
          <form onSubmit={handleUpdateProfile} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-[13px] font-bold text-dark-text mb-1.5">Full Name</label>
              <Input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-12 rounded-xl border-border-gray"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-dark-text mb-1.5">Username</label>
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

            <Button
              type="submit"
              disabled={updatingProfile}
              className="w-full h-12 rounded-xl bg-brand hover:bg-brand-dark text-white font-bold mt-2"
            >
              {updatingProfile ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving...</>
              ) : (
                "Save Profile"
              )}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark-text mb-2">Welcome, {profile?.full_name || profile?.username || user?.phone || user?.email || 'Guest'}</h1>
      <p className="text-slate-text mb-8">User ID: <span className="font-mono text-xs text-muted-foreground">{user?.id || '...'}</span></p>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.0 }}
          className="bg-white border border-border-gray rounded-2xl p-6 relative overflow-hidden group shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <User className="w-16 h-16 text-brand" />
          </div>
          <p className="text-slate-text text-sm font-medium mb-2">Username</p>
          <p className="text-2xl font-bold text-dark-text mb-2 truncate">@{profile?.username || 'user'}</p>
          <p className="text-brand font-medium text-sm">Verified Account</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-border-gray rounded-2xl p-6 relative overflow-hidden group shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Package className="w-16 h-16 text-emerald-500" />
          </div>
          <p className="text-slate-text text-sm font-medium mb-2">Total Orders</p>
          <p className="text-3xl font-bold text-dark-text mb-2">0</p>
          <p className="text-emerald-500 font-medium text-sm flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> Start ordering today
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-border-gray rounded-2xl p-6 relative overflow-hidden group shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <CreditCard className="w-16 h-16 text-blue-500" />
          </div>
          <p className="text-slate-text text-sm font-medium mb-2">Subscriptions</p>
          <p className="text-3xl font-bold text-dark-text mb-2">0</p>
          <p className="text-slate-text font-medium text-sm">No active plans</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-border-gray rounded-2xl p-6 relative overflow-hidden group shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp className="w-16 h-16 text-purple-500" />
          </div>
          <p className="text-slate-text text-sm font-medium mb-2">Reward Points</p>
          <p className="text-3xl font-bold text-dark-text mb-2">0</p>
          <p className="text-purple-500 font-medium text-sm">₹0 value</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Orders Table */}
        <div className="bg-white rounded-2xl p-6 border border-border-gray shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-dark-text">Recent Orders</h2>
            <Link href="/dashboard/orders" className="text-brand hover:text-brand-dark text-sm font-bold flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="py-8 text-center border-2 border-dashed border-border-gray rounded-xl bg-soft-gray/50">
            <Package className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
            <h3 className="text-dark-text font-bold mb-1">No recent orders</h3>
            <p className="text-slate-text text-sm mb-4">When you place an order, it will appear here.</p>
            <Link href="/buy" className="text-sm font-bold text-brand hover:underline">
              Start Shopping
            </Link>
          </div>
        </div>

        {/* Current Plan Widget */}
        <div className="bg-white rounded-2xl p-6 border border-border-gray shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-dark-text">Active Subscription</h2>
          </div>
          
          <div className="py-8 text-center border-2 border-dashed border-border-gray rounded-xl bg-soft-gray/50">
            <CreditCard className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
            <h3 className="text-dark-text font-bold mb-1">No active subscription</h3>
            <p className="text-slate-text text-sm mb-4">Subscribe to our AMC plans to keep your printers running smoothly.</p>
            <Link href="/subscriptions" className="text-sm font-bold text-brand hover:underline">
              View Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
