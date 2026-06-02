"use client";

import Link from "next/link";
import { Building2, ArrowRight, Printer, CalendarClock, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/section-wrapper";
import { RENTAL_EQUIPMENT } from "@/data/site-data";

export default function PrinterRentalsPage() {
  return (
    <>
      <section className="bg-white border-b border-border-gray relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 md:pt-6 md:pb-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <Link href="/services" className="text-[13px] font-bold text-brand hover:text-brand-dark flex items-center gap-1 mb-6">
                ← Back to Services
              </Link>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center mb-6 border border-brand/10">
                <Building2 className="w-7 h-7 text-brand" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-dark-text mb-6">
                Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent-blue">Printer Rentals</span>
              </h1>
              <p className="text-slate-text text-[15px] md:text-[16px] max-w-xl mb-8 leading-relaxed">
                Flexible printer rental solutions for businesses of all sizes. From short-term event rentals to long-term corporate fleet management, we provide the hardware and support you need without the capital investment.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-[#02367B] hover:bg-[#012350] text-white gap-2 rounded-xl h-12 px-8 font-bold shadow-md">
                  Request a Quote <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-8 md:mt-0 space-y-4">
                {[
                  { icon: CalendarClock, title: "Short-Term / Event Rentals", desc: "Perfect for audits, exhibitions, or temporary offices. Rent by the day or week with same-day setup." },
                  { icon: Handshake, title: "Long-Term Corporate Fleet", desc: "Equip your entire office with the latest printers. Includes free maintenance, automated toner delivery, and 4-hour SLA." },
                ].map((sol, i) => (
                  <div key={i} className="bg-soft-gray rounded-3xl border border-border-gray p-6 hover:shadow-md hover:border-brand/30 transition-all flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center shrink-0">
                      <sol.icon className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-dark-text mb-1">{sol.title}</h3>
                      <p className="text-[13px] text-slate-text leading-relaxed">{sol.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-dark-text mb-2">Sample Rental Equipment</h2>
            <p className="text-slate-text text-[14px]">We stock a wide variety of office and industrial printers.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RENTAL_EQUIPMENT.slice(0, 3).map((eq, i) => (
              <FadeIn key={eq.id} delay={i * 0.1}>
                <div className="bg-soft-gray rounded-3xl border border-border-gray p-6 flex flex-col h-full hover:shadow-md transition-all group">
                  <div className="bg-white rounded-2xl p-6 flex items-center justify-center aspect-[4/3] mb-6 border border-border-gray/50 group-hover:border-brand/30 transition-colors">
                    <Printer className="w-12 h-12 text-brand/20 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-[16px] font-bold text-dark-text mb-2">{eq.name}</h3>
                  <p className="text-[13px] text-slate-text mb-4 line-clamp-2">{eq.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {eq.features.slice(0, 3).map((f) => (
                      <span key={f} className="text-[11px] font-medium bg-white text-slate-text px-2 py-1 rounded-md border border-border-gray">{f}</span>
                    ))}
                  </div>
                  
                  <Link href="/contact">
                    <Button className="w-full bg-white text-brand border border-brand/20 hover:bg-brand hover:text-white rounded-xl h-10 text-[13px] font-bold shadow-sm transition-all">
                      Inquire About This Model
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
