"use client";

import { ArrowRight, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WalletCard() {
  return (
    <div className="rounded-lg bg-[#0F1A36] p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Wallet</h3>
        <button className="flex items-center gap-1 text-xs text-[#AAB5D0] transition-colors hover:text-white">
          View Wallet
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* Token balance */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#603BFF]/15">
            <Coins className="h-5 w-5 text-[#603BFF]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">1,250</p>
            <p className="text-xs text-[#AAB5D0]">Available Tokens</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Top Up
        </Button>
      </div>

      {/* Note */}
      <p className="mt-3 text-[11px] text-[#AAB5D0]">
        Refill every 48 hours when balance is low.
      </p>
    </div>
  );
}
