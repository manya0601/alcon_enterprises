"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Clock, Calendar, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RENTAL_EQUIPMENT } from "@/data/site-data";
import { SITE_CONFIG } from "@/lib/constants";
import { FadeIn, SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper";

export default function RentPage() {
  return (
    <>
      {/* Header - Updated to light ecommerce vibe for contrast */}
      <section className="bg-white border-b border-border-gray relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 relative z-10 text-center">
          <FadeIn>
            <span className="inline-block px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wider uppercase bg-light-sky text-accent-blue border border-accent-blue/20 mb-6">
              B2B Enterprise Rentals
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-dark-text mb-6">
              Scale Your Office Printing <br className="hidden sm:block" />
              with <span className="text-brand">Zero Capital Cost</span>
            </h1>
            <p className="text-slate-text text-[15px] md:text-[16px] max-w-2xl mx-auto mb-10 leading-relaxed">
              Why buy depreciating hardware? Get the latest enterprise printers delivered, installed, and maintained with our flexible rental plans.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                {/* Fixed CTA button with strong primary blue #02367B */}
                <Button size="lg" className="bg-[#02367B] hover:bg-[#012350] text-white gap-2 rounded-xl h-14 px-8 text-[15px] font-bold shadow-[0_4px_14px_rgba(2,54,123,0.3)] hover:shadow-[0_6px_20px_rgba(2,54,123,0.4)] transition-all">
                  Request Quote <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2 rounded-xl h-14 px-8 text-[15px] font-bold shadow-[0_4px_14px_rgba(37,211,102,0.3)] transition-all">
                  <MessageCircle className="w-5 h-5" /> WhatsApp Us
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Rental Plans */}
      <SectionWrapper bg="gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Flexible Rental Plans" description="Choose a plan that fits your business needs." />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Clock, title: "Daily Rental", desc: "Short-term printing for events & projects.", price: "₹500 – ₹1000/day", features: ["No minimum commitment", "Delivery included", "Full support"] },
              { icon: Calendar, title: "Monthly Rental", desc: "Cost-effective for ongoing office needs.", price: "From ₹3,000/mo", features: ["Free maintenance", "Toner included", "Flexible upgrade"] },
              { icon: Building2, title: "Corporate Plan", desc: "Complete fleet management for enterprises.", price: "Custom Quote", features: ["Dedicated manager", "SLA guarantee", "Volume pricing"] },
            ].map((plan, i) => (
              <FadeIn key={plan.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-border-gray p-8 h-full flex flex-col hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-light-sky flex items-center justify-center mb-6">
                    <plan.icon className="w-7 h-7 text-accent-blue" />
                  </div>
                  <h3 className="text-[18px] font-bold text-dark-text mb-2">{plan.title}</h3>
                  <p className="text-[13px] text-slate-text mb-5 min-h-[40px]">{plan.desc}</p>
                  <p className="text-[20px] font-extrabold text-brand mb-6 pb-6 border-b border-soft-gray">{plan.price}</p>
                  <ul className="space-y-3.5 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-[13px] font-medium text-slate-text">
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <Button className="w-full rounded-xl bg-white text-brand border border-brand/20 hover:bg-[#02367B] hover:text-white hover:border-[#02367B] h-12 text-[14px] font-bold shadow-sm transition-all">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Equipment Showcase (No pricing) */}
      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Available Rental Equipment" description="Enterprise-grade printers available for immediate rental. (Images for reference)" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RENTAL_EQUIPMENT.map((eq, i) => (
              <FadeIn key={eq.id} delay={i * 0.05}>
                <div className="bg-white rounded-2xl border border-border-gray hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-accent-blue/30 transition-all duration-300 flex flex-col h-full group overflow-hidden">
                  <div className="bg-soft-gray/50 rounded-t-2xl p-8 flex items-center justify-center aspect-[4/3] group-hover:bg-light-sky/20 transition-colors">
                    <div className="w-24 h-24 bg-white rounded-2xl shadow-sm border border-border-gray flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <svg viewBox="0 0 48 48" className="w-12 h-12 text-brand/30" fill="currentColor">
                        <rect x="10" y="20" width="28" height="14" rx="2" />
                        <rect x="14" y="10" width="20" height="12" rx="2" opacity="0.6" />
                        <rect x="12" y="33" width="24" height="7" rx="1.5" opacity="0.4" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded">{eq.brand}</span>
                      <span className="text-[10px] uppercase font-semibold text-muted-foreground">{eq.category}</span>
                    </div>
                    <h3 className="text-[16px] font-bold text-dark-text mb-2 leading-snug group-hover:text-accent-blue transition-colors">{eq.name}</h3>
                    <p className="text-[13px] text-slate-text mb-4 line-clamp-2">{eq.description}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {eq.features.slice(0, 3).map((f) => (
                        <span key={f} className="text-[11px] font-medium bg-soft-gray text-slate-text px-2.5 py-1 rounded-md border border-border-gray/50">{f}</span>
                      ))}
                    </div>
                    
                    <div className="mt-auto">
                      <Link href="/contact">
                        {/* Stronger Inquire Button */}
                        <Button className="w-full h-11 bg-white text-[#02367B] border border-[#02367B]/20 hover:bg-[#02367B] hover:text-white rounded-xl text-[13px] font-bold shadow-sm transition-all group-hover:bg-[#02367B] group-hover:text-white">
                          Inquire Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
