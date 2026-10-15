"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Info,
  Star,
  TrendingUp,
  ChevronDown,
  ChevronUp,
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

type Sport = "all" | "nsmq" | "football" | "basketball" | "tennis" | "other";

interface EventRow {
  time: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  market: string;
  marketDetail: string;
  multiplier: { value: number; pct: number };
  pool: string;
  poolFrom: string;
  timeLeft: string;
}

interface CompetitionGroup {
  id: string;
  name: string;
  subtitle: string;
  logo: string;
  accentColor: string;
  sport: Sport;
  matchCount: number;
  events: EventRow[];
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const sportFilters: {
  key: Sport;
  label: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "all", label: "All", count: 26, icon: Layers },
  { key: "nsmq", label: "NSMQ", count: 5, icon: GraduationCap },
  { key: "football", label: "Football", count: 12, icon: Goal },
  { key: "basketball", label: "Basketball", count: 4, icon: CircleDot },
  { key: "tennis", label: "Tennis", count: 3, icon: Target },
  { key: "other", label: "Other", count: 2, icon: Gamepad2 },
];

const competitions: CompetitionGroup[] = [
  {
    id: "nsmq-regional",
    name: "NSMQ Regional Championship",
    subtitle: "Round 3 · Kumasi Academy",
    logo: "https://static.wixstatic.com/media/a1e1f8_8706e696c8fc47bd82b930a71515301d~mv2.png/v1/fill/w_80,h_80,al_c,q_85,enc_avif,quality_auto/NSMQ%20Logo.png",
    accentColor: "border-l-[#603BFF]",
    sport: "nsmq",
    matchCount: 2,
    events: [
      {
        time: "07:12",
        homeTeam: "Kumasi Academy",
        awayTeam: "Prempeh College",
        homeLogo: "",
        awayLogo: "",
        market: "1X2",
        marketDetail: "Kumasi Academy to win",
        multiplier: { value: 1.78, pct: 12 },
        pool: "124.5K",
        poolFrom: "from 70K",
        timeLeft: "12:48",
      },
      {
        time: "08:05",
        homeTeam: "St. Thomas Aquinas",
        awayTeam: "Achimota School",
        homeLogo: "",
        awayLogo: "",
        market: "Over/Under 2.5",
        marketDetail: "Over 2.5 goals",
        multiplier: { value: 2.12, pct: 8 },
        pool: "98.3K",
        poolFrom: "from 50K",
        timeLeft: "27:16",
      },
    ],
  },
  {
    id: "premier-league",
    name: "Premier League",
    subtitle: "Matchday 7 · England",
    logo: "https://crests.football-data.org/PL.png",
    accentColor: "border-l-[#22C55E]",
    sport: "football",
    matchCount: 4,
    events: [
      {
        time: "15:24",
        homeTeam: "Man City",
        awayTeam: "Arsenal",
        homeLogo: "",
        awayLogo: "",
        market: "1X2",
        marketDetail: "Man City to win",
        multiplier: { value: 1.96, pct: 10 },
        pool: "245.7K",
        poolFrom: "from 125K",
        timeLeft: "67:36",
      },
      {
        time: "17:10",
        homeTeam: "Liverpool",
        awayTeam: "Chelsea",
        homeLogo: "",
        awayLogo: "",
        market: "Over/Under 2.5",
        marketDetail: "Over 2.5 goals",
        multiplier: { value: 1.85, pct: 7 },
        pool: "368.5K",
        poolFrom: "from 200K",
        timeLeft: "105:22",
      },
    ],
  },
  {
    id: "ucl",
    name: "UEFA Champions League",
    subtitle: "Group Stage · Europe",
    logo: "https://crests.football-data.org/CL.png",
    accentColor: "border-l-[#3B82F6]",
    sport: "football",
    matchCount: 3,
    events: [
      {
        time: "16:32",
        homeTeam: "Real Madrid",
        awayTeam: "Bayern Munich",
        homeLogo: "",
        awayLogo: "",
        market: "1X2",
        marketDetail: "Real Madrid to win",
        multiplier: { value: 2.04, pct: 9 },
        pool: "637.0K",
        poolFrom: "from 320K",
        timeLeft: "82:08",
      },
      {
        time: "18:50",
        homeTeam: "Barcelona",
        awayTeam: "Inter Milan",
        homeLogo: "",
        awayLogo: "",
        market: "Both Teams to Score",
        marketDetail: "Yes",
        multiplier: { value: 1.92, pct: 6 },
        pool: "530.7K",
        poolFrom: "from 280K",
        timeLeft: "110:44",
      },
    ],
  },
  {
    id: "la-liga",
    name: "La Liga",
    subtitle: "Matchday 8 · Spain",
    logo: "https://crests.football-data.org/PD.png",
    accentColor: "border-l-[#F59E0B]",
    sport: "football",
    matchCount: 2,
    events: [
      {
        time: "14:20",
        homeTeam: "Atletico Madrid",
        awayTeam: "Villarreal",
        homeLogo: "",
        awayLogo: "",
        market: "1X2",
        marketDetail: "Atletico Madrid to win",
        multiplier: { value: 1.72, pct: 11 },
        pool: "210.4K",
        poolFrom: "from 110K",
        timeLeft: "53:12",
      },
      {
        time: "19:00",
        homeTeam: "Real Sociedad",
        awayTeam: "Getafe",
        homeLogo: "",
        awayLogo: "",
        market: "Over/Under 2.5",
        marketDetail: "Over 2.5 goals",
        multiplier: { value: 1.88, pct: 8 },
        pool: "187.6K",
        poolFrom: "from 100K",
        timeLeft: "118:26",
      },
    ],
  },
  {
    id: "nba",
    name: "NBA",
    subtitle: "Regular Season",
    logo: "",
    accentColor: "border-l-[#EF4444]",
    sport: "basketball",
    matchCount: 2,
    events: [
      {
        time: "20:15",
        homeTeam: "Lakers",
        awayTeam: "Warriors",
        homeLogo: "",
        awayLogo: "",
        market: "1X2",
        marketDetail: "Lakers to win",
        multiplier: { value: 1.74, pct: 10 },
        pool: "320.8K",
        poolFrom: "from 170K",
        timeLeft: "76:32",
      },
      {
        time: "22:40",
        homeTeam: "Celtics",
        awayTeam: "Heat",
        homeLogo: "",
        awayLogo: "",
        market: "Over/Under 2.5",
        marketDetail: "Over 2.5 goals",
        multiplier: { value: 1.91, pct: 7 },
        pool: "280.2K",
        poolFrom: "from 150K",
        timeLeft: "98:11",
      },
    ],
  },
  {
    id: "tennis-atp",
    name: "Tennis",
    subtitle: "ATP Tour · Paris",
    logo: "",
    accentColor: "border-l-[#10B981]",
    sport: "tennis",
    matchCount: 1,
    events: [
      {
        time: "17:30",
        homeTeam: "Alcaraz",
        awayTeam: "Medvedev",
        homeLogo: "",
        awayLogo: "",
        market: "1X2",
        marketDetail: "Alcaraz to win",
        multiplier: { value: 1.66, pct: 9 },
        pool: "152.7K",
        poolFrom: "from 80K",
        timeLeft: "62:18",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function LiveBadge({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-red-500/15 font-bold uppercase tracking-wide text-red-500",
        size === "md"
          ? "px-3 py-1 text-xs"
          : "px-2 py-0.5 text-[10px]"
      )}
    >
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
      Live
    </span>
  );
}

function CompLogo({ src, name }: { src: string; name: string }) {
  if (!src) {
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

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function LivePage() {
  const [activeSport, setActiveSport] = useState<Sport>("all");
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    new Set()
  );
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [liveMultipliers, setLiveMultipliers] = useState(true);

  function toggleGroup(id: string) {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
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

  const filtered =
    activeSport === "all"
      ? competitions
      : competitions.filter((c) => c.sport === activeSport);

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
          <div className="flex items-center gap-3">
            <LiveBadge size="md" />
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Live Events
            </h1>
          </div>
          <p className="mt-2 max-w-lg text-sm text-[#AAB5D0]">
            Real-time events. Live multipliers. Place your picks before the
            market locks.
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Sport filter pills                                          */}
      {/* ============================================================ */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {sportFilters.map(({ key, label, count, icon: Icon }) => (
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
            <Icon className="h-3.5 w-3.5" />
            {label} ({count})
          </button>
        ))}

        {/* Live multipliers toggle */}
        <button
          type="button"
          onClick={() => setLiveMultipliers((v) => !v)}
          className={cn(
            "ml-auto flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
            liveMultipliers
              ? "bg-[#22C55E]/15 text-[#22C55E]"
              : "border border-[#23315A] bg-[#0C1532] text-[#AAB5D0]"
          )}
        >
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              liveMultipliers ? "bg-[#22C55E]" : "bg-[#AAB5D0]/40"
            )}
          />
          Live Multipliers
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ============================================================ */}
      {/*  Events table                                                */}
      {/* ============================================================ */}
      <div className="rounded-lg bg-[#0F1A36]">
        {/* Table header */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[minmax(280px,1fr)_140px_140px_120px_80px_80px] items-center gap-x-3 border-b border-[#23315A]/60 px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-[#AAB5D0]/60">
              <span>Event / Competition</span>
              <span>Market</span>
              <span className="flex items-center gap-1">
                Live Multiplier
                <Info className="h-3 w-3" />
              </span>
              <span>Est. Return</span>
              <span>Time Left</span>
              <span>Actions</span>
            </div>

            {/* Competition groups */}
            <div className="divide-y divide-[#23315A]/30">
              {filtered.map((group) => {
                const isCollapsed = collapsedGroups.has(group.id);
                return (
                  <div key={group.id}>
                    {/* Group header */}
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.id)}
                      className={cn(
                        "flex w-full items-center gap-3 border-l-[3px] px-5 py-3 text-left transition-colors hover:bg-white/[0.02]",
                        group.accentColor
                      )}
                    >
                      {isCollapsed ? (
                        <ChevronDown className="h-4 w-4 shrink-0 text-[#AAB5D0]/60" />
                      ) : (
                        <ChevronUp className="h-4 w-4 shrink-0 text-[#AAB5D0]/60" />
                      )}
                      <CompLogo src={group.logo} name={group.name} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">
                            {group.name}
                          </span>
                          <LiveBadge />
                        </div>
                        <p className="text-xs text-[#AAB5D0]/60">
                          {group.subtitle}
                        </p>
                      </div>
                      <span className="ml-auto shrink-0 text-xs text-[#AAB5D0]/60">
                        {group.matchCount} match
                        {group.matchCount !== 1 ? "es" : ""} live
                      </span>
                    </button>

                    {/* Event rows */}
                    {!isCollapsed && (
                      <div className="divide-y divide-[#23315A]/20">
                        {group.events.map((event, idx) => {
                          const rowKey = `${group.id}-${idx}`;
                          return (
                            <div
                              key={rowKey}
                              className="grid grid-cols-[minmax(280px,1fr)_140px_140px_120px_80px_80px] items-center gap-x-3 px-5 py-3.5 transition-colors hover:bg-[#0C1532]/60"
                            >
                              {/* Event info */}
                              <div className="flex items-center gap-3">
                                <span className="w-11 shrink-0 text-center text-xs font-medium text-[#AAB5D0]">
                                  {event.time}
                                </span>
                                <LiveBadge />
                                <CompLogo
                                  src={event.homeLogo || group.logo}
                                  name={event.homeTeam}
                                />
                                <span className="min-w-0 truncate text-sm text-white">
                                  {event.homeTeam} vs {event.awayTeam}
                                </span>
                              </div>

                              {/* Market */}
                              <div>
                                <p className="text-sm font-medium text-white">
                                  {event.market}
                                </p>
                                <p className="text-[11px] text-[#AAB5D0]/60">
                                  {event.marketDetail}
                                </p>
                              </div>

                              {/* Live Multiplier */}
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-bold text-white">
                                  {event.multiplier.value.toFixed(2)}
                                </span>
                                <TrendingUp className="h-3.5 w-3.5 text-[#22C55E]" />
                                <span className="text-xs font-medium text-[#22C55E]">
                                  +{event.multiplier.pct}%
                                </span>
                              </div>

                              {/* Est. Return (pool) */}
                              <div>
                                <p className="text-sm font-semibold text-white">
                                  {event.pool}{" "}
                                  <span className="text-[10px] font-normal text-[#AAB5D0]/60">
                                    TKN
                                  </span>
                                </p>
                                <p className="text-[11px] text-[#AAB5D0]/50">
                                  ({event.poolFrom})
                                </p>
                              </div>

                              {/* Time Left */}
                              <span className="text-sm font-medium text-[#AAB5D0]">
                                {event.timeLeft}
                              </span>

                              {/* Actions */}
                              <div className="flex items-center gap-2">
                                <Button size="sm" className="h-7 px-4 text-xs">
                                  Pick
                                </Button>
                                <button
                                  type="button"
                                  onClick={() => toggleBookmark(rowKey)}
                                >
                                  <Star
                                    className={cn(
                                      "h-4 w-4 transition-colors",
                                      bookmarked.has(rowKey)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-[#AAB5D0]/40 hover:text-[#AAB5D0]"
                                    )}
                                  />
                                </button>
                              </div>
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
    </div>
  );
}
