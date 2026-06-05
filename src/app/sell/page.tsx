"use client";

import { useState, useRef } from "react";
import { Upload, Camera, CheckCircle2, Truck, Search, ArrowRight, Shield, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/shared/section-wrapper";
import { createClient } from "@/utils/supabase/client";

const steps = [
  { icon: Upload, title: "Upload Details", desc: "Share your printer info and photos" },
  { icon: Search, title: "Team Evaluation", desc: "Our experts assess the condition" },
  { icon: CheckCircle2, title: "Get Best Offer", desc: "Receive a competitive price offer" },
  { icon: Truck, title: "Free Pickup", desc: "We pick up from your location" },
];

export default function SellPage() {
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    brand: "",
    model_number: "",
    condition: "",
    expected_price: "",
    notes: "",
    full_name: "",
    email: "",
    phone: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...newFiles].slice(0, 5)); // max 5 images
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // 1. Upload Images to Supabase Storage
      const uploadedUrls: string[] = [];
      for (const file of images) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('sell-images')
          .upload(filePath, file);

        if (uploadError) {
          throw new Error("Failed to upload image: " + uploadError.message);
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('sell-images')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      // 2. Submit to API
      const payload = {
        ...formData,
        image_urls: uploadedUrls,
      };

      const res = await fetch("/api/sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit request");
      }

      setSuccess(true);
      setStep(4); // Success step
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success && step === 4) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-soft-gray px-4">
        <div className="bg-white p-10 rounded-3xl text-center max-w-lg shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-dark-text mb-3">Request Submitted!</h2>
          <p className="text-slate-text mb-8">
            Thank you for submitting your device details. Our team will review the information and get back to you with an offer via email within 24 hours.
          </p>
          <Button onClick={() => window.location.href = "/"} className="bg-brand text-white rounded-xl h-12 px-8 font-bold">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white relative overflow-hidden py-12 md:py-16">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Info & Process */}
          <FadeIn>
            <span className="inline-block px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider bg-brand/10 text-brand border border-brand/20 mb-6">Equipment Buyback</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-dark-text mb-6">
              Sell Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent-blue">Old Printer</span>
            </h1>
            <p className="text-slate-text text-[15px] md:text-[16px] max-w-xl mb-12 leading-relaxed">
              Get the best price for your used enterprise printers. We offer free evaluation, competitive pricing, and complimentary pickup directly from your office.
            </p>

            <div className="border-t border-border-gray/60 pt-8 max-w-xl">
              <h2 className="text-[20px] font-bold text-dark-text mb-6">How It Works</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {steps.map((s, i) => (
                  <div key={s.title} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-soft-gray flex items-center justify-center shrink-0 border border-border-gray/50">
                      <s.icon className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-brand uppercase tracking-wider mb-0.5">Step {i + 1}</div>
                      <h3 className="text-[15px] font-bold text-dark-text mb-1">{s.title}</h3>
                      <p className="text-[13px] text-slate-text leading-snug">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right Column: Form */}
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-3xl border border-border-gray p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] mt-8 md:mt-0">
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                  {error}
                </div>
              )}

              {/* Step indicators */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold transition-colors ${s <= step ? "bg-brand text-white" : "bg-soft-gray text-muted-foreground"}`}>
                      {s}
                    </div>
                    {s < 3 && <div className={`flex-1 h-0.5 transition-colors ${s < step ? "bg-brand" : "bg-border-gray"}`} />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="text-[18px] font-bold text-dark-text mb-2">Printer Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[13px] font-bold text-dark-text mb-1.5 block">Brand</label>
                      <Input name="brand" value={formData.brand} onChange={handleInputChange} placeholder="e.g., HP, Canon" className="border-border-gray h-11 rounded-xl" />
                    </div>
                    <div>
                      <label className="text-[13px] font-bold text-dark-text mb-1.5 block">Model Number</label>
                      <Input name="model_number" value={formData.model_number} onChange={handleInputChange} placeholder="e.g., LaserJet Pro M1136" className="border-border-gray h-11 rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[13px] font-bold text-dark-text mb-1.5 block">Condition</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["Excellent", "Good", "Fair", "Poor"].map((c) => (
                        <button 
                          key={c} 
                          onClick={() => setFormData(prev => ({ ...prev, condition: c }))}
                          className={`px-2 py-2 text-[13px] font-medium rounded-xl border transition-colors ${formData.condition === c ? "border-brand bg-brand/5 text-brand" : "border-border-gray text-slate-text hover:border-brand hover:bg-brand/5"}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[13px] font-bold text-dark-text mb-1.5 block">Expected Price (₹)</label>
                    <Input name="expected_price" value={formData.expected_price} onChange={handleInputChange} type="number" placeholder="Enter your expected price" className="border-border-gray h-11 rounded-xl" />
                  </div>
                  <Button 
                    className="w-full bg-[#02367B] hover:bg-[#012350] text-white rounded-xl h-12 font-bold gap-2 mt-2" 
                    onClick={() => {
                      if (!formData.brand || !formData.model_number || !formData.condition || !formData.expected_price) {
                        setError("Please fill out all printer details before continuing.");
                        return;
                      }
                      setError(null);
                      setStep(2);
                    }}
                  >
                    Next: Upload Photos <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="text-[18px] font-bold text-dark-text mb-2">Upload Photos</h3>
                  
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                  />

                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border-gray rounded-2xl p-10 text-center hover:border-brand/50 hover:bg-brand/5 transition-colors cursor-pointer bg-soft-gray/50"
                  >
                    <Camera className="w-10 h-10 text-brand/50 mx-auto mb-3" />
                    <p className="text-[14px] font-bold text-dark-text mb-1">Drag & drop photos or click to browse</p>
                    <p className="text-[12px] text-slate-text">Upload up to 5 images (JPG, PNG)</p>
                  </div>

                  {images.length > 0 && (
                    <div className="flex gap-3 overflow-x-auto py-2">
                      {images.map((img, idx) => (
                        <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-border-gray">
                          <img src={URL.createObjectURL(img)} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-red-500 hover:bg-white transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <Textarea 
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Additional notes about your printer condition..." 
                    className="border-border-gray rounded-xl resize-none mt-4" 
                    rows={3} 
                  />

                  <div className="flex gap-3 mt-2">
                    <Button variant="outline" className="flex-1 rounded-xl h-12 font-bold border-border-gray hover:bg-soft-gray" onClick={() => setStep(1)}>Back</Button>
                    <Button className="flex-[2] bg-[#02367B] hover:bg-[#012350] text-white rounded-xl h-12 font-bold gap-2" onClick={() => setStep(3)}>
                      Next: Contact Info <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="text-[18px] font-bold text-dark-text mb-2">Your Contact Details</h3>
                  <div>
                    <label className="text-[13px] font-bold text-dark-text mb-1.5 block">Full Name</label>
                    <Input name="full_name" value={formData.full_name} onChange={handleInputChange} placeholder="Enter your name" className="border-border-gray h-11 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-[13px] font-bold text-dark-text mb-1.5 block">Email Address</label>
                    <Input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Enter your email" className="border-border-gray h-11 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-[13px] font-bold text-dark-text mb-1.5 block">Phone Number</label>
                    <Input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="Enter your phone number" className="border-border-gray h-11 rounded-xl" />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <Button variant="outline" className="flex-1 rounded-xl h-12 font-bold border-border-gray hover:bg-soft-gray" onClick={() => setStep(2)} disabled={isSubmitting}>Back</Button>
                    <Button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-[2] bg-brand hover:bg-brand-dark text-white rounded-xl h-12 font-bold gap-2 shadow-md"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                      ) : (
                        <>Submit Request <CheckCircle2 className="w-4 h-4" /></>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-border-gray flex items-center justify-center gap-2 text-[12px] text-slate-text font-medium">
                <Shield className="w-3.5 h-3.5 text-success" /> Your information is secure and will never be shared.
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
