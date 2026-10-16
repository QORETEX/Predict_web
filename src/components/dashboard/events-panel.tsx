"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Info,
  Star,
  TrendingUp,
  GraduationCap,
  Goal,
  CircleDot,
  Target,
  Gamepad2,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type MainTab = "live" | "upcoming";
type Sport = "all" | "nsmq" | "football" | "basketball" | "tennis" | "other";
type MarketType = "1x2" | "over-under" | "double-chance" | "btts" | "next-goal" | "correct-score";

interface EventRow {
  id: string;
  time: string;
  isLive: boolean;
  homeTeam: string;
  awayTeam: string;
  region?: string;
  odds: { home: number; draw: number; away: number };
  pool: string;
  multiplier: { value: number; direction: "up" | "down"; pct: number };
  estReturn: string;
}

interface CompetitionGroup {
  id: string;
  name: string;
  matchCount: number;
  isLive: boolean;
  accentColor: string;
  logo: string;
  events: EventRow[];
}

/* ------------------------------------------------------------------ */
/*  Static mock data                                                   */
/* ------------------------------------------------------------------ */

const sportFilters: { key: Sport; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "all", label: "All", icon: Layers },
  { key: "nsmq", label: "NSMQ", icon: GraduationCap },
  { key: "football", label: "Football", icon: Goal },
  { key: "basketball", label: "Basketball", icon: CircleDot },
  { key: "tennis", label: "Tennis", icon: Target },
  { key: "other", label: "Other Sports", icon: Gamepad2 },
];

const marketTypes: { key: MarketType; label: string }[] = [
  { key: "1x2", label: "1X2" },
  { key: "over-under", label: "Over/Under" },
  { key: "double-chance", label: "Double Chance" },
  { key: "btts", label: "Both Teams to Score" },
  { key: "next-goal", label: "Next Goal" },
  { key: "correct-score", label: "Correct Score" },
];

const mockGroups: CompetitionGroup[] = [
  {
    id: "nsmq-regional",
    name: "NSMQ Regional – Round 3",
    matchCount: 2,
    isLive: true,
    accentColor: "border-l-[#603BFF]",
    logo: "https://static.wixstatic.com/media/a1e1f8_8706e696c8fc47bd82b930a71515301d~mv2.png/v1/fill/w_80,h_80,al_c,q_85,enc_avif,quality_auto/NSMQ%20Logo.png",
    events: [
      {
        id: "nsmq-kumasi-prempeh",
        time: "08:00",
        isLive: true,
        homeTeam: "Kumasi Academy",
        awayTeam: "Prempeh College",
        region: "Ashanti Region",
        odds: { home: 1.42, draw: 4.1, away: 7.25 },
        pool: "124.5K",
        multiplier: { value: 1.78, direction: "up", pct: 12 },
        estReturn: "222.1K",
      },
      {
        id: "nsmq-aquinas-achimota",
        time: "10:30",
        isLive: true,
        homeTeam: "St. Thomas Aquinas",
        awayTeam: "Achimota School",
        region: "Greater Accra Region",
        odds: { home: 2.15, draw: 3.6, away: 2.98 },
        pool: "98.3K",
        multiplier: { value: 2.12, direction: "up", pct: 8 },
        estReturn: "208.0K",
      },
    ],
  },
  {
    id: "premier-league",
    name: "Premier League",
    matchCount: 3,
    isLive: false,
    accentColor: "border-l-[#22C55E]",
    logo: "https://crests.football-data.org/PL.png",
    events: [
      {
        id: "pl-mancity-arsenal",
        time: "15:00",
        isLive: false,
        homeTeam: "Man City",
        awayTeam: "Arsenal",
        region: "Premier League",
        odds: { home: 1.72, draw: 3.95, away: 4.2 },
        pool: "245.7K",
        multiplier: { value: 1.96, direction: "up", pct: 6 },
        estReturn: "368.5K",
      },
      {
        id: "pl-liverpool-chelsea",
        time: "17:30",
        isLive: false,
        homeTeam: "Liverpool",
        awayTeam: "Chelsea",
        region: "Premier League",
        odds: { home: 2.1, draw: 3.45, away: 3.1 },
        pool: "198.4K",
        multiplier: { value: 1.85, direction: "up", pct: 9 },
        estReturn: "339.2K",
      },
    ],
  },
  {
    id: "ucl",
    name: "UEFA Champions League",
    matchCount: 2,
    isLive: false,
    accentColor: "border-l-[#3B82F6]",
    logo: "https://crests.football-data.org/CL.png",
    events: [
      {
        id: "ucl-realmadrid-bayern",
        time: "20:00",
        isLive: false,
        homeTeam: "Real Madrid",
        awayTeam: "Bayern Munich",
        region: "UCL",
        odds: { home: 1.95, draw: 3.55, away: 3.6 },
        pool: "312.6K",
        multiplier: { value: 2.04, direction: "up", pct: 10 },
        estReturn: "637.0K",
      },
      {
        id: "ucl-barcelona-inter",
        time: "22:00",
        isLive: false,
        homeTeam: "Barcelona",
        awayTeam: "Inter Milan",
        region: "UCL",
        odds: { home: 1.88, draw: 3.7, away: 3.9 },
        pool: "276.3K",
        multiplier: { value: 1.92, direction: "up", pct: 7 },
        estReturn: "530.7K",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function DropdownButton({
  label,
  value,
  hasInfo,
}: {
  label: string;
  value: string;
  hasInfo?: boolean;
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 rounded-lg border border-[#23315A] bg-[#0C1532] px-3 py-1.5 text-xs text-[#AAB5D0] transition-colors hover:border-[#603BFF]/50"
    >
      <span className="text-[#AAB5D0]/70">{label}</span>
      <span className="font-medium text-white">{value}</span>
      {hasInfo && <Info className="h-3 w-3 text-[#AAB5D0]/50" />}
      <ChevronDown className="h-3 w-3 text-[#AAB5D0]/50" />
    </button>
  );
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
      Live
    </span>
  );
}

function OddsCell({
  label,
  value,
  isSelected,
  onClick,
}: {
  label: string;
  value: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full flex-col items-center gap-0.5 rounded-md border px-2 py-2 text-center transition-all",
        isSelected
          ? "border-[#603BFF] bg-[#603BFF] text-white"
          : "border-[#23315A] bg-[#0C1532] text-white hover:border-[#603BFF]/50",
      )}
    >
      <span className="text-[9px] font-medium uppercase text-[#AAB5D0]/60">{label}</span>
      <span className="text-sm font-semibold">{value.toFixed(2)}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const TABLE_GRID = "grid-cols-[minmax(260px,1fr)_64px_64px_64px_90px_130px_100px_72px_36px]";

export function EventsPanel() {
  const [activeTab, setActiveTab] = useState<MainTab>("live");
  const [activeSport, setActiveSport] = useState<Sport>("all");
  const [activeMarket, setActiveMarket] = useState<MarketType>("1x2");
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [selectedOdds, setSelectedOdds] = useState<Set<string>>(new Set());
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  function toggleGroup(id: string) {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleOdd(key: string) {
    setSelectedOdds((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function toggleBookmark(key: string) {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="rounded-lg bg-[#0F1A36]">
      {/* ============================================================ */}
      {/*  Header row — tabs + dropdowns                               */}
      {/* ============================================================ */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#23315A] px-4 py-3 sm:px-5">
        {/* Left: Live / Upcoming tabs */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("live")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeTab === "live"
                ? "bg-red-500/15 text-red-500"
                : "text-[#AAB5D0] hover:text-white",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full bg-red-500",
                activeTab === "live" && "animate-pulse",
              )}
            />
            Live
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("upcoming")}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeTab === "upcoming"
                ? "bg-[#603BFF]/15 text-[#603BFF]"
                : "text-[#AAB5D0] hover:text-white",
            )}
          >
            Upcoming
          </button>
        </div>

        {/* Right: dropdowns */}
        <div className="flex items-center gap-2">
          <DropdownButton label="Odds Format:" value="Decimal" />
          <DropdownButton label="Live Pool Multipliers" value="" hasInfo />
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Sport filter pills                                          */}
      {/* ============================================================ */}
      <div className="border-b border-[#23315A] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {sportFilters.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveSport(key)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                activeSport === key
                  ? "bg-[#603BFF] text-white"
                  : "border border-[#23315A] bg-[#0C1532] text-[#AAB5D0] hover:border-[#603BFF]/40 hover:text-white",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Market type tabs                                            */}
      {/* ============================================================ */}
      <div className="border-b border-[#23315A] px-4 py-2.5 sm:px-5">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {marketTypes.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveMarket(key)}
              className={cn(
                "shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                activeMarket === key
                  ? "bg-[#603BFF] text-white"
                  : "text-[#AAB5D0] hover:bg-white/5 hover:text-white",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Scrollable table area                                       */}
      {/* ============================================================ */}
      <div className="overflow-x-auto">
        <div className="min-w-[880px]">
          {/* Table header */}
          <div className="border-b border-[#23315A]/60 px-5 py-0.5">
            <div className={cn("grid items-center gap-x-3 py-3 text-[11px] font-medium uppercase tracking-wider text-[#AAB5D0]/60", TABLE_GRID)}>
              <span>Event / Competition</span>
              <span className="text-center">1</span>
              <span className="text-center">X</span>
              <span className="text-center">2</span>
              <span className="text-center">Pool</span>
              <span className="flex items-center justify-center gap-1">
                Live Multiplier
                <Info className="h-3 w-3" />
              </span>
              <span className="text-center">Est. Return</span>
              <span className="text-center">Actions</span>
              <span />
            </div>
          </div>

          {/* Table body — grouped by competition */}
          <div className="divide-y divide-[#23315A]/40">
            {mockGroups.map((group) => {
              const isCollapsed = collapsedGroups.has(group.id);
              return (
                <div key={group.id}>
                  {/* Group header */}
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    className={cn(
                      "flex w-full items-center gap-3 border-l-[3px] px-5 py-3 text-left transition-colors hover:bg-white/[0.02]",
                      group.accentColor,
                    )}
                  >
                    {isCollapsed ? (
                      <ChevronRight className="h-4 w-4 shrink-0 text-[#AAB5D0]/60" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-[#AAB5D0]/60" />
                    )}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white p-1">
                      <Image
                        src={group.logo}
                        alt={group.name}
                        width={24}
                        height={24}
                        className="h-full w-full object-contain"
                      />
                    </span>
                    <span className="text-sm font-semibold text-white">{group.name}</span>
                    {group.isLive && <LiveBadge />}
                    <span className="text-xs text-[#AAB5D0]/60">
                      {group.matchCount} match{group.matchCount !== 1 ? "es" : ""}
                    </span>
                  </button>

                  {/* Event rows */}
                  {!isCollapsed && (
                    <div className="divide-y divide-[#23315A]/30">
                      {group.events.map((event, idx) => {
                        const rowKey = `${group.id}-${idx}`;
                        return (
                          <div
                            key={rowKey}
                            className={cn("group grid items-center gap-x-3 px-5 py-3.5 transition-colors hover:bg-[#0C1532]/60", TABLE_GRID)}
                          >
                            {/* Event info */}
                            <div className="flex items-center gap-3">
                              <span className="w-11 shrink-0 text-xs font-medium text-[#AAB5D0]">
                                {event.time}
                              </span>

                              {event.isLive && <LiveBadge />}

                              <Link href={`/events/${event.id}`} className="min-w-0 hover:underline">
                                <p className="truncate text-sm font-medium text-white">
                                  {event.homeTeam} vs {event.awayTeam}
                                </p>
                                {event.region && (
                                  <p className="truncate text-[11px] text-[#AAB5D0]/70">
                                    {event.region}
                                  </p>
                                )}
                              </Link>
                            </div>

                            {/* Odds cells */}
                            <OddsCell
                              label="1"
                              value={event.odds.home}
                              isSelected={selectedOdds.has(`${rowKey}-home`)}
                              onClick={() => toggleOdd(`${rowKey}-home`)}
                            />
                            <OddsCell
                              label="X"
                              value={event.odds.draw}
                              isSelected={selectedOdds.has(`${rowKey}-draw`)}
                              onClick={() => toggleOdd(`${rowKey}-draw`)}
                            />
                            <OddsCell
                              label="2"
                              value={event.odds.away}
                              isSelected={selectedOdds.has(`${rowKey}-away`)}
                              onClick={() => toggleOdd(`${rowKey}-away`)}
                            />

                            {/* Pool */}
                            <span className="text-center text-xs font-semibold text-white">
                              {event.pool}{" "}
                              <span className="text-[10px] font-normal text-[#AAB5D0]/60">TKN</span>
                            </span>

                            {/* Live Multiplier */}
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-sm font-semibold text-[#22C55E]">
                                {event.multiplier.value.toFixed(2)}
                              </span>
                              <TrendingUp className="h-3 w-3 text-[#22C55E]" />
                              <span className="text-[10px] font-medium text-[#22C55E]">
                                +{event.multiplier.pct}%
                              </span>
                            </div>

                            {/* Est. Return */}
                            <span className="text-center text-xs font-semibold text-white">
                              {event.estReturn}{" "}
                              <span className="text-[10px] font-normal text-[#AAB5D0]/60">TKN</span>
                            </span>

                            {/* Pick button */}
                            <div className="flex items-center justify-center">
                              <Button
                                size="sm"
                                className="h-7 px-4 text-xs"
                                onClick={() => {
                                  // Visual feedback - you can enhance this
                                  const btn = document.activeElement as HTMLButtonElement;
                                  if (btn) {
                                    const originalText = btn.textContent;
                                    btn.textContent = "Added ✓";
                                    btn.classList.add("bg-[#22C55E]", "hover:bg-[#22C55E]");
                                    setTimeout(() => {
                                      btn.textContent = originalText || "Pick";
                                      btn.classList.remove("bg-[#22C55E]", "hover:bg-[#22C55E]");
                                    }, 1500);
                                  }
                                }}
                              >
                                Pick
                              </Button>
                            </div>

                            {/* Bookmark */}
                            <button
                              type="button"
                              onClick={() => toggleBookmark(rowKey)}
                              className="flex items-center justify-center"
                            >
                              <Star
                                className={cn(
                                  "h-4 w-4 transition-colors",
                                  bookmarked.has(rowKey)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-[#AAB5D0]/40 hover:text-[#AAB5D0]",
                                )}
                              />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
