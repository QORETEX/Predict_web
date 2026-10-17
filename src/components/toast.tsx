"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import { useToastStore, type ToastType } from "@/stores/toast-store";
import { cn } from "@/lib/utils";

const styles: Record<ToastType, { accent: string; color: string; icon: typeof CheckCircle }> = {
  success: { accent: "border-l-[#22C55E]", color: "text-[#22C55E]", icon: CheckCircle },
  error: { accent: "border-l-[#EF4444]", color: "text-[#EF4444]", icon: XCircle },
  warning: { accent: "border-l-[#FBBF24]", color: "text-[#FBBF24]", icon: AlertTriangle },
  info: { accent: "border-l-[#603BFF]", color: "text-[#603BFF]", icon: Info },
};

function ToastItem({ id, type, title, message }: {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}) {
  const remove = useToastStore((s) => s.remove);
  const [exiting, setExiting] = useState(false);
  const { accent, color, icon: Icon } = styles[type];

  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), 4700);
    return () => clearTimeout(timer);
  }, []);

  function handleClose() {
    setExiting(true);
    setTimeout(() => remove(id), 200);
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border-l-[3px] bg-[#0F1A36] px-5 py-4 shadow-xl transition-all duration-200",
        "min-w-[360px] max-w-[460px]",
        accent,
        exiting ? "translate-x-[120%] opacity-0" : "translate-x-0 opacity-100 animate-in slide-in-from-right-full",
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", color)} />
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-medium text-white">{title}</p>
          {message && (
            <p className="mt-1 text-sm text-[#AAB5D0]">{message}</p>
          )}
        </div>
        <button
          onClick={handleClose}
          className="shrink-0 p-0.5 text-[#AAB5D0]/50 hover:text-[#AAB5D0]"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed right-4 top-4 z-[200] flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} />
      ))}
    </div>
  );
}
