"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

function Sheet({ open, onOpenChange, children }: SheetProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={() => onOpenChange(false)} />
      {children}
    </>
  );
}

const SheetContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { side?: "bottom" | "right" }>(
  ({ className, side = "bottom", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed z-50 bg-background shadow-lg",
        side === "bottom" && "inset-x-0 bottom-0 rounded-t-2xl border-t",
        side === "right" && "inset-y-0 right-0 w-3/4 max-w-sm border-l",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
SheetContent.displayName = "SheetContent";

function SheetClose({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
    >
      <X className="h-4 w-4" />
    </button>
  );
}

export { Sheet, SheetContent, SheetClose };
