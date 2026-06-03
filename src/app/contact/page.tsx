"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ChevronDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE_CONFIG } from "@/lib/constants";
import { FadeIn, SectionHeader } from "@/components/shared/section-wrapper";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <>
      <section className="bg-white relative overflow-hidden py-12 md:py-16">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Info & Cards */}
            <FadeIn>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-dark-text mb-6">
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent-blue">Touch</span>
              </h1>
              <p className="text-slate-text text-[15px] md:text-[16px] max-w-xl mb-10 leading-relaxed">
                Connect with our enterprise team for custom quotes, technical support, or bulk order inquiries. We respond within 2 hours during business hours.
              </p>

              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {contactCards.map((c) => (
                  <div key={c.title} className="bg-soft-gray rounded-2xl border border-border-gray/50 p-5 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 border border-border-gray">
                      <c.icon className="w-5 h-5 text-brand" />
                    </div>
                    <h3 className="text-[14px] font-bold text-dark-text mb-2">{c.title}</h3>
                    {c.lines.map((line) => (
                      <p key={line} className="text-[13px] text-slate-text">{line}</p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Map & WhatsApp */}
              <div className="grid sm:grid-cols-2 gap-4">
                <a href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="bg-[#25D366] rounded-2xl p-5 text-white h-full flex flex-col justify-center hover:bg-[#20BD5A] transition-colors shadow-sm">
                    <MessageCircle className="w-7 h-7 mb-3" />
                    <p className="font-bold text-[15px] mb-1">Chat on WhatsApp</p>
                    <p className="text-[12px] text-white/80">Quick response guaranteed</p>
                  </div>
                </a>
                <div id="map" className="bg-soft-gray rounded-2xl border border-border-gray overflow-hidden h-32 sm:h-auto">
                  <iframe
                    src={SITE_CONFIG.location.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "100%" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Alcon Enterprise Location"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Right Column: Form */}
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-3xl border border-border-gray p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] mt-8 md:mt-0">
                <h2 className="text-[20px] font-bold text-dark-text mb-2">Send us a message</h2>
                <p className="text-[14px] text-slate-text mb-8">Fill out the form below and we'll get back to you shortly.</p>
                
                <form className="space-y-5" onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  const formData = new FormData(e.currentTarget);
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        fullName: formData.get("fullName"),
                        phone: formData.get("phone"),
                        email: formData.get("email"),
                        company: formData.get("company"),
                        message: formData.get("message"),
                      }),
                    });
                    if (res.ok) {
                      setSuccess(true);
                      (e.target as HTMLFormElement).reset();
                      setTimeout(() => setSuccess(false), 5000);
                    } else {
                      alert("Failed to send message. Please try again.");
                    }
                  } catch (err) {
                    alert("Network error. Please try again.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}>
                  {success && (
                    <div className="bg-success/10 text-success border border-success/20 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Message sent successfully! We will contact you soon.
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[13px] font-bold text-dark-text mb-1.5 block">Full Name</label>
                      <Input name="fullName" required placeholder="Your name" className="border-border-gray h-11 rounded-xl" />
                    </div>
                    <div>
                      <label className="text-[13px] font-bold text-dark-text mb-1.5 block">Phone Number</label>
                      <Input name="phone" required placeholder="Phone number" className="border-border-gray h-11 rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[13px] font-bold text-dark-text mb-1.5 block">Email Address</label>
                    <Input name="email" type="email" required placeholder="you@company.com" className="border-border-gray h-11 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-[13px] font-bold text-dark-text mb-1.5 block">Company Name (Optional)</label>
                    <Input name="company" placeholder="Your company name" className="border-border-gray h-11 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-[13px] font-bold text-dark-text mb-1.5 block">Message</label>
                    <Textarea name="message" required placeholder="How can we help you?" className="border-border-gray rounded-xl resize-none" rows={5} />
                  </div>
                  <Button disabled={isSubmitting} type="submit" className="w-full bg-[#02367B] hover:bg-[#012350] text-white rounded-xl h-12 font-bold gap-2 mt-2 disabled:opacity-70 transition-all">
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">Sending...</span>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </Button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-soft-gray py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Frequently Asked Questions" />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="bg-white rounded-2xl border border-border-gray overflow-hidden hover:shadow-sm transition-shadow">
                  <button className="w-full flex items-center justify-between px-6 py-5 text-[15px] font-bold text-dark-text text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {faq.q}
                    <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && <div className="px-6 pb-5 text-[14px] text-slate-text leading-relaxed">{faq.a}</div>}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
