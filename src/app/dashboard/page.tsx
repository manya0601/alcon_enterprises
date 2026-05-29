"use client";

import { motion } from "framer-motion";
import { Package, TrendingUp, CreditCard, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

const mockOrders = [
  { id: "ORD-2026-894", date: "May 25, 2026", status: "Delivered", total: "₹4,500", items: 3 },
  { id: "ORD-2026-881", date: "Apr 12, 2026", status: "Processing", total: "₹1,200", items: 1 },
  { id: "ORD-2026-810", date: "Feb 28, 2026", status: "Delivered", total: "₹8,900", items: 5 },
];

export default function DashboardOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-800/40 border border-zinc-700/50 rounded-2xl p-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Package className="w-16 h-16 text-emerald-400" />
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-2">Total Orders</p>
          <p className="text-4xl font-bold text-white mb-2">12</p>
          <p className="text-emerald-400 text-sm flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +2 this month
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-800/40 border border-zinc-700/50 rounded-2xl p-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CreditCard className="w-16 h-16 text-blue-400" />
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-2">Active Subscriptions</p>
          <p className="text-4xl font-bold text-white mb-2">1</p>
          <p className="text-blue-400 text-sm">Cartridge Auto-Refill</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-800/40 border border-zinc-700/50 rounded-2xl p-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp className="w-16 h-16 text-purple-400" />
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-2">Reward Points</p>
          <p className="text-4xl font-bold text-white mb-2">1,250</p>
          <p className="text-purple-400 text-sm">₹125 value available</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Orders Table */}
        <div className="bg-zinc-800/30 rounded-2xl p-6 border border-zinc-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Orders</h2>
            <Link href="/dashboard/orders" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-zinc-400 text-sm border-b border-zinc-700/50">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {mockOrders.map((order, i) => (
                  <tr key={order.id} className="border-b border-zinc-700/30 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-4 text-white font-medium">{order.id}</td>
                    <td className="py-4 text-zinc-400">{order.date}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        order.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
                        "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-white font-medium text-right">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Current Plan Widget */}
        <div className="bg-gradient-to-br from-emerald-900/40 to-zinc-900/80 rounded-2xl p-6 border border-emerald-500/20 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
          
          <h2 className="text-xl font-bold text-white mb-6 relative z-10">Active Subscription</h2>
          
          <div className="bg-zinc-950/50 rounded-xl p-5 border border-white/5 relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-emerald-400">Premium AMC Plan</h3>
                <p className="text-sm text-zinc-400">Billed Annually</p>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Active</span>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Next billing date:</span>
                <span className="text-white">Oct 15, 2026</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Covered printers:</span>
                <span className="text-white">3 Devices</span>
              </div>
            </div>

            <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
              Manage Plan <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
