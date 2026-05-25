"use client";

import { Wrench, Droplets, Building2, HeadphonesIcon } from "lucide-react";
import { SectionHeader, FadeIn } from "@/components/shared/section-wrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  { 
    icon: Wrench, 
    title: "Printer Repair", 
    desc: "On-site expert repair for all major brands within 4 hours.", 
    color: "from-[#3B82F6]/10 to-[#3B82F6]/5", 
    iconColor: "text-[#3B82F6]",
    borderColor: "hover:border-[#3B82F6]/30",
    href: "/services#repair"
  },
  { 
    icon: Droplets, 
    title: "Cartridge Refill", 
    desc: "High-quality laser and inkjet refilling with testing.", 
    color: "from-[#06B6D4]/10 to-[#06B6D4]/5", 
    iconColor: "text-[#06B6D4]",
    borderColor: "hover:border-[#06B6D4]/30",
    href: "/services#toner-refilling"
  },
  { 
    icon: Building2, 
    title: "Rental Plans", 
    desc: "Daily, monthly, and corporate machine rentals.", 
    color: "from-[#059669]/10 to-[#059669]/5", 
    iconColor: "text-[#059669]",
    borderColor: "hover:border-[#059669]/30",
    href: "/rent"
  },
  { 
    icon: HeadphonesIcon, 
    title: "Corporate Support", 
    desc: "Dedicated account managers and comprehensive AMC.", 
    color: "from-[#8B5CF6]/10 to-[#8B5CF6]/5", 
    iconColor: "text-[#8B5CF6]",
    borderColor: "hover:border-[#8B5CF6]/30",
    href: "/contact"
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-white py-10 md:py-16 border-b border-border-gray relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-soft-gray to-transparent rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <SectionHeader
            badge="Our Expertise"
            title="Comprehensive Services"
            description="End-to-end printing solutions for businesses of all sizes."
            align="left"
            className="mb-0"
          />
          <Link href="/services">
            <span className="inline-flex items-center gap-1 text-[13px] font-bold text-accent-blue hover:text-brand transition-colors">
              Explore All Services <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.05}>
              <Link href={s.href} className="block h-full">
                <div className={`bg-white rounded-2xl border border-border-gray p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 h-full flex flex-col group ${s.borderColor}`}>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <s.icon className={`w-6 h-6 ${s.iconColor}`} />
                  </div>
                  <h3 className="text-[16px] font-bold text-dark-text mb-2 group-hover:text-brand transition-colors">{s.title}</h3>
                  <p className="text-[13px] text-slate-text leading-relaxed mb-4 flex-1">{s.desc}</p>
                  <div className={`flex items-center gap-1.5 text-[12px] font-bold ${s.iconColor} opacity-80 group-hover:opacity-100 transition-opacity`}>
                    Learn more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
