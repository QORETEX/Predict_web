"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Wallet as WalletIcon,
  Coins,
  Trophy,
  CreditCard,
  TrendingUp,
  ArrowUpCircle,
  ArrowDownCircle,
  Send,
  Gift,
  Edit,
  Crown,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Transaction {
  id: string;
  date: string;
  time: string;
  type: "top-up" | "winnings" | "bet-placed";
  description: string;
  detail: string;
  amount: number;
  balance: number;
}

interface TokenPackage {
  tokens: number;
  bonus: string;
  price: number;
  isBestValue?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const transactions: Transaction[] = [
  {
    id: "1",
    date: "17 Oct 2026",
    time: "08:45 PM",
    type: "top-up",
    description: "Top Up",
    detail: "Mobile Money (MTN)",
    amount: 1000,
    balance: 1250,
  },
  {
    id: "2",
    date: "16 Oct 2026",
    time: "06:32 PM",
    type: "winnings",
    description: "Winnings",
    detail: "Man City vs Arsenal (1X2)",
    amount: 450,
    balance: 250,
  },
  {
    id: "3",
    date: "15 Oct 2026",
    time: "09:12 PM",
    type: "bet-placed",
    description: "Bet Placed",
    detail: "Liverpool vs Chelsea (Over 2.5)",
    amount: -200,
    balance: -200,
  },
  {
    id: "4",
    date: "14 Oct 2026",
    time: "07:48 PM",
    type: "top-up",
    description: "Top Up",
    detail: "AirtelTigo",
    amount: 500,
    balance: 400,
  },
  {
    id: "5",
    date: "13 Oct 2026",
    time: "05:21 PM",
    type: "winnings",
    description: "Winnings",
    detail: "Real Madrid vs Barcelona (BTTS)",
    amount: 320,
    balance: -100,
  },
  {
    id: "6",
    date: "12 Oct 2026",
    time: "10:55 AM",
    type: "bet-placed",
    description: "Bet Placed",
    detail: "NBA - Lakers vs Warriors (1X2)",
    amount: -150,
    balance: -420,
  },
  {
    id: "7",
    date: "10 Oct 2026",
    time: "04:17 PM",
    type: "top-up",
    description: "Top Up",
    detail: "MTN Mobile Money",
    amount: 1000,
    balance: 570,
  },
  {
    id: "8",
    date: "08 Oct 2026",
    time: "11:03 AM",
    type: "winnings",
    description: "Winnings",
    detail: "Tennis - Alcaraz (Match Winner)",
    amount: 600,
    balance: -430,
  },
];

const topUpAmounts = [
  { amount: 10, tokens: 100 },
  { amount: 20, tokens: 200 },
  { amount: 50, tokens: 500 },
  { amount: 100, tokens: 1000 },
];

const tokenPackages: TokenPackage[] = [
  { tokens: 100, bonus: "+ 0 bonus", price: 10 },
  { tokens: 250, bonus: "+ 25 bonus (10%)", price: 20 },
  { tokens: 500, bonus: "+ 75 bonus (15%)", price: 40, isBestValue: true },
  { tokens: 1000, bonus: "+ 200 bonus (20%)", price: 80 },
  { tokens: 2500, bonus: "+ 750 bonus (30%)", price: 200 },
  { tokens: 5000, bonus: "+ 1,500 bonus (30%)", price: 400 },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function WalletPage() {
  const [selectedTopUp, setSelectedTopUp] = useState(0);

  return (
    <div className="space-y-5">
      {/* ============================================================ */}
      {/*  Hero banner                                                  */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden rounded-lg bg-[#0F1A36]">
        <div className="absolute right-0 top-0 h-full w-1/2">
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A36] via-[#0F1A36]/80 to-transparent" />
        </div>
        <div className="relative px-6 py-7 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FBBF24]/15">
              <WalletIcon className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Wallet
              </h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">
                Manage your tokens, view transactions and top up your account.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Balance card — single card with all stats                    */}
      {/* ============================================================ */}
      <div className="rounded-lg bg-[#0F1A36] p-5 sm:p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Primary balance */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#22C55E]/15">
              <Coins className="h-7 w-7 text-[#22C55E]" />
            </div>
            <div>
              <p className="text-xs text-[#AAB5D0]">Available Tokens</p>
              <p className="text-3xl font-bold text-white">1,250</p>
              <p className="flex items-center gap-1 text-xs font-medium text-[#22C55E]">
                +250 this week
                <TrendingUp className="h-3 w-3" />
              </p>
            </div>
          </div>

          {/* Secondary stats */}
          <div className="flex gap-6 border-t border-[#23315A]/40 pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#603BFF]/15">
                <Coins className="h-5 w-5 text-[#603BFF]" />
              </div>
              <div>
                <p className="text-xs text-[#AAB5D0]">Total Deposited</p>
                <p className="text-lg font-bold text-white">5,000</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#603BFF]/15">
                <Trophy className="h-5 w-5 text-[#603BFF]" />
              </div>
              <div>
                <p className="text-xs text-[#AAB5D0]">Total Winnings</p>
                <p className="text-lg font-bold text-white">3,750</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#603BFF]/15">
                <CreditCard className="h-5 w-5 text-[#603BFF]" />
              </div>
              <div>
                <p className="text-xs text-[#AAB5D0]">Total Spent</p>
                <p className="text-lg font-bold text-white">4,500</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Action buttons                                              */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Button size="lg" className="h-12 gap-2">
          <ArrowUpCircle className="h-4 w-4" />
          Top Up
        </Button>
        <Button size="lg" variant="outline" className="h-12 gap-2">
          <ArrowDownCircle className="h-4 w-4" />
          Withdraw
        </Button>
        <Button size="lg" variant="outline" className="h-12 gap-2">
          <Send className="h-4 w-4" />
          Transfer
        </Button>
        <Button size="lg" variant="outline" className="h-12 gap-2">
          <Gift className="h-4 w-4" />
          Gift Tokens
        </Button>
      </div>

      {/* ============================================================ */}
      {/*  Quick Top Up                                                */}
      {/* ============================================================ */}
      <div className="rounded-lg bg-[#0F1A36] p-5">
        <h2 className="text-base font-semibold text-white">Quick Top Up</h2>
        <p className="mb-4 mt-1 text-xs text-[#AAB5D0]">
          Choose an amount or enter custom.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {topUpAmounts.map((item, i) => (
            <button
              key={item.amount}
              type="button"
              onClick={() => setSelectedTopUp(i)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-lg border py-4 transition-colors",
                selectedTopUp === i
                  ? "border-[#603BFF] bg-[#603BFF]/10"
                  : "border-[#23315A] bg-[#0C1532] hover:border-[#603BFF]/50"
              )}
            >
              <span className="text-lg font-bold text-white">
                GHS {item.amount}
              </span>
              <span className="text-xs text-[#AAB5D0]/60">
                +{item.tokens.toLocaleString()} tokens
              </span>
            </button>
          ))}
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg border border-[#23315A] bg-[#0C1532] py-4 text-sm font-medium text-white transition-colors hover:border-[#603BFF]/50"
          >
            <Edit className="h-4 w-4" />
            Custom Amount
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Two-column: Transaction History + Token Packages             */}
      {/* ============================================================ */}
      <div className="grid gap-5 xl:grid-cols-[1fr_400px]">
        {/* Transaction History — table layout */}
        <div className="rounded-lg bg-[#0F1A36]">
          <div className="flex items-center justify-between border-b border-[#23315A]/40 px-5 py-4">
            <h2 className="text-base font-semibold text-white">
              Transaction History
            </h2>
            <button className="text-sm text-[#603BFF] hover:underline">
              View All
            </button>
          </div>

          {/* Table header */}
          <div className="hidden grid-cols-[140px_80px_1fr_80px_80px] items-center gap-2 border-b border-[#23315A]/30 px-5 py-2.5 text-xs font-medium text-[#AAB5D0]/60 sm:grid">
            <span>Date &amp; Time</span>
            <span>Type</span>
            <span>Description</span>
            <span className="text-right">Amount</span>
            <span className="text-right">Balance</span>
          </div>

          {/* Table rows */}
          <div className="divide-y divide-[#23315A]/20">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="grid items-center gap-2 px-5 py-3 transition-colors hover:bg-[#0C1532]/60 sm:grid-cols-[140px_80px_1fr_80px_80px]"
              >
                {/* Date & Time */}
                <div className="text-xs text-[#AAB5D0]/70">
                  <p className="text-white sm:text-[#AAB5D0]/70">{tx.date}</p>
                  <p>{tx.time}</p>
                </div>

                {/* Type */}
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                      tx.type === "top-up" && "bg-[#22C55E]/15 text-[#22C55E]",
                      tx.type === "winnings" &&
                        "bg-[#603BFF]/15 text-[#603BFF]",
                      tx.type === "bet-placed" && "bg-red-500/15 text-red-500"
                    )}
                  >
                    {tx.type === "top-up" && (
                      <ArrowUpCircle className="h-3.5 w-3.5" />
                    )}
                    {tx.type === "winnings" && (
                      <Trophy className="h-3.5 w-3.5" />
                    )}
                    {tx.type === "bet-placed" && (
                      <ArrowDownCircle className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <span className="text-xs text-white">{tx.description}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-[#AAB5D0]">{tx.detail}</p>

                {/* Amount */}
                <p
                  className={cn(
                    "text-right text-sm font-semibold",
                    tx.amount > 0 ? "text-[#22C55E]" : "text-red-500"
                  )}
                >
                  {tx.amount > 0 ? "+" : ""}
                  {tx.amount.toLocaleString()}
                </p>

                {/* Balance */}
                <p
                  className={cn(
                    "text-right text-sm",
                    tx.balance < 0 ? "text-red-500" : "text-[#AAB5D0]"
                  )}
                >
                  {tx.balance.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Token Packages + Get More Tokens */}
        <div className="space-y-4">
          <div className="rounded-lg bg-[#0F1A36] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">
                Token Packages
              </h2>
              <span className="flex items-center gap-1 rounded-full bg-[#22C55E]/15 px-3 py-1 text-xs font-semibold text-[#22C55E]">
                Best Value
                <ArrowRight className="h-3 w-3" />
              </span>
            </div>
            <div className="space-y-2">
              {tokenPackages.map((pkg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex items-center justify-between rounded-lg border p-3 transition-colors",
                    pkg.isBestValue
                      ? "border-[#22C55E] bg-[#22C55E]/10"
                      : "border-[#23315A] bg-[#0C1532] hover:border-[#603BFF]/50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FBBF24]/15">
                      <Coins className="h-4 w-4 text-[#FBBF24]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {pkg.tokens.toLocaleString()} tokens
                      </p>
                      <p
                        className={cn(
                          "text-xs",
                          pkg.isBestValue
                            ? "text-[#22C55E]"
                            : "text-[#AAB5D0]/60"
                        )}
                      >
                        {pkg.bonus}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={pkg.isBestValue ? "default" : "outline"}
                    className={cn(
                      "h-8 px-4 text-xs",
                      pkg.isBestValue &&
                        "bg-[#22C55E] hover:bg-[#22C55E]/90"
                    )}
                  >
                    GHS {pkg.price}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Get More Tokens CTA */}
          <div className="rounded-lg bg-gradient-to-br from-[#FBBF24]/10 via-[#0F1A36] to-[#0F1A36] p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBBF24]/20">
                <Crown className="h-5 w-5 text-[#FBBF24]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">
                  Get More Tokens
                </h3>
                <p className="mt-1 text-xs text-[#AAB5D0]">
                  Complete daily quests, climb the leaderboard and earn bonus
                  tokens!
                </p>
                <Button size="sm" className="mt-3 h-8 gap-1 text-xs">
                  View Quests
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
