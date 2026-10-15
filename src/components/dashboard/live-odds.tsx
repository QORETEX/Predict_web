"use client";

import { useState } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const SPORT_TABS = ["NSMQ", "Football", "Basketball", "Tennis"] as const;

interface OddsItem {
  rank: number;
  team: string;
  odds: number;
  change: number;
}

const MOCK_ODDS: OddsItem[] = [
  { rank: 1, team: "Kumasi Academy", odds: 1.78, change: 12 },
  { rank: 2, team: "Prempeh College", odds: 2.12, change: 8 },
  { rank: 3, team: "Accra Academy", odds: 1.95, change: 6 },
  { rank: 4, team: "St. Roses SHS", odds: 1.88, change: 9 },
  { rank: 5, team: "Wesley Girls", odds: 1.72, change: 11 },
];

export function LiveOdds() {
  const [activeTab, setActiveTab] = useState<string>("NSMQ");

  return (
    <div className="rounded-lg bg-[#0F1A36] p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">
          Live Odds &amp; Multipliers
        </h3>
        <button className="flex items-center gap-1 text-xs text-[#AAB5D0] transition-colors hover:text-white">
          View all
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* Sport filter tabs */}
      <div className="mt-3 flex gap-1.5">
        {SPORT_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors",
              activeTab === tab
                ? "bg-[#603BFF] text-white"
                : "bg-[#0C1532] text-[#AAB5D0] hover:bg-[#162040] hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Odds list */}
      <div className="mt-3 space-y-2">
        {MOCK_ODDS.map((item) => (
          <div
            key={item.rank}
            className="flex items-center gap-3 rounded-md bg-[#0C1532] px-3 py-2"
          >
            {/* Rank */}
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1A2744] text-[11px] font-bold text-white">
              {item.rank}
            </span>

            {/* Team name */}
            <span className="min-w-0 flex-1 truncate text-xs font-medium text-white">
              {item.team}
            </span>

            {/* Odds */}
            <span className="text-sm font-semibold text-white">
              {item.odds.toFixed(2)}
            </span>

            {/* Change */}
            <span className="flex items-center gap-0.5 text-[11px] font-medium text-[#22C55E]">
              <TrendingUp className="h-3 w-3" />
              {item.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
