"use client";

import Link from "next/link";
import { Check, ArrowRight, Sparkles, HelpCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUBSCRIPTION_PLANS } from "@/data/site-data";
import { FadeIn, SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper";
import { useState } from "react";

const faqs = [
  { q: "How does cartridge subscription work?", a: "Choose a plan, and we deliver the right cartridges to your doorstep on schedule. You can modify or cancel anytime." },
  { q: "Can I change my plan later?", a: "Yes, you can upgrade, downgrade, or cancel at any time with no penalties." },
  { q: "What brands do you support?", a: "We support HP, Canon, Brother, Epson, and all major printer brands." },
  { q: "Is delivery free?", a: "Yes, all subscription plans include free doorstep delivery across India." },
];

export default function SubscriptionsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <section className="bg-soft-gray border-b border-border-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 text-center">
          <FadeIn>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 text-brand border border-brand-100 mb-4">Subscriptions</span>
            <h1 className="text-2xl md:text-4xl font-bold text-dark-text mb-3">Never Run Out of Cartridges</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">Automatic delivery. Discounted pricing. Priority support. Choose your plan.</p>
          </FadeIn>
        </div>
      </section>

      <SectionWrapper>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {SUBSCRIPTION_PLANS.map((plan, i) => (
              <FadeIn key={plan.id} delay={i * 0.08}>
                <div className={`rounded-xl border p-6 h-full flex flex-col ${plan.isPopular ? "border-brand shadow-lg relative" : "border-border-gray bg-white"}`}>
                  {plan.isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-brand text-white text-xs font-semibold px-3 py-1 rounded-full">
                      <Sparkles className="w-3 h-3" /> {plan.badge}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-dark-text mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-5">
                    <span className="text-3xl font-bold text-dark-text">₹{plan.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">/{plan.interval === "monthly" ? "mo" : plan.interval === "quarterly" ? "qtr" : "yr"}</span>
                    <p className="text-xs text-success font-medium mt-1">Save {plan.savings} vs retail</p>
                  </div>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-text">
                        <Check className="w-4 h-4 text-success shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full gap-2 rounded-lg ${plan.isPopular ? "bg-brand hover:bg-brand-dark text-white" : "bg-soft-gray text-dark-text hover:bg-brand-50"}`}>
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper bg="gray">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Frequently Asked Questions" />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="bg-white rounded-xl border border-border-gray overflow-hidden">
                  <button className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-dark-text text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {faq.q}
                    <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-muted-foreground">{faq.a}</div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
