"use client";

import Link from "next/link";
import { ArrowRight, Coins, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet, useClaimRefill } from "@/hooks/use-wallet";

export function WalletCard() {
  const { data: wallet } = useWallet();
  const refill = useClaimRefill();

  const balance = wallet?.balance ?? 0;
  const canRefill = wallet?.can_refill ?? false;

  return (
    <div className="rounded-lg bg-[#0F1A36] p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Wallet</h3>
        <Link
          href="/wallet"
          className="flex items-center gap-1 text-xs text-[#AAB5D0] transition-colors hover:text-white"
        >
          View Wallet
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBBF24]/15">
            <Coins className="h-5 w-5 text-[#FBBF24]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">
              {balance.toLocaleString()}
            </p>
            <p className="text-xs text-[#AAB5D0]">Available Tokens</p>
          </div>
        </div>

        {canRefill ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => refill.mutate()}
            disabled={refill.isPending}
          >
            {refill.isPending ? (
              <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
            ) : null}
            Refill
          </Button>
        ) : (
          <Button variant="outline" size="sm" asChild>
            <Link href="/wallet">Top Up</Link>
          </Button>
        )}
      </div>

      <p className="mt-3 text-[11px] text-[#AAB5D0]">
        {canRefill
          ? "Free refill available! Claim your tokens."
          : "Refill every 48 hours when balance is low."}
      </p>
    </div>
  );
}
