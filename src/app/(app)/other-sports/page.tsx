"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Gamepad2,
  Layers,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SportFilter =
  | "all"
  | "cricket"
  | "volleyball"
  | "esports"
  | "darts"
  | "rugby"
  | "golf"
  | "boxing";

interface MatchRow {
  date: string;
  time: string;
  team1: string;
  team1Flag: string;
  team2: string;
  team2Flag: string;
  competition: string;
  market: string;
  odds1x2?: { home: number; draw: number; away: number };
  oddsOU?: { label: string; over: number; under?: number };
  oddsHandicap?: string;
  oddsTotal?: string;
  poolMultiplier: string;
  estReturn: string;
}

interface SportCategory {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  accentColor: string;
  filter: SportFilter;
  eventCount: number;
  matches: MatchRow[];
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const sportFilters: {
  key: SportFilter;
  label: string;
  count: number;
}[] = [
  { key: "all", label: "All", count: 16 },
  { key: "cricket", label: "Cricket", count: 5 },
  { key: "volleyball", label: "Volleyball", count: 3 },
  { key: "esports", label: "Esports", count: 3 },
  { key: "darts", label: "Darts", count: 2 },
  { key: "rugby", label: "Rugby", count: 1 },
  { key: "golf", label: "Golf", count: 1 },
  { key: "boxing", label: "Boxing", count: 1 },
];

const sports: SportCategory[] = [
  {
    id: "cricket",
    name: "Cricket",
    subtitle: "T20s, ODIs, Test matches and more.",
    icon: "🏏",
    accentColor: "border-l-[#EF4444]",
    filter: "cricket",
    eventCount: 5,
    matches: [
      {
        date: "17 Oct 2026",
        time: "02:00 PM",
        team1: "India",
        team1Flag: "🇮🇳",
        team2: "Australia",
        team2Flag: "🇦🇺",
        competition: "T20I · ICC",
        market: "1X2",
        odds1x2: { home: 1.85, draw: 3.2, away: 4.1 },
        oddsOU: { label: "O/U 10", over: 1.92 },
        poolMultiplier: "+12%",
        estReturn: "124.5K",
      },
      {
        date: "17 Oct 2026",
        time: "06:30 PM",
        team1: "West Indies",
        team1Flag: "🇻🇨",
        team2: "England",
        team2Flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        competition: "T20I · ICC",
        market: "1X2",
        odds1x2: { home: 2.1, draw: 3.15, away: 3.4 },
        oddsOU: { label: "O/U 8.5", over: 1.87 },
        poolMultiplier: "+9%",
        estReturn: "98.3K",
      },
      {
        date: "18 Oct 2026",
        time: "09:00 AM",
        team1: "Pakistan",
        team1Flag: "🇵🇰",
        team2: "New Zealand",
        team2Flag: "🇳🇿",
        competition: "ODI · ICC",
        market: "1X2",
        odds1x2: { home: 2.25, draw: 3.25, away: 3.0 },
        oddsOU: { label: "O/U 6.5", over: 1.78 },
        poolMultiplier: "+8%",
        estReturn: "76.2K",
      },
    ],
  },
  {
    id: "volleyball",
    name: "Volleyball",
    subtitle: "Indoor & beach volleyball leagues.",
    icon: "🏐",
    accentColor: "border-l-[#F59E0B]",
    filter: "volleyball",
    eventCount: 3,
    matches: [
      {
        date: "17 Oct 2026",
        time: "04:00 PM",
        team1: "Poland",
        team1Flag: "🇵🇱",
        team2: "Italy",
        team2Flag: "🇮🇹",
        competition: "FIVB World Championship",
        market: "1X2",
        odds1x2: { home: 1.72, draw: 3.45, away: 4.2 },
        oddsTotal: "O/U 185.5",
        poolMultiplier: "+10%",
        estReturn: "92.6K",
      },
      {
        date: "17 Oct 2026",
        time: "07:30 PM",
        team1: "Brazil",
        team1Flag: "🇧🇷",
        team2: "Serbia",
        team2Flag: "🇷🇸",
        competition: "FIVB World Championship",
        market: "1X2",
        odds1x2: { home: 1.58, draw: 3.8, away: 4.75 },
        oddsTotal: "O/U 192.5",
        poolMultiplier: "+9%",
        estReturn: "88.4K",
      },
    ],
  },
  {
    id: "esports",
    name: "Esports",
    subtitle: "CS2, LoL, Dota 2 and more.",
    icon: "🎮",
    accentColor: "border-l-[#8B5CF6]",
    filter: "esports",
    eventCount: 3,
    matches: [
      {
        date: "17 Oct 2026",
        time: "11:00 AM",
        team1: "NaVi",
        team1Flag: "🇺🇦",
        team2: "G2",
        team2Flag: "",
        competition: "CS2 · ESL Pro League",
        market: "1X2",
        odds1x2: { home: 1.65, draw: 2.2, away: 0, },
        oddsOU: { label: "Map/Total", over: 1.82 },
        poolMultiplier: "+11%",
        estReturn: "105.2K",
      },
      {
        date: "17 Oct 2026",
        time: "02:00 PM",
        team1: "T1",
        team1Flag: "🇰🇷",
        team2: "Gen.G",
        team2Flag: "🇰🇷",
        competition: "LoL · Worlds",
        market: "1X2",
        odds1x2: { home: 1.72, draw: 2.05, away: 0 },
        oddsOU: { label: "Over 2.5", over: 1.93 },
        poolMultiplier: "+9%",
        estReturn: "96.8K",
      },
    ],
  },
  {
    id: "darts",
    name: "Darts",
    subtitle: "PDC & major tournaments.",
    icon: "🎯",
    accentColor: "border-l-[#3B82F6]",
    filter: "darts",
    eventCount: 2,
    matches: [
      {
        date: "17 Oct 2026",
        time: "03:00 PM",
        team1: "Michael van Gerwen",
        team1Flag: "🇳🇱",
        team2: "Luke Littler",
        team2Flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        competition: "PDC Premier League",
        market: "1X2",
        odds1x2: { home: 1.68, draw: 2.12, away: 0 },
        oddsHandicap: "-1.5 / +1.5",
        poolMultiplier: "+10%",
        estReturn: "103.7K",
      },
      {
        date: "18 Oct 2026",
        time: "08:30 PM",
        team1: "Peter Wright",
        team1Flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
        team2: "Gerwyn Price",
        team2Flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
        competition: "PDC Premier League",
        market: "1X2",
        odds1x2: { home: 1.9, draw: 1.9, away: 0 },
        oddsHandicap: "-1.5 / +1.5",
        poolMultiplier: "+8%",
        estReturn: "87.6K",
      },
    ],
  },
  {
    id: "rugby",
    name: "Rugby",
    subtitle: "Unions & Sevens.",
    icon: "🏉",
    accentColor: "border-l-[#22C55E]",
    filter: "rugby",
    eventCount: 1,
    matches: [
      {
        date: "18 Oct 2026",
        time: "01:00 PM",
        team1: "South Africa",
        team1Flag: "🇿🇦",
        team2: "New Zealand",
        team2Flag: "🇳🇿",
        competition: "Rugby Championship",
        market: "1X2",
        odds1x2: { home: 2.05, draw: 3.25, away: 3.1 },
        oddsHandicap: "+3.5 / -3.5",
        poolMultiplier: "+9%",
        estReturn: "94.2K",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function OddsCell({ value }: { value: number | string }) {
  if (value === 0 || !value) return <span className="text-[#AAB5D0]/30">—</span>;
  return (
    <span className="flex h-8 w-full items-center justify-center rounded-md border border-[#23315A] bg-[#0C1532] text-xs font-semibold text-white transition-colors hover:border-[#603BFF]/50">
      {typeof value === "number" ? value.toFixed(2) : value}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function OtherSportsPage() {
  const [activeSport, setActiveSport] = useState<SportFilter>("all");
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
    activeSport === "all"
      ? sports
      : sports.filter((s) => s.filter === activeSport);

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
              <Gamepad2 className="h-6 w-6 text-[#603BFF]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Other Sports
              </h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">
                More sports. More markets. More opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Sport filter pills                                          */}
      {/* ============================================================ */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {sportFilters.map(({ key, label, count }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveSport(key)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeSport === key
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
      {/*  Sport categories with match tables                          */}
      {/* ============================================================ */}
      <div className="space-y-4">
        {filtered.map((sport) => {
          const isCollapsed = collapsedGroups.has(sport.id);
          return (
            <div key={sport.id} className="rounded-lg bg-[#0F1A36]">
              {/* Sport header */}
              <button
                type="button"
                onClick={() => toggleGroup(sport.id)}
                className={cn(
                  "flex w-full items-center gap-3 border-l-[3px] px-5 py-3.5 text-left transition-colors hover:bg-white/[0.02]",
                  sport.accentColor
                )}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center text-2xl">
                  {sport.icon}
                </span>
                <div className="min-w-0">
                  <span className="text-sm font-semibold text-white">
                    {sport.name}
                  </span>
                  <p className="text-xs text-[#AAB5D0]/60">
                    {sport.subtitle}
                  </p>
                </div>
                <span className="ml-auto flex shrink-0 items-center gap-1 text-xs text-[#AAB5D0]/60">
                  {sport.eventCount} upcoming events
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
                  <div className="min-w-[920px]">
                    {/* Column headers */}
                    <div className="grid grid-cols-[100px_minmax(200px,1fr)_80px_repeat(3,56px)_100px_80px_90px_120px] items-end gap-x-2 border-b border-[#23315A]/40 px-5 pb-2 pt-2 text-[10px] font-medium uppercase tracking-wider text-[#AAB5D0]/50">
                      <span>Date & Time</span>
                      <span>Match</span>
                      <span>Market</span>
                      <span className="text-center">1</span>
                      <span className="text-center">X</span>
                      <span className="text-center">2</span>
                      <span>{sport.id === "cricket" ? "Over/Under" : sport.id === "volleyball" ? "Total Points" : sport.id === "esports" ? "Map/Total" : sport.id === "darts" || sport.id === "rugby" ? "Legs Handicap" : "Other"}</span>
                      <span>Pool Mult.</span>
                      <span>Est. Return</span>
                      <span>Actions</span>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-[#23315A]/20">
                      {sport.matches.map((match, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-[100px_minmax(200px,1fr)_80px_repeat(3,56px)_100px_80px_90px_120px] items-center gap-x-2 px-5 py-3 transition-colors hover:bg-[#0C1532]/60"
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
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-base">{match.team1Flag}</span>
                              <p className="truncate text-sm text-white">
                                {match.team1}
                              </p>
                            </div>
                            <div className="mt-0.5 flex items-center gap-1.5">
                              <span className="text-base">{match.team2Flag}</span>
                              <p className="truncate text-[11px] text-[#AAB5D0]/50">
                                vs {match.team2}
                              </p>
                            </div>
                            <p className="mt-0.5 text-[10px] text-[#AAB5D0]/40">
                              {match.competition}
                            </p>
                          </div>

                          {/* Market */}
                          <span className="text-xs text-white">
                            {match.market}
                          </span>

                          {/* 1X2 odds */}
                          {match.odds1x2 && (
                            <>
                              <OddsCell value={match.odds1x2.home} />
                              <OddsCell value={match.odds1x2.draw} />
                              <OddsCell value={match.odds1x2.away} />
                            </>
                          )}

                          {/* Other odds column */}
                          <div className="text-xs text-white">
                            {match.oddsOU && (
                              <div>
                                <p className="text-[10px] text-[#AAB5D0]/50">
                                  {match.oddsOU.label}
                                </p>
                                <p className="font-semibold">
                                  {match.oddsOU.over.toFixed(2)}
                                </p>
                              </div>
                            )}
                            {match.oddsTotal && (
                              <p className="text-xs">{match.oddsTotal}</p>
                            )}
                            {match.oddsHandicap && (
                              <p className="text-xs">{match.oddsHandicap}</p>
                            )}
                          </div>

                          {/* Pool Multiplier */}
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-semibold text-[#22C55E]">
                              {match.poolMultiplier}
                            </span>
                            <TrendingUp className="h-3 w-3 text-[#22C55E]" />
                          </div>

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
