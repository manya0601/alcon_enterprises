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
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

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
    setCheckoutError(null);
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async function (response: any) {
          // You could optionally verify the signature here on the client,
          // but we are relying on the secure backend webhook.
          alert("Payment Successful! Order ID: " + response.razorpay_payment_id);
          clearCart();
          setIsProcessing(false);
          document.body.style.overflow = 'auto';
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            document.body.style.overflow = 'auto';
          }
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const paymentObject = new (window as any).Razorpay(options);
      
      paymentObject.on('payment.failed', function (response: any) {
        console.error("Payment Failed:", response.error);
        setCheckoutError("Payment Failed: " + (response.error.description || "Unknown Error. Please try again."));
        setIsProcessing(false);
        document.body.style.overflow = 'auto';
      });

      paymentObject.open();
    } catch (error) {
      console.error(error);
      setCheckoutError("Something went wrong with the checkout process.");
      setIsProcessing(false);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <div className="min-h-screen bg-soft-gray pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-dark-text flex items-center">
          <ShoppingBag className="w-10 h-10 mr-4 text-brand" />
          Your Shopping Cart
        </h1>

        {items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-border-gray rounded-3xl p-12 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
          >
            <div className="bg-soft-gray w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-slate-text" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-dark-text">Your cart is empty</h2>
            <p className="text-slate-text mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any premium printing supplies to your cart yet.
            </p>
            <Link 
              href="/buy" 
              className="inline-flex items-center bg-brand hover:bg-brand-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
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
                    className="bg-white border border-border-gray rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                  >
                    <div className="relative w-24 h-24 shrink-0 bg-soft-gray rounded-xl p-2 flex items-center justify-center">
                      <Image
                        src={item.image || "/images/products/toner-1.png"}
                        alt={item.name}
                        fill
                        className="object-contain p-2 mix-blend-multiply"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <Link href={`/buy/${item.productId}`} className="text-lg font-bold text-dark-text hover:text-brand transition-colors line-clamp-2 mb-2">
                        {item.name}
                      </Link>
                      <div className="text-brand font-bold text-lg">
                        ₹{item.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start mt-4 sm:mt-0">
                      <div className="flex items-center bg-soft-gray rounded-full p-1 border border-border-gray">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-slate-text hover:text-dark-text transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-bold text-dark-text">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-slate-text hover:text-dark-text transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border border-border-gray rounded-3xl p-6 sm:p-8 sticky top-32 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <h3 className="text-xl font-bold mb-6 text-dark-text">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-slate-text">
                    <span>Subtotal</span>
                    <span className="font-medium text-dark-text">₹{totalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-text">
                    <span>Shipping</span>
                    <span className="text-brand font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-slate-text">
                    <span>Estimated Tax (18% GST)</span>
                    <span className="font-medium text-dark-text">₹{(totalPrice() * 0.18).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                </div>
                
                <div className="border-t border-border-gray pt-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-dark-text">Total</span>
                    <span className="text-2xl font-bold text-brand">
                      ₹{(totalPrice() * 1.18).toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </span>
                  </div>
                </div>

                {checkoutError && (
                  <div className="mb-6 bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-xl text-sm font-medium">
                    {checkoutError}
                  </div>
                )}

                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-[#02367B] hover:bg-[#012350] text-white font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isProcessing ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                  ) : (
                    <>Checkout Securely <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
                
                <p className="text-xs text-slate-text text-center mt-6 flex items-center justify-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  Payments processed securely via Razorpay
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
