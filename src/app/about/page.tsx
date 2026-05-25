"use client";

import { Award, Users, Target, Eye, Building2 } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { FadeIn, SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper";
import { TIMELINE_EVENTS, TESTIMONIALS } from "@/data/site-data";
import { CLIENT_LOGOS } from "@/lib/constants";

const stats = [
  { value: 27, suffix: "+", label: "Years of Experience" },
  { value: 500, suffix: "+", label: "Enterprise Clients" },
  { value: 50, suffix: "+", label: "Cities Served" },
  { value: 10000, suffix: "+", label: "Products Delivered" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <FadeIn>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/15 mb-4">About Alcon Enterprise</span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 max-w-2xl">India&apos;s Trusted Enterprise Printer Solutions Partner Since 1999</h1>
            <p className="text-white/70 text-lg max-w-xl">Founded by Neelkant Gupta with a vision to make enterprise printing accessible, reliable, and affordable for every business.</p>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-border-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08}>
                <div className="text-center">
                  <AnimatedCounter value={s.value} suffix={s.suffix} className="text-3xl font-bold text-brand" />
                  <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <div className="bg-soft-gray rounded-2xl p-10 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-brand-50 flex items-center justify-center">
                  <Users className="w-14 h-14 text-brand/40" />
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 text-brand border border-brand-100 mb-4">Our Founder</span>
              <h2 className="text-2xl md:text-3xl font-bold text-dark-text mb-4">Neelkant Gupta</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In 1999, Neelkant Gupta started Alcon Enterprise with a simple mission: provide reliable printer servicing and cartridge solutions to businesses in Ahmedabad.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What began as a solo founder business has grown into Gujarat&apos;s most trusted enterprise hardware partner, serving 500+ corporate clients including Zomato, Blinkit, BigBasket, Taj Group, and Somany Ceramics.
              </p>
            </FadeIn>
          </div>
        </div>
      </SectionWrapper>

      {/* Mission & Vision */}
      <SectionWrapper bg="gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-5">
            <FadeIn>
              <div className="bg-white rounded-xl border border-border-gray p-7">
                <div className="w-11 h-11 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                  <Target className="w-5 h-5 text-brand" />
                </div>
                <h3 className="text-lg font-bold text-dark-text mb-2">Our Mission</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To make enterprise-grade printing solutions accessible and affordable for every business in India, with unmatched service quality and reliability.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div className="bg-white rounded-xl border border-border-gray p-7">
                <div className="w-11 h-11 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5 text-brand" />
                </div>
                <h3 className="text-lg font-bold text-dark-text mb-2">Our Vision</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To be India&apos;s leading printer solutions platform, enabling businesses to focus on what matters while we handle their printing infrastructure.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </SectionWrapper>

      {/* Timeline */}
      <SectionWrapper>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Journey" description="Key milestones in our 27+ year story." />
          <div className="space-y-0">
            {TIMELINE_EVENTS.map((event, i) => (
              <FadeIn key={event.year} delay={i * 0.06}>
                <div className="flex gap-5 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {event.year.slice(2)}
                    </div>
                    {i < TIMELINE_EVENTS.length - 1 && <div className="w-0.5 flex-1 bg-border-gray mt-2" />}
                  </div>
                  <div className="pt-1.5 pb-2">
                    <p className="text-xs font-bold text-brand mb-1">{event.year}</p>
                    <h3 className="text-base font-semibold text-dark-text mb-1">{event.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Clients */}
      <SectionWrapper bg="gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Enterprise Partners" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CLIENT_LOGOS.map((logo, i) => (
              <FadeIn key={logo.name} delay={i * 0.04}>
                <div className="bg-white rounded-xl border border-border-gray p-5 text-center">
                  <Building2 className="w-6 h-6 text-brand/30 mx-auto mb-2" />
                  <span className="text-sm font-semibold text-slate-text/70">{logo.name}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
