"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Gift,
  CheckCircle,
  Clock,
  Flame,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Seed data                                                          */
/* ------------------------------------------------------------------ */

const days = [
  { day: "Mon", label: "Day 1", reward: 10, status: "claimed" },
  { day: "Tue", label: "Day 2", reward: 15, status: "claimed" },
  { day: "Wed", label: "Day 3", reward: 20, status: "claimed" },
  { day: "Thu", label: "Day 4", reward: 25, status: "claimed" },
  { day: "Fri", label: "Day 5", reward: 50, status: "current" },
  { day: "Sat", label: "Day 6", reward: 35, status: "upcoming" },
  { day: "Sun", label: "Day 7", reward: 100, status: "upcoming" },
];

const history = [
  { date: "Oct 16, 2026", day: "Day 5", amount: "50 TKN", status: "pending" },
  { date: "Oct 15, 2026", day: "Day 4", amount: "25 TKN", status: "claimed" },
  { date: "Oct 14, 2026", day: "Day 3", amount: "20 TKN", status: "claimed" },
  { date: "Oct 13, 2026", day: "Day 2", amount: "15 TKN", status: "claimed" },
  { date: "Oct 12, 2026", day: "Day 1", amount: "10 TKN", status: "claimed" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DailyRewardsPage() {
  const [claimed, setClaimed] = useState(false);

  return (
    <div className="space-y-5">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-lg bg-[#0F1A36]">
        <div className="absolute right-0 top-0 h-full w-1/2">
          <Image src="/images/hero.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A36] via-[#0F1A36]/80 to-transparent" />
        </div>
        <div className="relative px-6 py-7 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FBBF24]/15">
              <Gift className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">Daily Rewards</h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">Log in daily and claim free tokens.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Streak Tracker */}
      <div className="rounded-lg bg-[#0F1A36] p-6">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <Flame className="h-5 w-5 text-orange-400" />
            7-Day Streak
          </h2>
          <span className="text-sm font-medium text-[#FBBF24]">Day 5 of 7</span>
        </div>
        <div className="mt-5 grid grid-cols-7 gap-2">
          {days.map((d) => (
            <div key={d.day} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition-colors",
                  d.status === "claimed" && "bg-[#22C55E]/15 text-[#22C55E]",
                  d.status === "current" && "ring-2 ring-[#FBBF24] bg-[#FBBF24]/15 text-[#FBBF24]",
                  d.status === "upcoming" && "bg-[#0C1532] text-[#AAB5D0]/40"
                )}
              >
                {d.status === "claimed" ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span>{d.reward}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  d.status === "current" ? "text-[#FBBF24]" : "text-[#AAB5D0]/60"
                )}
              >
                {d.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Reward */}
      <div className="rounded-lg bg-[#0F1A36] p-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#FBBF24]/15">
            <Coins className="h-8 w-8 text-[#FBBF24]" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs font-medium text-[#AAB5D0]">Day 5 Reward</p>
            <p className="text-3xl font-bold text-white">50 TKN</p>
            <p className="mt-1 text-sm text-[#AAB5D0]">
              Keep your streak alive to unlock bigger rewards!
            </p>
          </div>
          <Button
            size="lg"
            disabled={claimed}
            onClick={() => setClaimed(true)}
            className={cn(
              "shrink-0",
              claimed && "bg-[#22C55E] hover:bg-[#22C55E] cursor-not-allowed"
            )}
          >
            {claimed ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Claimed
              </>
            ) : (
              <>
                <Gift className="mr-2 h-4 w-4" />
                Claim Reward
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Reward History */}
      <div className="rounded-lg bg-[#0F1A36]">
        <div className="flex items-center gap-2 border-b border-[#23315A]/40 px-5 py-4">
          <Clock className="h-4 w-4 text-[#FBBF24]" />
          <h2 className="text-base font-semibold text-white">Reward History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#23315A]/20">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Date</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Day</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Amount</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#23315A]/10">
              {history.map((row, idx) => (
                <tr key={idx} className="transition-colors hover:bg-[#0C1532]/60">
                  <td className="px-4 py-3 text-sm text-[#AAB5D0]">{row.date}</td>
                  <td className="px-4 py-3 text-sm font-medium text-white">{row.day}</td>
                  <td className="px-4 py-3 text-sm font-medium text-[#FBBF24]">{row.amount}</td>
                  <td className="px-4 py-3">
                    {row.status === "claimed" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#22C55E]/15 px-2.5 py-0.5 text-xs font-semibold text-[#22C55E]">
                        <CheckCircle className="h-3 w-3" />
                        Claimed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#FBBF24]/15 px-2.5 py-0.5 text-xs font-semibold text-[#FBBF24]">
                        <Clock className="h-3 w-3" />
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
