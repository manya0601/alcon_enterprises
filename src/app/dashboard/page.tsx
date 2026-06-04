"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Package, TrendingUp, CreditCard, ArrowRight, ExternalLink, User } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

const mockOrders = [
  { id: "ORD-2026-894", date: "May 25, 2026", status: "Delivered", total: "₹4,500", items: 3 },
  { id: "ORD-2026-881", date: "Apr 12, 2026", status: "Processing", total: "₹1,200", items: 1 },
  { id: "ORD-2026-810", date: "Feb 28, 2026", status: "Delivered", total: "₹8,900", items: 5 },
];

export default function DashboardOverview() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(profile);
      }
    };
    fetchUser();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-soft-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
            <p className="text-3xl font-bold text-dark-text mb-2">12</p>
            <p className="text-emerald-500 font-medium text-sm flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> +2 this month
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
            <p className="text-3xl font-bold text-dark-text mb-2">1</p>
            <p className="text-blue-500 font-medium text-sm">Auto-Refill</p>
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
            <p className="text-3xl font-bold text-dark-text mb-2">1,250</p>
            <p className="text-purple-500 font-medium text-sm">₹125 value</p>
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
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-text text-sm border-b border-border-gray">
                    <th className="pb-3 font-bold">Order ID</th>
                    <th className="pb-3 font-bold">Date</th>
                    <th className="pb-3 font-bold">Status</th>
                    <th className="pb-3 font-bold text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {mockOrders.map((order, i) => (
                    <tr key={order.id} className="border-b border-border-gray last:border-0 hover:bg-soft-gray/50 transition-colors">
                      <td className="py-4 text-dark-text font-bold">{order.id}</td>
                      <td className="py-4 text-slate-text">{order.date}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          order.status === "Delivered" ? "bg-success/10 text-success border border-success/20" : 
                          "bg-brand/10 text-brand border border-brand/20"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-dark-text font-bold text-right">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Current Plan Widget */}
          <div className="bg-gradient-to-br from-[#02367B] to-[#012350] rounded-2xl p-6 border border-brand/20 relative overflow-hidden shadow-[0_8px_30px_rgba(2,54,123,0.15)]">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            
            <h2 className="text-xl font-bold text-white mb-6 relative z-10">Active Subscription</h2>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Premium AMC Plan</h3>
                  <p className="text-sm text-white/70">Billed Annually</p>
                </div>
                <span className="bg-white text-brand text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Active</span>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70 font-medium">Next billing date:</span>
                  <span className="text-white font-bold">Oct 15, 2026</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70 font-medium">Covered printers:</span>
                  <span className="text-white font-bold">3 Devices</span>
                </div>
              </div>

              <button className="w-full bg-white hover:bg-soft-gray text-brand py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                Manage Plan <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
