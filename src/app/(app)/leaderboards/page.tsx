"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Trophy,
  Star,
  TrendingUp,
  Flame,
  Crown,
  ChevronDown,
  Target,
  ArrowRight,
  Award,
  Crosshair,
  Zap,
  GraduationCap,
  Volleyball,
  Circle,
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
}

interface School {
  rank: number;
  name: string;
  totalPoints: number;
  predictions: number;
  winRate: string;
  color: string;
}

interface Squad {
  rank: number;
  name: string;
  members: number;
  totalXP: number;
  rankIcon?: string;
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
  { rank: 1, name: "Kwame Star", level: 3, totalXP: 12480, wins: 98, streak: 8, rewards: 5000 },
  { rank: 2, name: "BrightKing", level: 11, totalXP: 11240, wins: 98, streak: 6, rewards: 4000 },
  { rank: 3, name: "GameChanger", level: 11, totalXP: 10320, wins: 81, streak: 6, rewards: 3500 },
  { rank: 4, name: "PredictPro", level: 10, totalXP: 9870, wins: 76, streak: 5, rewards: 3000 },
  { rank: 5, name: "SportsMaster", level: 9, totalXP: 8540, wins: 69, streak: 4, rewards: 2500 },
  { rank: 6, name: "NaijaPunters", level: 8, totalXP: 7980, wins: 63, streak: 4, rewards: 2000 },
  { rank: 7, name: "BetSmart", level: 8, totalXP: 7650, wins: 60, streak: 3, rewards: 2000 },
  { rank: 8, name: "KobbyPredicts", level: 7, totalXP: 6980, wins: 55, streak: 3, rewards: 1500 },
  { rank: 9, name: "TennisKing", level: 7, totalXP: 6540, wins: 52, streak: 2, rewards: 1200 },
  { rank: 10, name: "TheRealGuru", level: 6, totalXP: 6120, wins: 48, streak: 2, rewards: 1000 },
];

const podiumPlayers = [
  { ...topPlayers[0], xp: "2,480 XP" },
  { ...topPlayers[1], xp: "2,180 XP" },
  { ...topPlayers[2], xp: "1,920 XP" },
];

const schools: School[] = [
  { rank: 1, name: "Kumasi Academy", totalPoints: 3420, predictions: 21, winRate: "86%", color: "bg-yellow-500" },
  { rank: 2, name: "Prempeh College", totalPoints: 3210, predictions: 19, winRate: "84%", color: "bg-green-600" },
  { rank: 3, name: "Accra Academy", totalPoints: 2980, predictions: 17, winRate: "82%", color: "bg-blue-600" },
  { rank: 4, name: "St. Roses SHS", totalPoints: 2760, predictions: 16, winRate: "78%", color: "bg-red-600" },
  { rank: 5, name: "Wesley Girls", totalPoints: 2540, predictions: 15, winRate: "76%", color: "bg-pink-600" },
];

const squads: Squad[] = [
  { rank: 1, name: "The Dreamers", members: 32, totalXP: 28450, rankIcon: "🏆" },
  { rank: 2, name: "Predictors United", members: 28, totalXP: 24780 },
  { rank: 3, name: "Campus Kings", members: 24, totalXP: 21320 },
  { rank: 4, name: "Weekend Warriors", members: 20, totalXP: 18760 },
  { rank: 5, name: "Sharp Minds", members: 18, totalXP: 15420 },
];

const badges = [
  { name: "First Pick", Icon: Crosshair, color: "bg-yellow-500/15", iconColor: "text-yellow-400" },
  { name: "Live Legend", Icon: Zap, color: "bg-red-500/15", iconColor: "text-red-400" },
  { name: "NSMQ Fan", Icon: GraduationCap, color: "bg-purple-500/15", iconColor: "text-purple-400" },
  { name: "Football Guru", Icon: Trophy, color: "bg-green-500/15", iconColor: "text-green-400" },
  { name: "Basketball Pro", Icon: Volleyball, color: "bg-orange-500/15", iconColor: "text-orange-400" },
  { name: "Tennis Ace", Icon: Circle, color: "bg-yellow-500/15", iconColor: "text-yellow-400" },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

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
      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0F1A36] text-[9px] font-bold text-[#FBBF24] ring-2 ring-[#0F1A36]">
        {level}
      </span>
    </div>
  );
}

function PodiumPlayer({
  place,
  name,
  xp,
}: {
  place: 1 | 2 | 3;
  name: string;
  xp: string;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isFirst = place === 1;
  const isSecond = place === 2;

  const avatarSize = isFirst ? "h-28 w-28" : "h-22 w-22";
  const avatarBorder = isFirst
    ? "ring-[5px] ring-[#FBBF24]/40"
    : isSecond
      ? "ring-4 ring-slate-400/30"
      : "ring-4 ring-orange-500/30";
  const avatarBg = isFirst
    ? "bg-gradient-to-br from-[#FBBF24] to-[#F59E0B]"
    : isSecond
      ? "bg-gradient-to-br from-slate-300 to-slate-500"
      : "bg-gradient-to-br from-orange-400 to-orange-600";
  const textSize = isFirst ? "text-3xl" : "text-2xl";
  const nameSize = isFirst ? "text-lg font-bold" : "text-base font-semibold";
  const xpColor = isFirst ? "text-[#FBBF24]" : "text-[#AAB5D0]";

  const pedestalHeight = isFirst ? "h-36" : isSecond ? "h-24" : "h-18";
  const pedestalBg = isFirst
    ? "bg-gradient-to-t from-[#B8860B] to-[#FBBF24]"
    : isSecond
      ? "bg-gradient-to-t from-[#6B7280] to-[#9CA3AF]"
      : "bg-gradient-to-t from-[#92400E] to-[#D97706]";
  const placeTextColor = isFirst
    ? "text-[#FBBF24]"
    : isSecond
      ? "text-slate-300"
      : "text-orange-400";

  return (
    <div className="flex flex-col items-center">
      {/* Crown for 1st */}
      {isFirst && (
        <Crown className="mb-2 h-8 w-8 text-[#FBBF24]" />
      )}
      {/* Laurel + Avatar */}
      <div className="relative">
        {/* Laurel wreath effect */}
        <div className={cn("absolute -inset-3 rounded-full opacity-20", avatarBg)} />
        <div
          className={cn(
            "relative flex items-center justify-center rounded-full",
            avatarSize,
            avatarBg,
            avatarBorder
          )}
        >
          <span className={cn("font-bold text-white", textSize)}>
            {initials}
          </span>
        </div>
        {/* Place badge */}
        <div
          className={cn(
            "absolute -bottom-2 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#0F1A36] text-sm font-bold text-white",
            avatarBg
          )}
        >
          {place}
        </div>
      </div>
      {/* Name & XP */}
      <p className={cn("mt-5 text-center text-white", nameSize)}>{name}</p>
      <p className={cn("text-sm font-medium", xpColor)}>{xp}</p>

      {/* Pedestal */}
      <div
        className={cn(
          "mt-4 flex w-48 items-end justify-center rounded-t-xl",
          pedestalHeight,
          pedestalBg
        )}
      >
        <span className={cn("pb-3 text-3xl font-extrabold", placeTextColor)}>
          {place}
        </span>
      </div>
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
          <Image src="/images/hero.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A36] via-[#0F1A36]/80 to-transparent" />
        </div>
        <div className="relative px-6 py-7 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FBBF24]/15">
              <Trophy className="h-6 w-6 text-[#FBBF24]" />
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
        <div className="flex items-center gap-3 rounded-lg bg-[#0F1A36] px-4 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400/15">
            <Crown className="h-5 w-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-xs text-[#AAB5D0]">Your Rank</p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-white">#24</p>
              <span className="flex items-center gap-0.5 text-xs font-medium text-[#22C55E]">
                <TrendingUp className="h-3 w-3" /> 6
              </span>
            </div>
            <p className="text-xs text-[#AAB5D0]/60">in Overall Leaderboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-[#0F1A36] px-4 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400/15">
            <Star className="h-5 w-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-xs text-[#AAB5D0]">Total XP</p>
            <p className="text-lg font-bold text-white">2,480</p>
            <p className="flex items-center gap-1 text-xs font-medium text-[#22C55E]">
              +320 this week
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-[#0F1A36] px-4 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#22C55E]/15">
            <Target className="h-5 w-5 text-[#22C55E]" />
          </div>
          <div>
            <p className="text-xs text-[#AAB5D0]">Level 3</p>
            <p className="text-lg font-bold text-white">520 / 1,000 XP</p>
            <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-[#0C1532]">
              <div className="h-full w-[52%] rounded-full bg-[#22C55E]" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-[#0F1A36] px-4 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#603BFF]/15">
            <Award className="h-5 w-5 text-[#603BFF]" />
          </div>
          <div>
            <p className="text-xs text-[#AAB5D0]">Badges Earned</p>
            <p className="text-lg font-bold text-white">5/12</p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Top 3 Podium                                                */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-b from-[#1a1040] via-[#0F1A36] to-[#0F1A36] px-6 pb-0 pt-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#603BFF]/15 blur-3xl" />
          <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-[#FBBF24]/10 blur-3xl" />
        </div>
        <div className="relative">
          <h2 className="mb-10 flex items-center gap-2 text-xl font-bold text-white">
            <Crown className="h-6 w-6 text-[#FBBF24]" />
            Top 3 Players
          </h2>

          {/* Podium — 2nd, 1st, 3rd */}
          <div className="flex items-end justify-center gap-6">
            <PodiumPlayer place={2} name={podiumPlayers[1].name} xp={podiumPlayers[1].xp} />
            <PodiumPlayer place={1} name={podiumPlayers[0].name} xp={podiumPlayers[0].xp} />
            <PodiumPlayer place={3} name={podiumPlayers[2].name} xp={podiumPlayers[2].xp} />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Main content: Rankings + Sidebar                            */}
      {/* ============================================================ */}
      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        {/* Left column */}
        <div className="space-y-5">
          {/* Top Players table */}
          <div className="rounded-lg bg-[#0F1A36]">
            <div className="flex items-center justify-between border-b border-[#23315A]/40 px-5 py-4">
              <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                <Trophy className="h-4 w-4 text-[#FBBF24]" />
                Top Players (Overall)
              </h2>
              <button className="flex items-center gap-1 text-sm text-[#603BFF] hover:underline">
                View All <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#23315A]/20">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">#</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Player</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Level</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Total XP</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Wins</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Streak</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Rewards</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#23315A]/10">
                  {topPlayers.map((player) => (
                    <tr key={player.rank} className="transition-colors hover:bg-[#0C1532]/60">
                      <td className="px-4 py-3">
                        {player.rank <= 3 ? (
                          <span className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white",
                            player.rank === 1 && "bg-[#FBBF24]",
                            player.rank === 2 && "bg-slate-400",
                            player.rank === 3 && "bg-orange-500"
                          )}>
                            {player.rank}
                          </span>
                        ) : (
                          <span className="text-sm text-[#AAB5D0]">{player.rank}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <PlayerAvatar name={player.name} level={player.level} />
                          <span className="text-sm font-medium text-white">{player.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#603BFF] text-xs font-bold text-white">
                          {player.level}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-white">
                        {player.totalXP.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">{player.wins}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Flame className="h-3.5 w-3.5 text-orange-500" />
                          <span className="text-sm font-medium text-white">{player.streak}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span className="text-sm">💎</span>
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

          {/* Bottom row: School Rankings + Squad Rankings side by side */}
          <div className="grid gap-5 lg:grid-cols-2">
            {/* School Rankings (NSMQ) */}
            <div className="rounded-lg bg-[#0F1A36]">
              <div className="flex items-center justify-between border-b border-[#23315A]/40 px-5 py-4">
                <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                  <Trophy className="h-4 w-4 text-[#FBBF24]" />
                  School Rankings (NSMQ)
                </h2>
                <button className="flex items-center gap-1 text-sm text-[#603BFF] hover:underline">
                  View All <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#23315A]/20">
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#AAB5D0]/60">#</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#AAB5D0]/60">School</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-[#AAB5D0]/60">Total Points</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-[#AAB5D0]/60">Predictions</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-[#AAB5D0]/60">Win Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#23315A]/10">
                  {schools.map((school) => (
                    <tr key={school.rank} className="transition-colors hover:bg-[#0C1532]/60">
                      <td className="px-4 py-3 text-sm text-[#AAB5D0]">{school.rank}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={cn("flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white", school.color)}>
                            {school.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                          </span>
                          <span className="text-sm font-medium text-white">{school.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-medium text-white">{school.totalPoints.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-sm text-white">{school.predictions}</td>
                      <td className="px-4 py-3 text-right text-sm text-white">{school.winRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Squad Rankings */}
            <div className="rounded-lg bg-[#0F1A36]">
              <div className="flex items-center justify-between border-b border-[#23315A]/40 px-5 py-4">
                <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                  <Trophy className="h-4 w-4 text-[#FBBF24]" />
                  Squad Rankings
                </h2>
                <button className="flex items-center gap-1 text-sm text-[#603BFF] hover:underline">
                  View All <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#23315A]/20">
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#AAB5D0]/60">#</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#AAB5D0]/60">Squad</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-[#AAB5D0]/60">Members</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-[#AAB5D0]/60">Total XP</th>
                    <th className="w-10 px-4 py-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#23315A]/10">
                  {squads.map((squad) => (
                    <tr key={squad.rank} className="transition-colors hover:bg-[#0C1532]/60">
                      <td className="px-4 py-3 text-sm text-[#AAB5D0]">{squad.rank}</td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-white">{squad.name}</span>
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-white">{squad.members}</td>
                      <td className="px-4 py-3 text-right text-sm font-medium text-white">{squad.totalXP.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        {squad.rank === 1 && <Crown className="inline h-4 w-4 text-[#FBBF24]" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Your Progress */}
          <div className="rounded-lg bg-[#0F1A36] p-5">
            <h2 className="mb-4 text-base font-semibold text-white">Your Progress</h2>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#603BFF] text-sm font-bold text-white">
                KS
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Kwame Star</p>
                  <span className="text-xs text-[#AAB5D0]">520 / 1,000 XP</span>
                </div>
                <p className="text-xs text-[#AAB5D0]">Level 3</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#0C1532]">
                  <div className="h-full w-[52%] rounded-full bg-[#FBBF24]" />
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t border-white/10 pt-3">
              <h3 className="text-xs font-semibold text-white">Next Level Rewards</h3>
              <div className="space-y-1.5 text-xs text-[#AAB5D0]">
                <p className="flex items-center gap-2">
                  <span className="text-sm">💎</span> +500 Tokens
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-sm">🏅</span> 1 Rare Badge
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-sm">👥</span> Exclusive Squad Access
                </p>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="rounded-lg bg-[#0F1A36] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Badges</h2>
              <button className="flex items-center gap-1 text-sm text-[#603BFF] hover:underline">
                View All <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {badges.map((badge, idx) => (
                <div
                  key={idx}
                  className={cn("flex flex-col items-center gap-2 rounded-lg p-3", badge.color)}
                >
                  <badge.Icon className={cn("h-6 w-6", badge.iconColor)} />
                  <span className="text-center text-[10px] font-medium text-white">
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly XP Challenge */}
          <div className="rounded-lg bg-gradient-to-br from-[#FBBF24]/10 via-[#0F1A36] to-[#0F1A36] p-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBBF24]/20">
                <Target className="h-5 w-5 text-[#FBBF24]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Weekly XP Challenge</h3>
                <p className="text-xs text-[#AAB5D0]">Make 10 valid picks this week</p>
              </div>
            </div>
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-[#AAB5D0]">6/10</span>
              <span className="font-medium text-[#22C55E]">+300 XP</span>
            </div>
            <div className="mb-3 h-2 overflow-hidden rounded-full bg-[#0C1532]">
              <div className="h-full w-[60%] rounded-full bg-[#FBBF24]" />
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
