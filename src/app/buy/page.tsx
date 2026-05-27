"use client";

import Link from "next/link";
import { Search, SlidersHorizontal, Star, ShoppingCart, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TRENDING_PRODUCTS, PRODUCT_CATEGORIES } from "@/data/products";
import { FadeIn } from "@/components/shared/section-wrapper";
import { useState } from "react";

export default function BuyPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = TRENDING_PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "all" || p.category.slug === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Page Header */}
      <section className="bg-white border-b border-border-gray relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-text mb-3 tracking-tight">Enterprise Products</h1>
          <p className="text-[15px] text-slate-text max-w-xl">Browse our extensive catalog of genuine printers, cartridges, parts, and enterprise hardware.</p>
        </div>
      </section>

      <div className="bg-soft-gray min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="bg-white rounded-2xl border border-border-gray p-6 sticky top-24 shadow-sm">
                <h3 className="text-[15px] font-bold text-dark-text mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-accent-blue" /> Categories
                </h3>
                <div className="space-y-1">
                  <button onClick={() => setActiveCategory("all")} className={`w-full text-left px-3 py-2.5 text-[14px] rounded-xl transition-colors flex items-center justify-between ${activeCategory === "all" ? "bg-light-sky text-brand font-bold" : "text-slate-text hover:bg-soft-gray font-medium"}`}>
                    All Products
                    <span className="text-[11px] bg-white px-2 py-0.5 rounded-full border border-border-gray text-slate-text">{TRENDING_PRODUCTS.length}</span>
                  </button>
                  {PRODUCT_CATEGORIES.map((c) => (
                    <button key={c.slug} onClick={() => setActiveCategory(c.slug)} className={`w-full text-left px-3 py-2.5 text-[14px] rounded-xl transition-colors flex items-center justify-between ${activeCategory === c.slug ? "bg-light-sky text-brand font-bold" : "text-slate-text hover:bg-soft-gray font-medium"}`}>
                      {c.name}
                      <span className="text-[11px] bg-white px-2 py-0.5 rounded-full border border-border-gray text-slate-text">{c.productCount}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1">
              {/* Search bar & count */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search printers, models, or brands..." className="pl-10 bg-white border-border-gray h-11 rounded-xl text-[14px] shadow-sm focus-visible:ring-brand" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <p className="text-[14px] font-medium text-slate-text">Showing <span className="font-bold text-dark-text">{filtered.length}</span> results</p>
              </div>

              {/* Product grid */}
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((p, i) => {
                    const discount = p.comparePrice ? Math.round(((p.comparePrice - p.price) / p.comparePrice) * 100) : 0;
                    return (
                      <FadeIn key={p.id} delay={i * 0.05}>
                        <Link href={`/buy/${p.slug}`} className="bg-white rounded-2xl border border-border-gray hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-accent-blue/30 transition-all duration-300 group flex flex-col h-full relative overflow-hidden block">
                          {/* Badges */}
                          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                            {p.isTrending && (
                              <div className="bg-orange-50 text-orange-600 border border-orange-200/50 text-[10px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                                <TrendingUp className="w-3 h-3" /> TRENDING
                              </div>
                            )}
                            {discount > 0 && (
                              <div className="bg-accent-cyan text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-sm w-fit">
                                {discount}% OFF
                              </div>
                            )}
                          </div>

                          {/* Image area */}
                          <div className="relative bg-soft-gray/50 rounded-t-2xl p-6 flex items-center justify-center aspect-square group-hover:bg-light-sky/20 transition-colors">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white shadow-sm border border-border-gray flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-0">
                              <svg viewBox="0 0 48 48" className="w-12 h-12 text-brand/30" fill="currentColor">
                                <rect x="10" y="20" width="28" height="14" rx="2" />
                                <rect x="14" y="10" width="20" height="12" rx="2" opacity="0.6" />
                                <rect x="12" y="33" width="24" height="7" rx="1.5" opacity="0.4" />
                              </svg>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-[11px] text-accent-blue font-bold uppercase tracking-wider bg-accent-blue/10 px-2 py-0.5 rounded w-fit">{p.brand}</p>
                              <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                <span className="text-[12px] font-bold text-dark-text">{p.rating}</span>
                                <span className="text-[11px] text-muted-foreground">({p.reviewCount})</span>
                              </div>
                            </div>

                            <h3 className="text-[16px] font-bold text-dark-text leading-snug mb-2 group-hover:text-accent-blue transition-colors line-clamp-2">{p.name}</h3>
                            <p className="text-[13px] text-slate-text mb-3 line-clamp-2">{p.shortDescription}</p>
                            
                            <div className="flex items-center gap-1.5 mb-5">
                              <CheckCircle2 className="w-4 h-4 text-success" />
                              <span className="text-[12px] font-medium text-slate-text">{p.category.name} • In Stock</span>
                            </div>

                            <div className="mt-auto">
                              <div className="flex items-end gap-2 mb-4 pt-4 border-t border-soft-gray">
                                <span className="text-[22px] font-extrabold text-brand tracking-tight">₹{p.price.toLocaleString()}</span>
                                {p.comparePrice && <span className="text-[13px] text-muted-foreground line-through font-medium mb-1">₹{p.comparePrice.toLocaleString()}</span>}
                              </div>

                              <Button className="w-full gap-2 bg-white text-brand border border-brand/20 hover:bg-brand hover:text-white hover:border-brand rounded-xl text-[14px] font-bold h-11 shadow-sm transition-all group-hover:bg-brand group-hover:text-white">
                                <ShoppingCart className="w-4 h-4" /> Add to Cart
                              </Button>
                            </div>
                          </div>
                        </Link>
                      </FadeIn>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-border-gray p-12 text-center">
                  <h3 className="text-[18px] font-bold text-dark-text mb-2">No products found</h3>
                  <p className="text-[14px] text-slate-text">Try adjusting your search or category filter.</p>
                  <Button variant="outline" className="mt-6 rounded-xl" onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
