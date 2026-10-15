"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Ticket,
  Trophy,
  Target,
  Coins,
  Clock,
  MoreVertical,
  CheckCircle,
  XCircle,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type PickTab = "active" | "settled" | "history";

interface ActivePick {
  id: string;
  sport: string;
  sportIcon: string;
  competition: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  homeColor: string;
  awayColor: string;
  market: string;
  marketDetail: string;
  odds: number;
  stake: number;
  potentialReturn: number;
  returnPct: string;
  timeRemaining: string;
  status: "pending";
}

interface SettledPick {
  date: string;
  time: string;
  event: string;
  league: string;
  market: string;
  pick: string;
  odds: number;
  stake: number;
  return: number;
  status: "won" | "lost";
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const activePicks: ActivePick[] = [
  {
    id: "1",
    sport: "Football",
    sportIcon: "⚽",
    competition: "Premier League · Today, 4:30 PM",
    time: "Today, 4:30 PM",
    homeTeam: "Man City",
    awayTeam: "Arsenal",
    homeColor: "bg-sky-500",
    awayColor: "bg-red-600",
    market: "Market",
    marketDetail: "1X2 - Man City",
    odds: 1.72,
    stake: 100,
    potentialReturn: 172,
    returnPct: "+72%",
    timeRemaining: "02h 15m 32s",
    status: "pending",
  },
  {
    id: "2",
    sport: "Basketball",
    sportIcon: "🏀",
    competition: "NBA · Today, 11:30 PM",
    time: "Today, 11:30 PM",
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    homeColor: "bg-purple-600",
    awayColor: "bg-blue-600",
    market: "Market",
    marketDetail: "Total Points - Over 224.5",
    odds: 1.9,
    stake: 75,
    potentialReturn: 142.5,
    returnPct: "+90%",
    timeRemaining: "08h 45m 18s",
    status: "pending",
  },
  {
    id: "3",
    sport: "Tennis",
    sportIcon: "🎾",
    competition: "Wimbledon · Today, 1:00 PM",
    time: "Today, 1:00 PM",
    homeTeam: "Alcaraz",
    awayTeam: "Sinner",
    homeColor: "bg-red-500",
    awayColor: "bg-orange-500",
    market: "Market",
    marketDetail: "Match Winner - Alcaraz",
    odds: 1.65,
    stake: 120,
    potentialReturn: 198,
    returnPct: "+65%",
    timeRemaining: "1d 0h 15m",
    status: "pending",
  },
  {
    id: "4",
    sport: "NSMQ",
    sportIcon: "🎓",
    competition: "NSMQ 2027 · Round 3 · Today, 10:00 AM",
    time: "Today, 10:00 AM",
    homeTeam: "Kumasi Academy",
    awayTeam: "Prempeh College",
    homeColor: "bg-yellow-500",
    awayColor: "bg-green-600",
    market: "Market",
    marketDetail: "1X2 - Kumasi Academy",
    odds: 1.78,
    stake: 50,
    potentialReturn: 89,
    returnPct: "+78%",
    timeRemaining: "06h 25m 12s",
    status: "pending",
  },
];

const settledPicks: SettledPick[] = [
  {
    date: "16 Oct 2026",
    time: "08:45 PM",
    event: "Liverpool vs Chelsea",
    league: "Football · Premier League",
    market: "1X2",
    pick: "Liverpool",
    odds: 1.78,
    stake: 80,
    return: 158.4,
    status: "won",
  },
  {
    date: "15 Oct 2026",
    time: "07:30 PM",
    event: "Real Madrid vs Barcelona",
    league: "Football · La Liga",
    market: "Both Teams to Score",
    pick: "Yes",
    odds: 1.72,
    stake: 60,
    return: 103.2,
    status: "won",
  },
  {
    date: "14 Oct 2026",
    time: "06:15 PM",
    event: "Celtics vs Heat",
    league: "Basketball · NBA",
    market: "Over/Under 2.5",
    pick: "Over 2.5",
    odds: 1.85,
    stake: 70,
    return: 129.5,
    status: "won",
  },
  {
    date: "13 Oct 2026",
    time: "09:00 PM",
    event: "Wesley Girls vs Accra Academy",
    league: "NSMQ · Round 3",
    market: "1X2",
    pick: "Wesley Girls",
    odds: 1.95,
    stake: 50,
    return: 0,
    status: "lost",
  },
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
  action,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-[#0F1A36] px-5 py-4">
      <div className="flex items-center gap-3">
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
          <p className="text-xl font-bold text-white">{value}</p>
          {subtitle && <p className="text-xs text-[#AAB5D0]/60">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

function TeamAvatar({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold",
        color,
        color.includes("sky") || color.includes("yellow")
          ? "text-neutral-800"
          : "text-white"
      )}
    >
      {initials}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PicksPage() {
  const [activeTab, setActiveTab] = useState<PickTab>("active");

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
              <Ticket className="h-6 w-6 text-[#603BFF]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                My Picks
              </h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">
                Track your predictions, view results and manage your picks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Tabs + Filter                                               */}
      {/* ============================================================ */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("active")}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-colors",
              activeTab === "active"
                ? "bg-[#603BFF] text-white"
                : "text-[#AAB5D0] hover:bg-white/5 hover:text-white"
            )}
          >
            Active Picks{" "}
            <span
              className={cn(
                "ml-1.5 rounded-full px-1.5 py-0.5 text-xs",
                activeTab === "active"
                  ? "bg-white/20"
                  : "bg-[#603BFF]/20 text-[#603BFF]"
              )}
            >
              4
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("settled")}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-colors",
              activeTab === "settled"
                ? "bg-[#603BFF] text-white"
                : "text-[#AAB5D0] hover:bg-white/5 hover:text-white"
            )}
          >
            Settled{" "}
            <span
              className={cn(
                "ml-1.5 rounded-full px-1.5 py-0.5 text-xs",
                activeTab === "settled"
                  ? "bg-white/20"
                  : "bg-[#603BFF]/20 text-[#603BFF]"
              )}
            >
              12
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("history")}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-colors",
              activeTab === "history"
                ? "bg-[#603BFF] text-white"
                : "text-[#AAB5D0] hover:bg-white/5 hover:text-white"
            )}
          >
            Pick History
          </button>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-[#23315A] bg-[#0C1532] px-4 py-2 text-sm text-white transition-colors hover:border-[#603BFF]/50"
        >
          Last 7 days
          <ChevronDown className="h-3.5 w-3.5 text-[#AAB5D0]/60" />
        </button>
      </div>

      {/* ============================================================ */}
      {/*  Stats cards                                                 */}
      {/* ============================================================ */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Coins className="h-5 w-5 text-yellow-400" />}
          iconBg="bg-yellow-400/15"
          label="Total Staked"
          value="450"
          subtitle="Across 6 active picks"
        />
        <StatCard
          icon={<Trophy className="h-5 w-5 text-yellow-400" />}
          iconBg="bg-yellow-400/15"
          label="Potential Return"
          value="1,240"
          subtitle="+176%"
        />
        <StatCard
          icon={<Target className="h-4 w-4 text-[#603BFF]" />}
          iconBg="bg-[#603BFF]/15"
          label="Win Rate"
          value="75%"
          subtitle="(3/4)"
        />
        <StatCard
          icon={<Coins className="h-5 w-5 text-yellow-400" />}
          iconBg="bg-yellow-400/15"
          label="Current Balance"
          value="1,250"
          action={
            <Button size="sm" className="h-8 px-4 text-xs">
              Top Up
            </Button>
          }
        />
      </div>

      {/* ============================================================ */}
      {/*  Active Picks                                                */}
      {/* ============================================================ */}
      {activeTab === "active" && (
        <div>
          <h2 className="mb-4 text-base font-semibold text-white">
            Active Picks ({activePicks.length})
          </h2>
          <div className="space-y-3">
            {activePicks.map((pick) => (
              <div
                key={pick.id}
                className="rounded-lg bg-[#0F1A36] p-4 transition-colors hover:bg-[#162042]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    {/* Sport icon */}
                    <span className="text-3xl">{pick.sportIcon}</span>

                    {/* Pick details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">
                          {pick.sport}
                        </span>
                      </div>
                      <p className="text-xs text-[#AAB5D0]/60">
                        {pick.competition}
                      </p>

                      {/* Teams */}
                      <div className="mt-3 flex items-center gap-2">
                        <TeamAvatar
                          name={pick.homeTeam}
                          color={pick.homeColor}
                        />
                        <span className="text-xs text-[#AAB5D0]/60">vs</span>
                        <TeamAvatar
                          name={pick.awayTeam}
                          color={pick.awayColor}
                        />
                      </div>

                      {/* Pick info grid */}
                      <div className="mt-3 grid grid-cols-4 gap-3">
                        <div>
                          <p className="text-[10px] text-[#AAB5D0]/60">
                            {pick.market}
                          </p>
                          <p className="text-sm font-medium text-white">
                            {pick.marketDetail}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-[#AAB5D0]/60">Odds</p>
                          <p className="text-sm font-medium text-white">
                            {pick.odds.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-[#AAB5D0]/60">Stake</p>
                          <div className="flex items-center gap-1">
                            <Coins className="h-3 w-3 text-yellow-400" />
                            <p className="text-sm font-medium text-white">
                              {pick.stake}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] text-[#AAB5D0]/60">
                            Potential Return
                          </p>
                          <p className="text-sm font-semibold text-white">
                            {pick.potentialReturn}
                          </p>
                          <p className="text-xs text-[#22C55E]">
                            {pick.returnPct}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side: Time + Actions */}
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#AAB5D0]">
                      <Clock className="h-3 w-3" />
                      {pick.timeRemaining}
                    </div>
                    <span className="rounded-full bg-[#F59E0B]/15 px-2.5 py-1 text-xs font-medium text-[#F59E0B]">
                      Pending
                    </span>
                    <div className="mt-2 flex items-center gap-2">
                      <Button size="sm" className="h-8 px-4 text-xs">
                        View Details
                      </Button>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-[#AAB5D0] transition-colors hover:bg-white/5 hover:text-white"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/*  Settled Picks Table                                         */}
      {/* ============================================================ */}
      {activeTab === "settled" && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">
              Recent Settled Picks
            </h2>
            <button className="text-sm text-[#603BFF] hover:underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg bg-[#0F1A36]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#23315A]/40">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                    Date & Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                    Event
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                    Market
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                    Pick
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                    Odds
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                    Stake
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                    Return
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#AAB5D0]/60">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#23315A]/20">
                {settledPicks.map((pick, idx) => (
                  <tr
                    key={idx}
                    className="transition-colors hover:bg-[#0C1532]/60"
                  >
                    <td className="px-4 py-3">
                      <p className="text-xs font-medium text-[#AAB5D0]">
                        {pick.date}
                      </p>
                      <p className="text-xs text-[#AAB5D0]/50">{pick.time}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-white">{pick.event}</p>
                      <p className="text-xs text-[#AAB5D0]/60">
                        {pick.league}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-white">
                      {pick.market}
                    </td>
                    <td className="px-4 py-3 text-sm text-white">
                      {pick.pick}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-white">
                      {pick.odds.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Coins className="h-3 w-3 text-yellow-400" />
                        <span className="text-sm font-medium text-white">
                          {pick.stake}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-white">
                      {pick.return > 0 ? pick.return.toFixed(1) : pick.return}
                    </td>
                    <td className="px-4 py-3">
                      {pick.status === "won" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#22C55E]/15 px-2.5 py-1 text-xs font-medium text-[#22C55E]">
                          Won
                          <CheckCircle className="h-3 w-3" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2.5 py-1 text-xs font-medium text-red-500">
                          Lost
                          <XCircle className="h-3 w-3" />
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pick History tab placeholder */}
      {activeTab === "history" && (
        <div className="rounded-lg bg-[#0F1A36] px-6 py-12 text-center">
          <p className="text-[#AAB5D0]">Pick history coming soon...</p>
        </div>
      )}
    </div>
  );
}
