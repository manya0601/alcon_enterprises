"use client";

import { Award, Users, Target, Eye, Building2, ChevronRight, CheckCircle2 } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { FadeIn } from "@/components/shared/section-wrapper";
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
      {/* 1. Integrated Hero & Stats */}
      <section className="relative bg-brand text-white pt-20 pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-[3rem] lg:rounded-b-[4rem]">
        {/* Dynamic Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-white/10 to-transparent rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-blue/30 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <FadeIn>
            <span className="inline-block px-4 py-1.5 rounded-full text-[13px] font-bold uppercase tracking-wider bg-white/10 border border-white/20 mb-6 backdrop-blur-md shadow-sm">
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

      {/* Overlapping Stats Card */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24">
        <FadeIn delay={0.2}>
          <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-border-gray p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-border-gray">
              {stats.map((s, i) => (
                <div key={s.label} className="text-center px-4">
                  <AnimatedCounter value={s.value} suffix={s.suffix} className="text-4xl md:text-5xl font-extrabold text-brand tracking-tight mb-2" />
                  <p className="text-[13px] font-bold text-slate-text uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 2. Asymmetric "Who We Are" Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Founder */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <FadeIn>
              <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-brand rounded-full" /> Our Story
              </h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-dark-text mb-6">Built on Trust & Reliability</h3>
              
              <div className="prose prose-slate prose-lg text-slate-text leading-relaxed">
                <p className="mb-6">
                  In 1999, Neelkant Gupta started Alcon Enterprise with a simple mission: provide reliable printer servicing and cartridge solutions to businesses in Ahmedabad.
                </p>
                <p>
                  What began as a solo founder business has grown into Gujarat's most trusted enterprise hardware partner. We believe that printing infrastructure should be invisible to your workflow—it should just work, reliably and affordably.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 bg-white p-4 rounded-2xl border border-border-gray shadow-sm w-fit">
                <div className="w-14 h-14 bg-brand-50 rounded-full flex items-center justify-center text-brand">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-dark-text font-bold">Neelkant Gupta</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-0.5">Founder & CEO</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Mission & Vision */}
          <div className="lg:col-span-7 space-y-6">
            <FadeIn delay={0.1}>
              <div className="group bg-white p-8 md:p-10 rounded-3xl border border-border-gray shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-16 h-16 shrink-0 bg-brand text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Target className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-dark-text mb-3">Our Mission</h4>
                    <p className="text-slate-text leading-relaxed text-lg">
                      To make enterprise-grade printing solutions accessible and affordable for every business in India, providing unmatched service quality that eliminates downtime and reduces operational costs.
                    </p>
                    <ul className="mt-6 space-y-3">
                      {["Affordable hardware access", "Zero-downtime commitment", "Eco-friendly cartridge recycling"].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-[15px] font-medium text-dark-text">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="group bg-white p-8 md:p-10 rounded-3xl border border-border-gray shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-16 h-16 shrink-0 bg-accent-blue text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Eye className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-dark-text mb-3">Our Vision</h4>
                    <p className="text-slate-text leading-relaxed text-lg">
                      To be India's definitive leader in managed print services, enabling millions of businesses to focus entirely on their growth while we invisibly power their infrastructure.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. Compact Timeline & Enterprise Partners */}
      <section className="bg-white border-y border-border-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-12">
            
            {/* Timeline */}
            <div>
              <FadeIn>
                <h3 className="text-2xl font-bold text-dark-text mb-8">A Legacy of Excellence</h3>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-6 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border-gray before:to-transparent">
                  {TIMELINE_EVENTS.map((event, i) => (
                    <div key={event.year} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-brand text-white shadow shrink-0 md:order-1 relative z-10 md:-ml-5">
                        <span className="text-[10px] font-bold">{event.year.slice(2)}</span>
                      </div>
                      <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-soft-gray p-4 rounded-2xl border border-border-gray group-hover:border-brand/30 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-dark-text text-[15px]">{event.title}</h4>
                          <span className="text-xs font-bold text-brand bg-brand-50 px-2 py-0.5 rounded-md">{event.year}</span>
                        </div>
                        <p className="text-[13px] text-slate-text leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Client Showcase */}
            <div>
              <FadeIn delay={0.2}>
                <h3 className="text-2xl font-bold text-dark-text mb-8">Trusted by Industry Leaders</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {CLIENT_LOGOS.map((logo) => (
                    <div key={logo.name} className="bg-soft-gray border border-border-gray rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white hover:shadow-md transition-all group cursor-default">
                      <Building2 className="w-8 h-8 text-muted-foreground group-hover:text-brand transition-colors" />
                      <span className="text-[13px] font-bold text-dark-text text-center">{logo.name}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-brand-50 rounded-2xl p-6 border border-brand-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-brand mb-1">Join our network</h4>
                    <p className="text-sm text-brand/70">Get custom enterprise pricing today.</p>
                  </div>
                  <a href="/contact" className="w-10 h-10 bg-brand text-white rounded-full flex items-center justify-center hover:bg-brand-dark transition-colors shadow-sm">
                    <ChevronRight className="w-5 h-5" />
                  </a>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
