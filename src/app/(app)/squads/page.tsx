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
  Award,
  Zap,
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
  canJoin?: boolean;
}

interface Challenge {
  id: number;
  title: string;
  progress: number;
  target: number;
  reward: string;
  icon: string;
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
  {
    rank: 1,
    name: "Kwame Star",
    level: 3,
    xp: 4320,
    wins: 12,
    lastActive: "Online",
    status: "online",
    role: "leader",
  },
  {
    rank: 2,
    name: "Akua Profit",
    level: 3,
    xp: 3980,
    wins: 10,
    lastActive: "2h ago",
    status: "offline",
    role: "member",
  },
  {
    rank: 3,
    name: "BrightKing",
    level: 2,
    xp: 2760,
    wins: 8,
    lastActive: "4h ago",
    status: "offline",
    role: "member",
  },
  {
    rank: 4,
    name: "GameChanger",
    level: 1,
    xp: 1950,
    wins: 6,
    lastActive: "6h ago",
    status: "offline",
    role: "member",
  },
  {
    rank: 5,
    name: "SportsMaster",
    level: 1,
    xp: 1420,
    wins: 5,
    lastActive: "8h ago",
    status: "offline",
    role: "member",
  },
  {
    rank: 6,
    name: "NajaPunter",
    level: 1,
    xp: 1230,
    wins: 4,
    lastActive: "12h ago",
    status: "offline",
    role: "member",
  },
  {
    rank: 7,
    name: "TheRealGuru",
    level: 1,
    xp: 980,
    wins: 3,
    lastActive: "1d ago",
    status: "offline",
    role: "member",
  },
];

const allSquads: Squad[] = [
  { rank: 1, name: "The Dreamers", members: 32, totalXP: 28450 },
  { rank: 2, name: "Predictors United", members: 28, totalXP: 24780 },
  { rank: 3, name: "Campus Kings", members: 24, totalXP: 21320 },
  { rank: 4, name: "Weekend Warriors", members: 20, totalXP: 18760 },
  { rank: 5, name: "Sharp Minds", members: 18, totalXP: 15420 },
];

const topSquads: Squad[] = [
  { rank: 1, name: "The Dreamers", members: 32, totalXP: 28450, canJoin: false },
  { rank: 2, name: "Predictors United", members: 28, totalXP: 24780, canJoin: true },
  { rank: 3, name: "Campus Kings", members: 24, totalXP: 21320, canJoin: true },
  { rank: 4, name: "Weekend Warriors", members: 20, totalXP: 18760, canJoin: true },
  { rank: 5, name: "Sharp Minds", members: 18, totalXP: 15420, canJoin: true },
];

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Make 50+ valid picks",
    progress: 32,
    target: 50,
    reward: "+500 XP",
    icon: "🎯",
  },
  {
    id: 2,
    title: "Win 5 matches in a row",
    progress: 3,
    target: 5,
    reward: "+750 XP",
    icon: "🔥",
  },
  {
    id: 3,
    title: "Grow your squad to 10 members",
    progress: 8,
    target: 10,
    reward: "+1,000 XP",
    icon: "👥",
  },
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
      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0F1A36] text-[9px] font-bold text-[#603BFF] ring-2 ring-[#0F1A36]">
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
              <Users className="h-6 w-6 text-[#603BFF]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Squads
              </h1>
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
        <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
          {/* Left: Squad info + Members */}
          <div className="space-y-4">
            {/* Your Squad Card */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-gradient-to-br from-[#603BFF]/20 to-[#0F1A36] p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#603BFF]">
                    <span className="text-2xl">👑</span>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">
                      The Dreamers
                    </h2>
                    <p className="text-xs text-[#AAB5D0]">
                      32 members · Level 4
                    </p>
                  </div>
                </div>
                <p className="mb-4 text-xs text-[#AAB5D0]">
                  Better picks. Bigger wins.
                </p>
                <Button size="sm" variant="outline" className="h-8 w-full">
                  View Squad
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-[#0F1A36] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <p className="text-xs text-[#AAB5D0]">Squad XP</p>
                  </div>
                  <p className="text-xl font-bold text-white">18,760</p>
                  <p className="text-xs font-medium text-[#22C55E]">
                    +320 this week
                  </p>
                </div>

                <div className="rounded-lg bg-[#0F1A36] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-400" />
                    <p className="text-xs text-[#AAB5D0]">Squad Rank</p>
                  </div>
                  <p className="text-xl font-bold text-white">#12</p>
                  <p className="flex items-center gap-1 text-xs font-medium text-[#22C55E]">
                    ↑ 3
                  </p>
                </div>

                <div className="rounded-lg bg-[#0F1A36] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-400" />
                    <p className="text-xs text-[#AAB5D0]">Total Wins</p>
                  </div>
                  <p className="text-xl font-bold text-white">42</p>
                </div>

                <div className="rounded-lg bg-[#0F1A36] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-[#603BFF]" />
                    <p className="text-xs text-[#AAB5D0]">Win Rate</p>
                  </div>
                  <p className="text-xl font-bold text-white">76%</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-lg bg-[#0F1A36] p-4">
              <h2 className="mb-3 text-sm font-semibold text-white">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <Button className="h-10 gap-2">
                  <Plus className="h-4 w-4" />
                  Create Squad
                </Button>
                <Button variant="outline" className="h-10 gap-2">
                  <UserPlus className="h-4 w-4" />
                  Join Squad
                </Button>
              </div>
            </div>

            {/* My Squad Members */}
            <div className="rounded-lg bg-[#0F1A36]">
              <div className="flex items-center justify-between border-b border-[#23315A]/40 px-5 py-4">
                <h2 className="text-base font-semibold text-white">
                  My Squad Members
                </h2>
                <button className="text-sm text-[#603BFF] hover:underline">
                  View All
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
                        Member
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                        Level
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                        XP
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                        Wins
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                        Last Active
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#23315A]/10">
                    {squadMembers.map((member) => (
                      <tr
                        key={member.rank}
                        className="transition-colors hover:bg-[#0C1532]/60"
                      >
                        <td className="px-4 py-3 text-sm font-medium text-white">
                          {member.rank}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <MemberAvatar
                              name={member.name}
                              level={member.level}
                            />
                            <div>
                              <p className="text-sm font-medium text-white">
                                {member.name}
                              </p>
                              {member.role === "leader" && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400/15 px-1.5 py-0.5 text-[9px] font-medium text-yellow-400">
                                  <Crown className="h-2.5 w-2.5" />
                                  Leader
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-white">
                          Level {member.level}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-white">
                          {member.xp.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-white">
                          {member.wins}
                        </td>
                        <td className="px-4 py-3 text-xs text-[#AAB5D0]">
                          {member.lastActive}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {member.status === "online" ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#22C55E]/15 px-2 py-0.5 text-xs font-medium text-[#22C55E]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                                Online
                              </span>
                            ) : (
                              <span className="text-xs text-[#AAB5D0]/50">
                                Member
                              </span>
                            )}
                            <button className="text-[#AAB5D0] hover:text-white">
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

            {/* All Squads / Squad Leaderboards */}
            <div className="rounded-lg bg-[#0F1A36]">
              <div className="flex items-center justify-between border-b border-[#23315A]/40 px-5 py-4">
                <h2 className="text-base font-semibold text-white">
                  All Squads
                </h2>
                <button className="text-sm text-[#603BFF] hover:underline">
                  View All
                </button>
              </div>
              <div className="divide-y divide-[#23315A]/10">
                {topSquads.map((squad) => (
                  <div
                    key={squad.rank}
                    className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-[#0C1532]/60"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-[#AAB5D0]">
                        {squad.rank}
                      </span>
                      <SquadAvatar name={squad.name} />
                      <span className="text-sm font-medium text-white">
                        {squad.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-xs">
                        <p className="text-[#AAB5D0]/60">Members</p>
                        <p className="font-semibold text-white">
                          {squad.members}
                        </p>
                      </div>
                      <div className="text-xs">
                        <p className="text-[#AAB5D0]/60">Total XP</p>
                        <p className="font-semibold text-white">
                          {squad.totalXP.toLocaleString()}
                        </p>
                      </div>
                      {squad.canJoin && (
                        <Button size="sm" className="h-7 px-4 text-xs">
                          Join
                        </Button>
                      )}
                      {squad.rank === 1 && (
                        <Crown className="h-4 w-4 text-yellow-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Squad Rankings + Challenges + Rewards */}
          <div className="space-y-4">
            {/* Squad Rankings */}
            <div className="rounded-lg bg-gradient-to-br from-[#603BFF]/20 to-[#0F1A36] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-white">
                  Squad Rankings
                </h2>
                <button className="text-sm text-[#603BFF] hover:underline">
                  View All
                </button>
              </div>
              <div className="space-y-2">
                {allSquads.slice(0, 10).map((squad) => (
                  <div
                    key={squad.rank}
                    className="flex items-center justify-between rounded-lg bg-[#0F1A36]/50 px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#AAB5D0]">
                        {squad.rank}
                      </span>
                      <SquadAvatar name={squad.name} />
                      <span className="text-sm font-medium text-white">
                        {squad.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {squad.totalXP.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Squad Challenges */}
            <div className="rounded-lg bg-[#0F1A36] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-white">
                  Squad Challenges
                </h2>
                <button className="text-sm text-[#603BFF] hover:underline">
                  View All
                </button>
              </div>

              {/* Weekly Squad Battle */}
              <div className="mb-4 rounded-lg border border-[#603BFF]/30 bg-gradient-to-br from-[#603BFF]/10 to-transparent p-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-2xl">👑</span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Weekly Squad Battle
                    </h3>
                    <p className="text-xs text-[#AAB5D0]">
                      Climb the leaderboards with your squad and earn bonus
                      tokens!
                    </p>
                  </div>
                </div>
                <Button size="sm" className="h-8 w-full text-xs">
                  Join Now
                </Button>
              </div>

              {/* Active Challenges */}
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#AAB5D0]/60">
                Active Challenges
              </h3>
              <div className="space-y-2">
                {challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="rounded-lg bg-[#0C1532] p-3"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{challenge.icon}</span>
                        <p className="text-sm font-medium text-white">
                          {challenge.title}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-[#22C55E]">
                        {challenge.reward}
                      </span>
                    </div>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-[#AAB5D0]">
                        {challenge.progress}/{challenge.target}
                      </span>
                      <span className="text-[#AAB5D0]">
                        {Math.round((challenge.progress / challenge.target) * 100)}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[#0F1A36]">
                      <div
                        className="h-full rounded-full bg-[#603BFF]"
                        style={{
                          width: `${(challenge.progress / challenge.target) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Squad Rewards */}
            <div className="rounded-lg bg-gradient-to-br from-[#F59E0B]/20 to-[#0F1A36] p-5">
              <div className="mb-3 flex items-center gap-2">
                <Gift className="h-5 w-5 text-[#F59E0B]" />
                <h2 className="text-base font-semibold text-white">
                  Squad Rewards
                </h2>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-2">
                {rewards.map((reward, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-lg bg-[#0F1A36]/50 px-3 py-2"
                  >
                    <span className="text-lg">{reward.icon}</span>
                    <span className="text-xs font-medium text-white">
                      {reward.name}
                    </span>
                  </div>
                ))}
              </div>
              <Button size="sm" className="h-8 w-full gap-1 text-xs">
                View Rewards
                <TrendingUp className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs placeholders */}
      {activeTab !== "my-squads" && (
        <div className="rounded-lg bg-[#0F1A36] px-6 py-12 text-center">
          <p className="text-[#AAB5D0]">
            {tabs.find((t) => t.key === activeTab)?.label} coming soon...
          </p>
        </div>
      )}
    </div>
  );
}
