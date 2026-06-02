import Link from "next/link";
import { Droplets, ArrowRight, CheckCircle2, ShieldCheck, Clock, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/section-wrapper";
import { SITE_CONFIG } from "@/lib/constants";

export default function TonerRefillingPage() {
  return (
    <>
      <section className="bg-white border-b border-border-gray relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 md:pt-6 md:pb-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column: Hero Content */}
            <FadeIn>
              <Link href="/services" className="text-[13px] font-bold text-accent-cyan hover:text-brand flex items-center gap-1 mb-6">
                ← Back to Services
              </Link>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-cyan/5 flex items-center justify-center mb-6 border border-accent-cyan/10">
                <Droplets className="w-7 h-7 text-accent-cyan" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-dark-text mb-6">
                Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan">Toner Refilling</span>
              </h1>
              <p className="text-slate-text text-[15px] md:text-[16px] max-w-xl mb-8 leading-relaxed">
                High-quality, eco-friendly laser and inkjet cartridge refilling. We use premium imported ink and powder to guarantee yield and print quality equivalent to original cartridges.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-[#02367B] hover:bg-[#012350] text-white gap-2 rounded-xl h-12 px-8 font-bold shadow-md">
                  Inquire Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              {/* Compact Brands Section */}
              <div className="mt-12 pt-8 border-t border-border-gray/60 max-w-xl">
                <p className="text-[12px] font-bold text-slate-text uppercase tracking-wider mb-4">Supported Brands</p>
                <div className="flex flex-wrap gap-3">
                  {["HP LaserJet & InkTank", "Canon imageCLASS", "Brother HL Series"].map((brand) => (
                    <span key={brand} className="px-4 py-2 bg-soft-gray rounded-lg border border-border-gray text-[14px] font-bold text-dark-text">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Right Column: Process */}
            <FadeIn delay={0.2}>
              <div className="bg-soft-gray rounded-3xl p-6 md:p-8 border border-border-gray shadow-sm mt-8 md:mt-0">
                <h3 className="text-[20px] font-bold text-dark-text mb-6">Our 4-Step Process</h3>
                <div className="space-y-4">
                  {[
                    "Complete cartridge disassembly and cleaning",
                    "Inspection of internal parts (Drum, Blade, PCR)",
                    "Refilling with premium imported toner powder",
                    "Post-refill print testing and sealing",
                  ].map((step, i) => (
                    <div key={i} className="flex gap-3 items-center bg-white p-3.5 rounded-xl border border-border-gray shadow-sm">
                      <span className="w-8 h-8 rounded-lg bg-accent-cyan/10 text-accent-cyan font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="text-[14px] font-medium text-slate-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "100% Quality Guarantee", desc: "We replace worn-out drums and blades before refilling to ensure perfect prints." },
              { icon: Recycle, title: "Eco-Friendly & Cost Effective", desc: "Reduce plastic waste and save up to 60% compared to buying new OEM cartridges." },
              { icon: Clock, title: "Fast Turnaround", desc: "Quick refilling service to minimize your office downtime." },
            ].map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.1}>
                <div className="bg-soft-gray rounded-2xl border border-border-gray p-6 hover:shadow-lg transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-5 border border-border-gray">
                    <feature.icon className="w-6 h-6 text-accent-cyan" />
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
