"use client";

import { useState } from "react";
import Image from "next/image";
import {
  TrendingUp,
  ChevronDown,
  Trophy,
  SlidersHorizontal,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePickSlip } from "@/contexts/pick-slip-context";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type PageTab = "fixtures" | "results" | "standings" | "top-schools" | "leaderboard";
type Round = "all" | "round-3" | "quarter-finals" | "semi-finals" | "finals";

interface FixtureRow {
  date: string;
  time: string;
  isLive: boolean;
  homeTeam: string;
  homeLogo: string;
  awayTeam: string;
  awayLogo: string;
  round: string;
  region: string;
  competition: string;
  competitionRound: string;
  yourPick: string;
  multiplier: { value: number; pct: number };
  estReturn: string;
}

interface FeaturedSchool {
  name: string;
  region: string;
  color: string;
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const pageTabs: { key: PageTab; label: string }[] = [
  { key: "fixtures", label: "Fixtures" },
  { key: "results", label: "Results" },
  { key: "standings", label: "Standings" },
  { key: "top-schools", label: "Top Schools" },
  { key: "leaderboard", label: "Leaderboard" },
];

const rounds: { key: Round; label: string }[] = [
  { key: "all", label: "All Rounds" },
  { key: "round-3", label: "Round 3" },
  { key: "quarter-finals", label: "Quarter-finals" },
  { key: "semi-finals", label: "Semi-finals" },
  { key: "finals", label: "Finals" },
];

const NSMQ_LOGO =
  "https://static.wixstatic.com/media/a1e1f8_8706e696c8fc47bd82b930a71515301d~mv2.png/v1/fill/w_80,h_80,al_c,q_85,enc_avif,quality_auto/NSMQ%20Logo.png";

const fixtures: FixtureRow[] = [
  {
    date: "Today",
    time: "10:00 AM",
    isLive: true,
    homeTeam: "Kumasi Academy",
    homeLogo: "",
    awayTeam: "Prempeh College",
    awayLogo: "",
    round: "Round 3",
    region: "Kumasi Region",
    competition: "NSMQ 2027",
    competitionRound: "Round 3",
    yourPick: "Kumasi Academy",
    multiplier: { value: 1.78, pct: 12 },
    estReturn: "124.5K",
  },
  {
    date: "Today",
    time: "11:30 AM",
    isLive: true,
    homeTeam: "St. Thomas Aquinas",
    homeLogo: "",
    awayTeam: "Achimota School",
    awayLogo: "",
    round: "Round 3",
    region: "Greater Accra Region",
    competition: "NSMQ 2027",
    competitionRound: "Round 3",
    yourPick: "Achimota School",
    multiplier: { value: 2.12, pct: 8 },
    estReturn: "98.3K",
  },
  {
    date: "Today",
    time: "01:00 PM",
    isLive: true,
    homeTeam: "Wesley Girls",
    homeLogo: "",
    awayTeam: "Accra Academy",
    awayLogo: "",
    round: "Round 3",
    region: "Central Region",
    competition: "NSMQ 2027",
    competitionRound: "Round 3",
    yourPick: "Wesley Girls",
    multiplier: { value: 1.85, pct: 6 },
    estReturn: "76.4K",
  },
  {
    date: "Today",
    time: "02:30 PM",
    isLive: true,
    homeTeam: "La Liga",
    homeLogo: "",
    awayTeam: "Bechem College",
    awayLogo: "",
    round: "Round 3",
    region: "Western Region",
    competition: "NSMQ 2027",
    competitionRound: "Round 3",
    yourPick: "La Liga",
    multiplier: { value: 1.72, pct: 5 },
    estReturn: "62.1K",
  },
  {
    date: "Today",
    time: "04:00 PM",
    isLive: false,
    homeTeam: "St. Francis Xavier",
    homeLogo: "",
    awayTeam: "Oti Boateng SHS",
    awayLogo: "",
    round: "Round 3",
    region: "Volta Region",
    competition: "NSMQ 2027",
    competitionRound: "Round 3",
    yourPick: "St. Francis Xavier",
    multiplier: { value: 2.05, pct: 9 },
    estReturn: "87.7K",
  },
  {
    date: "Today",
    time: "05:30 PM",
    isLive: false,
    homeTeam: "T. I. Ahmadiyya",
    homeLogo: "",
    awayTeam: "St. Augustine's College",
    awayLogo: "",
    round: "Round 3",
    region: "Ashanti Region",
    competition: "NSMQ 2027",
    competitionRound: "Round 3",
    yourPick: "T. I. Ahmadiyya",
    multiplier: { value: 1.96, pct: 7 },
    estReturn: "71.4K",
  },
];

const featuredSchools: FeaturedSchool[] = [
  { name: "Kumasi Academy", region: "Ashanti Region", color: "bg-yellow-500" },
  { name: "Prempeh College", region: "Central Region", color: "bg-green-500" },
  { name: "Wesley Girls", region: "Central Region", color: "bg-red-500" },
  { name: "Accra Academy", region: "Greater Accra Region", color: "bg-blue-500" },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function LiveBadge() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
      Live
    </span>
  );
}

function SchoolAvatar({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white",
        color
      )}
    >
      {initials}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function NsmqPage() {
  const { openPickSlip } = usePickSlip();
  const [activeTab, setActiveTab] = useState<PageTab>("fixtures");
  const [activeRound, setActiveRound] = useState<Round>("all");
  const [activeYear, setActiveYear] = useState("2027");

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
        <div className="relative flex items-center gap-6 px-6 py-8 sm:px-8">
          {/* NSMQ Logo */}
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white p-2 shadow-lg sm:h-28 sm:w-28">
            <Image
              src={NSMQ_LOGO}
              alt="NSMQ logo"
              width={96}
              height={96}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">NSMQ</h1>
            <p className="mt-1 text-base text-[#AAB5D0]">
              Ghana&apos;s biggest academic quiz.
            </p>
            <p className="text-sm text-[#AAB5D0]/70">
              Predict. Support. Earn.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Page tabs                                                    */}
      {/* ============================================================ */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {pageTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors",
                activeTab === tab.key
                  ? "bg-[#603BFF] text-white"
                  : "text-[#AAB5D0] hover:bg-white/5 hover:text-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Year selector */}
        <button
          type="button"
          className="ml-auto flex items-center gap-2 rounded-lg border border-[#23315A] bg-[#0C1532] px-4 py-2 text-sm font-medium text-white transition-colors hover:border-[#603BFF]/50"
        >
          NSMQ {activeYear}
          <ChevronDown className="h-3.5 w-3.5 text-[#AAB5D0]/60" />
        </button>
      </div>

      {/* ============================================================ */}
      {/*  Round filter pills                                          */}
      {/* ============================================================ */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {rounds.map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => setActiveRound(r.key)}
            className={cn(
              "shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors",
              activeRound === r.key
                ? "bg-[#603BFF] text-white"
                : "border border-[#23315A] bg-[#0C1532] text-[#AAB5D0] hover:border-[#603BFF]/40 hover:text-white"
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* ============================================================ */}
      {/*  Fixtures table                                              */}
      {/* ============================================================ */}
      <div className="rounded-lg bg-[#0F1A36]">
        {/* Table title bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#23315A]/60 px-5 py-3">
          <div>
            <h2 className="text-base font-semibold text-white">
              NSMQ Fixtures
            </h2>
            <p className="text-xs text-[#AAB5D0]/60">
              National Science & Maths Quiz – Round 3
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full bg-[#22C55E]/15 px-3 py-1.5 text-xs font-medium text-[#22C55E]"
            >
              <Radio className="h-3 w-3" />
              Live
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg border border-[#23315A] bg-[#0C1532] px-3 py-1.5 text-xs text-[#AAB5D0] transition-colors hover:border-[#603BFF]/50"
            >
              <SlidersHorizontal className="h-3 w-3" />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[920px]">
            {/* Column headers */}
            <div className="grid grid-cols-[100px_minmax(240px,1fr)_130px_120px_130px_100px_100px] items-center gap-x-3 border-b border-[#23315A]/40 px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-[#AAB5D0]/60">
              <span>Date & Time</span>
              <span>Match</span>
              <span>Competition</span>
              <span>Your Pick</span>
              <span>Pool Multiplier</span>
              <span>Est. Return</span>
              <span>Actions</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-[#23315A]/20">
              {fixtures.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[100px_minmax(240px,1fr)_130px_120px_130px_100px_100px] items-center gap-x-3 px-5 py-3.5 transition-colors hover:bg-[#0C1532]/60"
                >
                  {/* Date & Time */}
                  <div>
                    <p className="text-xs font-medium text-white">
                      {row.date}
                    </p>
                    <p className="text-[11px] text-[#AAB5D0]/60">{row.time}</p>
                  </div>

                  {/* Match */}
                  <div className="flex items-center gap-2">
                    {row.isLive && <LiveBadge />}
                    <SchoolAvatar name={row.homeTeam} color="bg-[#603BFF]" />
                    <span className="truncate text-sm text-white">
                      {row.homeTeam}
                    </span>
                    <span className="text-xs text-[#AAB5D0]/40">v</span>
                    <SchoolAvatar name={row.awayTeam} color="bg-[#1A2747]" />
                    <span className="truncate text-sm text-white">
                      {row.awayTeam}
                    </span>
                  </div>

                  {/* Competition */}
                  <div>
                    <p className="text-sm text-white">{row.competition}</p>
                    <p className="text-[11px] text-[#AAB5D0]/60">
                      {row.competitionRound}
                    </p>
                  </div>

                  {/* Your Pick */}
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-white">1X2</span>
                    <ChevronDown className="h-3 w-3 text-[#AAB5D0]/40" />
                    <p className="truncate text-[11px] text-[#AAB5D0]/60">
                      {row.yourPick}
                    </p>
                  </div>

                  {/* Pool Multiplier */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white">
                      {row.multiplier.value.toFixed(2)}
                    </span>
                    <TrendingUp className="h-3.5 w-3.5 text-[#22C55E]" />
                    <span className="text-xs font-medium text-[#22C55E]">
                      +{row.multiplier.pct}%
                    </span>
                  </div>

                  {/* Est. Return */}
                  <span className="text-sm font-semibold text-white">
                    {row.estReturn}{" "}
                    <span className="text-[10px] font-normal text-[#AAB5D0]/60">
                      TKN
                    </span>
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-3 text-xs"
                    >
                      View Odds
                    </Button>
                    <Button size="sm" className="h-7 px-3 text-xs">
                      Pick
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Prize pool banner                                           */}
      {/* ============================================================ */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-[#0F1A36] px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#603BFF]/15">
            <Trophy className="h-6 w-6 text-[#603BFF]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">
              NSMQ Prize Pool
            </h3>
            <p className="text-xs text-[#AAB5D0]/60">
              Biggest rewards for the brightest minds.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div>
            <p className="text-[11px] text-[#AAB5D0]/60">Total Pool</p>
            <p className="text-lg font-bold text-white">1,250,000 TKN</p>
          </div>
          <div>
            <p className="text-[11px] text-[#AAB5D0]/60">Live Multipliers</p>
            <p className="text-lg font-bold text-white">1.72 – 2.50</p>
          </div>
          <Button size="sm" className="h-9 px-5 text-sm">
            View Leaderboard →
          </Button>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Featured NSMQ Schools                                       */}
      {/* ============================================================ */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-white">
          Featured NSMQ Schools
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {featuredSchools.map((school) => (
            <div
              key={school.name}
              className="flex flex-col items-center gap-3 rounded-lg bg-[#0F1A36] px-4 py-5 transition-colors hover:bg-[#162042]"
            >
              <span
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold text-white",
                  school.color
                )}
              >
                {school.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
              <div className="text-center">
                <p className="text-sm font-semibold text-white">
                  {school.name}
                </p>
                <p className="text-xs text-[#AAB5D0]/60">{school.region}</p>
              </div>
              <Button size="sm" className="h-7 w-full px-4 text-xs">
                Follow
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
