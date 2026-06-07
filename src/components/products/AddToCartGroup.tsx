"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store";
import { useRouter } from "next/navigation";

interface AddToCartGroupProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export function AddToCartGroup({ product }: AddToCartGroupProps) {
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const handleAddToCart = async () => {
    const success = await addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    if (success) alert("Added to cart!");
  };

  const handleBuyNow = async () => {
    const success = await addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    if (success) router.push("/cart");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-8 border-b border-border-gray">
      <Button 
        onClick={handleAddToCart}
        className="flex-1 bg-brand hover:bg-brand-dark text-white rounded-xl h-14 text-base font-bold shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5"
      >
        <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
      </Button>
      <Button 
        onClick={handleBuyNow}
        variant="outline" 
        className="flex-1 bg-white hover:bg-soft-gray border-2 border-border-gray text-dark-text rounded-xl h-14 text-base font-bold transition-all hover:-translate-y-0.5"
      >
        Buy Now
      </Button>
    </div>
  );
}
