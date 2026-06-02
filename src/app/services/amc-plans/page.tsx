import Link from "next/link";
import { ShieldCheck, ArrowRight, CheckCircle2, TrendingUp, HeadphonesIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/section-wrapper";

export default function AmcPlansPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#0F172A] to-brand-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-success/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 md:pt-6 md:pb-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <Link href="/services" className="text-[13px] font-bold text-success hover:text-white flex items-center gap-1 mb-6 transition-colors">
                ← Back to Services
              </Link>
              <div className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wider uppercase bg-white/10 text-success border border-white/20 mb-6 backdrop-blur-sm">
                Enterprise B2B Solution
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
                Annual Maintenance <span className="text-success">Contracts (AMC)</span>
              </h1>
              <p className="text-white/70 text-[15px] md:text-[16px] max-w-xl mb-8 leading-relaxed">
                Secure your business operations with our comprehensive printer fleet management. Preventive servicing, priority support, and zero unexpected repair costs.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-success hover:bg-green-600 text-white gap-2 rounded-xl h-12 px-8 font-bold shadow-lg shadow-success/20">
                  Request Custom Quote <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="bg-white/5 rounded-3xl border border-white/10 p-6 md:p-8 backdrop-blur-md shadow-xl mt-8 md:mt-0">
                <h3 className="text-[20px] font-bold text-white mb-6">Enterprise Plan Inclusions</h3>
                <div className="space-y-3">
                  {[
                    "Unlimited breakdown calls",
                    "Quarterly preventive maintenance",
                    "Free labor for all repairs",
                    "Free software & driver updates",
                    "Dedicated Account Manager",
                    "Standby printer during major repairs",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                      <span className="text-[14px] font-medium text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-soft-gray py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Settings, title: "Preventive Servicing", desc: "Regular scheduled maintenance to clean, tune, and replace worn parts before they cause a breakdown." },
              { icon: HeadphonesIcon, title: "Priority Support", desc: "Jump the queue. AMC clients get top-priority routing with a guaranteed 4-hour on-site response time." },
              { icon: TrendingUp, title: "Cost Predictability", desc: "No labor charges or surprise repair bills. Flat annual fee covers all service visits for the entire year." },
            ].map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border border-border-gray p-6 hover:shadow-lg transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-5">
                    <feature.icon className="w-6 h-6 text-success" />
                  </div>
                  <h3 className="text-[16px] font-bold text-dark-text mb-2">{feature.title}</h3>
                  <p className="text-[14px] text-slate-text leading-relaxed">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
