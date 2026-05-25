import Link from "next/link";
import { Droplets, ArrowRight, CheckCircle2, ShieldCheck, Clock, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, SectionWrapper } from "@/components/shared/section-wrapper";
import { SITE_CONFIG } from "@/lib/constants";

export default function TonerRefillingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-white border-b border-border-gray relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <FadeIn>
            <Link href="/services" className="text-[13px] font-bold text-accent-cyan hover:text-brand flex items-center gap-1 mb-6">
              ← Back to Services
            </Link>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-cyan/5 flex items-center justify-center mb-6 border border-accent-cyan/10">
              <Droplets className="w-8 h-8 text-accent-cyan" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-dark-text mb-6">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan">Toner Refilling</span>
            </h1>
            <p className="text-slate-text text-[16px] max-w-2xl mb-8 leading-relaxed">
              High-quality, eco-friendly laser and inkjet cartridge refilling. We use premium imported ink and powder to guarantee yield and print quality equivalent to original cartridges.
            </p>
            <div className="flex gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-[#02367B] hover:bg-[#012350] text-white gap-2 rounded-xl h-12 px-8 font-bold shadow-md">
                  Inquire Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Supported Brands */}
      <SectionWrapper bg="gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-dark-text mb-2">Supported Brands</h2>
            <p className="text-slate-text">We specialize in refilling cartridges for all major enterprise printers.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {["HP LaserJet & InkTank", "Canon imageCLASS & PIXMA", "Brother HL & DCP Series"].map((brand, i) => (
              <FadeIn key={brand} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border border-border-gray p-6 text-center hover:shadow-md transition-shadow">
                  <h3 className="text-[16px] font-bold text-dark-text">{brand}</h3>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Service Benefits */}
      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-dark-text mb-6">Why Choose Our Refilling Service?</h2>
              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: "100% Quality Guarantee", desc: "We replace worn-out drums and blades before refilling to ensure perfect prints." },
                  { icon: Recycle, title: "Eco-Friendly & Cost Effective", desc: "Reduce plastic waste and save up to 60% compared to buying new OEM cartridges." },
                  { icon: Clock, title: "Fast Turnaround", desc: "Quick refilling service to minimize your office downtime." },
                ].map((feature, i) => (
                  <FadeIn key={feature.title} delay={i * 0.1}>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-soft-gray flex items-center justify-center shrink-0">
                        <feature.icon className="w-6 h-6 text-accent-cyan" />
                      </div>
                      <div>
                        <h3 className="text-[16px] font-bold text-dark-text mb-1">{feature.title}</h3>
                        <p className="text-[14px] text-slate-text">{feature.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
            <div className="bg-soft-gray rounded-3xl p-8 border border-border-gray">
              <h3 className="text-[20px] font-bold text-dark-text mb-6">Our 4-Step Process</h3>
              <div className="space-y-4">
                {[
                  "Complete cartridge disassembly and cleaning",
                  "Inspection of internal parts (Drum, Blade, PCR)",
                  "Refilling with premium imported toner powder",
                  "Post-refill print testing and sealing",
                ].map((step, i) => (
                  <div key={i} className="flex gap-3 items-center bg-white p-4 rounded-xl border border-border-gray">
                    <span className="w-8 h-8 rounded-lg bg-accent-cyan/10 text-accent-cyan font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="text-[14px] font-medium text-slate-text">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
