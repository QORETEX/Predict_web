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
  icon: string;
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
    icon: "➕",
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
    icon: "🏆",
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
    icon: "➖",
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
    icon: "➕",
    description: "Top Up",
    detail: "AirtelTigo",
    amount: 500,
    balance: 400,
  },
  {
    id: "5",
    date: "13 Oct 2026",
    time: "05:21 AM",
    type: "winnings",
    icon: "🏆",
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
    icon: "➖",
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
    icon: "➕",
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
    icon: "🏆",
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
  { tokens: 100, bonus: "+ 10 bonus", price: 10 },
  { tokens: 250, bonus: "+ 25 bonus (10%)", price: 20 },
  { tokens: 500, bonus: "+ 75 bonus (15%)", price: 40 },
  { tokens: 1000, bonus: "+ 200 bonus (20%)", price: 80, isBestValue: true },
  { tokens: 2500, bonus: "+ 750 bonus (30%)", price: 200 },
  { tokens: 5000, bonus: "+ 1,500 bonus (30%)", price: 400 },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StatCard({
  icon,
  iconBg,
  label,
  value,
  subtitle,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-[#0F1A36] px-5 py-4">
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
          iconBg
        )}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-[#AAB5D0]">{label}</p>
        <p className="text-xl font-bold text-white">{value}</p>
        {subtitle && (
          <p className="flex items-center gap-1 text-xs font-medium text-[#22C55E]">
            {subtitle}
            <TrendingUp className="h-3 w-3" />
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function WalletPage() {
  const [customAmount, setCustomAmount] = useState("");

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
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#603BFF]/15">
              <WalletIcon className="h-6 w-6 text-[#603BFF]" />
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
      {/*  Balance cards                                               */}
      {/* ============================================================ */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Coins className="h-6 w-6 text-yellow-400" />}
          iconBg="bg-yellow-400/15"
          label="Available Tokens"
          value="1,250"
          subtitle="+250 this week"
        />
        <StatCard
          icon={<Coins className="h-6 w-6 text-yellow-400" />}
          iconBg="bg-yellow-400/15"
          label="Total Deposited"
          value="5,000"
        />
        <StatCard
          icon={<Trophy className="h-6 w-6 text-yellow-400" />}
          iconBg="bg-yellow-400/15"
          label="Total Winnings"
          value="3,750"
        />
        <StatCard
          icon={<CreditCard className="h-5 w-5 text-[#603BFF]" />}
          iconBg="bg-[#603BFF]/15"
          label="Total Spent"
          value="4,500"
        />
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
        <h2 className="mb-3 text-base font-semibold text-white">
          Quick Top Up
        </h2>
        <p className="mb-4 text-xs text-[#AAB5D0]">
          Choose an amount or enter custom.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {topUpAmounts.map((item) => (
            <button
              key={item.amount}
              type="button"
              className="flex flex-col items-center justify-center gap-1 rounded-lg border border-[#23315A] bg-[#0C1532] py-4 transition-colors hover:border-[#603BFF]/50"
            >
              <span className="text-lg font-bold text-white">
                GHS {item.amount}
              </span>
              <span className="text-xs text-[#AAB5D0]/60">
                +{item.tokens} tokens
              </span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#23315A] bg-[#0C1532] py-3 text-sm font-medium text-white transition-colors hover:border-[#603BFF]/50"
        >
          <Edit className="h-4 w-4" />
          Custom Amount
        </button>
      </div>

      {/* ============================================================ */}
      {/*  Two-column layout: Transaction History + Token Packages     */}
      {/* ============================================================ */}
      <div className="grid gap-5 xl:grid-cols-[1fr_400px]">
        {/* Transaction History */}
        <div className="rounded-lg bg-[#0F1A36]">
          <div className="flex items-center justify-between border-b border-[#23315A]/40 px-5 py-4">
            <h2 className="text-base font-semibold text-white">
              Transaction History
            </h2>
            <button className="text-sm text-[#603BFF] hover:underline">
              View All
            </button>
          </div>
          <div className="divide-y divide-[#23315A]/20">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-[#0C1532]/60"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg",
                      tx.type === "top-up" &&
                        "bg-[#22C55E]/15 text-[#22C55E]",
                      tx.type === "winnings" &&
                        "bg-yellow-400/15 text-yellow-400",
                      tx.type === "bet-placed" && "bg-red-500/15 text-red-500"
                    )}
                  >
                    {tx.type === "top-up" && (
                      <ArrowUpCircle className="h-5 w-5" />
                    )}
                    {tx.type === "winnings" && <Trophy className="h-5 w-5" />}
                    {tx.type === "bet-placed" && (
                      <ArrowDownCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {tx.description}
                    </p>
                    <p className="text-xs text-[#AAB5D0]/60">{tx.detail}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      tx.amount > 0 ? "text-[#22C55E]" : "text-red-500"
                    )}
                  >
                    {tx.amount > 0 ? "+" : ""}
                    {tx.amount}
                  </p>
                  <p
                    className={cn(
                      "text-xs",
                      tx.balance < 0 ? "text-red-500" : "text-[#AAB5D0]/60"
                    )}
                  >
                    {tx.balance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Token Packages */}
        <div className="space-y-4">
          <div className="rounded-lg bg-[#0F1A36] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">
                Token Packages
              </h2>
              <button className="flex items-center gap-1 text-xs font-medium text-[#603BFF] hover:underline">
                Best Value
                <Crown className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-2">
              {tokenPackages.map((pkg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex items-center justify-between rounded-lg border p-3 transition-colors",
                    pkg.isBestValue
                      ? "border-[#603BFF] bg-[#603BFF]/10"
                      : "border-[#23315A] bg-[#0C1532] hover:border-[#603BFF]/50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {pkg.tokens.toLocaleString()} tokens
                      </p>
                      <p
                        className={cn(
                          "text-xs",
                          pkg.isBestValue
                            ? "text-[#603BFF]"
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
                    className="h-8 px-4 text-xs"
                  >
                    GHS {pkg.price}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Get More Tokens CTA */}
          <div className="rounded-lg border border-[#603BFF]/30 bg-gradient-to-br from-[#603BFF]/10 to-transparent p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#603BFF]/20">
                <Crown className="h-5 w-5 text-[#603BFF]" />
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
                  <TrendingUp className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
