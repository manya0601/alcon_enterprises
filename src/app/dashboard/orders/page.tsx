import { Package } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-dark-text mb-6">Your Orders</h1>
      <div className="py-16 text-center border-2 border-dashed border-border-gray rounded-xl bg-soft-gray/30">
        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-bold text-dark-text mb-2">No orders found</h3>
        <p className="text-slate-text text-sm mb-6 max-w-md mx-auto">
          You haven't placed any orders yet. When you do, you'll be able to track their status here.
        </p>
        <Link href="/buy" className="bg-brand text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-dark transition-colors inline-block">
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
