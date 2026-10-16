"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Goal,
  Layers,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePickSlip } from "@/contexts/pick-slip-context";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type LeagueFilter =
  | "all"
  | "premier-league"
  | "la-liga"
  | "serie-a"
  | "bundesliga"
  | "ligue-1"
  | "ucl"
  | "other";

type MarketTab = "1x2" | "over-under" | "btts" | "double-chance" | "correct-score" | "next-goal";

interface MatchRow {
  id: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  homeColor: string;
  awayColor: string;
  odds1x2: { home: number; draw: number; away: number };
  oddsOU: { over: number; under: number };
  oddsBTTS: { yes: number; no: number };
  poolMultiplier: string;
  estReturn: string;
}

interface LeagueGroup {
  id: string;
  name: string;
  country: string;
  flag: string;
  logo: string;
  accentColor: string;
  filter: LeagueFilter;
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
  { key: "all", label: "All", count: 45, logo: "" },
  { key: "premier-league", label: "Premier League", count: 8, logo: "https://crests.football-data.org/PL.png" },
  { key: "la-liga", label: "La Liga", count: 6, logo: "https://crests.football-data.org/PD.png" },
  { key: "serie-a", label: "Serie A", count: 5, logo: "https://crests.football-data.org/SA.png" },
  { key: "bundesliga", label: "Bundesliga", count: 5, logo: "https://crests.football-data.org/BL1.png" },
  { key: "ligue-1", label: "Ligue 1", count: 4, logo: "https://crests.football-data.org/FL1.png" },
  { key: "ucl", label: "Champions League", count: 8, logo: "https://crests.football-data.org/CL.png" },
  { key: "other", label: "Other", count: 9, logo: "" },
];

const marketTabs: { key: MarketTab; label: string }[] = [
  { key: "1x2", label: "1X2" },
  { key: "over-under", label: "Over/Under" },
  { key: "btts", label: "Both Teams to Score" },
  { key: "double-chance", label: "Double Chance" },
  { key: "correct-score", label: "Correct Score" },
  { key: "next-goal", label: "Next Goal" },
];

const leagues: LeagueGroup[] = [
  {
    id: "premier-league",
    name: "Premier League",
    country: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    logo: "https://crests.football-data.org/PL.png",
    accentColor: "border-l-[#603BFF]",
    filter: "premier-league",
    matchCount: 8,
    matches: [
      {
        id: "football-mancity-arsenal",
        date: "17 Oct 2026",
        time: "12:30 PM",
        homeTeam: "Man City",
        awayTeam: "Arsenal",
        homeColor: "bg-sky-500",
        awayColor: "bg-red-600",
        odds1x2: { home: 1.72, draw: 3.80, away: 4.10 },
        oddsOU: { over: 1.85, under: 1.95 },
        oddsBTTS: { yes: 1.70, no: 2.10 },
        poolMultiplier: "+12%",
        estReturn: "124.5K",
      },
      {
        id: "football-liverpool-chelsea",
        date: "17 Oct 2026",
        time: "03:00 PM",
        homeTeam: "Liverpool",
        awayTeam: "Chelsea",
        homeColor: "bg-red-500",
        awayColor: "bg-blue-700",
        odds1x2: { home: 2.12, draw: 3.45, away: 3.60 },
        oddsOU: { over: 1.72, under: 2.18 },
        oddsBTTS: { yes: 1.68, no: 2.22 },
        poolMultiplier: "+8%",
        estReturn: "98.3K",
      },
      {
        id: "football-manutd-tottenham",
        date: "18 Oct 2026",
        time: "04:30 PM",
        homeTeam: "Man Utd",
        awayTeam: "Tottenham",
        homeColor: "bg-red-600",
        awayColor: "bg-slate-100",
        odds1x2: { home: 2.05, draw: 3.40, away: 3.80 },
        oddsOU: { over: 1.80, under: 2.00 },
        oddsBTTS: { yes: 1.75, no: 2.05 },
        poolMultiplier: "+10%",
        estReturn: "87.4K",
      },
      {
        id: "football-astonvilla-newcastle",
        date: "19 Oct 2026",
        time: "08:00 PM",
        homeTeam: "Aston Villa",
        awayTeam: "Newcastle",
        homeColor: "bg-purple-800",
        awayColor: "bg-neutral-800",
        odds1x2: { home: 2.45, draw: 3.30, away: 2.80 },
        oddsOU: { over: 1.90, under: 1.90 },
        oddsBTTS: { yes: 1.80, no: 2.00 },
        poolMultiplier: "+7%",
        estReturn: "76.2K",
      },
    ],
  },
  {
    id: "la-liga",
    name: "La Liga",
    country: "Spain",
    flag: "🇪🇸",
    logo: "https://crests.football-data.org/PD.png",
    accentColor: "border-l-[#F59E0B]",
    filter: "la-liga",
    matchCount: 6,
    matches: [
      {
        id: "football-realmadrid-barcelona",
        date: "19 Oct 2026",
        time: "02:00 PM",
        homeTeam: "Real Madrid",
        awayTeam: "Barcelona",
        homeColor: "bg-white",
        awayColor: "bg-blue-800",
        odds1x2: { home: 2.05, draw: 3.60, away: 3.20 },
        oddsOU: { over: 1.75, under: 2.05 },
        oddsBTTS: { yes: 1.72, no: 2.10 },
        poolMultiplier: "+9%",
        estReturn: "102.4K",
      },
      {
        id: "football-atletico-villarreal",
        date: "18 Oct 2026",
        time: "04:15 PM",
        homeTeam: "Atletico Madrid",
        awayTeam: "Villarreal",
        homeColor: "bg-red-600",
        awayColor: "bg-yellow-500",
        odds1x2: { home: 1.85, draw: 3.40, away: 4.20 },
        oddsOU: { over: 1.70, under: 2.15 },
        oddsBTTS: { yes: 1.65, no: 2.25 },
        poolMultiplier: "+11%",
        estReturn: "88.7K",
      },
      {
        id: "football-realsociedad-getafe",
        date: "19 Oct 2026",
        time: "06:30 PM",
        homeTeam: "Real Sociedad",
        awayTeam: "Getafe",
        homeColor: "bg-blue-500",
        awayColor: "bg-blue-900",
        odds1x2: { home: 1.95, draw: 3.30, away: 3.70 },
        oddsOU: { over: 1.80, under: 2.00 },
        oddsBTTS: { yes: 1.72, no: 2.12 },
        poolMultiplier: "+8%",
        estReturn: "71.6K",
      },
    ],
  },
  {
    id: "serie-a",
    name: "Serie A",
    country: "Italy",
    flag: "🇮🇹",
    logo: "https://crests.football-data.org/SA.png",
    accentColor: "border-l-[#22C55E]",
    filter: "serie-a",
    matchCount: 5,
    matches: [
      {
        id: "football-juventus-inter",
        date: "17 Oct 2026",
        time: "02:45 PM",
        homeTeam: "Juventus",
        awayTeam: "Inter Milan",
        homeColor: "bg-neutral-800",
        awayColor: "bg-blue-800",
        odds1x2: { home: 2.30, draw: 3.20, away: 3.00 },
        oddsOU: { over: 1.80, under: 2.00 },
        oddsBTTS: { yes: 1.70, no: 2.20 },
        poolMultiplier: "+10%",
        estReturn: "95.2K",
      },
      {
        id: "football-acmilan-napoli",
        date: "18 Oct 2026",
        time: "05:00 PM",
        homeTeam: "AC Milan",
        awayTeam: "Napoli",
        homeColor: "bg-red-600",
        awayColor: "bg-sky-500",
        odds1x2: { home: 2.45, draw: 3.25, away: 2.85 },
        oddsOU: { over: 1.95, under: 1.85 },
        oddsBTTS: { yes: 1.80, no: 2.05 },
        poolMultiplier: "+9%",
        estReturn: "82.6K",
      },
    ],
  },
  {
    id: "bundesliga",
    name: "Bundesliga",
    country: "Germany",
    flag: "🇩🇪",
    logo: "https://crests.football-data.org/BL1.png",
    accentColor: "border-l-[#EF4444]",
    filter: "bundesliga",
    matchCount: 5,
    matches: [
      {
        id: "football-bayern-dortmund",
        date: "17 Oct 2026",
        time: "02:30 PM",
        homeTeam: "Bayern Munich",
        awayTeam: "Dortmund",
        homeColor: "bg-red-600",
        awayColor: "bg-yellow-500",
        odds1x2: { home: 1.60, draw: 4.20, away: 5.50 },
        oddsOU: { over: 1.75, under: 2.05 },
        oddsBTTS: { yes: 1.68, no: 2.18 },
        poolMultiplier: "+12%",
        estReturn: "118.9K",
      },
      {
        id: "football-leverkusen-leipzig",
        date: "18 Oct 2026",
        time: "05:30 PM",
        homeTeam: "Leverkusen",
        awayTeam: "RB Leipzig",
        homeColor: "bg-red-700",
        awayColor: "bg-blue-600",
        odds1x2: { home: 2.10, draw: 3.60, away: 3.10 },
        oddsOU: { over: 1.80, under: 2.00 },
        oddsBTTS: { yes: 1.72, no: 2.12 },
        poolMultiplier: "+8%",
        estReturn: "93.4K",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

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
        color === "bg-white" || color === "bg-slate-100"
          ? "text-neutral-800"
          : "text-white"
      )}
    >
      {initials}
    </span>
  );
}

function LeagueLogo({ src, name }: { src: string; name: string }) {
  if (!src) return null;
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white p-1">
      <Image
        src={src}
        alt={name}
        width={24}
        height={24}
        className="h-full w-full object-contain"
      />
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
  "grid-cols-[100px_minmax(180px,1fr)_repeat(3,52px)_repeat(2,52px)_repeat(2,48px)_72px_90px_120px]";

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function FootballPage() {
  const { openPickSlip } = usePickSlip();
  const [activeLeague, setActiveLeague] = useState<LeagueFilter>("all");
  const [activeMarket, setActiveMarket] = useState<MarketTab>("1x2");
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    new Set()
  );
  const [addedMatches, setAddedMatches] = useState<Set<string>>(new Set());

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
              <span className="text-5xl">⚽</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Football
              </h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">
                Top leagues. Big rivalries. Higher multipliers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  League filter pills                                         */}
      {/* ============================================================ */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {leagueFilters.map(({ key, label, count, logo }) => (
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
            {logo && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white p-0.5">
                <Image src={logo} alt="" width={14} height={14} className="h-full w-full object-contain" />
              </span>
            )}
            {!logo && key === "all" && <Layers className="h-3.5 w-3.5" />}
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
                <LeagueLogo src={league.logo} name={league.name} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">
                      {league.name}
                    </span>
                    <span className="text-sm">{league.flag}</span>
                  </div>
                  <p className="text-xs text-[#AAB5D0]/60">{league.country}</p>
                </div>
                <span className="ml-auto flex shrink-0 items-center gap-1 text-xs text-[#AAB5D0]/60">
                  {league.matchCount} matches
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
                    {/* Sub-header with market columns */}
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
                      {/* BTTS */}
                      <span className="text-center">Yes</span>
                      <span className="text-center">No</span>
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
                      <div className="flex w-[100px] shrink-0 items-center justify-center">
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-[#AAB5D0]/40">
                          BTTS
                        </span>
                      </div>
                      <div className="w-[282px]" />
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
                          <Link href={`/events/${match.id}`} className="flex items-center gap-2 hover:underline">
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
                          </Link>

                          {/* 1X2 odds */}
                          <OddsCell value={match.odds1x2.home} />
                          <OddsCell value={match.odds1x2.draw} />
                          <OddsCell value={match.odds1x2.away} />

                          {/* Over/Under */}
                          <OddsCell value={match.oddsOU.over} />
                          <OddsCell value={match.oddsOU.under} />

                          {/* BTTS */}
                          <OddsCell value={match.oddsBTTS.yes} />
                          <OddsCell value={match.oddsBTTS.no} />

                          {/* Pool Multiplier */}
                          <span className="text-xs font-semibold text-[#22C55E]">
                            {match.poolMultiplier}
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
                              onClick={() => {
                                // Navigate to event detail
                                window.location.href = `/events/${match.id}`;
                              }}
                            >
                              View Odds
                            </Button>
                            <Button
                              size="sm"
                              className={cn(
                                "h-7 px-2.5 text-[11px]",
                                addedMatches.has(match.id) && "bg-[#22C55E] hover:bg-[#22C55E]"
                              )}
                              onClick={() => {
                                setAddedMatches((prev) => {
                                  const next = new Set(prev);
                                  next.add(match.id);
                                  openPickSlip(); // Open right sidebar
                                  setTimeout(() => {
                                    setAddedMatches((p) => {
                                      const n = new Set(p);
                                      n.delete(match.id);
                                      return n;
                                    });
                                  }, 2000);
                                  return next;
                                });
                              }}
                            >
                              {addedMatches.has(match.id) ? "Added ✓" : "Add"}
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
