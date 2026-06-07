"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Building2, Shield, Clock, Users, ArrowRight, Star, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { FadeIn } from "@/components/shared/section-wrapper";
import { CLIENT_LOGOS } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden border-b border-border-gray">
      {/* Background colorful blur */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-light-sky via-white to-white opacity-60 pointer-events-none" />
      <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[70%] rounded-full bg-accent-cyan/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 md:pt-10 md:pb-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left — Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-bold tracking-wide text-brand bg-brand-50 border border-brand-100 mb-6 w-fit shadow-sm">
                <Shield className="w-3.5 h-3.5" />
                SERVING BUSINESSES SINCE 1999
              </div>

              <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold tracking-tight text-dark-text leading-[1.1] mb-5">
                Enterprise Printer Solutions Built For <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent-blue">Modern Businesses</span>
              </h1>

              <p className="text-[15px] md:text-[16px] text-slate-text leading-relaxed mb-8 max-w-lg">
                Your one-stop industrial marketplace to buy, rent, and repair printers. Trusted support from Ahmedabad&apos;s leading enterprise hardware partner.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/buy">
                  <Button className="bg-brand hover:bg-brand-dark text-white gap-2 rounded-xl h-12 px-6 text-[14px] font-semibold shadow-[0_4px_14px_rgba(2,54,123,0.3)] hover:shadow-[0_6px_20px_rgba(2,54,123,0.4)] transition-all">
                    <ShoppingBag className="w-4 h-4" />
                    Explore Products
                  </Button>
                </Link>
                <Link href="/rent">
                  <Button variant="outline" className="gap-2 rounded-xl border-border-gray text-slate-text hover:border-brand hover:text-brand hover:bg-light-sky/30 h-12 px-6 text-[14px] font-semibold bg-white shadow-sm transition-all">
                    <Building2 className="w-4 h-4" />
                    Rent Printers
                  </Button>
                </Link>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
                <div className="flex items-center gap-2 text-[13px] font-medium text-slate-text">
                  <div className="w-6 h-6 rounded-full bg-light-sky flex items-center justify-center"><Clock className="w-3.5 h-3.5 text-accent-blue" /></div>
                  Same Day Service
                </div>
                <div className="flex items-center gap-2 text-[13px] font-medium text-slate-text">
                  <div className="w-6 h-6 rounded-full bg-light-sky flex items-center justify-center"><Users className="w-3.5 h-3.5 text-accent-blue" /></div>
                  500+ Clients
                </div>
                <div className="flex items-center gap-2 text-[13px] font-medium text-slate-text">
                  <div className="w-6 h-6 rounded-full bg-light-sky flex items-center justify-center"><Star className="w-3.5 h-3.5 text-accent-blue" /></div>
                  4.9/5 Ratings
                </div>
              </div>

              {/* Client logos row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-6 border-t border-border-gray">
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-text/50">Trusted by:</span>
                <div className="flex gap-4 opacity-60 grayscale">
                  {CLIENT_LOGOS.slice(0, 4).map((logo) => (
                    <span key={logo.name} className="text-[13px] font-bold text-dark-text">{logo.name}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right — Printer Showcase / Product Cards */}
          <div className="lg:col-span-6 relative h-[400px] sm:h-[500px]">
            <FadeIn delay={0.1} className="w-full h-full">
              <div className="relative z-10 w-full h-full max-w-[550px] mx-auto">
                {/* Main Product Card */}
                <div className="absolute top-[0%] right-[0%] w-[65%] bg-white rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-border-gray z-20 transition-transform duration-500 hover:-translate-y-2">
                  <div className="aspect-[4/3] bg-soft-gray rounded-xl mb-3 relative overflow-hidden flex items-center justify-center">
                    <Image 
                      src="/rentals/hp-72625.png" 
                      alt="Enterprise Xerox Machine"
                      fill
                      className="object-contain p-4 mix-blend-multiply transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute top-2 left-2 bg-accent-cyan text-white text-[9px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">BESTSELLER</div>
                  </div>
                  <h3 className="text-[14px] font-bold text-dark-text mb-1 leading-tight">Heavy Duty Enterprise Copier</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[16px] font-extrabold text-brand">₹35,000</span>
                    <Button size="sm" className="h-7 px-3 text-[11px] rounded-lg bg-brand hover:bg-brand-dark text-white">Add to Cart</Button>
                  </div>
                </div>

                {/* Floating Stat Widget */}
                <div className="absolute top-[20%] left-[0%] bg-white rounded-xl p-3 shadow-xl border border-border-gray z-30 animate-slide-up transition-transform duration-500 hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Products Sold</p>
                      <p className="text-[15px] font-extrabold text-dark-text leading-none mt-1">10,000+</p>
                    </div>
                  </div>
                </div>

                {/* Secondary Service Card */}
                <div className="absolute bottom-[5%] left-[5%] w-[55%] bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-border-gray z-30 transition-transform duration-500 hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand to-accent-blue flex items-center justify-center shrink-0 shadow-inner">
                      <Wrench className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-dark-text leading-tight">Printer Repair & AMC</h4>
                      <p className="text-[11px] text-slate-text mt-0.5 font-medium">On-site service in 4 hours</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] bg-gradient-to-tr from-light-sky to-brand-50 rounded-full blur-[80px] -z-10 opacity-60" />
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}

// Needed local mock for CheckCircle2 since it wasn't in the import
import { CheckCircle2 } from "lucide-react";
