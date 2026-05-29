"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Loader2 } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setIsProcessing(false);
      return;
    }

    try {
      // 1. Create order on our backend
      const result = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice() * 1.18, items }),
      });
      const data = await result.json();

      if (!data.orderId) {
        alert("Server error. Are you online?");
        setIsProcessing(false);
        return;
      }

      // 2. Initialize Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_SvB97zg6ob8RYG", // Enter the Key ID generated from the Dashboard
        amount: data.amount,
        currency: data.currency,
        name: "Alcon Enterprises",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: async function (response: any) {
          // You could optionally verify the signature here on the client,
          // but we are relying on the secure backend webhook.
          alert("Payment Successful! Order ID: " + response.razorpay_payment_id);
          clearCart();
        },
        prefill: {
          name: "Guest User",
          email: "guest@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#10b981", // Emerald 500
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-white flex items-center">
        <ShoppingBag className="w-10 h-10 mr-4 text-emerald-400" />
        Your Shopping Cart
      </h1>

      {items.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-3xl p-12 text-center"
        >
          <div className="bg-zinc-800/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-zinc-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-white">Your cart is empty</h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added any premium printing supplies to your cart yet.
          </p>
          <Link 
            href="/buy" 
            className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1"
          >
            Continue Shopping
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.productId}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0, padding: 0 }}
                  className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 overflow-hidden"
                >
                  <div className="relative w-24 h-24 shrink-0 bg-white/5 rounded-xl p-2 flex items-center justify-center">
                    <Image
                      src={item.image || "/images/products/toner-1.png"}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <Link href={`/buy/${item.productId}`} className="text-lg font-medium text-white hover:text-emerald-400 transition-colors line-clamp-2 mb-2">
                      {item.name}
                    </Link>
                    <div className="text-emerald-400 font-semibold text-lg">
                      ₹{item.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start mt-4 sm:mt-0">
                    <div className="flex items-center bg-zinc-800/50 rounded-full p-1 border border-zinc-700/50">
                      <button
                        onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-medium text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 sticky top-28">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-zinc-300">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{totalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Shipping</span>
                  <span className="text-emerald-400 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Estimated Tax</span>
                  <span className="text-white font-medium">₹{(totalPrice() * 0.18).toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
                  <span className="text-lg text-white font-medium">Total</span>
                  <span className="text-3xl font-bold text-emerald-400">
                    ₹{(totalPrice() * 1.18).toLocaleString()}
                  </span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-4 px-6 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? (
                  <>Processing <Loader2 className="ml-2 w-5 h-5 animate-spin" /></>
                ) : (
                  <>Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" /></>
                )}
              </button>
              
              <div className="mt-6 text-center text-sm text-zinc-500">
                Secure checkout powered by Stripe. All major credit cards accepted.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
