"use client";

import Link from "next/link";
import { Printer, Settings, Package, Building2, MonitorSmartphone, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/section-wrapper";

const categories = [
  { name: "Printers", icon: Printer, desc: "Laser & Inkjet", color: "from-[#3B82F6]/10 to-[#3B82F6]/5", text: "text-[#3B82F6]", border: "group-hover:border-[#3B82F6]/30", href: "/buy?category=printers" },
  { name: "Cartridges", icon: Package, desc: "Toner & Ink", color: "from-[#06B6D4]/10 to-[#06B6D4]/5", text: "text-[#06B6D4]", border: "group-hover:border-[#06B6D4]/30", href: "/buy?category=toner-cartridges" },
  { name: "Spare Parts", icon: Settings, desc: "Genuine Parts", color: "from-[#D97706]/10 to-[#D97706]/5", text: "text-[#D97706]", border: "group-hover:border-[#D97706]/30", href: "/buy?category=printer-parts" },
  { name: "Rental", icon: Building2, desc: "B2B Machines", color: "from-[#059669]/10 to-[#059669]/5", text: "text-[#059669]", border: "group-hover:border-[#059669]/30", href: "/rent" },
  { name: "Office", icon: MonitorSmartphone, desc: "Accessories", color: "from-[#8B5CF6]/10 to-[#8B5CF6]/5", text: "text-[#8B5CF6]", border: "group-hover:border-[#8B5CF6]/30", href: "/buy" },
];

export function CategoryStrip() {
  return (
    <section className="bg-white py-12 border-b border-border-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-bold text-dark-text">Shop by Category</h2>
          <Link href="/buy" className="text-[13px] font-semibold text-accent-blue flex items-center gap-1 hover:text-brand transition-colors">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {categories.map((c, i) => (
            <FadeIn key={c.name} delay={i * 0.05}>
              <Link href={c.href} className={`block group`}>
                <div className={`bg-white rounded-2xl border border-border-gray p-4 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] ${c.border}`}>
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <c.icon className={`w-6 h-6 ${c.text}`} />
                  </div>
                  <h3 className="text-[14px] font-bold text-dark-text mb-0.5">{c.name}</h3>
                  <p className="text-[11px] font-medium text-slate-text">{c.desc}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
