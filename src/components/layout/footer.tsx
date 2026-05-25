"use client";

import Link from "next/link";
import { Printer, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const links = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  products: [
    { label: "Buy Printers", href: "/buy" },
    { label: "Rent Printers", href: "/rent" },
    { label: "Sell Old Printers", href: "/sell" },
    { label: "Subscriptions", href: "/subscriptions" },
  ],
  services: [
    { label: "Toner Refilling", href: "/services" },
    { label: "On-Site Repair", href: "/services" },
    { label: "AMC Plans", href: "/services" },
    { label: "Corporate Rentals", href: "/rent" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
            <div>
              <h3 className="text-[15px] font-bold mb-0.5">Stay updated with Alcon Enterprise</h3>
              <p className="text-[13px] text-white/50">Latest offers, product updates, and industry insights.</p>
            </div>
            <form className="flex gap-2 w-full lg:w-auto" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="Enter your email" className="w-full lg:w-56 bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/30 focus:border-white/20 h-9 text-[13px]" />
              <Button className="bg-white text-[#0F172A] hover:bg-white/90 shrink-0 gap-1.5 h-9 text-[13px] px-4">
                Subscribe <ArrowRight className="w-3 h-3" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
                <Printer className="w-3.5 h-3.5 text-brand" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[14px] font-bold">Alcon</span>
                <span className="text-[8px] uppercase tracking-[0.2em] text-white/40">Enterprise</span>
              </div>
            </Link>
            <p className="text-[12px] text-white/50 leading-relaxed mb-4 max-w-xs">
              India&apos;s trusted printer &amp; enterprise hardware solutions since 1999.
            </p>
            <div className="flex flex-col gap-2 text-[12px] text-white/50">
              <a href={`tel:${SITE_CONFIG.contact.phones[0].replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                <Phone className="w-3 h-3" /> {SITE_CONFIG.contact.phones[0]}
              </a>
              <a href={`mailto:${SITE_CONFIG.contact.email}`} className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                <Mail className="w-3 h-3" /> {SITE_CONFIG.contact.email}
              </a>
              <span className="flex items-start gap-1.5">
                <MapPin className="w-3 h-3 shrink-0 mt-0.5" />
                {SITE_CONFIG.location.address}, {SITE_CONFIG.location.city}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider mb-3 text-white/70">Company</h4>
            <ul className="space-y-2">
              {links.company.map((l) => (
                <li key={l.label}><Link href={l.href} className="text-[13px] text-white/50 hover:text-white/80 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider mb-3 text-white/70">Products</h4>
            <ul className="space-y-2">
              {links.products.map((l) => (
                <li key={l.label}><Link href={l.href} className="text-[13px] text-white/50 hover:text-white/80 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider mb-3 text-white/70">Services</h4>
            <ul className="space-y-2">
              {links.services.map((l) => (
                <li key={l.label}><Link href={l.href} className="text-[13px] text-white/50 hover:text-white/80 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/30">
          <span>© {new Date().getFullYear()} Alcon Enterprise. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white/50 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white/50 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
