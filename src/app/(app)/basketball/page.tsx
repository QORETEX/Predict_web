"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  CircleDot,
  Layers,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePickSlip } from "@/contexts/pick-slip-context";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type LeagueFilter = "all" | "nba" | "euroleague" | "ncaa" | "fiba" | "other";
type MarketTab =
  | "1x2"
  | "over-under"
  | "btts"
  | "double-chance"
  | "handicap"
  | "total-points";

interface MatchRow {
  date: string;
  time: string;
  isLive: boolean;
  homeTeam: string;
  awayTeam: string;
  homeColor: string;
  awayColor: string;
  odds1x2: { home: number; draw: number; away: number };
  oddsOU: { over: number; under: number };
  yourPick: { value: string; multiplier: string };
  poolMultiplier: string;
  estReturn: string;
}

interface LeagueGroup {
  id: string;
  name: string;
  subtitle: string;
  logo: string;
  accentColor: string;
  filter: LeagueFilter;
  isLive: boolean;
  matchCount: number;
  matches: MatchRow[];
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const leagueFilters: {
  key: LeagueFilter;
  label: string;
  count: number;
  logo: string;
}[] = [
  { key: "all", label: "All", count: 32, logo: "" },
  { key: "nba", label: "NBA", count: 12, logo: "" },
  { key: "euroleague", label: "EuroLeague", count: 6, logo: "" },
  { key: "ncaa", label: "NCAA", count: 8, logo: "" },
  { key: "fiba", label: "FIBA", count: 4, logo: "" },
  { key: "other", label: "Other", count: 2, logo: "" },
];

const marketTabs: { key: MarketTab; label: string }[] = [
  { key: "1x2", label: "1X2" },
  { key: "over-under", label: "Over/Under" },
  { key: "btts", label: "Both Teams to Score" },
  { key: "double-chance", label: "Double Chance" },
  { key: "handicap", label: "Handicap" },
  { key: "total-points", label: "Total Points" },
];

const leagues: LeagueGroup[] = [
  {
    id: "nba",
    name: "NBA",
    subtitle: "National Basketball Association",
    logo: "",
    accentColor: "border-l-[#EF4444]",
    filter: "nba",
    isLive: true,
    matchCount: 7,
    matches: [
      {
        date: "17 Oct 2026",
        time: "07:30 PM",
        isLive: true,
        homeTeam: "Lakers",
        awayTeam: "Warriors",
        homeColor: "bg-purple-600",
        awayColor: "bg-blue-600",
        odds1x2: { home: 1.72, draw: 15.0, away: 2.08 },
        oddsOU: { over: 1.85, under: 1.95 },
        yourPick: { value: "1.72", multiplier: "+9%" },
        poolMultiplier: "124.5K",
        estReturn: "214.1K",
      },
      {
        date: "17 Oct 2026",
        time: "08:00 PM",
        isLive: true,
        homeTeam: "Celtics",
        awayTeam: "Heat",
        homeColor: "bg-green-700",
        awayColor: "bg-red-600",
        odds1x2: { home: 2.1, draw: 14.5, away: 1.76 },
        oddsOU: { over: 1.9, under: 1.9 },
        yourPick: { value: "1.90", multiplier: "+7%" },
        poolMultiplier: "98.3K",
        estReturn: "186.6K",
      },
      {
        date: "18 Oct 2026",
        time: "01:30 PM",
        isLive: false,
        homeTeam: "Bulls",
        awayTeam: "Knicks",
        homeColor: "bg-red-600",
        awayColor: "bg-blue-700",
        odds1x2: { home: 2.45, draw: 13.0, away: 1.58 },
        oddsOU: { over: 1.75, under: 2.05 },
        yourPick: { value: "1.58", multiplier: "+11%" },
        poolMultiplier: "76.4K",
        estReturn: "120.8K",
      },
      {
        date: "18 Oct 2026",
        time: "04:00 AM",
        isLive: false,
        homeTeam: "Mavericks",
        awayTeam: "Nuggets",
        homeColor: "bg-blue-700",
        awayColor: "bg-yellow-500",
        odds1x2: { home: 2.18, draw: 13.5, away: 1.68 },
        oddsOU: { over: 1.82, under: 1.98 },
        yourPick: { value: "1.68", multiplier: "+7%" },
        poolMultiplier: "71.4K",
        estReturn: "119.1K",
      },
    ],
  },
  {
    id: "euroleague",
    name: "EuroLeague",
    subtitle: "EuroLeague Basketball",
    logo: "",
    accentColor: "border-l-[#F59E0B]",
    filter: "euroleague",
    isLive: true,
    matchCount: 5,
    matches: [
      {
        date: "17 Oct 2026",
        time: "07:00 PM",
        isLive: true,
        homeTeam: "Real Madrid",
        awayTeam: "Fenerbahce",
        homeColor: "bg-white",
        awayColor: "bg-yellow-500",
        odds1x2: { home: 1.85, draw: 15.0, away: 1.95 },
        oddsOU: { over: 1.88, under: 1.92 },
        yourPick: { value: "1.95", multiplier: "+9%" },
        poolMultiplier: "89.7K",
        estReturn: "175.3K",
      },
      {
        date: "17 Oct 2026",
        time: "08:45 PM",
        isLive: true,
        homeTeam: "Panathinaikos",
        awayTeam: "Olympiacos",
        homeColor: "bg-green-600",
        awayColor: "bg-red-600",
        odds1x2: { home: 2.05, draw: 14.0, away: 1.72 },
        oddsOU: { over: 1.8, under: 2.0 },
        yourPick: { value: "1.72", multiplier: "+6%" },
        poolMultiplier: "82.2K",
        estReturn: "141.5K",
      },
      {
        date: "18 Oct 2026",
        time: "06:00 PM",
        isLive: false,
        homeTeam: "Barcelona",
        awayTeam: "AS Monaco",
        homeColor: "bg-blue-800",
        awayColor: "bg-red-700",
        odds1x2: { home: 1.78, draw: 15.5, away: 2.02 },
        oddsOU: { over: 1.92, under: 1.88 },
        yourPick: { value: "1.78", multiplier: "+6%" },
        poolMultiplier: "67.8K",
        estReturn: "117.9K",
      },
    ],
  },
  {
    id: "ncaa",
    name: "NCAA",
    subtitle: "College Basketball",
    logo: "",
    accentColor: "border-l-[#3B82F6]",
    filter: "ncaa",
    isLive: false,
    matchCount: 5,
    matches: [
      {
        date: "17 Oct 2026",
        time: "07:30 PM",
        isLive: true,
        homeTeam: "Duke",
        awayTeam: "UNC",
        homeColor: "bg-blue-700",
        awayColor: "bg-sky-400",
        odds1x2: { home: 1.68, draw: 16.0, away: 2.25 },
        oddsOU: { over: 1.8, under: 2.0 },
        yourPick: { value: "2.25", multiplier: "+8%" },
        poolMultiplier: "65.4K",
        estReturn: "147.2K",
      },
      {
        date: "17 Oct 2026",
        time: "09:00 PM",
        isLive: true,
        homeTeam: "Kansas",
        awayTeam: "Iowa State",
        homeColor: "bg-blue-600",
        awayColor: "bg-red-600",
        odds1x2: { home: 1.92, draw: 14.5, away: 1.88 },
        oddsOU: { over: 1.85, under: 1.95 },
        yourPick: { value: "1.92", multiplier: "+7%" },
        poolMultiplier: "59.3K",
        estReturn: "113.6K",
      },
    ],
  },
  {
    id: "fiba",
    name: "FIBA",
    subtitle: "International Basketball",
    logo: "",
    accentColor: "border-l-[#22C55E]",
    filter: "fiba",
    isLive: false,
    matchCount: 4,
    matches: [
      {
        date: "17 Oct 2026",
        time: "05:00 PM",
        isLive: true,
        homeTeam: "Spain",
        awayTeam: "France",
        homeColor: "bg-red-600",
        awayColor: "bg-blue-700",
        odds1x2: { home: 1.76, draw: 15.5, away: 2.08 },
        oddsOU: { over: 1.82, under: 1.98 },
        yourPick: { value: "1.76", multiplier: "+10%" },
        poolMultiplier: "48.7K",
        estReturn: "92.6K",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function LiveBadge() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-red-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
      Live
    </span>
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
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold",
        color,
        color === "bg-white" || color === "bg-slate-100" || color === "bg-sky-400"
          ? "text-neutral-800"
          : "text-white"
      )}
    >
      {initials}
    </span>
  );
}

function LeagueLogo({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A2747] text-[10px] font-bold text-[#AAB5D0]">
      {initials}
    </span>
  );
}

function OddsCell({ value }: { value: number }) {
  return (
    <span className="flex h-8 w-full items-center justify-center rounded-md border border-[#23315A] bg-[#0C1532] text-xs font-semibold text-white transition-colors hover:border-[#603BFF]/50">
      {value.toFixed(2)}
    </span>
  );
}

const TABLE_GRID =
  "grid-cols-[100px_minmax(180px,1fr)_repeat(3,52px)_repeat(2,52px)_72px_80px_90px_120px]";

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BasketballPage() {
  const { openPickSlip } = usePickSlip();
  const [activeLeague, setActiveLeague] = useState<LeagueFilter>("all");
  const [activeMarket, setActiveMarket] = useState<MarketTab>("1x2");
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    new Set()
  );

  function toggleGroup(id: string) {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const filtered =
    activeLeague === "all"
      ? leagues
      : leagues.filter((l) => l.filter === activeLeague);

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
            <div className="relative h-12 w-12 shrink-0">
              <span className="text-5xl">🏀</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Basketball
              </h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">
                High stakes. Bigger rewards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  League filter pills                                         */}
      {/* ============================================================ */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {leagueFilters.map(({ key, label, count }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveLeague(key)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeLeague === key
                ? "bg-[#603BFF] text-white"
                : "border border-[#23315A] bg-[#0C1532] text-[#AAB5D0] hover:border-[#603BFF]/40 hover:text-white"
            )}
          >
            {key === "all" && <Layers className="h-3.5 w-3.5" />}
            {label} ({count})
          </button>
        ))}
      </div>

      {/* ============================================================ */}
      {/*  Market type tabs                                            */}
      {/* ============================================================ */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {marketTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveMarket(tab.key)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeMarket === tab.key
                ? "bg-[#603BFF] text-white"
                : "text-[#AAB5D0] hover:bg-white/5 hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
        <button
          type="button"
          className="flex shrink-0 items-center gap-1 px-3 py-2 text-sm text-[#AAB5D0] hover:text-white"
        >
          More <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ============================================================ */}
      {/*  League groups with match tables                             */}
      {/* ============================================================ */}
      <div className="space-y-4">
        {filtered.map((league) => {
          const isCollapsed = collapsedGroups.has(league.id);
          return (
            <div key={league.id} className="rounded-lg bg-[#0F1A36]">
              {/* League header */}
              <button
                type="button"
                onClick={() => toggleGroup(league.id)}
                className={cn(
                  "flex w-full items-center gap-3 border-l-[3px] px-5 py-3.5 text-left transition-colors hover:bg-white/[0.02]",
                  league.accentColor
                )}
              >
                <LeagueLogo name={league.name} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">
                      {league.name}
                    </span>
                    {league.isLive && <LiveBadge />}
                  </div>
                  <p className="text-xs text-[#AAB5D0]/60">
                    {league.subtitle}
                  </p>
                </div>
                <span className="ml-auto flex shrink-0 items-center gap-1 text-xs text-[#AAB5D0]/60">
                  {league.matchCount} matches live
                  {isCollapsed ? (
                    <ChevronDown className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronUp className="h-3.5 w-3.5" />
                  )}
                </span>
              </button>

              {/* Match table */}
              {!isCollapsed && (
                <div className="overflow-x-auto">
                  <div className="min-w-[960px]">
                    {/* Column headers */}
                    <div
                      className={cn(
                        "grid items-end gap-x-1.5 border-b border-[#23315A]/40 px-5 pb-2 pt-2 text-[10px] font-medium uppercase tracking-wider text-[#AAB5D0]/50",
                        TABLE_GRID
                      )}
                    >
                      <span>Date & Time</span>
                      <span>Match</span>
                      {/* 1X2 */}
                      <span className="text-center">1</span>
                      <span className="text-center">X</span>
                      <span className="text-center">2</span>
                      {/* Over/Under */}
                      <span className="text-center">O</span>
                      <span className="text-center">U</span>
                      <span>Your Pick</span>
                      <span>Pool Mult.</span>
                      <span>Est. Return</span>
                      <span>Actions</span>
                    </div>

                    {/* Column group labels */}
                    <div className="flex items-center border-b border-[#23315A]/20 px-5 py-0">
                      <div className="w-[100px]" />
                      <div className="min-w-[180px] flex-1" />
                      <div className="flex w-[160px] shrink-0 items-center justify-center">
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-[#AAB5D0]/40">
                          1X2
                        </span>
                      </div>
                      <div className="flex w-[108px] shrink-0 items-center justify-center">
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-[#AAB5D0]/40">
                          Over/Under 2.5
                        </span>
                      </div>
                      <div className="w-[362px]" />
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-[#23315A]/20">
                      {league.matches.map((match, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "grid items-center gap-x-1.5 px-5 py-3 transition-colors hover:bg-[#0C1532]/60",
                            TABLE_GRID
                          )}
                        >
                          {/* Date & Time */}
                          <div>
                            <p className="text-xs font-medium text-[#AAB5D0]">
                              {match.date}
                            </p>
                            <p className="text-[11px] text-[#AAB5D0]/50">
                              {match.time}
                            </p>
                          </div>

                          {/* Match */}
                          <div className="flex items-center gap-2">
                            {match.isLive && <LiveBadge />}
                            <TeamAvatar
                              name={match.homeTeam}
                              color={match.homeColor}
                            />
                            <div className="min-w-0">
                              <p className="truncate text-sm text-white">
                                {match.homeTeam}
                              </p>
                              <p className="truncate text-[11px] text-[#AAB5D0]/50">
                                vs {match.awayTeam}
                              </p>
                            </div>
                          </div>

                          {/* 1X2 odds */}
                          <OddsCell value={match.odds1x2.home} />
                          <OddsCell value={match.odds1x2.draw} />
                          <OddsCell value={match.odds1x2.away} />

                          {/* Over/Under */}
                          <OddsCell value={match.oddsOU.over} />
                          <OddsCell value={match.oddsOU.under} />

                          {/* Your Pick */}
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-semibold text-white">
                              {match.yourPick.value}
                            </span>
                            <TrendingUp className="h-3 w-3 text-[#22C55E]" />
                            <span className="text-xs font-medium text-[#22C55E]">
                              {match.yourPick.multiplier}
                            </span>
                          </div>

                          {/* Pool Multiplier */}
                          <span className="text-xs font-semibold text-white">
                            {match.poolMultiplier}{" "}
                            <span className="text-[10px] font-normal text-[#AAB5D0]/50">
                              TKN
                            </span>
                          </span>

                          {/* Est. Return */}
                          <span className="text-xs font-semibold text-white">
                            {match.estReturn}{" "}
                            <span className="text-[10px] font-normal text-[#AAB5D0]/50">
                              TKN
                            </span>
                          </span>

                          {/* Actions */}
                          <div className="flex items-center gap-1.5">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-2.5 text-[11px]"
                            >
                              View Odds
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 px-2.5 text-[11px]"
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
