"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Trophy,
  Target,
  Clock,
  Gift,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChallengeTab = "daily" | "weekly" | "monthly";

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState<ChallengeTab>("daily");

  const activeChallenges = [
    {
      title: "Weekend Warriors",
      desc: "Make 10 predictions this weekend",
      progress: 60,
      reward: "500",
      remaining: "2d 5h",
    },
    {
      title: "Perfect Streak",
      desc: "Get 5 correct predictions in a row",
      progress: 40,
      reward: "750",
      remaining: "4d 12h",
    },
    {
      title: "Market Master",
      desc: "Try 5 different market types",
      progress: 80,
      reward: "300",
      remaining: "1d 8h",
    },
  ];

  const completedChallenges = [
    {
      title: "First Blood",
      desc: "Make your first prediction",
      earned: "100",
      completedDate: "14 Oct 2026",
    },
    {
      title: "Early Bird",
      desc: "Make 3 predictions before noon",
      earned: "250",
      completedDate: "13 Oct 2026",
    },
    {
      title: "Hat Trick",
      desc: "Win 3 predictions in one day",
      earned: "500",
      completedDate: "12 Oct 2026",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Hero banner */}
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
              <Trophy className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Challenges
              </h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">
                Complete challenges and earn rewards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        {[
          { key: "daily", label: "Daily" },
          { key: "weekly", label: "Weekly" },
          { key: "monthly", label: "Monthly" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as ChallengeTab)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-colors",
              activeTab === tab.key
                ? "bg-[#603BFF] text-white"
                : "text-[#AAB5D0] hover:bg-white/5 hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Challenges */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-white">
          Active Challenges
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {activeChallenges.map((challenge, idx) => (
            <div key={idx} className="rounded-lg bg-[#0F1A36] p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {challenge.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#AAB5D0]">
                    {challenge.desc}
                  </p>
                </div>
                <Target className="h-5 w-5 shrink-0 text-[#FBBF24]" />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#AAB5D0]/60">Progress</span>
                  <span className="font-semibold text-white">
                    {challenge.progress}%
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#0C1532]">
                  <div
                    className="h-full rounded-full bg-[#603BFF]"
                    style={{ width: `${challenge.progress}%` }}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Gift className="h-4 w-4 text-[#FBBF24]" />
                  <span className="text-sm font-semibold text-[#FBBF24]">
                    {challenge.reward} TKN
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#AAB5D0]/60">
                  <Clock className="h-3 w-3" />
                  {challenge.remaining}
                </div>
              </div>
              <Button size="sm" className="mt-4 h-8 w-full text-xs">
                View Challenge
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Challenges */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-white">
          Completed Challenges
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {completedChallenges.map((challenge, idx) => (
            <div key={idx} className="rounded-lg bg-[#0F1A36] p-5 opacity-80">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {challenge.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#AAB5D0]">
                    {challenge.desc}
                  </p>
                </div>
                <CheckCircle className="h-5 w-5 shrink-0 text-[#22C55E]" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Gift className="h-4 w-4 text-[#22C55E]" />
                  <span className="text-sm font-semibold text-[#22C55E]">
                    {challenge.earned} TKN earned
                  </span>
                </div>
                <span className="text-xs text-[#AAB5D0]/60">
                  {challenge.completedDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-[#0F1A36] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBBF24]/15">
              <Trophy className="h-5 w-5 text-[#FBBF24]" />
            </div>
            <div>
              <p className="text-xs text-[#AAB5D0]">Completed</p>
              <p className="text-xl font-bold text-white">24</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-[#0F1A36] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#22C55E]/15">
              <TrendingUp className="h-5 w-5 text-[#22C55E]" />
            </div>
            <div>
              <p className="text-xs text-[#AAB5D0]">Total Earned</p>
              <p className="text-xl font-bold text-white">12,450 TKN</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-[#0F1A36] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#603BFF]/15">
              <Target className="h-5 w-5 text-[#603BFF]" />
            </div>
            <div>
              <p className="text-xs text-[#AAB5D0]">In Progress</p>
              <p className="text-xl font-bold text-white">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
