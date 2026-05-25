"use client";

import { FadeIn } from "@/components/shared/section-wrapper";

const brands = [
  { name: "HP", text: "HP" },
  { name: "Canon", text: "Canon" },
  { name: "Epson", text: "Epson" },
  { name: "Brother", text: "Brother" },
  { name: "Xerox", text: "Xerox" },
  { name: "Ricoh", text: "Ricoh" },
];

export function FeaturedBrands() {
  return (
    <section className="bg-soft-gray py-10 border-b border-border-gray overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div className="shrink-0 text-center md:text-left">
            <h3 className="text-[13px] uppercase tracking-widest font-bold text-slate-text">Official Partner</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Genuine hardware & parts</p>
          </div>
          
          <div className="flex-1 flex flex-wrap justify-center md:justify-between items-center gap-6 w-full">
            {brands.map((brand, i) => (
              <FadeIn key={brand.name} delay={i * 0.05}>
                <div className="group cursor-pointer p-2">
                  {/* Using text placeholder for brands to represent logos */}
                  <span className="text-[22px] md:text-[28px] font-black tracking-tighter text-slate-text/30 group-hover:text-brand transition-colors duration-300">
                    {brand.text}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
