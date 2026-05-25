"use client";

import { Star, Quote } from "lucide-react";
import { SectionHeader, FadeIn } from "@/components/shared/section-wrapper";
import { TESTIMONIALS } from "@/data/site-data";

export function Testimonials() {
  return (
    <section className="bg-soft-gray py-16 md:py-24 border-b border-border-gray relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader 
          badge="Testimonials" 
          title="Loved by Enterprise Clients" 
          description="Real feedback from businesses who trust Alcon Enterprise for their printing infrastructure." 
        />
        
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-10">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <FadeIn key={t.id} delay={i * 0.08}>
              <div className="bg-white rounded-3xl border border-border-gray p-6 md:p-8 h-full flex flex-col hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                <Quote className="w-8 h-8 text-accent-blue/20 mb-4" />
                <p className="text-[14px] text-slate-text leading-relaxed flex-1 mb-6 font-medium">&ldquo;{t.content}&rdquo;</p>
                
                <div className="flex items-center justify-between pt-5 border-t border-soft-gray mt-auto">
                  <div>
                    <p className="text-[14px] font-bold text-dark-text mb-0.5">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground font-medium">{t.role}, <span className="text-brand">{t.company}</span></p>
                  </div>
                  <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-1 rounded-md">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className={`w-3 h-3 ${si < t.rating ? "text-amber-500 fill-amber-500" : "text-amber-200"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
