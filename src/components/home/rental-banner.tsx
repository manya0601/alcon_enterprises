"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Building2, Clock, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/section-wrapper";
import { SITE_CONFIG } from "@/lib/constants";

const plans = [
  { icon: Clock, title: "Daily / Event Rental", desc: "Short-term machines for events, exhibitions & audits.", features: ["Same-day delivery", "No deposit needed", "Setup included"], color: "text-accent-blue", bg: "bg-accent-blue/10" },
  { icon: Calendar, title: "Monthly Subscription", desc: "Cost-effective recurring plans for growing businesses.", features: ["Free maintenance", "Toner included", "Flexible upgrade"], color: "text-accent-cyan", bg: "bg-accent-cyan/10" },
  { icon: Building2, title: "Corporate AMC + Fleet", desc: "Complete fleet management for large enterprises.", features: ["Dedicated manager", "4-hour SLA", "Volume pricing"], color: "text-brand", bg: "bg-brand/10" },
];

export function RentalBanner() {
  return (
    <section className="bg-gradient-to-br from-[#0F172A] to-brand-dark py-16 md:py-24 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-blue/20 blur-[150px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/10 text-accent-cyan border border-white/20 mb-6 backdrop-blur-sm">
                <Building2 className="w-3.5 h-3.5" /> B2B Rental Services
              </div>
              
              <h2 className="text-[32px] md:text-[40px] font-bold tracking-tight text-white leading-tight mb-5">
                Scale Your Office Printing with <span className="text-accent-cyan">Zero Capital</span> Cost.
              </h2>
              
              <p className="text-[15px] md:text-[16px] text-white/70 mb-8 max-w-md leading-relaxed">
                Why buy depreciating hardware? Get the latest enterprise printers delivered, installed, and maintained with our flexible rental plans.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2 rounded-xl h-12 px-6 text-[14px] font-semibold border-none shadow-[0_4px_14px_rgba(37,211,102,0.3)]">
                    <MessageCircle className="w-4 h-4" /> WhatsApp Inquiry
                  </Button>
                </a>
                <Link href="/rent">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2 rounded-xl h-12 px-6 text-[14px] font-semibold backdrop-blur-sm bg-white/5">
                    View All Plans <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-3 gap-4">
              {plans.map((plan, i) => (
                <FadeIn key={plan.title} delay={i * 0.1}>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5 hover:bg-white/15 transition-all duration-300 h-full group hover:-translate-y-1">
                    <div className={`w-12 h-12 rounded-xl ${plan.bg} flex items-center justify-center mb-4 border border-white/10 group-hover:scale-110 transition-transform`}>
                      <plan.icon className={`w-6 h-6 ${plan.color}`} />
                    </div>
                    <h3 className="text-[16px] font-bold text-white mb-2 leading-tight">{plan.title}</h3>
                    <p className="text-[13px] text-white/60 leading-relaxed mb-5">{plan.desc}</p>
                    <ul className="space-y-2.5 mt-auto">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-[12px] text-white/80 font-medium">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${plan.color} shrink-0 mt-0.5`} /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
