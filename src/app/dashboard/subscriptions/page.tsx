import { CreditCard } from "lucide-react";
import Link from "next/link";

export default function SubscriptionsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-dark-text mb-6">Your Subscriptions</h1>
      <div className="py-16 text-center border-2 border-dashed border-border-gray rounded-xl bg-soft-gray/30">
        <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-bold text-dark-text mb-2">No active subscriptions</h3>
        <p className="text-slate-text text-sm mb-6 max-w-md mx-auto">
          You don't have any active printer AMC subscriptions. Subscribe to keep your printers running smoothly without interruptions.
        </p>
        <Link href="/subscriptions" className="bg-brand text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-dark transition-colors inline-block">
          View Plans
        </Link>
      </div>
    </div>
  );
}
