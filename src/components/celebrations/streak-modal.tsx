"use client";

import { X, Flame, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakDays: number;
  bonusTokens: number;
  multiplier: number;
}

export function StreakModal({
  isOpen,
  onClose,
  streakDays,
  bonusTokens,
  multiplier,
}: StreakModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md animate-bounce-in rounded-2xl bg-gradient-to-br from-[#F59E0B] via-[#EF4444] to-[#DC2626] p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/20 p-1 text-white transition-colors hover:bg-white/30"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Flame icon with glow */}
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#FBBF24] opacity-75" />
            <Flame className="relative h-24 w-24 animate-flicker text-white drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center text-3xl font-bold text-white">
          {streakDays} Day Streak! 🔥
        </h2>
        <p className="mb-6 text-center text-lg text-white/90">
          You're on fire!
        </p>

        {/* Streak counter */}
        <div className="mb-6 rounded-2xl bg-white/20 px-6 py-6 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: Math.min(streakDays, 7) }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-lg",
                  i < streakDays
                    ? "bg-white text-[#EF4444]"
                    : "bg-white/30 text-white/50"
                )}
              >
                {i + 1}
              </div>
            ))}
            {streakDays > 7 && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#EF4444]">
                <span className="text-sm font-bold">+{streakDays - 7}</span>
              </div>
            )}
          </div>
        </div>

        {/* Rewards */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBBF24]/30">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white/90">Streak Bonus</p>
              <p className="text-xl font-bold text-white">+{bonusTokens} TKN</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#22C55E]/30">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white/90">XP Multiplier</p>
              <p className="text-xl font-bold text-white">{multiplier}x Boost</p>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-6 rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
          <p className="text-sm text-white">
            Keep it going! Come back tomorrow to extend your streak and unlock
            even bigger rewards.
          </p>
        </div>

        {/* Action */}
        <Button
          onClick={onClose}
          className="w-full bg-white text-[#EF4444] hover:bg-white/90"
          size="lg"
        >
          Keep the Streak Alive
        </Button>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes flicker {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        .animate-flicker {
          animation: flicker 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
