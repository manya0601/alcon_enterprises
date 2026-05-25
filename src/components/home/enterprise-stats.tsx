"use client";

import { AnimatedCounter } from "@/components/shared/animated-counter";
import { FadeIn } from "@/components/shared/section-wrapper";

const stats = [
  { value: 27, suffix: "+", label: "Years of Industry Experience" },
  { value: 500, suffix: "+", label: "Enterprise Clients Served" },
  { value: 10000, suffix: "+", label: "Products Delivered" },
  { value: 50, suffix: "+", label: "Cities Across India" },
];

export function EnterpriseStats() {
  return (
    <section className="bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.06}>
              <div className="text-center">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-2xl md:text-3xl font-bold text-brand"
                />
                <p className="text-[13px] text-muted-foreground mt-1.5">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
