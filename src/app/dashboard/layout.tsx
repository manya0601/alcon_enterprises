"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  CreditCard, 
  MapPin, 
  Settings,
  LogOut,
  User
} from "lucide-react";

const sidebarLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/dashboard/orders", icon: Package },
  { name: "Subscriptions", href: "/dashboard/subscriptions", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-soft-gray pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white border border-border-gray shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-3xl p-6 sticky top-28">
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border-gray">
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center border border-brand/20 text-brand">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-dark-text font-bold">User Account</h2>
              </div>
            </div>

            <nav className="space-y-2">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                      isActive 
                        ? "text-brand font-bold" 
                        : "text-slate-text hover:text-brand hover:bg-soft-gray/80"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 bg-brand/10 border border-brand/20 rounded-xl"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Icon className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-8 border-t border-border-gray">
              <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors w-full text-left font-bold">
                <LogOut className="w-5 h-5" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="bg-white border border-border-gray shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-3xl p-6 sm:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
