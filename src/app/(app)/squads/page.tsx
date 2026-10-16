"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Users,
  Trophy,
  Star,
  TrendingUp,
  Crown,
  MoreVertical,
  UserPlus,
  Plus,
  Target,
  Gift,
  ArrowRight,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SquadTab = "my-squads" | "discover" | "leaderboards" | "challenges";

interface SquadMember {
  rank: number;
  name: string;
  level: number;
  xp: number;
  wins: number;
  lastActive: string;
  status: "online" | "offline";
  role: "leader" | "member";
}

interface Squad {
  rank: number;
  name: string;
  members: number;
  totalXP: number;
}

interface Challenge {
  id: number;
  title: string;
  progress: number;
  target: number;
  reward: string;
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const tabs: { key: SquadTab; label: string }[] = [
  { key: "my-squads", label: "My Squads" },
  { key: "discover", label: "Discover" },
  { key: "leaderboards", label: "Squad Leaderboards" },
  { key: "challenges", label: "Squad Challenges" },
];

const squadMembers: SquadMember[] = [
  { rank: 1, name: "Kwame Star", level: 3, xp: 4320, wins: 12, lastActive: "Online", status: "online", role: "leader" },
  { rank: 2, name: "Akua Profit", level: 3, xp: 3980, wins: 10, lastActive: "2h ago", status: "offline", role: "member" },
  { rank: 3, name: "BrightKing", level: 2, xp: 2760, wins: 8, lastActive: "4h ago", status: "offline", role: "member" },
  { rank: 4, name: "GameChanger", level: 1, xp: 1950, wins: 6, lastActive: "6h ago", status: "offline", role: "member" },
  { rank: 5, name: "SportsMaster", level: 1, xp: 1420, wins: 5, lastActive: "8h ago", status: "offline", role: "member" },
  { rank: 6, name: "NaijaPunter", level: 1, xp: 1230, wins: 4, lastActive: "12h ago", status: "offline", role: "member" },
  { rank: 7, name: "TheRealGuru", level: 1, xp: 980, wins: 3, lastActive: "1d ago", status: "offline", role: "member" },
];

const squadRankings: Squad[] = [
  { rank: 1, name: "The Dreamers", members: 32, totalXP: 28450 },
  { rank: 2, name: "Predictors United", members: 28, totalXP: 24780 },
  { rank: 3, name: "Campus Kings", members: 24, totalXP: 21320 },
  { rank: 4, name: "Weekend Warriors", members: 20, totalXP: 18760 },
  { rank: 5, name: "Sharp Minds", members: 18, totalXP: 15420 },
  { rank: 6, name: "The Underdogs", members: 22, totalXP: 12980 },
  { rank: 7, name: "Goal Getters", members: 16, totalXP: 10560 },
  { rank: 8, name: "Bet Builders", members: 14, totalXP: 8230 },
  { rank: 9, name: "NSMQ Legends", members: 19, totalXP: 6780 },
  { rank: 10, name: "Rising Stars", members: 12, totalXP: 5420 },
];

const allSquads: Squad[] = [
  { rank: 1, name: "The Dreamers", members: 32, totalXP: 28450 },
  { rank: 2, name: "Predictors United", members: 28, totalXP: 24780 },
  { rank: 3, name: "Campus Kings", members: 24, totalXP: 21320 },
  { rank: 4, name: "Weekend Warriors", members: 20, totalXP: 18760 },
  { rank: 5, name: "Sharp Minds", members: 18, totalXP: 15420 },
];

const challenges: Challenge[] = [
  { id: 1, title: "Make 50+ valid picks", progress: 32, target: 50, reward: "+500 XP" },
  { id: 2, title: "Win 5 matches in a row", progress: 3, target: 5, reward: "+750 XP" },
  { id: 3, title: "Grow your squad to 10 members", progress: 8, target: 10, reward: "+1,000 XP" },
];

const rewards = [
  { name: "Bonus Tokens", icon: "💎" },
  { name: "Exclusive Badges", icon: "🏆" },
  { name: "Squad XP Boosts", icon: "⚡" },
  { name: "Leaderboard Prizes", icon: "👑" },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SquadAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#603BFF] text-xs font-bold text-white">
      {initials}
    </span>
  );
}

function MemberAvatar({ name, level }: { name: string; level: number }) {
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

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SquadsPage() {
  const [activeTab, setActiveTab] = useState<SquadTab>("my-squads");

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
              <Users className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">Squads</h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">
                Create. Join. Compete. Win together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Tabs                                                        */}
      {/* ============================================================ */}
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

      {/* ============================================================ */}
      {/*  My Squads Tab                                               */}
      {/* ============================================================ */}
      {activeTab === "my-squads" && (
        <div className="space-y-5">
          {/* -------------------------------------------------------- */}
          {/*  Row 1: Your Squad | Stats | Quick Actions (one card)    */}
          {/* -------------------------------------------------------- */}
          <div className="rounded-lg bg-[#0F1A36] p-5">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto_auto]">
              {/* Your Squad info */}
              <div>
                <h2 className="mb-3 text-sm font-semibold text-[#AAB5D0]">Your Squad</h2>
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#603BFF]">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">The Dreamers</h3>
                    <p className="text-xs text-[#AAB5D0]">32 members · Level 4</p>
                  </div>
                </div>
                <p className="mb-4 text-xs text-[#AAB5D0]">Better picks. Bigger wins.</p>
                <Button size="sm" className="h-8 px-6">
                  View Squad
                </Button>
              </div>

              {/* Stats 2x2 */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-l border-[#23315A]/40 pl-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBBF24]/15">
                    <Star className="h-5 w-5 text-[#FBBF24]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#AAB5D0]">Squad XP</p>
                    <p className="text-lg font-bold text-white">18,760</p>
                    <p className="text-xs font-medium text-[#22C55E]">+320 this week</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBBF24]/15">
                    <Trophy className="h-5 w-5 text-[#FBBF24]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#AAB5D0]">Squad Rank</p>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-white">#12</p>
                      <span className="flex items-center gap-0.5 text-xs font-medium text-[#22C55E]">
                        <TrendingUp className="h-3 w-3" /> 3
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBBF24]/15">
                    <Trophy className="h-5 w-5 text-[#FBBF24]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#AAB5D0]">Total Wins</p>
                    <p className="text-lg font-bold text-white">42</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBBF24]/15">
                    <Target className="h-5 w-5 text-[#FBBF24]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#AAB5D0]">Win Rate</p>
                    <p className="text-lg font-bold text-white">76%</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border-l border-[#23315A]/40 pl-5">
                <h2 className="mb-3 text-sm font-semibold text-white">Quick Actions</h2>
                <div className="space-y-2">
                  <Button className="h-10 w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Create Squad
                  </Button>
                  <Button variant="outline" className="h-10 w-full gap-2">
                    <UserPlus className="h-4 w-4" />
                    Join Squad
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------- */}
          {/*  Row 2: My Squad Members | Squad Rankings                 */}
          {/* -------------------------------------------------------- */}
          <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
            {/* My Squad Members */}
            <div className="rounded-lg bg-[#0F1A36]">
              <div className="flex items-center justify-between border-b border-[#23315A]/40 px-5 py-4">
                <h2 className="text-base font-semibold text-white">My Squad Members</h2>
                <button className="text-sm text-[#603BFF] hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#23315A]/20">
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">#</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Member</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Level</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">XP</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Wins</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Last Active</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#23315A]/10">
                    {squadMembers.map((member) => (
                      <tr key={member.rank} className="transition-colors hover:bg-[#0C1532]/60">
                        <td className="px-4 py-3 text-sm font-medium text-white">{member.rank}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <MemberAvatar name={member.name} level={member.level} />
                            <span className="text-sm font-medium text-white">{member.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-white">Level {member.level}</td>
                        <td className="px-4 py-3 text-sm font-medium text-white">
                          {member.xp.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-white">{member.wins}</td>
                        <td className="px-4 py-3">
                          {member.status === "online" ? (
                            <span className="inline-flex items-center gap-1 text-xs text-[#22C55E]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                              Online
                            </span>
                          ) : (
                            <span className="text-xs text-[#AAB5D0]">{member.lastActive}</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {member.role === "leader" ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#22C55E]/15 px-2.5 py-0.5 text-[10px] font-semibold text-[#22C55E]">
                                Leader
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-[#AAB5D0]/10 px-2.5 py-0.5 text-[10px] font-medium text-[#AAB5D0]">
                                Member
                              </span>
                            )}
                            <button className="text-[#AAB5D0]/40 hover:text-white">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Squad Rankings */}
            <div className="rounded-lg bg-[#0F1A36]">
              <div className="flex items-center justify-between border-b border-[#23315A]/40 px-5 py-4">
                <h2 className="text-base font-semibold text-white">Squad Rankings</h2>
                <button className="text-sm text-[#603BFF] hover:underline">View All</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#23315A]/20">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">#</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Squad</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-[#AAB5D0]/60">Total XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#23315A]/10">
                  {squadRankings.map((squad) => (
                    <tr key={squad.rank} className="transition-colors hover:bg-[#0C1532]/60">
                      <td className="px-4 py-2.5">
                        {squad.rank <= 3 ? (
                          <Trophy className={cn(
                            "h-4 w-4",
                            squad.rank === 1 && "text-[#FBBF24]",
                            squad.rank === 2 && "text-slate-400",
                            squad.rank === 3 && "text-orange-500"
                          )} />
                        ) : (
                          <span className="text-sm text-[#AAB5D0]">{squad.rank}</span>
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <SquadAvatar name={squad.name} />
                          <span className="text-sm font-medium text-white">{squad.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-right text-sm font-medium text-white">
                        {squad.totalXP.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* -------------------------------------------------------- */}
          {/*  Row 3: All Squads | Squad Challenges | Squad Rewards     */}
          {/* -------------------------------------------------------- */}
          <div className="grid gap-5 lg:grid-cols-3">
            {/* All Squads */}
            <div className="rounded-lg bg-[#0F1A36]">
              <div className="flex items-center justify-between border-b border-[#23315A]/40 px-5 py-4">
                <h2 className="text-base font-semibold text-white">All Squads</h2>
                <button className="text-sm text-[#603BFF] hover:underline">View All</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#23315A]/20">
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#AAB5D0]/60">#</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-[#AAB5D0]/60">Squad</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-[#AAB5D0]/60">Members</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-[#AAB5D0]/60">Total XP</th>
                    <th className="w-14 px-4 py-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#23315A]/10">
                  {allSquads.map((squad) => (
                    <tr key={squad.rank} className="transition-colors hover:bg-[#0C1532]/60">
                      <td className="px-4 py-3 text-sm text-[#AAB5D0]">{squad.rank}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <SquadAvatar name={squad.name} />
                          <span className="text-sm font-medium text-white">{squad.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-white">{squad.members}</td>
                      <td className="px-4 py-3 text-right text-sm font-medium text-white">
                        {squad.totalXP.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button size="sm" className="h-7 px-3 text-xs">Join</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Squad Challenges */}
            <div className="rounded-lg bg-[#0F1A36] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-white">Squad Challenges</h2>
                <button className="text-sm text-[#603BFF] hover:underline">View All</button>
              </div>

              {/* Weekly Squad Battle */}
              <div className="mb-4 rounded-lg border border-[#603BFF]/30 bg-gradient-to-br from-[#603BFF]/10 to-transparent p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#603BFF]/20">
                    <Crown className="h-5 w-5 text-[#603BFF]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Weekly Squad Battle</h3>
                    <p className="text-xs text-[#AAB5D0]">
                      Climb the leaderboards with your squad and earn bonus tokens!
                    </p>
                  </div>
                </div>
                <Button size="sm" className="h-8 w-full text-xs">Join Now</Button>
              </div>

              {/* Active Challenges */}
              <h3 className="mb-3 text-xs font-semibold text-[#AAB5D0]">Active Challenges</h3>
              <div className="space-y-2.5">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="rounded-lg bg-[#0C1532] p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#AAB5D0]">{challenge.id}</span>
                        <p className="text-sm text-white">{challenge.title}</p>
                      </div>
                      <span className="whitespace-nowrap text-xs font-semibold text-[#22C55E]">
                        {challenge.reward}
                      </span>
                    </div>
                    <div className="mb-1 flex items-center justify-between text-xs text-[#AAB5D0]">
                      <span>
                        {challenge.progress}/{challenge.target}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[#0F1A36]">
                      <div
                        className="h-full rounded-full bg-[#603BFF]"
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Squad Rewards */}
            <div className="rounded-lg bg-gradient-to-br from-[#F59E0B]/10 to-[#0F1A36] p-5">
              <div className="mb-4 flex items-center gap-2">
                <Gift className="h-5 w-5 text-[#FBBF24]" />
                <h2 className="text-base font-semibold text-white">Squad Rewards</h2>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-2">
                {rewards.map((reward, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-lg bg-[#0F1A36]/60 px-3 py-2.5"
                  >
                    <span className="text-lg">{reward.icon}</span>
                    <span className="text-xs font-medium text-white">{reward.name}</span>
                  </div>
                ))}
              </div>
              <Button size="sm" className="h-8 w-full gap-1 text-xs">
                View Rewards
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Discover tab */}
      {activeTab === "discover" && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search squads..."
              className="h-11 w-full rounded-lg border border-[#23315A] bg-[#0C1532] px-4 pl-10 text-sm text-white outline-none transition-colors focus:border-[#603BFF]"
            />
            <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#AAB5D0]" />
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {["All", "Competitive", "Casual", "School", "Regional"].map((filter) => (
              <button
                key={filter}
                type="button"
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  filter === "All"
                    ? "bg-[#603BFF] text-white"
                    : "border border-[#23315A] bg-[#0C1532] text-[#AAB5D0] hover:border-[#603BFF]/40 hover:text-white"
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Squad cards grid */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { name: "Elite Predictors", level: 42, members: "18/20", winRate: "78%", xp: "125K", color: "bg-purple-600" },
              { name: "Ghana Stars", level: 38, members: "15/20", winRate: "72%", xp: "98K", color: "bg-yellow-500" },
              { name: "NSMQ Masters", level: 35, members: "12/20", winRate: "85%", xp: "87K", color: "bg-green-600" },
              { name: "Odds Wizards", level: 31, members: "16/20", winRate: "69%", xp: "76K", color: "bg-blue-600" },
              { name: "Premier Pickers", level: 28, members: "14/20", winRate: "74%", xp: "65K", color: "bg-red-600" },
              { name: "Victory Squad", level: 25, members: "10/20", winRate: "81%", xp: "54K", color: "bg-orange-600" },
            ].map((squad, idx) => (
              <div key={idx} className="rounded-lg bg-[#0F1A36] p-5">
                <div className="flex items-start gap-3">
                  <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-full", squad.color)}>
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-white">{squad.name}</h3>
                    <p className="text-xs text-[#AAB5D0]">Level {squad.level}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-[#AAB5D0]/60">Members</p>
                    <p className="text-sm font-semibold text-white">{squad.members}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#AAB5D0]/60">Win Rate</p>
                    <p className="text-sm font-semibold text-[#22C55E]">{squad.winRate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#AAB5D0]/60">Squad XP</p>
                    <p className="text-sm font-semibold text-white">{squad.xp}</p>
                  </div>
                </div>
                <Button className="mt-4 h-9 w-full text-sm">Join Squad</Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Squad Leaderboards tab */}
      {activeTab === "leaderboards" && (
        <div className="space-y-4">
          {/* Tab pills */}
          <div className="flex items-center gap-2">
            {["Overall", "Weekly", "Monthly"].map((period) => (
              <button
                key={period}
                type="button"
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  period === "Overall"
                    ? "bg-[#603BFF] text-white"
                    : "text-[#AAB5D0] hover:bg-white/5 hover:text-white"
                )}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Leaderboard table */}
          <div className="overflow-x-auto rounded-lg bg-[#0F1A36]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#23315A]/40">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">Rank</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">Squad</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">Members</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">Total XP</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">Win Rate</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">Wins</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#23315A]/20">
                {[
                  { rank: 1, name: "Elite Predictors", members: 18, xp: "125K", winRate: "78%", wins: 234, icon: "🥇" },
                  { rank: 2, name: "NSMQ Masters", members: 12, xp: "112K", winRate: "85%", wins: 198, icon: "🥈" },
                  { rank: 3, name: "Victory Squad", members: 10, xp: "98K", winRate: "81%", wins: 176, icon: "🥉" },
                  { rank: 4, name: "Ghana Stars", members: 15, xp: "87K", winRate: "72%", wins: 165 },
                  { rank: 5, name: "Odds Wizards", members: 16, xp: "76K", winRate: "69%", wins: 152 },
                  { rank: 6, name: "Premier Pickers", members: 14, xp: "65K", winRate: "74%", wins: 143 },
                  { rank: 7, name: "Accra United", members: 11, xp: "54K", winRate: "68%", wins: 128 },
                  { rank: 8, name: "Winners Circle", members: 13, xp: "48K", winRate: "71%", wins: 119 },
                  { rank: 9, name: "Smart Picks", members: 9, xp: "42K", winRate: "76%", wins: 102 },
                  { rank: 10, name: "The Analysts", members: 8, xp: "38K", winRate: "73%", wins: 95 },
                ].map((squad) => (
                  <tr key={squad.rank} className="transition-colors hover:bg-[#0C1532]/60">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {squad.rank <= 3 && (
                          <Trophy className={cn("h-4 w-4", squad.rank === 1 ? "text-[#FBBF24]" : squad.rank === 2 ? "text-[#AAB5D0]" : "text-[#CD7F32]")} />
                        )}
                        <span className="text-sm font-medium text-white">{squad.rank}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-white">{squad.name}</td>
                    <td className="px-4 py-3 text-sm text-[#AAB5D0]">{squad.members}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-white">{squad.xp}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-[#22C55E]">{squad.winRate}</td>
                    <td className="px-4 py-3 text-sm text-white">{squad.wins}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Squad Challenges tab */}
      {activeTab === "challenges" && (
        <div className="space-y-6">
          {/* Active challenges */}
          <div>
            <h2 className="mb-4 text-base font-semibold text-white">Active Challenges</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                { title: "Weekend Warriors", desc: "Predict 10 events this weekend", progress: 60, reward: "500", remaining: "2d 5h" },
                { title: "Perfect Streak", desc: "Get 5 predictions correct in a row", progress: 40, reward: "750", remaining: "4d 12h" },
                { title: "Squad Showdown", desc: "Beat 3 rival squads this week", progress: 33, reward: "1000", remaining: "6d 8h" },
              ].map((challenge, idx) => (
                <div key={idx} className="rounded-lg bg-[#0F1A36] p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-white">{challenge.title}</h3>
                      <p className="mt-1 text-xs text-[#AAB5D0]">{challenge.desc}</p>
                    </div>
                    <Trophy className="h-5 w-5 shrink-0 text-[#FBBF24]" />
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#AAB5D0]/60">Progress</span>
                      <span className="font-semibold text-white">{challenge.progress}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#0C1532]">
                      <div className="h-full rounded-full bg-[#603BFF]" style={{ width: `${challenge.progress}%` }} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Gift className="h-4 w-4 text-[#FBBF24]" />
                      <span className="text-sm font-semibold text-[#FBBF24]">{challenge.reward} TKN</span>
                    </div>
                    <span className="text-xs text-[#AAB5D0]/60">{challenge.remaining} left</span>
                  </div>
                  <Button size="sm" className="mt-4 h-8 w-full text-xs">View Challenge</Button>
                </div>
              ))}
            </div>
          </div>

          {/* Completed challenges */}
          <div>
            <h2 className="mb-4 text-base font-semibold text-white">Completed Challenges</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                { title: "First Blood", desc: "Win your first squad challenge", earned: "250" },
                { title: "Team Player", desc: "Make 20 predictions with your squad", earned: "500" },
                { title: "Undefeated", desc: "Go 7 days without a loss", earned: "1000" },
              ].map((challenge, idx) => (
                <div key={idx} className="rounded-lg bg-[#0F1A36] p-5 opacity-80">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-white">{challenge.title}</h3>
                      <p className="mt-1 text-xs text-[#AAB5D0]">{challenge.desc}</p>
                    </div>
                    <span className="shrink-0 text-2xl">✅</span>
                  </div>
                  <div className="mt-4 flex items-center gap-1">
                    <Gift className="h-4 w-4 text-[#22C55E]" />
                    <span className="text-sm font-semibold text-[#22C55E]">{challenge.earned} TKN earned</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
