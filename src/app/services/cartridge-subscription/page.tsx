"use client";

import Link from "next/link";
import { Package, ArrowRight, ShieldCheck, Truck, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/section-wrapper";
import { SUBSCRIPTION_PLANS } from "@/data/site-data";

export default function CartridgeSubscriptionPage() {
  return (
    <>
      <section className="bg-white border-b border-border-gray relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 md:pt-6 md:pb-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <Link href="/services" className="text-[13px] font-bold text-orange-500 hover:text-brand flex items-center gap-1 mb-6">
                ← Back to Services
              </Link>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center mb-6 border border-orange-500/10">
                <Package className="w-7 h-7 text-orange-500" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-dark-text mb-6">
                Cartridge <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Subscription Plans</span>
              </h1>
              <p className="text-slate-text text-[15px] md:text-[16px] max-w-xl mb-8 leading-relaxed">
                Never run out of ink again. Automate your office cartridge management with our monthly refill plans. Enjoy automatic doorstep delivery and bulk office support.
              </p>
              
              <div className="mt-12 pt-8 border-t border-border-gray/60 max-w-xl">
                <p className="text-[12px] font-bold text-slate-text uppercase tracking-wider mb-6">How It Works</p>
                <div className="space-y-4">
                  {[
                    { icon: ShieldCheck, title: "1. Select Volume", desc: "Tell us your printer model and estimated monthly page yield." },
                    { icon: RefreshCw, title: "2. Automated Schedule", desc: "We map out a replacement schedule based on your historic usage." },
                    { icon: Truck, title: "3. Doorstep Delivery", desc: "Fresh cartridges arrive before your current ones run empty." },
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 mt-1">
                        <feature.icon className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-dark-text mb-0.5">{feature.title}</h3>
                        <p className="text-[13px] text-slate-text">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-3xl p-6 md:p-8 text-white shadow-xl mt-8 md:mt-0">
                <h3 className="text-[20px] font-bold mb-4">Need Bulk Office Support?</h3>
                <p className="text-[14px] text-white/70 mb-6 leading-relaxed">
                  Managing printers across multiple floors or branches? We offer consolidated billing and dedicated fleet mapping for large enterprises.
                </p>
                <Link href="/contact">
                  <Button className="bg-white text-dark-text hover:bg-orange-500 hover:text-white hover:border-orange-500 border border-white gap-2 rounded-xl h-12 px-6 font-bold transition-all w-full">
                    Contact Enterprise Team <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-soft-gray py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {SUBSCRIPTION_PLANS.map((plan, i) => (
              <FadeIn key={plan.id} delay={i * 0.1}>
                <div className={`bg-white rounded-3xl p-8 border h-full flex flex-col relative transition-all duration-300 ${plan.isPopular ? "border-orange-500 shadow-[0_10px_40px_rgba(249,115,22,0.15)] md:-my-4 z-10" : "border-border-gray shadow-sm hover:shadow-md"}`}>
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-md">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className={`text-[20px] font-bold mb-2 ${plan.isPopular ? "text-orange-500" : "text-dark-text"}`}>{plan.name}</h3>
                  <p className="text-[13px] text-slate-text mb-6 min-h-[40px]">{plan.description}</p>
                  <div className="mb-8">
                    <span className="text-[32px] font-extrabold text-dark-text leading-none">₹{plan.price.toLocaleString()}</span>
                    <span className="text-[14px] text-muted-foreground font-medium">/{plan.interval === "monthly" ? "mo" : plan.interval === "quarterly" ? "qtr" : "yr"}</span>
                    <div className="inline-block bg-green-50 text-green-700 text-[11px] font-bold px-2 py-0.5 rounded-md mt-2 block w-fit">
                      Save {plan.savings} vs Retail
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[13px] font-medium text-slate-text">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.isPopular ? "text-orange-500" : "text-slate-text/40"}`} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <Button className={`w-full rounded-xl h-12 text-[14px] font-bold transition-all ${plan.isPopular ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md" : "bg-soft-gray text-dark-text hover:bg-orange-500 hover:text-white border border-border-gray"}`}>
                      Select Plan
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
