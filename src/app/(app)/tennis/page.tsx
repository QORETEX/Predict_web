"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Target,
  Layers,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePickSlip } from "@/contexts/pick-slip-context";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type TourFilter =
  | "all"
  | "atp"
  | "wta"
  | "grand-slams"
  | "challenger"
  | "other";
type MarketTab =
  | "1x2"
  | "over-under"
  | "match-winner"
  | "handicap"
  | "total-games"
  | "set-betting";

interface MatchRow {
  date: string;
  time: string;
  isLive: boolean;
  player1: string;
  player1Country: string;
  player2: string;
  player2Country: string;
  odds1x2: { player1: number; draw: string; player2: number };
  oddsOU: { over: number; under: number };
  yourPick: string;
  poolMultiplier: string;
  estReturn: string;
}

interface TournamentGroup {
  id: string;
  name: string;
  subtitle: string;
  logo: string;
  accentColor: string;
  filter: TourFilter;
  isLive: boolean;
  matchCount: number;
  matches: MatchRow[];
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const tourFilters: {
  key: TourFilter;
  label: string;
  count: number;
}[] = [
  { key: "all", label: "All", count: 28 },
  { key: "atp", label: "ATP Tour", count: 12 },
  { key: "wta", label: "WTA Tour", count: 10 },
  { key: "grand-slams", label: "Grand Slams", count: 4 },
  { key: "challenger", label: "Challenger", count: 2 },
  { key: "other", label: "Other", count: 0 },
];

const marketTabs: { key: MarketTab; label: string }[] = [
  { key: "1x2", label: "1X2" },
  { key: "over-under", label: "Over/Under" },
  { key: "match-winner", label: "Match Winner" },
  { key: "handicap", label: "Handicap" },
  { key: "total-games", label: "Total Games" },
  { key: "set-betting", label: "Set Betting" },
];

const tournaments: TournamentGroup[] = [
  {
    id: "wimbledon",
    name: "Wimbledon",
    subtitle: "Grand Slam · Grass · London, UK",
    logo: "",
    accentColor: "border-l-[#22C55E]",
    filter: "grand-slams",
    isLive: true,
    matchCount: 6,
    matches: [
      {
        date: "14:22",
        time: "",
        isLive: true,
        player1: "Carlos Alcaraz",
        player1Country: "🇪🇸",
        player2: "Jannik Sinner",
        player2Country: "🇮🇹",
        odds1x2: { player1: 1.65, draw: "-", player2: 2.25 },
        oddsOU: { over: 1.87, under: 1.93 },
        yourPick: "+12%",
        poolMultiplier: "124.5K",
        estReturn: "124.5K",
      },
      {
        date: "16:10",
        time: "",
        isLive: true,
        player1: "Iga Swiatek",
        player1Country: "🇵🇱",
        player2: "Elena Rybakina",
        player2Country: "🇰🇿",
        odds1x2: { player1: 1.72, draw: "-", player2: 2.08 },
        oddsOU: { over: 1.8, under: 2.0 },
        yourPick: "+9%",
        poolMultiplier: "93.0K",
        estReturn: "98.3K",
      },
      {
        date: "18:45",
        time: "",
        isLive: true,
        player1: "Novak Djokovic",
        player1Country: "🇷🇸",
        player2: "Taylor Fritz",
        player2Country: "🇺🇸",
        odds1x2: { player1: 1.48, draw: "-", player2: 2.62 },
        oddsOU: { over: 1.75, under: 2.15 },
        yourPick: "+7%",
        poolMultiplier: "76.2K",
        estReturn: "76.2K",
      },
    ],
  },
  {
    id: "atp-tour",
    name: "ATP Tour",
    subtitle: "ATP 1000 · Hard · Global",
    logo: "",
    accentColor: "border-l-[#3B82F6]",
    filter: "atp",
    isLive: true,
    matchCount: 8,
    matches: [
      {
        date: "13:20",
        time: "",
        isLive: true,
        player1: "Daniil Medvedev",
        player1Country: "🇷🇺",
        player2: "Holger Rune",
        player2Country: "🇩🇰",
        odds1x2: { player1: 1.68, draw: "-", player2: 2.2 },
        oddsOU: { over: 1.82, under: 1.98 },
        yourPick: "+11%",
        poolMultiplier: "112.4K",
        estReturn: "112.4K",
      },
      {
        date: "15:05",
        time: "",
        isLive: true,
        player1: "Alexander Zverev",
        player1Country: "🇩🇪",
        player2: "Grigor Dimitrov",
        player2Country: "🇧🇬",
        odds1x2: { player1: 1.55, draw: "-", player2: 2.45 },
        oddsOU: { over: 1.78, under: 2.05 },
        yourPick: "+8%",
        poolMultiplier: "96.7K",
        estReturn: "96.7K",
      },
      {
        date: "17:40",
        time: "",
        isLive: true,
        player1: "Andrey Rublev",
        player1Country: "🇷🇺",
        player2: "Tommy Paul",
        player2Country: "🇺🇸",
        odds1x2: { player1: 1.7, draw: "-", player2: 2.15 },
        oddsOU: { over: 1.85, under: 1.95 },
        yourPick: "+6%",
        poolMultiplier: "83.9K",
        estReturn: "83.9K",
      },
    ],
  },
  {
    id: "wta-tour",
    name: "WTA Tour",
    subtitle: "WTA 1000 · Hard · Global",
    logo: "",
    accentColor: "border-l-[#EC4899]",
    filter: "wta",
    isLive: true,
    matchCount: 6,
    matches: [
      {
        date: "13:50",
        time: "",
        isLive: true,
        player1: "Aryna Sabalenka",
        player1Country: "🇧🇾",
        player2: "Coco Gauff",
        player2Country: "🇺🇸",
        odds1x2: { player1: 1.62, draw: "-", player2: 2.32 },
        oddsOU: { over: 1.8, under: 2.0 },
        yourPick: "+10%",
        poolMultiplier: "101.2K",
        estReturn: "101.2K",
      },
      {
        date: "16:25",
        time: "",
        isLive: true,
        player1: "Jessica Pegula",
        player1Country: "🇺🇸",
        player2: "Elena Rybakina",
        player2Country: "🇰🇿",
        odds1x2: { player1: 1.78, draw: "-", player2: 2.05 },
        oddsOU: { over: 1.92, under: 1.88 },
        yourPick: "+7%",
        poolMultiplier: "88.6K",
        estReturn: "88.6K",
      },
      {
        date: "19:10",
        time: "",
        isLive: true,
        player1: "Ons Jabeur",
        player1Country: "🇹🇳",
        player2: "Marketa Vondrousova",
        player2Country: "🇨🇿",
        odds1x2: { player1: 1.95, draw: "-", player2: 1.85 },
        oddsOU: { over: 2.05, under: 1.75 },
        yourPick: "+5%",
        poolMultiplier: "72.3K",
        estReturn: "72.3K",
      },
    ],
  },
  {
    id: "challenger",
    name: "Challenger Tour",
    subtitle: "Challenger Tour · Hard · Global",
    logo: "",
    accentColor: "border-l-[#F59E0B]",
    filter: "challenger",
    isLive: true,
    matchCount: 4,
    matches: [
      {
        date: "12:40",
        time: "",
        isLive: true,
        player1: "Alexandre Muller",
        player1Country: "🇫🇷",
        player2: "Dominic Stricker",
        player2Country: "🇨🇭",
        odds1x2: { player1: 1.82, draw: "-", player2: 2.02 },
        oddsOU: { over: 1.88, under: 1.92 },
        yourPick: "+6%",
        poolMultiplier: "65.4K",
        estReturn: "65.4K",
      },
      {
        date: "15:30",
        time: "",
        isLive: true,
        player1: "Yoshihito Nishioka",
        player1Country: "🇯🇵",
        player2: "Benjamin Bonzi",
        player2Country: "🇫🇷",
        odds1x2: { player1: 1.72, draw: "-", player2: 2.18 },
        oddsOU: { over: 1.8, under: 2.0 },
        yourPick: "+8%",
        poolMultiplier: "58.7K",
        estReturn: "58.7K",
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

function TournamentLogo({ name }: { name: string }) {
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

function OddsCell({ value }: { value: number | string }) {
  return (
    <span className="flex h-8 w-full items-center justify-center rounded-md border border-[#23315A] bg-[#0C1532] text-xs font-semibold text-white transition-colors hover:border-[#603BFF]/50">
      {typeof value === "number" ? value.toFixed(2) : value}
    </span>
  );
}

const TABLE_GRID =
  "grid-cols-[60px_minmax(200px,1fr)_repeat(3,52px)_repeat(2,52px)_70px_80px_90px_120px]";

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TennisPage() {
  const { openPickSlip } = usePickSlip();
  const [activeTour, setActiveTour] = useState<TourFilter>("all");
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
    activeTour === "all"
      ? tournaments
      : tournaments.filter((t) => t.filter === activeTour);

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
              <span className="text-5xl">🎾</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Tennis
              </h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">
                Grand slams. ATP. WTA. Big matches. Bigger rewards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Tour filter pills                                           */}
      {/* ============================================================ */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tourFilters.map(({ key, label, count }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTour(key)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeTour === key
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
      {/*  Tournament groups with match tables                         */}
      {/* ============================================================ */}
      <div className="space-y-4">
        {filtered.map((tournament) => {
          const isCollapsed = collapsedGroups.has(tournament.id);
          return (
            <div key={tournament.id} className="rounded-lg bg-[#0F1A36]">
              {/* Tournament header */}
              <button
                type="button"
                onClick={() => toggleGroup(tournament.id)}
                className={cn(
                  "flex w-full items-center gap-3 border-l-[3px] px-5 py-3.5 text-left transition-colors hover:bg-white/[0.02]",
                  tournament.accentColor
                )}
              >
                <TournamentLogo name={tournament.name} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">
                      {tournament.name}
                    </span>
                    {tournament.isLive && <LiveBadge />}
                  </div>
                  <p className="text-xs text-[#AAB5D0]/60">
                    {tournament.subtitle}
                  </p>
                </div>
                <span className="ml-auto flex shrink-0 items-center gap-1 text-xs text-[#AAB5D0]/60">
                  {tournament.matchCount} matches live
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
                      <div className="w-[60px]" />
                      <div className="min-w-[200px] flex-1" />
                      <div className="flex w-[160px] shrink-0 items-center justify-center">
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-[#AAB5D0]/40">
                          1X2
                        </span>
                      </div>
                      <div className="flex w-[108px] shrink-0 items-center justify-center">
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-[#AAB5D0]/40">
                          Over/Under 22.5
                        </span>
                      </div>
                      <div className="w-[360px]" />
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-[#23315A]/20">
                      {tournament.matches.map((match, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "grid items-center gap-x-1.5 px-5 py-3 transition-colors hover:bg-[#0C1532]/60",
                            TABLE_GRID
                          )}
                        >
                          {/* Time (with LIVE badge in cell) */}
                          <div className="flex items-center justify-center">
                            {match.isLive && <LiveBadge />}
                            {!match.isLive && (
                              <span className="text-xs font-medium text-[#AAB5D0]">
                                {match.date}
                              </span>
                            )}
                          </div>

                          {/* Match */}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-lg">{match.player1Country}</span>
                              <p className="truncate text-sm text-white">
                                {match.player1}
                              </p>
                            </div>
                            <div className="mt-0.5 flex items-center gap-1.5">
                              <span className="text-lg">{match.player2Country}</span>
                              <p className="truncate text-[11px] text-[#AAB5D0]/50">
                                {match.player2}
                              </p>
                            </div>
                          </div>

                          {/* 1X2 odds */}
                          <OddsCell value={match.odds1x2.player1} />
                          <OddsCell value={match.odds1x2.draw} />
                          <OddsCell value={match.odds1x2.player2} />

                          {/* Over/Under */}
                          <OddsCell value={match.oddsOU.over} />
                          <OddsCell value={match.oddsOU.under} />

                          {/* Your Pick */}
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-semibold text-[#22C55E]">
                              {match.yourPick}
                            </span>
                            <TrendingUp className="h-3 w-3 text-[#22C55E]" />
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
