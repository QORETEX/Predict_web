"use client";

import { useEffect, useState } from "react";
import { X, Star, Gift, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
  rewards: {
    tokens: number;
    xp: number;
    unlocks: string[];
  };
}

export function LevelUpModal({
  isOpen,
  onClose,
  newLevel,
  rewards,
}: LevelUpModalProps) {
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 2000);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Starburst effect */}
      {showBurst && (
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 h-1 w-40 animate-burst bg-gradient-to-r from-transparent via-[#FBBF24] to-transparent"
              style={{
                transform: `rotate(${i * 30}deg)`,
                transformOrigin: "left center",
              }}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <div className="relative w-full max-w-md animate-zoom-in overflow-hidden rounded-2xl bg-gradient-to-br from-[#603BFF] via-[#7C3AED] to-[#8B5CF6] p-8 shadow-2xl">
        {/* Animated background pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] animate-slide" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/20 p-1 text-white transition-colors hover:bg-white/30"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Level Up text */}
        <div className="relative mb-4 text-center">
          <p className="text-lg font-bold uppercase tracking-widest text-white/80">
            Level Up!
          </p>
        </div>

        {/* Level badge */}
        <div className="relative mb-6">
          <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm ring-4 ring-white/40">
            <div className="text-6xl font-black text-white">{newLevel}</div>
          </div>
          {/* Floating stars */}
          <Star className="absolute left-8 top-8 h-6 w-6 animate-float text-[#FBBF24]" />
          <Star className="absolute right-8 top-12 h-5 w-5 animate-float-delay text-[#FBBF24]" />
          <Star className="absolute bottom-8 left-16 h-4 w-4 animate-float text-[#FBBF24]" />
        </div>

        {/* Congratulations message */}
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Congratulations!
        </h2>

        {/* Rewards */}
        <div className="mb-6 space-y-3">
          {/* Tokens reward */}
          <div className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBBF24]/20">
              <Zap className="h-5 w-5 text-[#FBBF24]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white/80">Bonus Tokens</p>
              <p className="text-lg font-bold text-white">+{rewards.tokens} TKN</p>
            </div>
          </div>

          {/* XP boost */}
          <div className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#22C55E]/20">
              <Star className="h-5 w-5 text-[#22C55E]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white/80">XP Multiplier</p>
              <p className="text-lg font-bold text-white">+{rewards.xp}% Boost</p>
            </div>
          </div>
        </div>

        {/* Unlocks */}
        {rewards.unlocks.length > 0 && (
          <div className="mb-6 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <Gift className="h-4 w-4 text-white" />
              <p className="text-sm font-semibold text-white">New Unlocks</p>
            </div>
            <ul className="space-y-1">
              {rewards.unlocks.map((unlock, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-white/90">
                  <span className="text-[#FBBF24]">•</span>
                  {unlock}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action button */}
        <Button
          onClick={onClose}
          className="w-full bg-white text-[#603BFF] hover:bg-white/90"
          size="lg"
        >
          Claim Rewards
        </Button>
      </div>

      <style jsx>{`
        @keyframes zoom-in {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes burst {
          0% {
            transform: rotate(var(--rotation)) scaleX(0);
            opacity: 1;
          }
          100% {
            transform: rotate(var(--rotation)) scaleX(1);
            opacity: 0;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes slide {
          from {
            transform: translateX(0) translateY(0);
          }
          to {
            transform: translateX(60px) translateY(60px);
          }
        }
        .animate-zoom-in {
          animation: zoom-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-burst {
          animation: burst 1s ease-out forwards;
        }
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 2s ease-in-out 0.5s infinite;
        }
        .animate-slide {
          animation: slide 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
