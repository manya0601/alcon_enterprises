"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { FadeIn } from "@/components/shared/section-wrapper";

export function ContactCTA() {
  return (
    <section className="bg-white border-t border-border-gray py-16 md:py-24 relative overflow-hidden">
      {/* Colorful background elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-cyan/10 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-blue/10 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wider uppercase bg-light-sky text-accent-blue border border-accent-blue/20 mb-6">
            Get In Touch
          </div>
          
          <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight text-dark-text leading-tight mb-4">
            Ready to Transform Your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent-blue">Enterprise Printing?</span>
          </h2>
          
          <p className="text-[15px] md:text-[16px] text-slate-text mb-8 max-w-xl mx-auto leading-relaxed">
            Get a custom quote or speak with our enterprise team. We respond within 2 hours during business hours.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link href="/contact">
              <Button className="bg-brand hover:bg-brand-dark text-white gap-2 rounded-xl px-8 h-12 text-[14px] font-semibold shadow-[0_4px_14px_rgba(2,54,123,0.2)] hover:shadow-[0_6px_20px_rgba(2,54,123,0.3)] transition-all">
                Get Free Quote <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href={`tel:${SITE_CONFIG.contact.phones[0].replace(/\s/g, "")}`}>
              <Button variant="outline" className="gap-2 rounded-xl border-border-gray text-dark-text hover:text-accent-blue hover:border-accent-blue hover:bg-light-sky/30 px-8 h-12 text-[14px] font-semibold transition-all">
                <Phone className="w-4 h-4" /> Call Now
              </Button>
            </a>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-[14px] font-medium text-slate-text bg-white/50 backdrop-blur-sm border border-border-gray rounded-2xl w-fit mx-auto px-6 py-3 shadow-sm">
            <a href={`tel:${SITE_CONFIG.contact.phones[0].replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-accent-blue transition-colors">
              <Phone className="w-4 h-4 text-brand" /> {SITE_CONFIG.contact.phones[0]}
            </a>
            <div className="w-[1px] h-4 bg-border-gray hidden sm:block" />
            <a href={`mailto:${SITE_CONFIG.contact.email}`} className="flex items-center gap-2 hover:text-accent-blue transition-colors">
              <Mail className="w-4 h-4 text-brand" /> {SITE_CONFIG.contact.email}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
