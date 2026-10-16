"use client";

import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BadgeUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  badgeName: string;
  badgeIcon: React.ReactNode;
  badgeColor: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export function BadgeUnlockModal({
  isOpen,
  onClose,
  badgeName,
  badgeIcon,
  badgeColor,
  description,
  rarity,
}: BadgeUnlockModalProps) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 2000);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const rarityColors = {
    common: "from-[#AAB5D0] to-[#8B9DC3]",
    rare: "from-[#3B82F6] to-[#2563EB]",
    epic: "from-[#8B5CF6] to-[#7C3AED]",
    legendary: "from-[#FBBF24] to-[#F59E0B]",
  };

  const rarityGlow = {
    common: "shadow-[0_0_30px_rgba(170,181,208,0.5)]",
    rare: "shadow-[0_0_30px_rgba(59,130,246,0.5)]",
    epic: "shadow-[0_0_30px_rgba(139,92,246,0.5)]",
    legendary: "shadow-[0_0_30px_rgba(251,191,36,0.5)]",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Sparkle effects */}
      {showAnimation && (
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-sparkle"
              style={{
                left: `${50 + (Math.random() - 0.5) * 40}%`,
                top: `${50 + (Math.random() - 0.5) * 40}%`,
                animationDelay: `${Math.random() * 1}s`,
              }}
            >
              <Sparkles
                className={cn(
                  "h-4 w-4",
                  rarity === "legendary" && "text-[#FBBF24]",
                  rarity === "epic" && "text-[#8B5CF6]",
                  rarity === "rare" && "text-[#3B82F6]",
                  rarity === "common" && "text-[#AAB5D0]"
                )}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <div className="relative w-full max-w-md animate-badge-reveal rounded-2xl bg-gradient-to-br from-[#0F1A36] to-[#070D25] p-8 shadow-2xl ring-1 ring-[#23315A]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-1 text-[#AAB5D0] transition-colors hover:bg-white/20 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Achievement Unlocked text */}
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#FBBF24]">
            Achievement Unlocked
          </p>
        </div>

        {/* Badge icon */}
        <div className="relative mx-auto mb-6 h-32 w-32">
          <div
            className={cn(
              "flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br p-1 transition-all",
              rarityColors[rarity],
              rarityGlow[rarity],
              showAnimation && "animate-pulse-glow"
            )}
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0F1A36]">
              <div className={cn("text-6xl", badgeColor)}>{badgeIcon}</div>
            </div>
          </div>
        </div>

        {/* Badge name */}
        <h2 className="mb-2 text-center text-2xl font-bold text-white">
          {badgeName}
        </h2>

        {/* Rarity badge */}
        <div className="mb-4 flex justify-center">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white",
              rarity === "legendary" && "bg-gradient-to-r from-[#FBBF24] to-[#F59E0B]",
              rarity === "epic" && "bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED]",
              rarity === "rare" && "bg-gradient-to-r from-[#3B82F6] to-[#2563EB]",
              rarity === "common" && "bg-gradient-to-r from-[#AAB5D0] to-[#8B9DC3]"
            )}
          >
            {rarity}
          </span>
        </div>

        {/* Description */}
        <p className="mb-6 text-center text-sm text-[#AAB5D0]">
          {description}
        </p>

        {/* Stats or bonus */}
        <div className="mb-6 rounded-xl bg-[#0C1532] px-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#AAB5D0]">Bonus Reward</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#FBBF24]">+50 XP</span>
              <span className="text-sm text-[#AAB5D0]">·</span>
              <span className="text-lg font-bold text-[#22C55E]">+100 TKN</span>
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
            View All Badges
          </Button>
          <Button onClick={onClose} className="flex-1">
            Continue
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes badge-reveal {
          0% {
            transform: scale(0.5) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(5deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-badge-reveal {
          animation: badge-reveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-sparkle {
          animation: sparkle 1.5s ease-out forwards;
        }
        .animate-pulse-glow {
          animation: pulse-glow 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
