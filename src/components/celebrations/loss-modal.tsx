"use client";

import { X, TrendingDown, Target, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LossModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: string;
  stake: number;
  odds: number;
  yourPick: string;
  result: string;
}

export function LossModal({
  isOpen,
  onClose,
  event,
  stake,
  odds,
  yourPick,
  result,
}: LossModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md animate-scale-in rounded-2xl bg-gradient-to-br from-[#0F1A36] to-[#070D25] p-8 shadow-2xl ring-1 ring-[#23315A]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-1 text-[#AAB5D0] transition-colors hover:bg-white/20 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon */}
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/20">
          <TrendingDown className="h-12 w-12 text-red-500" />
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center text-2xl font-bold text-white">
          Better Luck Next Time
        </h2>
        <p className="mb-6 text-center text-sm text-[#AAB5D0]">{event}</p>

        {/* Loss amount */}
        <div className="mb-6 rounded-xl bg-[#0C1532] px-6 py-6">
          <p className="text-center text-sm text-[#AAB5D0]">You lost</p>
          <p className="mt-2 text-center text-4xl font-bold text-red-500">
            -{stake} TKN
          </p>
        </div>

        {/* Pick summary */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-[#0C1532] px-4 py-3">
            <span className="text-sm text-[#AAB5D0]">Your Pick</span>
            <span className="font-semibold text-white">{yourPick}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-[#0C1532] px-4 py-3">
            <span className="text-sm text-[#AAB5D0]">Result</span>
            <span className="font-semibold text-red-500">{result}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-[#0C1532] px-4 py-3">
            <span className="text-sm text-[#AAB5D0]">Odds</span>
            <span className="font-semibold text-white">{odds.toFixed(2)}</span>
          </div>
        </div>

        {/* Encouragement */}
        <div className="mb-6 rounded-xl bg-[#603BFF]/10 px-4 py-4">
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 shrink-0 text-[#603BFF]" />
            <div>
              <p className="text-sm font-semibold text-white">
                Learn from this pick
              </p>
              <p className="mt-1 text-xs text-[#AAB5D0]">
                Check your stats and refine your strategy for the next game.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-[#23315A]"
          >
            <BarChart3 className="h-4 w-4" />
            View Stats
          </Button>
          <Button onClick={onClose} className="flex-1">
            Try Again
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
