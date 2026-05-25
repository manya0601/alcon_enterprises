"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE_CONFIG } from "@/lib/constants";
import { FadeIn, SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper";

const contactCards = [
  { icon: Phone, title: "Call Us", lines: SITE_CONFIG.contact.phones, action: `tel:${SITE_CONFIG.contact.phones[0].replace(/\s/g, "")}` },
  { icon: Mail, title: "Email Us", lines: [SITE_CONFIG.contact.email], action: `mailto:${SITE_CONFIG.contact.email}` },
  { icon: MapPin, title: "Visit Us", lines: [`${SITE_CONFIG.location.address},`, `${SITE_CONFIG.location.city}, ${SITE_CONFIG.location.state}`], action: "#map" },
  { icon: Clock, title: "Business Hours", lines: ["Mon–Sat: 9:00 AM – 7:00 PM", "Sun: Closed"], action: "" },
];

const faqs = [
  { q: "What areas do you serve?", a: "We primarily serve Ahmedabad and Gujarat, with delivery across India for products and cartridge subscriptions." },
  { q: "Do you offer bulk pricing?", a: "Yes, we offer volume discounts for enterprise orders. Contact us for a custom quote." },
  { q: "How fast is your service response?", a: "We aim to respond within 2 hours during business hours. Emergency on-site repair within 4 hours." },
  { q: "Do you provide AMC contracts?", a: "Yes, we offer Annual Maintenance Contracts with customizable terms. Contact us for details." },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Header */}
      <section className="bg-soft-gray border-b border-border-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <FadeIn>
            <h1 className="text-2xl md:text-3xl font-bold text-dark-text mb-2">Contact Us</h1>
            <p className="text-muted-foreground max-w-xl">Get in touch with our enterprise team. We respond within 2 hours during business hours.</p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Cards */}
      <SectionWrapper className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {contactCards.map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.06}>
                <div className="bg-white rounded-xl border border-border-gray p-5 h-full">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center mb-3">
                    <c.icon className="w-5 h-5 text-brand" />
                  </div>
                  <h3 className="text-sm font-semibold text-dark-text mb-2">{c.title}</h3>
                  {c.lines.map((line) => (
                    <p key={line} className="text-sm text-muted-foreground">{line}</p>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Form + Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            <FadeIn>
              <div className="bg-white rounded-xl border border-border-gray p-6 md:p-8">
                <h2 className="text-xl font-bold text-dark-text mb-1">Send us a message</h2>
                <p className="text-sm text-muted-foreground mb-6">We&apos;ll get back to you within 2 hours.</p>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-dark-text mb-1.5 block">Name</label>
                      <Input placeholder="Your name" className="border-border-gray" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-text mb-1.5 block">Phone</label>
                      <Input placeholder="Phone number" className="border-border-gray" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-dark-text mb-1.5 block">Email</label>
                    <Input type="email" placeholder="you@company.com" className="border-border-gray" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-dark-text mb-1.5 block">Company (Optional)</label>
                    <Input placeholder="Your company name" className="border-border-gray" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-dark-text mb-1.5 block">Message</label>
                    <Textarea placeholder="How can we help you?" className="border-border-gray" rows={4} />
                  </div>
                  <Button className="w-full bg-brand hover:bg-brand-dark text-white rounded-lg gap-2">
                    <Send className="w-4 h-4" /> Send Message
                  </Button>
                </form>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5">
                {/* Map */}
                <div id="map" className="bg-soft-gray rounded-xl border border-border-gray overflow-hidden h-72">
                  <iframe
                    src={SITE_CONFIG.location.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Alcon Enterprise Location"
                  />
                </div>

                {/* WhatsApp CTA */}
                <a href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="bg-[#25D366] rounded-xl p-5 text-white flex items-center gap-4 hover:bg-[#20BD5A] transition-colors">
                    <MessageCircle className="w-8 h-8" />
                    <div>
                      <p className="font-semibold">Chat on WhatsApp</p>
                      <p className="text-sm text-white/80">Quick response guaranteed</p>
                    </div>
                  </div>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper bg="gray">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Frequently Asked Questions" />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="bg-white rounded-xl border border-border-gray overflow-hidden">
                  <button className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-dark-text text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {faq.q}
                    <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && <div className="px-5 pb-4 text-sm text-muted-foreground">{faq.a}</div>}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
