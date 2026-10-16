"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
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
import { usePickSlip } from "@/contexts/pick-slip-context";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Sport = "all" | "nsmq" | "football" | "basketball" | "tennis" | "other";

interface UpcomingEvent {
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  market: string;
  multiplier: { value: number; pct: number };
  yourPick: string | null;
}

interface CompetitionGroup {
  id: string;
  name: string;
  subtitle: string;
  logo: string;
  accentColor: string;
  sport: Sport;
  eventCount: number;
  events: UpcomingEvent[];
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
  { key: "all", label: "All", count: 42, icon: Layers },
  { key: "nsmq", label: "NSMQ", count: 8, icon: GraduationCap },
  { key: "football", label: "Football", count: 18, icon: Goal },
  { key: "basketball", label: "Basketball", count: 7, icon: CircleDot },
  { key: "tennis", label: "Tennis", count: 4, icon: Target },
  { key: "other", label: "Other", count: 5, icon: Gamepad2 },
];

const dateFilters = [
  { label: "All Dates", value: "all" },
  { label: "Today", sublabel: "Oct 16", value: "today" },
  { label: "Sat", sublabel: "Oct 17", value: "sat" },
  { label: "Sun", sublabel: "Oct 18", value: "sun" },
  { label: "Mon", sublabel: "Oct 19", value: "mon" },
  { label: "Tue", sublabel: "Oct 20", value: "tue" },
];

const competitions: CompetitionGroup[] = [
  {
    id: "nsmq",
    name: "NSMQ",
    subtitle: "Regional Championships · Ghana",
    logo: "https://static.wixstatic.com/media/a1e1f8_8706e696c8fc47bd82b930a71515301d~mv2.png/v1/fill/w_80,h_80,al_c,q_85,enc_avif,quality_auto/NSMQ%20Logo.png",
    accentColor: "border-l-[#603BFF]",
    sport: "nsmq",
    eventCount: 8,
    events: [
      {
        date: "16 Oct 2026",
        time: "09:00 AM",
        homeTeam: "Kumasi Academy",
        awayTeam: "Prempeh College",
        league: "Round 3 · Kumasi Region",
        market: "1X2",
        multiplier: { value: 1.76, pct: 12 },
        yourPick: null,
      },
      {
        date: "16 Oct 2026",
        time: "11:30 AM",
        homeTeam: "St. Thomas Aquinas",
        awayTeam: "Achimota School",
        league: "Round 3 · Greater Accra Region",
        market: "Over/Under 2.5",
        multiplier: { value: 2.12, pct: 8 },
        yourPick: null,
      },
      {
        date: "17 Oct 2026",
        time: "09:00 AM",
        homeTeam: "Wesley Girls",
        awayTeam: "Accra Academy",
        league: "Round 3 · Central Region",
        market: "Both Teams to Score",
        multiplier: { value: 1.64, pct: 5 },
        yourPick: null,
      },
      {
        date: "18 Oct 2026",
        time: "01:00 PM",
        homeTeam: "Mfantsipim",
        awayTeam: "Adisadel College",
        league: "Round 3 · Western Region",
        market: "1X2",
        multiplier: { value: 1.92, pct: 9 },
        yourPick: null,
      },
    ],
  },
  {
    id: "football",
    name: "Football",
    subtitle: "Premier League · Europe · International",
    logo: "https://crests.football-data.org/PL.png",
    accentColor: "border-l-[#22C55E]",
    sport: "football",
    eventCount: 12,
    events: [
      {
        date: "17 Oct 2026",
        time: "03:00 PM",
        homeTeam: "Man City",
        awayTeam: "Arsenal",
        league: "Premier League",
        market: "1X2",
        multiplier: { value: 1.85, pct: 10 },
        yourPick: null,
      },
      {
        date: "18 Oct 2026",
        time: "04:30 PM",
        homeTeam: "Liverpool",
        awayTeam: "Chelsea",
        league: "Premier League",
        market: "Over/Under 2.5",
        multiplier: { value: 1.98, pct: 7 },
        yourPick: null,
      },
      {
        date: "19 Oct 2026",
        time: "08:00 PM",
        homeTeam: "Barcelona",
        awayTeam: "Real Betis",
        league: "La Liga",
        market: "1X2",
        multiplier: { value: 1.72, pct: 6 },
        yourPick: null,
      },
      {
        date: "20 Oct 2026",
        time: "07:45 PM",
        homeTeam: "Bayern Munich",
        awayTeam: "Dortmund",
        league: "Bundesliga",
        market: "Both Teams to Score",
        multiplier: { value: 2.05, pct: 9 },
        yourPick: null,
      },
    ],
  },
  {
    id: "basketball",
    name: "Basketball",
    subtitle: "NBA · EuroLeague · College",
    logo: "",
    accentColor: "border-l-[#F59E0B]",
    sport: "basketball",
    eventCount: 7,
    events: [
      {
        date: "17 Oct 2026",
        time: "07:30 PM",
        homeTeam: "Lakers",
        awayTeam: "Warriors",
        league: "NBA",
        market: "1X2",
        multiplier: { value: 1.68, pct: 8 },
        yourPick: null,
      },
      {
        date: "18 Oct 2026",
        time: "08:00 PM",
        homeTeam: "Celtics",
        awayTeam: "Heat",
        league: "NBA",
        market: "Over/Under 2.5",
        multiplier: { value: 1.9, pct: 6 },
        yourPick: null,
      },
      {
        date: "19 Oct 2026",
        time: "06:30 PM",
        homeTeam: "Raptors",
        awayTeam: "76ers",
        league: "NBA",
        market: "1X2",
        multiplier: { value: 1.74, pct: 7 },
        yourPick: null,
      },
    ],
  },
  {
    id: "tennis",
    name: "Tennis",
    subtitle: "ATP Tour · WTA",
    logo: "",
    accentColor: "border-l-[#10B981]",
    sport: "tennis",
    eventCount: 4,
    events: [
      {
        date: "18 Oct 2026",
        time: "11:00 AM",
        homeTeam: "Alcaraz",
        awayTeam: "Medvedev",
        league: "ATP Tour · Paris",
        market: "1X2",
        multiplier: { value: 1.66, pct: 9 },
        yourPick: null,
      },
      {
        date: "19 Oct 2026",
        time: "08:00 PM",
        homeTeam: "Sabalenka",
        awayTeam: "Rybakina",
        league: "WTA · Tokyo",
        market: "Over/Under 2.5",
        multiplier: { value: 1.88, pct: 6 },
        yourPick: null,
      },
    ],
  },
  {
    id: "other",
    name: "Other Sports",
    subtitle: "Volleyball · Athletics · eSports",
    logo: "",
    accentColor: "border-l-[#EC4899]",
    sport: "other",
    eventCount: 5,
    events: [
      {
        date: "18 Oct 2026",
        time: "02:00 PM",
        homeTeam: "Ghana",
        awayTeam: "Nigeria",
        league: "Volleyball · African Championship",
        market: "1X2",
        multiplier: { value: 1.58, pct: 5 },
        yourPick: null,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function UpcomingBadge() {
  return (
    <span className="inline-flex shrink-0 items-center rounded-md bg-[#603BFF]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#603BFF]">
      Upcoming
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

export default function UpcomingPage() {
  const { openPickSlip } = usePickSlip();
  const [activeSport, setActiveSport] = useState<Sport>("all");
  const [activeDate, setActiveDate] = useState("today");
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
      ? competitions
      : competitions.filter((c) => c.sport === activeSport);

  return (
    <div className="space-y-5">
      {/* ============================================================ */}
      {/*  Page header                                                  */}
      {/* ============================================================ */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#603BFF]/15">
            <CalendarDays className="h-5 w-5 text-[#603BFF]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Upcoming Events</h1>
            <p className="text-sm text-[#AAB5D0]">
              Plan your picks. Higher multipliers. Bigger rewards.
            </p>
          </div>
        </div>

        {/* Date selector */}
        <div className="flex items-center gap-1 rounded-lg bg-[#0C1532] p-1">
          {dateFilters.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => setActiveDate(d.value)}
              className={cn(
                "flex flex-col items-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                activeDate === d.value
                  ? "bg-[#603BFF] text-white"
                  : "text-[#AAB5D0] hover:text-white"
              )}
            >
              <span>{d.label}</span>
              {d.sublabel && (
                <span
                  className={cn(
                    "text-[10px]",
                    activeDate === d.value
                      ? "text-white/70"
                      : "text-[#AAB5D0]/50"
                  )}
                >
                  {d.sublabel}
                </span>
              )}
            </button>
          ))}
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
      </div>

      {/* ============================================================ */}
      {/*  Events table                                                */}
      {/* ============================================================ */}
      <div className="rounded-lg bg-[#0F1A36]">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Table header */}
            <div className="grid grid-cols-[130px_minmax(280px,1fr)_120px_130px_80px_100px] items-center gap-x-3 border-b border-[#23315A]/60 px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-[#AAB5D0]/60">
              <span>Date & Time</span>
              <span>Event / Competition</span>
              <span>Market</span>
              <span>Pool Multiplier</span>
              <span>Your Pick</span>
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
                        <span className="text-sm font-semibold text-white">
                          {group.name}
                        </span>
                        <p className="text-xs text-[#AAB5D0]/60">
                          {group.subtitle}
                        </p>
                      </div>
                      <span className="ml-auto shrink-0 text-xs text-[#AAB5D0]/60">
                        {group.eventCount} upcoming events
                      </span>
                    </button>

                    {/* Event rows */}
                    {!isCollapsed && (
                      <div className="divide-y divide-[#23315A]/20">
                        {group.events.map((event, idx) => (
                          <div
                            key={`${group.id}-${idx}`}
                            className="grid grid-cols-[130px_minmax(280px,1fr)_120px_130px_80px_100px] items-center gap-x-3 px-5 py-3.5 transition-colors hover:bg-[#0C1532]/60"
                          >
                            {/* Date & Time */}
                            <div>
                              <p className="text-xs font-medium text-[#AAB5D0]">
                                {event.date}
                              </p>
                              <p className="text-xs text-[#AAB5D0]/60">
                                {event.time}
                              </p>
                            </div>

                            {/* Event / Competition */}
                            <div className="flex items-center gap-3">
                              <UpcomingBadge />
                              <CompLogo src={group.logo} name={group.name} />
                              <div className="min-w-0">
                                <p className="truncate text-sm text-white">
                                  {event.homeTeam} vs {event.awayTeam}
                                </p>
                                <p className="truncate text-[11px] text-[#AAB5D0]/60">
                                  {event.league}
                                </p>
                              </div>
                            </div>

                            {/* Market */}
                            <span className="text-sm text-white">
                              {event.market}
                            </span>

                            {/* Pool Multiplier */}
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold text-white">
                                {event.multiplier.value.toFixed(2)}
                              </span>
                              <TrendingUp className="h-3.5 w-3.5 text-[#22C55E]" />
                              <span className="text-xs font-medium text-[#22C55E]">
                                +{event.multiplier.pct}%
                              </span>
                            </div>

                            {/* Your Pick */}
                            <span className="text-sm text-[#AAB5D0]/40">
                              {event.yourPick ?? "—"}
                            </span>

                            {/* Actions */}
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-full text-xs"
                            >
                              View Odds
                            </Button>
                          </div>
                        ))}
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
