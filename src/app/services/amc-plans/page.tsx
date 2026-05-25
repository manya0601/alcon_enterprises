import Link from "next/link";
import { ShieldCheck, ArrowRight, CheckCircle2, TrendingUp, HeadphonesIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, SectionWrapper } from "@/components/shared/section-wrapper";

export default function AmcPlansPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#0F172A] to-brand-dark py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-success/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn>
            <Link href="/services" className="text-[13px] font-bold text-success hover:text-white flex items-center justify-center gap-1 mb-6 transition-colors">
              ← Back to Services
            </Link>
            <div className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wider uppercase bg-white/10 text-success border border-white/20 mb-6 backdrop-blur-sm">
              Enterprise B2B Solution
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Annual Maintenance <span className="text-success">Contracts (AMC)</span>
            </h1>
            <p className="text-white/70 text-[16px] max-w-2xl mx-auto mb-10 leading-relaxed">
              Secure your business operations with our comprehensive printer fleet management. Preventive servicing, priority support, and zero unexpected repair costs.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-success hover:bg-green-600 text-white gap-2 rounded-xl h-14 px-8 font-bold shadow-lg shadow-success/20">
                  Request Custom Quote <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionWrapper bg="gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark-text mb-4">Why Businesses Trust Our AMC</h2>
            <p className="text-slate-text max-w-2xl mx-auto">We manage your printer infrastructure so your IT team can focus on core business operations.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Settings, title: "Preventive Servicing", desc: "Regular scheduled maintenance to clean, tune, and replace worn parts before they cause a breakdown." },
              { icon: HeadphonesIcon, title: "Priority Support", desc: "Jump the queue. AMC clients get top-priority routing with a guaranteed 4-hour on-site response time." },
              { icon: TrendingUp, title: "Cost Predictability", desc: "No labor charges or surprise repair bills. Flat annual fee covers all service visits for the entire year." },
            ].map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.1}>
                <div className="bg-white rounded-3xl border border-border-gray p-8 h-full hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-[20px] font-bold text-dark-text mb-3">{feature.title}</h3>
                  <p className="text-[14px] text-slate-text leading-relaxed">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-border-gray p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl font-bold text-dark-text mb-8 text-center">What's Included in the Enterprise Plan</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "Unlimited breakdown calls",
                "Quarterly preventive maintenance",
                "Free labor for all repairs",
                "Free software & driver updates",
                "Network printing setup support",
                "Dedicated Account Manager",
                "Monthly health reports",
                "Standby printer during major repairs",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-soft-gray border border-border-gray/50">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                  <span className="text-[14px] font-medium text-dark-text">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/contact">
                <Button className="bg-[#02367B] hover:bg-[#012350] text-white gap-2 rounded-xl h-12 px-8 font-bold shadow-md">
                  Discuss Your Fleet Requirements <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
