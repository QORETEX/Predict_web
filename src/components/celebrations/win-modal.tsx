"use client";

import { useEffect, useState } from "react";
import { X, TrendingUp, Coins, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WinModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: string;
  stake: number;
  odds: number;
  winAmount: number;
  xpEarned: number;
}

export function WinModal({
  isOpen,
  onClose,
  event,
  stake,
  odds,
  winAmount,
  xpEarned,
}: WinModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className={cn(
                  "h-3 w-3 rotate-45",
                  i % 4 === 0 && "bg-[#FBBF24]",
                  i % 4 === 1 && "bg-[#22C55E]",
                  i % 4 === 2 && "bg-[#603BFF]",
                  i % 4 === 3 && "bg-[#EC4899]"
                )}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <div className="relative w-full max-w-md animate-scale-in rounded-2xl bg-gradient-to-br from-[#22C55E] via-[#16A34A] to-[#15803D] p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/20 p-1 text-white transition-colors hover:bg-white/30"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Trophy icon */}
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#FBBF24] opacity-75" />
            <Trophy className="relative h-24 w-24 animate-bounce-slow text-white drop-shadow-2xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center text-3xl font-bold text-white">
          You Won! 🎉
        </h2>
        <p className="mb-6 text-center text-lg text-white/90">{event}</p>

        {/* Win amount - large display */}
        <div className="mb-6 rounded-2xl bg-white/20 px-6 py-8 backdrop-blur-sm">
          <p className="text-center text-sm text-white/80">You won</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <Coins className="h-8 w-8 text-[#FBBF24]" />
            <p className="text-5xl font-bold text-white">
              {Math.round(winAmount)}
            </p>
          </div>
          <p className="mt-1 text-center text-sm text-white/80">Tokens</p>
        </div>

        {/* Stats */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3">
            <span className="text-sm text-white/80">Stake</span>
            <span className="font-semibold text-white">{stake} TKN</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3">
            <span className="text-sm text-white/80">Odds</span>
            <span className="font-semibold text-white">{odds.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3">
            <span className="text-sm text-white/80">XP Earned</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-[#FBBF24]" />
              <span className="font-semibold text-white">+{xpEarned} XP</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-2 border-white bg-transparent text-white hover:bg-white/20"
          >
            View Details
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 bg-white text-[#22C55E] hover:bg-white/90"
          >
            Make Another Pick
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
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
        .animate-fall {
          animation: fall linear forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
