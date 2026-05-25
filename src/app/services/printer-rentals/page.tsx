"use client";

import Link from "next/link";
import { Building2, ArrowRight, Printer, CalendarClock, Handshake, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, SectionWrapper } from "@/components/shared/section-wrapper";
import { RENTAL_EQUIPMENT } from "@/data/site-data";

export default function PrinterRentalsPage() {
  return (
    <>
      <section className="bg-white border-b border-border-gray relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <FadeIn>
            <Link href="/services" className="text-[13px] font-bold text-brand hover:text-brand-dark flex items-center gap-1 mb-6">
              ← Back to Services
            </Link>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center mb-6 border border-brand/10">
              <Building2 className="w-8 h-8 text-brand" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-dark-text mb-6">
              Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent-blue">Printer Rentals</span>
            </h1>
            <p className="text-slate-text text-[16px] max-w-2xl mb-8 leading-relaxed">
              Flexible printer rental solutions for businesses of all sizes. From short-term event rentals to long-term corporate fleet management, we provide the hardware and support you need without the capital investment.
            </p>
            <div className="flex gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-[#02367B] hover:bg-[#012350] text-white gap-2 rounded-xl h-12 px-8 font-bold shadow-md">
                  Request a Quote <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionWrapper bg="gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-text mb-4">Our Rental Solutions</h2>
            <p className="text-slate-text max-w-2xl mx-auto">Tailored rental packages designed to meet specific business requirements.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { icon: CalendarClock, title: "Short-Term / Event Rentals", desc: "Perfect for audits, exhibitions, construction sites, or temporary offices. Rent by the day or week with same-day delivery and setup." },
              { icon: Handshake, title: "Long-Term Corporate Fleet", desc: "Equip your entire office with the latest printers. Includes free maintenance, automated toner delivery, and 4-hour SLA support." },
            ].map((sol, i) => (
              <FadeIn key={sol.title} delay={i * 0.1}>
                <div className="bg-white rounded-3xl border border-border-gray p-8 hover:shadow-md hover:border-brand/30 transition-all h-full">
                  <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mb-6">
                    <sol.icon className="w-7 h-7 text-brand" />
                  </div>
                  <h3 className="text-[20px] font-bold text-dark-text mb-3">{sol.title}</h3>
                  <p className="text-[14px] text-slate-text leading-relaxed">{sol.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-text mb-4">Sample Rental Equipment</h2>
            <p className="text-slate-text max-w-2xl mx-auto">We stock a wide variety of office and industrial printers. Contact us for specific models.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RENTAL_EQUIPMENT.slice(0, 3).map((eq, i) => (
              <FadeIn key={eq.id} delay={i * 0.1}>
                <div className="bg-white rounded-3xl border border-border-gray p-6 flex flex-col h-full hover:shadow-md transition-all group">
                  <div className="bg-soft-gray rounded-2xl p-8 flex items-center justify-center aspect-[4/3] mb-6 group-hover:bg-brand/5 transition-colors">
                    <Printer className="w-16 h-16 text-brand/20 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-[18px] font-bold text-dark-text mb-2">{eq.name}</h3>
                  <p className="text-[14px] text-slate-text mb-4 line-clamp-2">{eq.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {eq.features.slice(0, 3).map((f) => (
                      <span key={f} className="text-[12px] font-medium bg-soft-gray text-slate-text px-3 py-1 rounded-lg border border-border-gray">{f}</span>
                    ))}
                  </div>
                  
                  <Link href="/contact">
                    <Button className="w-full bg-white text-brand border border-brand/20 hover:bg-brand hover:text-white rounded-xl h-12 text-[14px] font-bold shadow-sm transition-all">
                      Inquire About This Model
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <section className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Not sure which printer you need?</h2>
          <p className="text-[16px] text-white/70 mb-8">
            Our experts can assess your printing volume and recommend the most cost-effective hardware for your office.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-dark-text hover:bg-brand hover:text-white hover:border-brand border border-white gap-2 rounded-xl h-14 px-8 font-bold transition-all">
              Get Expert Recommendation <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
