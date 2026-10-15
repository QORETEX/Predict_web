import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function TrophyIcon() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="trophyGold" x1="20" y1="8" x2="52" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="trophyDark" x1="20" y1="8" x2="52" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="trophyStar" x1="32" y1="22" x2="40" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF7CC" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
      </defs>

      {/* Left handle */}
      <path
        d="M16 16C12 16 9 19 9 23C9 28 12 32 17 33L19 26L18 16H16Z"
        fill="url(#trophyGold)"
        stroke="#D97706"
        strokeWidth="0.5"
      />

      {/* Right handle */}
      <path
        d="M56 16C60 16 63 19 63 23C63 28 60 32 55 33L53 26L54 16H56Z"
        fill="url(#trophyGold)"
        stroke="#D97706"
        strokeWidth="0.5"
      />

      {/* Cup body */}
      <path
        d="M18 12H54V14C54 28 48 38 36 40C24 38 18 28 18 14V12Z"
        fill="url(#trophyGold)"
        stroke="#D97706"
        strokeWidth="0.5"
      />

      {/* Cup rim highlight */}
      <rect x="18" y="10" width="36" height="4" rx="2" fill="#FFE066" />

      {/* Cup inner shadow */}
      <path
        d="M22 16C22 16 24 28 36 32C48 28 50 16 50 16"
        fill="url(#trophyDark)"
        opacity="0.25"
      />

      {/* Star on cup */}
      <path
        d="M36 22L38.5 27L44 27.8L40 31.6L41 37L36 34.3L31 37L32 31.6L28 27.8L33.5 27L36 22Z"
        fill="url(#trophyStar)"
      />

      {/* Stem */}
      <rect x="32" y="40" width="8" height="8" rx="1" fill="url(#trophyGold)" />

      {/* Base */}
      <rect x="24" y="48" width="24" height="5" rx="2.5" fill="url(#trophyGold)" stroke="#D97706" strokeWidth="0.5" />

      {/* Base bottom */}
      <rect x="22" y="52" width="28" height="4" rx="2" fill="#D97706" />

      {/* Shine highlights */}
      <ellipse cx="28" cy="20" rx="3" ry="6" fill="white" opacity="0.18" />
    </svg>
  );
}

export function RewardsCta() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#23315A] bg-[#101A3A] p-6">
      {/* Ambient glow behind trophy */}
      <div className="absolute -top-6 right-4 h-36 w-36 rounded-full bg-[#FBBF24]/8 blur-2xl" />
      <div className="absolute -top-2 right-10 h-20 w-20 rounded-full bg-[#FBBF24]/12 blur-xl" />

      {/* Trophy in circular frame */}
      <div className="relative mb-4 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-gradient-to-br from-[#1a1f4e] to-[#0e1433] shadow-[0_0_24px_4px_rgba(251,191,36,0.1)]">
        <TrophyIcon />
      </div>

      <h3 className="text-xl font-bold leading-snug text-white">
        Your predictions.
        <br />
        Real rewards.
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[#AAB5D0]">
        Climb the ranks, earn XP, unlock achievements
        and show off your skills.
      </p>

      <div className="mt-5 flex flex-col gap-2.5">
        <Link href="/login">
          <Button className="w-full">
            Create Account
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
        <Link href="#how-it-works">
          <Button variant="outline" className="w-full">
            Learn How It Works
          </Button>
        </Link>
      </div>

      <div className="mt-5 flex items-center gap-2.5">
        <div className="flex -space-x-2">
          {["#F43F5E", "#603BFF", "#22C55E", "#FBBF24", "#2563EB"].map(
            (color, i) => (
              <div
                key={i}
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#101A3A] text-[10px] font-semibold text-white"
                style={{ backgroundColor: color }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ),
          )}
        </div>
        <span className="text-xs text-[#AAB5D0]">Join 50,000+ players</span>
      </div>
    </div>
  );
}
