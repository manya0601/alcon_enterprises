"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader, FadeIn } from "@/components/shared/section-wrapper";
import { TRENDING_PRODUCTS } from "@/data/products";

export function FeaturedProducts() {
  const products = TRENDING_PRODUCTS.slice(0, 8);

  return (
    <section className="bg-white py-14 md:py-20 border-b border-border-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <SectionHeader
            badge="Trending Now"
            title="Bestselling Equipment"
            description="Top-rated printers and supplies trusted by enterprises."
            align="left"
            className="mb-0"
          />
          <Link href="/buy" className="hidden md:flex">
            <Button variant="outline" className="gap-2 rounded-xl border-border-gray text-slate-text hover:text-brand hover:border-brand/30 h-10 px-5 text-[13px] font-semibold bg-soft-gray hover:bg-light-sky/30">
              View Entire Catalog <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products.map((p, i) => {
            const discount = p.comparePrice ? Math.round(((p.comparePrice - p.price) / p.comparePrice) * 100) : 0;
            return (
              <FadeIn key={p.id} delay={i * 0.04}>
                <Link href={`/buy/${p.slug}`} className="bg-white rounded-2xl border border-border-gray hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-accent-blue/30 transition-all duration-300 group flex flex-col h-full relative overflow-hidden block">
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                    {p.isTrending && (
                      <div className="bg-orange-50 text-orange-600 border border-orange-200/50 text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                        <TrendingUp className="w-2.5 h-2.5" /> TRENDING
                      </div>
                    )}
                    {discount > 0 && (
                      <div className="bg-accent-cyan text-white text-[9px] font-bold px-2 py-0.5 rounded-md shadow-sm w-fit">
                        {discount}% OFF
                      </div>
                    )}
                  </div>

                  {/* Image area */}
                  <div className="relative bg-soft-gray/50 rounded-t-2xl p-6 flex items-center justify-center aspect-square group-hover:bg-light-sky/20 transition-colors">
                    <div className="w-full h-full rounded-2xl bg-white border border-border-gray flex items-center justify-center group-hover:scale-105 transition-transform duration-500 shadow-sm relative z-0 overflow-hidden">
                      <Image src={p.images[0]} alt={p.name} fill className="object-cover" unoptimized />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[10px] text-accent-blue font-bold uppercase tracking-wider bg-accent-blue/5 px-2 py-0.5 rounded text-center w-fit">{p.brand}</p>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-[11px] font-bold text-dark-text ml-0.5">{p.rating}</span>
                        <span className="text-[10px] text-muted-foreground">({p.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="text-[14px] md:text-[15px] font-bold text-dark-text leading-snug mb-2 group-hover:text-accent-blue transition-colors line-clamp-2">{p.name}</h3>
                    
                    <div className="flex items-center gap-1.5 mb-4">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                      <span className="text-[11px] text-slate-text font-medium">{p.category.name} • In Stock</span>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-end gap-2 mb-4">
                        <span className="text-[18px] md:text-[20px] font-extrabold text-brand tracking-tight">₹{p.price.toLocaleString()}</span>
                        {p.comparePrice && <span className="text-[12px] text-muted-foreground line-through font-medium mb-1">₹{p.comparePrice.toLocaleString()}</span>}
                      </div>

                      <Button className="w-full gap-2 bg-white text-brand border border-brand/20 hover:bg-brand hover:text-white hover:border-brand rounded-xl text-[13px] font-bold h-10 shadow-sm transition-all group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_4px_12px_rgba(2,54,123,0.2)]">
                        <ShoppingCart className="w-4 h-4" /> Add to Cart
                      </Button>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
        
        <div className="mt-6 md:hidden">
          <Link href="/buy" className="block w-full">
            <Button variant="outline" className="w-full gap-2 rounded-xl border-border-gray text-slate-text h-11 text-[13px] font-semibold bg-soft-gray">
              View Entire Catalog <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
