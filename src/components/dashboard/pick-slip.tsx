"use client";

import { useState } from "react";
import { X, Plus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Pick {
  id: string;
  match: string;
  market: string;
  selection: string;
  odds: number;
}

const INITIAL_PICKS: Pick[] = [
  {
    id: "1",
    match: "Man City vs Arsenal",
    market: "1X2",
    selection: "Man City",
    odds: 1.72,
  },
  {
    id: "2",
    match: "Kumasi Academy vs Prempeh College",
    market: "1X2",
    selection: "Kumasi Academy",
    odds: 1.65,
  },
];

const STAKE_PRESETS = [10, 50, 200, 200] as const;

export function PickSlip() {
  const [picks, setPicks] = useState<Pick[]>(INITIAL_PICKS);
  const [stake, setStake] = useState<number>(50);

  const totalOdds = picks.reduce((acc, p) => acc * p.odds, 1);
  const estReturn = Math.round(stake * totalOdds * 100) / 100;

  function removePick(id: string) {
    setPicks((prev) => prev.filter((p) => p.id !== id));
  }

  function clearAll() {
    setPicks([]);
  }

  return (
    <div className="rounded-lg bg-[#0F1A36] p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-white">Pick Slip</h3>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#603BFF] px-1.5 text-[11px] font-bold text-white">
            {picks.length}
          </span>
        </div>
        <button
          onClick={clearAll}
          className="flex items-center gap-1 text-xs text-[#AAB5D0] transition-colors hover:text-white"
        >
          Clear all
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* Pick items */}
      <div className="mt-3 space-y-2">
        {picks.map((pick) => (
          <div
            key={pick.id}
            className="flex items-start justify-between rounded-md bg-[#0C1532] px-3 py-2.5"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-white">
                {pick.match}
              </p>
              <p className="mt-0.5 text-[11px] text-[#AAB5D0]">
                {pick.market} &mdash; {pick.selection}
              </p>
            </div>
            <div className="ml-3 flex items-center gap-2">
              <span className="text-sm font-semibold text-[#603BFF]">
                {pick.odds.toFixed(2)}
              </span>
              <button
                onClick={() => removePick(pick.id)}
                className="rounded p-0.5 text-[#AAB5D0] transition-colors hover:bg-white/5 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add more picks */}
      <button className="mt-2 flex items-center gap-1 text-xs font-medium text-[#603BFF] transition-colors hover:text-[#7C5CFF]">
        <Plus className="h-3.5 w-3.5" />
        Add more picks
      </button>

      {/* Divider */}
      <div className="my-3 border-t border-[#23315A]" />

      {/* Total odds */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-[#AAB5D0]">Total Odds:</span>
        <span className="font-semibold text-white">{totalOdds.toFixed(2)}</span>
      </div>

      {/* Stake */}
      <div className="mt-3">
        <label className="text-xs text-[#AAB5D0]">Stake (Tokens)</label>
        <div className="mt-1.5 flex gap-2">
          {STAKE_PRESETS.map((amount, idx) => (
            <button
              key={`${amount}-${idx}`}
              onClick={() => setStake(amount)}
              className={cn(
                "flex-1 rounded-md py-1.5 text-xs font-semibold transition-colors",
                stake === amount && idx === STAKE_PRESETS.indexOf(stake)
                  ? "bg-[#603BFF] text-white"
                  : "bg-[#0C1532] text-[#AAB5D0] hover:bg-[#162040] hover:text-white"
              )}
            >
              {amount}
            </button>
          ))}
        </div>
      </div>

      {/* Estimated return */}
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-[#AAB5D0]">Est. Return</span>
        <span className="font-semibold text-white">
          {Math.round(estReturn)} Tokens
        </span>
      </div>

      {/* Place pick button */}
      <Button
        className="mt-4 w-full bg-[#22C55E] text-white hover:bg-[#16A34A]"
        size="default"
      >
        Place Pick
        <ArrowRight className="h-4 w-4" />
      </Button>

      {/* Disclaimer */}
      <p className="mt-3 text-center text-[11px] text-[#AAB5D0]">
        Free to play &middot; Tokens have no cash value
      </p>
    </div>
  );
}
