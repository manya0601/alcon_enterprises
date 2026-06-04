import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-dark-text mb-6">Account Settings</h1>
      <div className="py-16 text-center border-2 border-dashed border-border-gray rounded-xl bg-soft-gray/30">
        <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-bold text-dark-text mb-2">Settings Overview</h3>
        <p className="text-slate-text text-sm max-w-md mx-auto">
          Your account settings are securely managed. To update your phone number or other sensitive details, please contact support.
        </p>
      </div>
    </div>
  );
}
