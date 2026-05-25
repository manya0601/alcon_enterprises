"use client";

import { useState } from "react";
import { Upload, Camera, CheckCircle2, Truck, Search, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn, SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper";

const steps = [
  { icon: Upload, title: "Upload Details", desc: "Share your printer info and photos" },
  { icon: Search, title: "Team Evaluation", desc: "Our experts assess the condition" },
  { icon: CheckCircle2, title: "Get Best Offer", desc: "Receive a competitive price offer" },
  { icon: Truck, title: "Free Pickup", desc: "We pick up from your location" },
];

export default function SellPage() {
  const [step, setStep] = useState(1);

  return (
    <>
      {/* Header */}
      <section className="bg-soft-gray border-b border-border-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <FadeIn>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 text-brand border border-brand-100 mb-4">Equipment Buyback</span>
            <h1 className="text-2xl md:text-3xl font-bold text-dark-text mb-2">Sell Your Old Printer</h1>
            <p className="text-muted-foreground max-w-lg">Get the best price for your used printers. Free evaluation and pickup.</p>
          </FadeIn>
        </div>
      </section>

      {/* Process */}
      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="How It Works" description="Sell your printer in 4 simple steps." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {steps.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-brand-50 flex items-center justify-center mb-4">
                    <s.icon className="w-6 h-6 text-brand" />
                  </div>
                  <div className="text-xs font-bold text-brand mb-1">Step {i + 1}</div>
                  <h3 className="text-sm font-semibold text-dark-text mb-1">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl border border-border-gray p-6 md:p-8">
              {/* Step indicators */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${s <= step ? "bg-brand text-white" : "bg-soft-gray text-muted-foreground"}`}>
                      {s}
                    </div>
                    {s < 3 && <div className={`flex-1 h-0.5 ${s < step ? "bg-brand" : "bg-border-gray"}`} />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-dark-text mb-4">Printer Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-dark-text mb-1.5 block">Brand</label>
                      <Input placeholder="e.g., HP, Canon, Brother" className="border-border-gray" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-dark-text mb-1.5 block">Model Number</label>
                      <Input placeholder="e.g., LaserJet Pro M1136" className="border-border-gray" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-dark-text mb-1.5 block">Condition</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["Excellent", "Good", "Fair", "Poor"].map((c) => (
                        <button key={c} className="px-3 py-2 text-sm rounded-lg border border-border-gray hover:border-brand hover:bg-brand-50 hover:text-brand transition-colors text-slate-text">
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-dark-text mb-1.5 block">Expected Price (₹)</label>
                    <Input type="number" placeholder="Enter your expected price" className="border-border-gray" />
                  </div>
                  <Button className="w-full bg-brand hover:bg-brand-dark text-white rounded-lg gap-2" onClick={() => setStep(2)}>
                    Next: Upload Photos <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-dark-text mb-4">Upload Photos</h3>
                  <div className="border-2 border-dashed border-border-gray rounded-xl p-10 text-center hover:border-brand/30 transition-colors cursor-pointer">
                    <Camera className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium text-dark-text mb-1">Drag & drop photos or click to browse</p>
                    <p className="text-xs text-muted-foreground">Upload up to 5 images (JPG, PNG)</p>
                  </div>
                  <Textarea placeholder="Additional notes about your printer..." className="border-border-gray" rows={3} />
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 rounded-lg" onClick={() => setStep(1)}>Back</Button>
                    <Button className="flex-1 bg-brand hover:bg-brand-dark text-white rounded-lg gap-2" onClick={() => setStep(3)}>
                      Next: Contact Info <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-dark-text mb-4">Your Contact Details</h3>
                  <Input placeholder="Full Name" className="border-border-gray" />
                  <Input type="email" placeholder="Email Address" className="border-border-gray" />
                  <Input type="tel" placeholder="Phone Number" className="border-border-gray" />
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 rounded-lg" onClick={() => setStep(2)}>Back</Button>
                    <Button className="flex-1 bg-brand hover:bg-brand-dark text-white rounded-lg gap-2">
                      Submit Request <CheckCircle2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3.5 h-3.5" /> Your information is secure and will never be shared.
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
