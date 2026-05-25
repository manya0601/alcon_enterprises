"use client";

import Link from "next/link";
import { 
  Printer, 
  Settings, 
  Package, 
  Building2, 
  MonitorSmartphone, 
  ArrowRight, 
  ShoppingCart, 
  Repeat, 
  CreditCard, 
  Wrench 
} from "lucide-react";
import { FadeIn } from "@/components/shared/section-wrapper";

const categories = [
  { name: "Printers", icon: Printer, desc: "Laser & Inkjet", color: "from-[#3B82F6]/10 to-[#3B82F6]/5", text: "text-[#3B82F6]", border: "group-hover:border-[#3B82F6]/30", href: "/buy?category=printers" },
  { name: "Cartridges", icon: Package, desc: "Toner & Ink", color: "from-[#06B6D4]/10 to-[#06B6D4]/5", text: "text-[#06B6D4]", border: "group-hover:border-[#06B6D4]/30", href: "/buy?category=toner-cartridges" },
  { name: "Spare Parts", icon: Settings, desc: "Genuine Parts", color: "from-[#D97706]/10 to-[#D97706]/5", text: "text-[#D97706]", border: "group-hover:border-[#D97706]/30", href: "/buy?category=printer-parts" },
  { name: "Rental", icon: Building2, desc: "B2B Machines", color: "from-[#059669]/10 to-[#059669]/5", text: "text-[#059669]", border: "group-hover:border-[#059669]/30", href: "/rent" },
  { name: "Office", icon: MonitorSmartphone, desc: "Accessories", color: "from-[#8B5CF6]/10 to-[#8B5CF6]/5", text: "text-[#8B5CF6]", border: "group-hover:border-[#8B5CF6]/30", href: "/buy" },
];

const solutions = [
  { title: "Buy Printers", desc: "Browse & purchase printers, cartridges, and parts", icon: ShoppingCart, href: "/buy", accent: "#02367B" },
  { title: "Printer Rentals", desc: "Daily, monthly & corporate rental plans", icon: Building2, href: "/rent", accent: "#6D28D9" },
  { title: "Sell Old Printers", desc: "Get the best market price for used equipment", icon: Repeat, href: "/sell", accent: "#059669" },
  { title: "Cartridge Subscriptions", desc: "Auto-delivery plans with discounted pricing", icon: CreditCard, href: "/subscriptions", accent: "#D97706" },
  { title: "Repair Services", desc: "On-site printer repair, refilling & AMC plans", icon: Wrench, href: "/services", accent: "#DC2626" },
];

export function CategoryStrip() {
  return (
    <section className="relative bg-white py-14 md:py-20 border-b border-border-gray overflow-hidden">
      {/* Subtle watermark background for brand partners */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-10">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 p-8 text-4xl font-bold text-[#02367B]">
          <div>HP</div><div>Canon</div><div>Epson</div>
          <div>Brother</div><div>Xerox</div><div>Ricoh</div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Unified Banner & Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#E0F2FE] text-[#02367B] border border-[#BAE6FD] mb-3 w-fit shadow-sm">
            OFFICIAL B2B HARDWARE PARTNER
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-3">
            Everything Your Business Needs
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#334155] max-w-2xl mx-auto leading-relaxed">
            Ahmedabad&apos;s leading enterprise partner for certified printers, flexible leasing solutions, and expert maintenance services.
          </p>
        </div>

        {/* Section 1: Shop by Category */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[16px] md:text-[18px] font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#02367B] rounded-full"></span>
              Shop by Category
            </h3>
            <Link href="/buy" className="text-[13px] font-semibold text-[#3B82F6] flex items-center gap-1 hover:text-[#02367B] transition-colors">
              View All Products <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
            {categories.map((c, i) => (
              <FadeIn key={c.name} delay={i * 0.05}>
                <Link href={c.href} className="block group">
                  <div className={`bg-white/80 backdrop-blur-sm rounded-2xl border border-border-gray p-4 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:bg-white ${c.border}`}>
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <c.icon className={`w-6 h-6 ${c.text}`} />
                    </div>
                    <h4 className="text-[14px] font-bold text-dark-text mb-0.5">{c.name}</h4>
                    <p className="text-[11px] font-medium text-slate-text">{c.desc}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Section 2: Quick Solutions */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[16px] md:text-[18px] font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#02367B] rounded-full"></span>
              Our Core Solutions
            </h3>
            <Link href="/services" className="text-[13px] font-semibold text-[#3B82F6] flex items-center gap-1 hover:text-[#02367B] transition-colors">
              View All Services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {solutions.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.05}>
                <Link href={s.href} className="block group h-full">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#E2E8F0] p-5 h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#CBD5E1] hover:bg-white transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: s.accent + "10" }}
                      >
                        <s.icon className="w-5 h-5" style={{ color: s.accent }} />
                      </div>
                      <h4 className="text-[13px] sm:text-[14px] font-bold text-dark-text mb-1 group-hover:text-[#02367B] transition-colors leading-tight">{s.title}</h4>
                      <p className="text-[11px] text-slate-text leading-relaxed line-clamp-2 mb-4">{s.desc}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-text/50 group-hover:text-[#02367B] transition-colors">
                      Learn More <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
