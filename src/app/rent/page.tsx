"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, Clock, Calendar, Building2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RENTAL_EQUIPMENT } from "@/data/site-data";
import { SITE_CONFIG } from "@/lib/constants";
import { FadeIn, SectionHeader } from "@/components/shared/section-wrapper";

export default function RentPage() {
  return (
    <>
      <section className="bg-white relative overflow-hidden py-12 md:py-16 border-b border-border-gray">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Hero */}
            <FadeIn>
              <span className="inline-block px-3 py-1 rounded-full text-[12px] font-bold tracking-wider uppercase bg-light-sky text-accent-blue border border-accent-blue/20 mb-6">
                B2B Enterprise Rentals
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-dark-text mb-6">
                Scale Your Office Printing <br className="hidden sm:block" />
                with <span className="text-brand">Zero Capital Cost</span>
              </h1>
              <p className="text-slate-text text-[15px] md:text-[16px] max-w-xl mb-10 leading-relaxed">
                Why buy depreciating hardware? Get the latest enterprise printers delivered, installed, and maintained with our flexible rental plans.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#02367B] hover:bg-[#012350] text-white gap-2 rounded-xl h-12 px-8 text-[14px] font-bold shadow-md transition-all">
                    Request Quote <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2 rounded-xl h-12 px-8 text-[14px] font-bold shadow-md transition-all">
                    <MessageCircle className="w-4 h-4" /> WhatsApp Us
                  </Button>
                </a>
              </div>
            </FadeIn>

            {/* Right Column: Plans */}
            <FadeIn delay={0.2}>
              <div className="mt-8 md:mt-0">
                <h2 className="text-[20px] font-bold text-dark-text mb-6">Flexible Rental Plans</h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Daily */}
                  <div className="bg-white rounded-2xl border border-border-gray p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-light-sky flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-accent-blue" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-dark-text">Daily Rental</h3>
                        <p className="text-[12px] text-slate-text">₹500 – ₹1000/day</p>
                      </div>
                    </div>
                    <p className="text-[13px] text-slate-text mb-4">Short-term printing for events & projects.</p>
                    <Link href="/contact">
                      <Button variant="outline" className="w-full h-9 text-[12px] font-bold rounded-lg border-border-gray hover:bg-soft-gray">
                        Inquire Now
                      </Button>
                    </Link>
                  </div>

                  {/* Monthly */}
                  <div className="bg-white rounded-2xl border border-border-gray p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-light-sky flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-accent-blue" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-dark-text">Monthly Rental</h3>
                        <p className="text-[12px] text-slate-text">From ₹3,000/mo</p>
                      </div>
                    </div>
                    <p className="text-[13px] text-slate-text mb-4">Cost-effective for ongoing office needs.</p>
                    <Link href="/contact">
                      <Button variant="outline" className="w-full h-9 text-[12px] font-bold rounded-lg border-border-gray hover:bg-soft-gray">
                        Inquire Now
                      </Button>
                    </Link>
                  </div>

                  {/* Corporate */}
                  <div className="bg-white rounded-2xl border border-border-gray p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-light-sky flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-accent-blue" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-dark-text">Corporate Plan</h3>
                        <p className="text-[12px] text-slate-text">Custom Quote</p>
                      </div>
                    </div>
                    <p className="text-[13px] text-slate-text mb-4">Complete fleet management for enterprises.</p>
                    <Link href="/contact">
                      <Button variant="outline" className="w-full h-9 text-[12px] font-bold rounded-lg border-border-gray hover:bg-soft-gray">
                        Contact Sales
                      </Button>
                    </Link>
                  </div>

                  {/* Fixed Subscriptions Highlight */}
                  <div className="bg-gradient-to-br from-brand to-brand-dark rounded-2xl border border-brand p-5 hover:shadow-md transition-shadow text-white flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-white">Fixed Subscriptions</h3>
                        <p className="text-[12px] text-white/80">Automated Refills</p>
                      </div>
                    </div>
                    <p className="text-[13px] text-white/90 mb-4">Lock in your prices with automated cartridge delivery.</p>
                    <Link href="/subscriptions" className="mt-auto">
                      <Button className="w-full h-9 text-[12px] font-bold rounded-lg bg-white text-brand hover:bg-white/90 hover:text-brand">
                        View More Options <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Equipment Showcase (No pricing) */}
      <section className="bg-soft-gray py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Available Rental Equipment" description="Enterprise-grade printers available for immediate rental. (Images for reference)" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RENTAL_EQUIPMENT.map((eq, i) => (
              <FadeIn key={eq.id} delay={i * 0.05}>
                <div className="bg-white rounded-3xl border border-border-gray hover:shadow-md hover:border-accent-blue/30 transition-all duration-300 flex flex-col h-full group overflow-hidden">
                  <div className="bg-soft-gray/30 rounded-t-3xl p-8 flex items-center justify-center aspect-[4/3] group-hover:bg-light-sky/10 transition-colors relative">
                    <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500">
                      <Image 
                        src={eq.image} 
                        alt={eq.name} 
                        fill 
                        className="object-contain drop-shadow-sm mix-blend-multiply" 
                      />
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-accent-blue bg-accent-blue/10 px-2.5 py-1 rounded-md">{eq.brand}</span>
                      <span className="text-[11px] uppercase font-bold text-muted-foreground">{eq.category}</span>
                    </div>
                    <h3 className="text-[18px] font-bold text-dark-text mb-2 leading-snug group-hover:text-accent-blue transition-colors">{eq.name}</h3>
                    <p className="text-[13px] text-slate-text mb-5 line-clamp-2">{eq.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                      {eq.features.slice(0, 3).map((f) => (
                        <span key={f} className="text-[12px] font-medium bg-soft-gray text-slate-text px-3 py-1 rounded-lg border border-border-gray/50">{f}</span>
                      ))}
                    </div>
                    
                    <Link href="/contact">
                      <Button className="w-full h-12 bg-white text-[#02367B] border border-[#02367B]/20 hover:bg-[#02367B] hover:text-white rounded-xl text-[14px] font-bold shadow-sm transition-all group-hover:bg-[#02367B] group-hover:text-white">
                        Inquire Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
