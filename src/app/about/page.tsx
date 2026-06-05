"use client";

import { Target, Eye, Building2, CheckCircle2 } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { FadeIn, SectionHeader } from "@/components/shared/section-wrapper";
import { TIMELINE_EVENTS } from "@/data/site-data";
import { CLIENT_LOGOS } from "@/lib/constants";
import Image from "next/image";

const stats = [
  { value: 27, suffix: "+", label: "Years of Experience" },
  { value: 500, suffix: "+", label: "Enterprise Clients" },
  { value: 50, suffix: "+", label: "Cities Served" },
  { value: 10000, suffix: "+", label: "Products Delivered" },
];

export default function AboutPage() {
  return (
    <div className="bg-soft-gray min-h-screen pb-20">
      {/* 1. Hero */}
      <section className="bg-brand text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block px-4 py-1.5 rounded-full text-[13px] font-bold uppercase tracking-wider bg-white/10 border border-white/20 mb-6">
              About Alcon Enterprise
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              India's Trusted Enterprise Printer Solutions Partner
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Founded by Neelkant Gupta with a vision to make enterprise printing accessible, reliable, and entirely hassle-free for every business.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="bg-white border-b border-border-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1}>
                <div className="text-center">
                  <AnimatedCounter value={s.value} suffix={s.suffix} className="text-4xl md:text-5xl font-extrabold text-brand mb-2" />
                  <p className="text-[13px] font-bold text-slate-text uppercase tracking-widest">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Founder Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="bg-white p-8 rounded-3xl border border-border-gray shadow-sm">
              <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-brand rounded-full" /> Our Story
              </h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-dark-text mb-6">Built on Trust & Reliability</h3>
              
              <div className="prose prose-slate text-slate-text leading-relaxed">
                <p className="mb-4 text-lg">
                  In 1999, Neelkant Gupta started Alcon Enterprise with a simple mission: provide reliable printer servicing and cartridge solutions to businesses in Ahmedabad.
                </p>
                <p className="text-lg">
                  What began as a solo founder business has grown into Gujarat's most trusted enterprise hardware partner. We believe that printing infrastructure should be invisible to your workflow—it should just work, reliably and affordably.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 bg-soft-gray p-4 rounded-2xl border border-border-gray w-fit">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                  <Image 
                    src="/images/founder.jpg" 
                    alt="Neelkant Gupta" 
                    width={64} 
                    height={64} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-dark-text font-bold text-lg">Neelkant Gupta</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-0.5">Founder & CEO</p>
                </div>
              </div>
            </div>
          </FadeIn>
          
          {/* Mission & Vision */}
          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="bg-white p-8 rounded-3xl border border-border-gray shadow-sm flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-16 h-16 shrink-0 bg-brand text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-dark-text mb-3">Our Mission</h4>
                  <p className="text-slate-text leading-relaxed">
                    To make enterprise-grade printing solutions accessible and affordable for every business in India, providing unmatched service quality that eliminates downtime and reduces operational costs.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {["Affordable hardware access", "Zero-downtime commitment", "Eco-friendly recycling"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm font-medium text-dark-text">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white p-8 rounded-3xl border border-border-gray shadow-sm flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-16 h-16 shrink-0 bg-accent-blue text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Eye className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-dark-text mb-3">Our Vision</h4>
                  <p className="text-slate-text leading-relaxed">
                    To be India's definitive leader in managed print services, enabling millions of businesses to focus entirely on their growth while we invisibly power their infrastructure.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. Timeline */}
      <section className="bg-white border-y border-border-gray">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SectionHeader title="A Legacy of Excellence" description="Key milestones in our story." />
          <div className="mt-12 space-y-8">
            {TIMELINE_EVENTS.map((event, i) => (
              <FadeIn key={event.year} delay={i * 0.1}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                      {event.year.slice(2)}
                    </div>
                    {i < TIMELINE_EVENTS.length - 1 && (
                      <div className="w-0.5 h-full bg-border-gray mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <span className="text-sm font-bold text-brand">{event.year}</span>
                    <h4 className="text-xl font-bold text-dark-text mb-2">{event.title}</h4>
                    <p className="text-slate-text leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Client Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader title="Trusted by Industry Leaders" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
          {CLIENT_LOGOS.map((logo, i) => (
            <FadeIn key={logo.name} delay={i * 0.05}>
              <div className="bg-white border border-border-gray rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                <Building2 className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm font-bold text-dark-text text-center">{logo.name}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

    </div>
  );
}
