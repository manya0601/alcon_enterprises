import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star, CheckCircle2, ShoppingCart, Truck, Shield, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRENDING_PRODUCTS } from "@/data/products";

// Generate static params for all known products
export function generateStaticParams() {
  return TRENDING_PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = TRENDING_PRODUCTS.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <div className="bg-soft-gray min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-border-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm font-medium text-slate-text">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
            <Link href="/buy" className="hover:text-brand transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
            <span className="text-dark-text">{product.category.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-white rounded-2xl border border-border-gray p-6 md:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            
            {/* Image Gallery */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <Link href="/buy" className="inline-flex items-center text-sm font-medium text-slate-text hover:text-brand mb-2">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
              </Link>
              <div className="relative aspect-square bg-soft-gray/30 rounded-2xl border border-border-gray overflow-hidden flex items-center justify-center p-8 group">
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {discount > 0 && (
                    <span className="bg-accent-cyan text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                      {discount}% OFF
                    </span>
                  )}
                  {product.isTrending && (
                    <span className="bg-orange-50 text-orange-600 border border-orange-200/50 text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                      TRENDING
                    </span>
                  )}
                </div>
                {/* Fallback to original image via Unsplash */}
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <div className="mb-2">
                <span className="text-xs font-bold text-accent-blue bg-accent-blue/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {product.brand}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-dark-text tracking-tight leading-tight mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/50">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-bold text-amber-700">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground font-medium underline decoration-muted-foreground/30 underline-offset-4 cursor-pointer hover:text-dark-text transition-colors">
                  {product.reviewCount} Ratings
                </span>
                <span className="w-1 h-1 rounded-full bg-border-gray"></span>
                <span className="text-sm font-medium text-success flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> In Stock
                </span>
              </div>

              <div className="flex items-end gap-3 mb-6">
                <span className="text-3xl md:text-4xl font-black text-brand tracking-tight">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.comparePrice && (
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground font-medium">MRP</span>
                    <span className="text-lg text-muted-foreground line-through font-bold">
                      ₹{product.comparePrice.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-[15px] text-slate-text leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-8 border-b border-border-gray">
                <Button className="flex-1 bg-brand hover:bg-brand-dark text-white rounded-xl h-14 text-base font-bold shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5">
                  <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                </Button>
                <Button variant="outline" className="flex-1 bg-white hover:bg-soft-gray border-2 border-border-gray text-dark-text rounded-xl h-14 text-base font-bold transition-all hover:-translate-y-0.5">
                  Buy Now
                </Button>
              </div>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-dark-text mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
                        <span className="text-[15px] text-slate-text">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Compatible Printers */}
              {product.compatiblePrinters && product.compatiblePrinters.length > 0 && (
                <div className="mb-8 p-5 bg-soft-gray/50 rounded-xl border border-border-gray">
                  <h3 className="text-sm font-bold text-dark-text mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-accent-blue" />
                    Compatible Printers
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.compatiblePrinters.map((printer, idx) => (
                      <span key={idx} className="bg-white border border-border-gray text-xs font-medium text-slate-text px-2.5 py-1.5 rounded-md shadow-sm">
                        {printer}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="flex items-center gap-3 p-4 bg-white border border-border-gray rounded-xl">
                  <div className="bg-blue-50 p-2 rounded-lg text-accent-blue">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-dark-text">Free Delivery</p>
                    <p className="text-[10px] text-muted-foreground">Orders over ₹999</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white border border-border-gray rounded-xl">
                  <div className="bg-green-50 p-2 rounded-lg text-success">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-dark-text">100% Genuine</p>
                    <p className="text-[10px] text-muted-foreground">OEM Certified</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
