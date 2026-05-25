"use client";

import Link from "next/link";
import { ShoppingCart, Building2, Repeat, CreditCard, Wrench, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/section-wrapper";

const cards = [
  { title: "Buy Printers", desc: "Browse & purchase printers, cartridges, and printer parts", icon: ShoppingCart, href: "/buy", accent: "#02367B" },
  { title: "Printer Rentals", desc: "Daily, monthly & corporate rental plans with zero maintenance", icon: Building2, href: "/rent", accent: "#6D28D9" },
  { title: "Sell Old Printers", desc: "Get the best market price for your used printers & equipment", icon: Repeat, href: "/sell", accent: "#059669" },
  { title: "Cartridge Subscriptions", desc: "Auto-delivery cartridge plans with discounted pricing", icon: CreditCard, href: "/subscriptions", accent: "#D97706" },
  { title: "Repair Services", desc: "On-site printer repair, toner refilling & AMC plans", icon: Wrench, href: "/services", accent: "#DC2626" },
];

export function QuickAccessSection() {
  return (
    <section className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="text-center mb-8">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">Our Solutions</p>
          <h2 className="text-xl md:text-2xl font-bold text-dark-text">Everything Your Business Needs</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {cards.map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.04}>
              <Link href={c.href} className="block group h-full">
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 h-full hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-[#CBD5E1] transition-all">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: c.accent + "0A" }}
                  >
                    <c.icon className="w-[18px] h-[18px]" style={{ color: c.accent }} />
                  </div>
                  <h3 className="text-[13px] font-semibold text-dark-text mb-1 group-hover:text-brand transition-colors leading-tight">{c.title}</h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2 mb-3">{c.desc}</p>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
