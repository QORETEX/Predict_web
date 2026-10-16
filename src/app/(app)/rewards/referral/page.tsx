"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Users,
  Copy,
  Check,
  TrendingUp,
  Coins,
  Clock,
  Share2,
  UserPlus,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const referralHistory = [
  { name: "Alex Thompson", date: "Oct 3, 2026", status: "Active", reward: "200 TKN" },
  { name: "Maria Santos", date: "Oct 7, 2026", status: "Active", reward: "200 TKN" },
  { name: "James Chen", date: "Oct 12, 2026", status: "Active", reward: "200 TKN" },
  { name: "Priya Patel", date: "Oct 14, 2026", status: "Pending", reward: "-- TKN" },
  { name: "Liam O'Brien", date: "Oct 16, 2026", status: "Pending", reward: "-- TKN" },
];

const stats = [
  { label: "Total Referrals", value: "12", icon: TrendingUp, color: "#603BFF" },
  { label: "Tokens Earned", value: "2,400 TKN", icon: Coins, color: "#22C55E" },
  { label: "Pending Rewards", value: "3", icon: Clock, color: "#FBBF24" },
];

const steps = [
  {
    number: 1,
    title: "Share Code",
    description: "Share your unique referral code with friends and family.",
    icon: Share2,
  },
  {
    number: 2,
    title: "Friend Joins",
    description: "Your friend signs up using your referral code.",
    icon: UserPlus,
  },
  {
    number: 3,
    title: "Earn Rewards",
    description: "Both of you earn bonus tokens once they make their first prediction.",
    icon: Gift,
  },
];

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("PREDICT-KS2026");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-lg bg-[#0F1A36]">
        <div className="absolute right-0 top-0 h-full w-1/2">
          <Image src="/images/hero.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A36] via-[#0F1A36]/80 to-transparent" />
        </div>
        <div className="relative px-6 py-7 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FBBF24]/15">
              <Users className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">Referral Program</h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">Invite friends and earn bonus tokens.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Code Card */}
      <div className="rounded-lg bg-[#0F1A36] p-6">
        <h2 className="text-lg font-semibold text-white">Your Referral Code</h2>
        <p className="mt-1 text-sm text-[#AAB5D0]">
          Share this code with friends to earn bonus tokens.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 rounded-lg bg-[#0C1532] px-4 py-3">
            <span className="font-mono text-lg font-semibold tracking-wider text-white">
              PREDICT-KS2026
            </span>
          </div>
          <Button
            onClick={handleCopy}
            className={cn(
              "shrink-0 gap-2 transition-colors",
              copied
                ? "bg-[#22C55E] text-white hover:bg-[#22C55E]/90"
                : "bg-[#603BFF] text-white hover:bg-[#603BFF]/90"
            )}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg bg-[#0F1A36] p-5">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-sm text-[#AAB5D0]">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Referral History Table */}
      <div className="rounded-lg bg-[#0F1A36] p-6">
        <h2 className="text-lg font-semibold text-white">Referral History</h2>
        <p className="mt-1 text-sm text-[#AAB5D0]">Track your referrals and earned rewards.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#23315A] text-left text-sm text-[#AAB5D0]">
                <th className="pb-3 pr-4 font-medium">Friend Name</th>
                <th className="pb-3 pr-4 font-medium">Date Joined</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Reward</th>
              </tr>
            </thead>
            <tbody>
              {referralHistory.map((referral, index) => (
                <tr
                  key={index}
                  className="border-b border-[#23315A]/50 last:border-0 hover:bg-[#0C1532]/50 transition-colors"
                >
                  <td className="py-3.5 pr-4 text-sm font-medium text-white">{referral.name}</td>
                  <td className="py-3.5 pr-4 text-sm text-[#AAB5D0]">{referral.date}</td>
                  <td className="py-3.5 pr-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        referral.status === "Active"
                          ? "bg-[#22C55E]/15 text-[#22C55E]"
                          : "bg-[#FBBF24]/15 text-[#FBBF24]"
                      )}
                    >
                      {referral.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-sm font-medium text-white text-right">
                    {referral.reward}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How It Works */}
      <div>
        <h2 className="text-lg font-semibold text-white">How It Works</h2>
        <p className="mt-1 text-sm text-[#AAB5D0]">
          Earning rewards is simple. Follow these three steps.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="rounded-lg bg-[#0F1A36] p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#603BFF]/15">
                  <step.icon className="h-5 w-5 text-[#603BFF]" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#603BFF]">
                    Step {step.number}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold text-white">{step.title}</h3>
                  <p className="mt-1 text-sm text-[#AAB5D0]">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
