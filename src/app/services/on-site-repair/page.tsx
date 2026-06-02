import Link from "next/link";
import { Wrench, ArrowRight, ShieldCheck, Clock, CheckCircle2, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, SectionWrapper } from "@/components/shared/section-wrapper";

export default function OnSiteRepairPage() {
  return (
    <>
      <section className="bg-white border-b border-border-gray relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-blue/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 md:pt-6 md:pb-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column: Hero Content & Brands */}
            <FadeIn>
              <Link href="/services" className="text-[13px] font-bold text-accent-blue hover:text-brand flex items-center gap-1 mb-6">
                ← Back to Services
              </Link>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 flex items-center justify-center mb-6 border border-accent-blue/10">
                <Wrench className="w-7 h-7 text-accent-blue" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-dark-text mb-6">
                On-Site <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent-blue">Printer Repair</span>
              </h1>
              <p className="text-slate-text text-[15px] md:text-[16px] max-w-xl mb-8 leading-relaxed">
                Fast, reliable, and professional printer repair services directly at your office. We minimize your downtime with our expert technicians and genuine spare parts.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-[#02367B] hover:bg-[#012350] text-white gap-2 rounded-xl h-12 px-8 font-bold shadow-md">
                  Request Technician <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              {/* Compact Brands Section */}
              <div className="mt-12 pt-8 border-t border-border-gray/60 max-w-xl">
                <p className="text-[12px] font-bold text-slate-text uppercase tracking-wider mb-4">Specialized Repair For</p>
                <div className="flex flex-wrap gap-3">
                  {["HP", "Canon", "Brother", "Xerox"].map((brand) => (
                    <span key={brand} className="px-4 py-2 bg-soft-gray rounded-lg border border-border-gray text-[14px] font-bold text-dark-text">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Right Column: Process */}
            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-[#0F172A] to-brand-dark rounded-3xl p-6 md:p-8 border border-white/10 text-white shadow-xl mt-8 md:mt-0">
                <h3 className="text-[20px] font-bold mb-6">Our Repair Process</h3>
                <div className="space-y-4">
                  {[
                    "Log a service request online or via call.",
                    "Technician arrives at your location.",
                    "Complete diagnosis and issue identification.",
                    "Approval of repair scope and parts required.",
                    "On-site repair and full functionality test.",
                  ].map((step, i) => (
                    <div key={i} className="flex gap-3 items-start p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <CheckCircle2 className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
                      <span className="text-[14px] font-medium text-white/90">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-soft-gray py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: "4-Hour Response Time", desc: "For priority corporate clients, our technicians reach your site within 4 hours in Ahmedabad." },
              { icon: UserCog, title: "Certified Technicians", desc: "Our team has decades of experience repairing complex multi-function industrial printers." },
              { icon: ShieldCheck, title: "Genuine Parts", desc: "We use only OEM or high-quality certified replacement parts to ensure longevity." },
            ].map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border border-border-gray p-6 hover:shadow-lg transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-light-sky flex items-center justify-center mb-5">
                    <feature.icon className="w-6 h-6 text-accent-blue" />
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
