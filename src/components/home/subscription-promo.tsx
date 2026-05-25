"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader, FadeIn } from "@/components/shared/section-wrapper";
import { SUBSCRIPTION_PLANS } from "@/data/site-data";

export function SubscriptionPromo() {
  return (
    <section className="bg-soft-gray py-16 md:py-24 border-b border-border-gray relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-light-sky/50 to-transparent blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          badge="Auto-Delivery Plans" 
          title="Cartridge Subscriptions" 
          description="Never run out of ink again. Choose a plan, and we'll auto-deliver genuine cartridges exactly when you need them. Save up to 30%." 
        />
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-center mt-10">
          {SUBSCRIPTION_PLANS.map((plan, i) => (
            <FadeIn key={plan.id} delay={i * 0.1}>
              <div 
                className={`rounded-3xl p-6 md:p-8 flex flex-col relative transition-all duration-300 ${
                  plan.isPopular 
                    ? "bg-white border-2 border-accent-blue shadow-[0_20px_40px_rgba(59,130,246,0.15)] md:-my-4 z-10" 
                    : "bg-white border border-border-gray shadow-sm hover:shadow-md"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent-blue to-accent-cyan text-white text-[11px] font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3.5 h-3.5" /> {plan.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-[18px] font-bold mb-2 ${plan.isPopular ? "text-brand" : "text-dark-text"}`}>{plan.name}</h3>
                  <p className="text-[13px] text-slate-text min-h-[40px]">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-[32px] font-extrabold tracking-tight text-dark-text leading-none">₹{plan.price.toLocaleString()}</span>
                    <span className="text-[14px] text-muted-foreground font-medium mb-1">
                      /{plan.interval === "monthly" ? "mo" : plan.interval === "quarterly" ? "qtr" : "yr"}
                    </span>
                  </div>
                  <div className="inline-block bg-green-50 text-green-700 text-[11px] font-bold px-2 py-0.5 rounded-md mt-2">
                    Save {plan.savings} vs Retail
                  </div>
                </div>

                <ul className="space-y-3.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-dark-text font-medium">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.isPopular ? "text-accent-blue" : "text-slate-text/40"}`} /> 
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href="/subscriptions">
                  <Button 
                    className={`w-full gap-2 rounded-xl text-[14px] font-bold h-12 transition-all ${
                      plan.isPopular 
                        ? "bg-brand hover:bg-brand-dark text-white shadow-md hover:shadow-lg" 
                        : "bg-soft-gray text-dark-text hover:bg-light-sky hover:text-brand border border-border-gray"
                    }`}
                  >
                    Subscribe Now <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
