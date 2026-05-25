"use client";

import Link from "next/link";
import { Wrench, Droplets, Building2, Package, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/shared/section-wrapper";
import { SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "repair",
    icon: Wrench,
    title: "On-Site Printer Repair",
    desc: "Expert technical support and repair for all major enterprise printer brands at your location.",
    features: ["4-Hour Response Time", "Certified Technicians", "Genuine Spare Parts"],
    color: "from-accent-blue/20 to-accent-blue/5",
    iconColor: "text-accent-blue",
    href: "/services/on-site-repair",
  },
  {
    id: "toner",
    icon: Droplets,
    title: "Toner & Ink Refilling",
    desc: "High-quality, tested refilling services for laser and inkjet cartridges with warranty.",
    features: ["Premium Quality Ink/Toner", "Yield Guarantee", "Eco-Friendly Process"],
    color: "from-accent-cyan/20 to-accent-cyan/5",
    iconColor: "text-accent-cyan",
    href: "/services/toner-refilling",
  },
  {
    id: "amc",
    icon: ShieldCheck,
    title: "AMC Plans",
    desc: "Comprehensive Annual Maintenance Contracts to keep your printer fleet running smoothly.",
    features: ["Preventive Maintenance", "Priority Support", "Zero Labor Charges"],
    color: "from-success/20 to-success/5",
    iconColor: "text-success",
    href: "/services/amc-plans",
  },
  {
    id: "subscription",
    icon: Package,
    title: "Cartridge Subscription",
    desc: "Automated cartridge delivery for your office so you never run out of supplies.",
    features: ["Automatic Delivery", "Up to 30% Savings", "Bulk Office Support"],
    color: "from-orange-500/20 to-orange-500/5",
    iconColor: "text-orange-500",
    href: "/services/cartridge-subscription",
  },
  {
    id: "rental",
    icon: Building2,
    title: "Printer Rentals",
    desc: "Enterprise printer rentals on daily, monthly, or corporate fleet contracts.",
    features: ["Zero Maintenance Cost", "Latest Models", "Free Installation"],
    color: "from-brand/20 to-brand/5",
    iconColor: "text-brand",
    href: "/services/printer-rentals",
  },
];

export default function ServicesHubPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-white border-b border-border-gray relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 text-center">
          <FadeIn>
            <span className="inline-block px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wider uppercase bg-light-sky text-accent-blue border border-accent-blue/20 mb-6">
              Our Expertise
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-dark-text mb-6">
              Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent-blue">Printer Services</span>
            </h1>
            <p className="text-slate-text text-[15px] md:text-[16px] max-w-2xl mx-auto mb-10 leading-relaxed">
              From emergency on-site repairs to complete fleet management, Alcon Enterprise provides reliable, professional support for your business printing infrastructure.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-soft-gray py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <FadeIn key={s.id} delay={i * 0.08}>
                <div className="bg-white rounded-3xl border border-border-gray p-8 h-full flex flex-col hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <s.icon className={`w-8 h-8 ${s.iconColor}`} />
                  </div>
                  
                  <h3 className="text-[20px] font-bold text-dark-text mb-3 group-hover:text-brand transition-colors">{s.title}</h3>
                  <p className="text-[14px] text-slate-text mb-6 flex-1 leading-relaxed">{s.desc}</p>
                  
                  <ul className="space-y-2 mb-8">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[13px] font-medium text-slate-text">
                        <CheckCircle2 className={`w-4 h-4 ${s.iconColor}`} /> {f}
                      </li>
                    ))}
                  </ul>

                  <Link href={s.href} className="mt-auto">
                    <Button variant="outline" className="w-full h-12 rounded-xl text-[14px] font-bold border-border-gray hover:border-brand hover:bg-brand hover:text-white transition-all group-hover:bg-brand group-hover:text-white group-hover:border-brand">
                      View Service Details <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      
      {/* Universal CTA */}
      <section className="bg-brand text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-white/70 mb-8 text-[15px]">Our technical team is ready to support your enterprise.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${SITE_CONFIG.contact.phones[0].replace(/\s/g, "")}`}>
              <Button size="lg" className="bg-white text-brand hover:bg-white/90 gap-2 rounded-xl font-bold">
                Call {SITE_CONFIG.contact.phones[0]}
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2 rounded-xl font-bold">
                Request Service
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
