"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Trophy,
  Star,
  TrendingUp,
  Flame,
  Zap,
  Crown,
  ChevronDown,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type LeaderboardTab =
  | "overall"
  | "nsmq"
  | "football"
  | "basketball"
  | "tennis"
  | "other-sports"
  | "squads";

interface Player {
  rank: number;
  name: string;
  level: number;
  totalXP: number;
  wins: number;
  streak: number;
  rewards: number;
  avatar: string;
}

interface School {
  rank: number;
  name: string;
  totalPoints: number;
  predictions: number;
  winRate: string;
  avatar: string;
  color: string;
}

interface Squad {
  rank: number;
  name: string;
  members: number;
  totalXP: number;
  avatar: string;
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const tabs: { key: LeaderboardTab; label: string }[] = [
  { key: "overall", label: "Overall" },
  { key: "nsmq", label: "NSMQ" },
  { key: "football", label: "Football" },
  { key: "basketball", label: "Basketball" },
  { key: "tennis", label: "Tennis" },
  { key: "other-sports", label: "Other Sports" },
  { key: "squads", label: "Squads" },
];

const topPlayers: Player[] = [
  {
    rank: 1,
    name: "Kwame Star",
    level: 3,
    totalXP: 12480,
    wins: 98,
    streak: 8,
    rewards: 5000,
    avatar: "",
  },
  {
    rank: 2,
    name: "BrightKing",
    level: 11,
    totalXP: 11240,
    wins: 98,
    streak: 6,
    rewards: 4000,
    avatar: "",
  },
  {
    rank: 3,
    name: "GameChanger",
    level: 11,
    totalXP: 10320,
    wins: 81,
    streak: 6,
    rewards: 3500,
    avatar: "",
  },
  {
    rank: 4,
    name: "PredictPro",
    level: 10,
    totalXP: 9870,
    wins: 76,
    streak: 5,
    rewards: 3000,
    avatar: "",
  },
  {
    rank: 5,
    name: "SoccerMaster",
    level: 9,
    totalXP: 8540,
    wins: 69,
    streak: 4,
    rewards: 2500,
    avatar: "",
  },
  {
    rank: 6,
    name: "NajaPunters",
    level: 8,
    totalXP: 7980,
    wins: 63,
    streak: 4,
    rewards: 2000,
    avatar: "",
  },
  {
    rank: 7,
    name: "BetSmart",
    level: 8,
    totalXP: 7650,
    wins: 60,
    streak: 3,
    rewards: 2000,
    avatar: "",
  },
  {
    rank: 8,
    name: "KobeyPredicts",
    level: 7,
    totalXP: 6980,
    wins: 55,
    streak: 3,
    rewards: 1500,
    avatar: "",
  },
  {
    rank: 9,
    name: "TrendyBets",
    level: 6,
    totalXP: 6540,
    wins: 52,
    streak: 2,
    rewards: 1200,
    avatar: "",
  },
  {
    rank: 10,
    name: "TheRealGuru",
    level: 6,
    totalXP: 6120,
    wins: 48,
    streak: 2,
    rewards: 1000,
    avatar: "",
  },
];

const schools: School[] = [
  {
    rank: 1,
    name: "Kumasi Academy",
    totalPoints: 3420,
    predictions: 21,
    winRate: "86%",
    avatar: "",
    color: "bg-yellow-500",
  },
  {
    rank: 2,
    name: "Prempeh College",
    totalPoints: 3210,
    predictions: 19,
    winRate: "84%",
    avatar: "",
    color: "bg-green-600",
  },
  {
    rank: 3,
    name: "Accra Academy",
    totalPoints: 2980,
    predictions: 17,
    winRate: "82%",
    avatar: "",
    color: "bg-blue-600",
  },
  {
    rank: 4,
    name: "St. Roses SHS",
    totalPoints: 2760,
    predictions: 16,
    winRate: "78%",
    avatar: "",
    color: "bg-red-600",
  },
  {
    rank: 5,
    name: "Wesley Girls",
    totalPoints: 2540,
    predictions: 15,
    winRate: "76%",
    avatar: "",
    color: "bg-pink-600",
  },
];

const squads: Squad[] = [
  { rank: 1, name: "The Dreamers", members: 32, totalXP: 29345, avatar: "" },
  { rank: 2, name: "Predictors United", members: 28, totalXP: 24780, avatar: "" },
  { rank: 3, name: "Campus Kings", members: 24, totalXP: 21320, avatar: "" },
  { rank: 4, name: "Weekend Warriors", members: 20, totalXP: 18760, avatar: "" },
  { rank: 5, name: "Sharp Minds", members: 18, totalXP: 15420, avatar: "" },
];

const badges = [
  { name: "First Pick", icon: "🎯", color: "bg-yellow-500/15" },
  { name: "Live Legend", icon: "⚡", color: "bg-red-500/15" },
  { name: "NSMQ Fan", icon: "🎓", color: "bg-purple-500/15" },
  { name: "Football Guru", icon: "⚽", color: "bg-green-500/15" },
  { name: "Basketball Pro", icon: "🏀", color: "bg-orange-500/15" },
  { name: "Tennis Ace", icon: "🎾", color: "bg-yellow-500/15" },
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
  trend,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  subtitle?: string;
  trend?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-[#0F1A36] px-4 py-3">
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
          iconBg
        )}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-[#AAB5D0]">{label}</p>
        <p className="text-lg font-bold text-white">{value}</p>
        {subtitle && (
          <p className="text-xs text-[#AAB5D0]/60">{subtitle}</p>
        )}
        {trend && (
          <p className="flex items-center gap-1 text-xs font-medium text-[#22C55E]">
            {trend}
            <TrendingUp className="h-3 w-3" />
          </p>
        )}
      </div>
    </div>
  );
}

function PlayerAvatar({ name, level }: { name: string; level: number }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="relative">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#603BFF] text-xs font-bold text-white">
        {initials}
      </span>
      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0F1A36] text-[9px] font-bold text-[#603BFF] ring-2 ring-[#0F1A36]">
        {level}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function LeaderboardsPage() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>("overall");

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
              <Trophy className="h-6 w-6 text-[#603BFF]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Leaderboards
              </h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">
                Compete. Earn XP. Unlock rewards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Tabs + Time filter                                          */}
      {/* ============================================================ */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab.key
                  ? "bg-[#603BFF] text-white"
                  : "text-[#AAB5D0] hover:bg-white/5 hover:text-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-[#23315A] bg-[#0C1532] px-4 py-2 text-sm text-white transition-colors hover:border-[#603BFF]/50"
        >
          This Week
          <ChevronDown className="h-3.5 w-3.5 text-[#AAB5D0]/60" />
        </button>
      </div>

      {/* ============================================================ */}
      {/*  Stats cards                                                 */}
      {/* ============================================================ */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Crown className="h-5 w-5 text-yellow-400" />}
          iconBg="bg-yellow-400/15"
          label="Your Rank"
          value="#24"
          subtitle="in Overall Leaderboard"
          trend="↑ 6"
        />
        <StatCard
          icon={<Star className="h-5 w-5 text-yellow-400" />}
          iconBg="bg-yellow-400/15"
          label="Total XP"
          value="2,480"
          trend="+320 this week"
        />
        <StatCard
          icon={<Target className="h-4 w-4 text-[#603BFF]" />}
          iconBg="bg-[#603BFF]/15"
          label="Level 3"
          value="520 / 1,000 XP"
        />
        <StatCard
          icon={<Trophy className="h-5 w-5 text-yellow-400" />}
          iconBg="bg-yellow-400/15"
          label="Badges Earned"
          value="5/12"
        />
      </div>

      {/* ============================================================ */}
      {/*  Top 3 Podium                                                */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#603BFF]/20 via-[#0F1A36] to-[#0F1A36] p-6">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[#603BFF]/30 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[#F59E0B]/30 blur-3xl" />
        </div>
        <div className="relative">
          <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
            <Crown className="h-5 w-5 text-yellow-400" />
            Top 3 Players
          </h2>
          <div className="grid grid-cols-3 items-end gap-3">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-slate-300 to-slate-500 text-xl font-bold text-white">
                2
              </div>
              <div className="mt-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-400 text-2xl">
                👨
              </div>
              <p className="mt-2 text-center text-sm font-semibold text-white">
                {topPlayers[1].name}
              </p>
              <p className="text-xs text-[#AAB5D0]">
                {topPlayers[1].totalXP.toLocaleString()} XP
              </p>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-2xl font-bold text-white shadow-lg">
                1
              </div>
              <div className="mt-3 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400 text-3xl ring-4 ring-yellow-400/30">
                👨
              </div>
              <p className="mt-2 text-center text-base font-bold text-white">
                {topPlayers[0].name}
              </p>
              <p className="text-sm font-medium text-yellow-400">
                {topPlayers[0].totalXP.toLocaleString()} XP
              </p>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-xl font-bold text-white">
                3
              </div>
              <div className="mt-3 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-2xl">
                👩
              </div>
              <p className="mt-2 text-center text-sm font-semibold text-white">
                {topPlayers[2].name}
              </p>
              <p className="text-xs text-[#AAB5D0]">
                {topPlayers[2].totalXP.toLocaleString()} XP
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Main content: Rankings + Sidebar                            */}
      {/* ============================================================ */}
      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        {/* Left: Player Rankings */}
        <div className="space-y-4">
          {/* Top Players table */}
          <div className="rounded-lg bg-[#0F1A36]">
            <div className="flex items-center justify-between border-b border-[#23315A]/40 px-5 py-4">
              <h2 className="text-base font-semibold text-white">
                Top Players (Overall)
              </h2>
              <button className="text-sm text-[#603BFF] hover:underline">
                View All →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#23315A]/20">
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                      #
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                      Player
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                      Level
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                      Total XP
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                      Wins
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                      Streak
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                      Rewards
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#23315A]/10">
                  {topPlayers.map((player) => (
                    <tr
                      key={player.rank}
                      className="transition-colors hover:bg-[#0C1532]/60"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-white">
                        {player.rank}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <PlayerAvatar
                            name={player.name}
                            level={player.level}
                          />
                          <span className="text-sm font-medium text-white">
                            {player.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center justify-center rounded-full bg-[#603BFF]/20 px-2 py-0.5 text-xs font-bold text-[#603BFF]">
                          {player.level}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-white">
                        {player.totalXP.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {player.wins}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Flame className="h-3.5 w-3.5 text-orange-500" />
                          <span className="text-sm font-medium text-white">
                            {player.streak}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span className="text-lg">💎</span>
                          <span className="text-sm font-medium text-white">
                            {player.rewards.toLocaleString()}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* School Rankings */}
          <div className="rounded-lg bg-[#0F1A36]">
            <div className="flex items-center justify-between border-b border-[#23315A]/40 px-5 py-4">
              <h2 className="text-base font-semibold text-white">
                School Rankings (NSMQ)
              </h2>
              <button className="text-sm text-[#603BFF] hover:underline">
                View All →
              </button>
            </div>
            <div className="divide-y divide-[#23315A]/10">
              {schools.map((school) => (
                <div
                  key={school.rank}
                  className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-[#0C1532]/60"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-[#AAB5D0]">
                      {school.rank}
                    </span>
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white",
                        school.color
                      )}
                    >
                      {school.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                    <span className="text-sm font-medium text-white">
                      {school.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-xs">
                    <div>
                      <p className="text-[#AAB5D0]/60">Total Points</p>
                      <p className="font-semibold text-white">
                        {school.totalPoints.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#AAB5D0]/60">Predictions</p>
                      <p className="font-semibold text-white">
                        {school.predictions}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#AAB5D0]/60">Win Rate</p>
                      <p className="font-semibold text-white">
                        {school.winRate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Squad Rankings */}
          <div className="rounded-lg bg-[#0F1A36]">
            <div className="flex items-center justify-between border-b border-[#23315A]/40 px-5 py-4">
              <h2 className="text-base font-semibold text-white">
                Squad Rankings
              </h2>
              <button className="text-sm text-[#603BFF] hover:underline">
                View All →
              </button>
            </div>
            <div className="divide-y divide-[#23315A]/10">
              {squads.map((squad) => (
                <div
                  key={squad.rank}
                  className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-[#0C1532]/60"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-[#AAB5D0]">
                      {squad.rank}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#603BFF]/20 text-lg">
                      👥
                    </span>
                    <span className="text-sm font-medium text-white">
                      {squad.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-xs">
                    <div>
                      <p className="text-[#AAB5D0]/60">Members</p>
                      <p className="font-semibold text-white">
                        {squad.members}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#AAB5D0]/60">Total XP</p>
                      <p className="font-semibold text-white">
                        {squad.totalXP.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      {squad.rank === 1 && (
                        <Crown className="h-4 w-4 text-yellow-400" />
                      )}
                      {squad.rank === 2 && (
                        <Trophy className="h-4 w-4 text-slate-400" />
                      )}
                      {squad.rank === 3 && (
                        <Trophy className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-4">
          {/* Your Progress */}
          <div className="rounded-lg bg-gradient-to-br from-[#603BFF]/20 to-[#0F1A36] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">
                Your Progress
              </h2>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#603BFF]">
                <span className="text-lg">👤</span>
              </div>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-white">
                Kwame Star
              </span>
              <span className="rounded-full bg-[#603BFF]/30 px-2 py-0.5 text-xs font-bold text-[#603BFF]">
                Level 3
              </span>
            </div>
            <p className="mb-3 text-xs text-[#AAB5D0]">520 / 1,000 XP</p>
            <div className="mb-4 h-2 overflow-hidden rounded-full bg-[#0C1532]">
              <div
                className="h-full rounded-full bg-[#603BFF]"
                style={{ width: "52%" }}
              />
            </div>

            <div className="space-y-2 border-t border-white/10 pt-3">
              <h3 className="text-xs font-semibold text-white">
                Next Level Rewards
              </h3>
              <div className="space-y-1 text-xs text-[#AAB5D0]">
                <p className="flex items-center gap-2">
                  <span className="text-base">💎</span> +500 Tokens
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-base">🎁</span> 1 Premium Pack
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-base">👥</span> Exclusive Squad Access
                </p>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="rounded-lg bg-[#0F1A36] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Badges</h2>
              <button className="text-sm text-[#603BFF] hover:underline">
                View All →
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {badges.map((badge, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg p-3",
                    badge.color
                  )}
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="text-center text-[10px] font-medium text-white">
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly XP Challenge */}
          <div className="rounded-lg border border-[#603BFF]/30 bg-gradient-to-br from-[#603BFF]/10 to-transparent p-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#603BFF]/20">
                <Target className="h-5 w-5 text-[#603BFF]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Weekly XP Challenge
                </h3>
                <p className="text-xs text-[#AAB5D0]">
                  Make 10 picks this week
                </p>
              </div>
            </div>
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-[#AAB5D0]">6/10</span>
              <span className="font-medium text-[#22C55E]">+300 XP</span>
            </div>
            <div className="mb-3 h-2 overflow-hidden rounded-full bg-[#0C1532]">
              <div
                className="h-full rounded-full bg-[#603BFF]"
                style={{ width: "60%" }}
              />
            </div>
            <Button size="sm" className="h-8 w-full text-xs">
              View Challenges
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
