"use client";

import { Marquee } from "@/components/shared/marquee";
import { CLIENT_LOGOS } from "@/lib/constants";

function LogoItem({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center px-6 py-2.5 rounded-lg border border-[#E2E8F0] bg-white min-w-[150px]">
      <span className="text-[13px] font-semibold text-[#334155]/40 whitespace-nowrap">{name}</span>
    </div>
  );
}

export function ClientLogos() {
  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Trusted by Leading Enterprises</p>
      </div>
      <div className="space-y-2.5">
        <Marquee speed={45}>
          {CLIENT_LOGOS.map((l) => <LogoItem key={l.name} name={l.name} />)}
        </Marquee>
        <Marquee speed={45} reverse>
          {CLIENT_LOGOS.map((l) => <LogoItem key={`r-${l.name}`} name={l.name} />)}
        </Marquee>
      </div>
    </section>
  );
}
