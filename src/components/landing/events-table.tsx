"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tab = "live" | "upcoming" | "popular";

const tabs: { key: Tab; label: string; count?: number }[] = [
  { key: "live", label: "Live Now", count: 12 },
  { key: "upcoming", label: "Upcoming", count: 28 },
  { key: "popular", label: "Popular" },
];

const events = [
  {
    competition: "NSMQ Regional",
    competitionSub: "Academic",
    icon: "N",
    iconColor: "bg-gradient-to-br from-[#4930E8] to-[#9B5CFF]",
    teams: "Kumasi Academy vs Prempeh College",
    status: "Round 3",
    statusStyle: "red" as const,
    startsIn: "12m",
    pool: "124.5K TKN",
  },
  {
    competition: "Premier League",
    competitionSub: "Football",
    icon: "PL",
    iconColor: "bg-gradient-to-br from-[#2563EB] to-[#603BFF]",
    teams: "Man City vs Arsenal",
    status: "LIVE",
    statusStyle: "green" as const,
    startsIn: "78'",
    pool: "2.4M TKN",
  },
  {
    competition: "UEFA Champions League",
    competitionSub: "Football",
    icon: "UCL",
    iconColor: "bg-gradient-to-br from-[#2563EB] to-[#4930E8]",
    teams: "Real Madrid vs Bayern Munich",
    status: "",
    statusStyle: "none" as const,
    startsIn: "Today, 9:00 PM",
    pool: "1.8M TKN",
  },
  {
    competition: "La Liga",
    competitionSub: "Football",
    icon: "LL",
    iconColor: "bg-gradient-to-br from-[#F43F5E] to-[#603BFF]",
    teams: "Barcelona vs Real Betis",
    status: "",
    statusStyle: "none" as const,
    startsIn: "Today, 10:30 PM",
    pool: "980K TKN",
  },
];

export function EventsTable() {
  const [activeTab, setActiveTab] = useState<Tab>("live");

  return (
    <div className="rounded-2xl border border-[#23315A] bg-[#101A3A]">
      {/* Tab header */}
      <div className="flex items-center justify-between border-b border-[#23315A] px-5 py-3">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                activeTab === tab.key
                  ? tab.key === "live"
                    ? "bg-[#F43F5E]/15 text-[#F43F5E]"
                    : "bg-[#603BFF]/15 text-[#8B5CF6]"
                  : "text-[#AAB5D0] hover:text-white",
              )}
            >
              {tab.key === "live" && (
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F43F5E]" />
              )}
              {tab.key === "popular" && <Flame className="h-3.5 w-3.5" />}
              {tab.label}
              {tab.count != null && (
                <span className="ml-0.5 text-xs opacity-60">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        <Link
          href="/live"
          className="hidden items-center gap-1 text-sm font-medium text-[#603BFF] hover:underline sm:flex"
        >
          View all events
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Column headers */}
      <div className="hidden grid-cols-[180px_1fr_90px_110px_100px_70px] items-center gap-2 border-b border-[#23315A]/60 px-5 py-2.5 text-xs font-medium text-[#AAB5D0]/70 sm:grid">
        <span>Competition</span>
        <span>Teams / Event</span>
        <span>Status</span>
        <span>Starts In</span>
        <span>Pool</span>
        <span />
      </div>

      {/* Event rows */}
      <div className="divide-y divide-[#23315A]/60">
        {events.map((event, i) => (
          <div
            key={i}
            className="grid items-center gap-2 px-5 py-3 transition-colors hover:bg-[#0C1532] sm:grid-cols-[180px_1fr_90px_110px_100px_70px]"
          >
            {/* Competition */}
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white",
                  event.iconColor,
                )}
              >
                {event.icon}
              </div>
              <div>
                <span className="text-sm font-medium text-white">
                  {event.competition}
                </span>
                <p className="text-[11px] text-[#AAB5D0]">
                  {event.competitionSub}
                </p>
              </div>
            </div>

            {/* Teams */}
            <span className="text-sm text-[#AAB5D0]">{event.teams}</span>

            {/* Status */}
            <div>
              {event.statusStyle === "red" ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#F43F5E]/15 px-2 py-0.5 text-[11px] font-semibold text-[#F43F5E]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F43F5E]" />
                  {event.status}
                </span>
              ) : event.statusStyle === "green" ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#22C55E]/15 px-2 py-0.5 text-[11px] font-semibold text-[#22C55E]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22C55E]" />
                  {event.status}
                </span>
              ) : (
                <span className="text-xs text-[#AAB5D0]/60">&mdash;</span>
              )}
            </div>

            {/* Starts In */}
            <span className="text-sm text-[#AAB5D0]">{event.startsIn}</span>

            {/* Pool */}
            <span className="text-sm font-semibold text-white">
              {event.pool}
            </span>

            {/* Pick button */}
            <Link href={`/events/${i + 1}`}>
              <Button size="sm" className="h-7 px-4 text-xs">
                Pick
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
