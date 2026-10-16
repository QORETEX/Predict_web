"use client";

import Image from "next/image";
import {
  Tag,
  Gift,
  Zap,
  Flame,
  Users,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Seed data                                                          */
/* ------------------------------------------------------------------ */

const promotions = [
  {
    title: "Welcome Bonus",
    description: "Get 500 bonus tokens when you complete verification.",
    gradient: "from-[#603BFF] to-[#7C3AED]",
    Icon: Gift,
    expiry: "Oct 31, 2026",
    cta: "Claim Now",
  },
  {
    title: "Weekend Boost",
    description: "2x tokens on all weekend predictions.",
    gradient: "from-[#FBBF24] to-[#F59E0B]",
    Icon: Zap,
    expiry: "Every Weekend",
    cta: "Activate",
  },
  {
    title: "Streak Rewards",
    description: "Maintain a 7-day streak for 200 bonus tokens.",
    gradient: "from-[#22C55E] to-[#16A34A]",
    Icon: Flame,
    expiry: "Ongoing",
    cta: "View Progress",
  },
  {
    title: "Squad Challenge",
    description: "Top squad wins 5,000 token pool this month.",
    gradient: "from-[#F43F5E] to-[#E11D48]",
    Icon: Users,
    expiry: "Oct 31, 2026",
    cta: "Join Challenge",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PromotionsPage() {
  return (
    <div className="space-y-5">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-lg bg-[#0F1A36]">
        <div className="absolute right-0 top-0 h-full w-1/2">
          <Image src="/images/hero.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A36] via-[#0F1A36]/80 to-transparent" />
        </div>
        <div className="relative px-6 py-7 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FBBF24]/15">
              <Tag className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">Promotions</h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">Check out ongoing offers and bonuses.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Promotion Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {promotions.map((promo) => (
          <div
            key={promo.title}
            className="overflow-hidden rounded-lg bg-[#0F1A36] transition-colors hover:bg-[#162042]"
          >
            {/* Gradient header */}
            <div
              className={cn(
                "flex h-32 items-center justify-center bg-gradient-to-r",
                promo.gradient
              )}
            >
              <promo.Icon className="h-12 w-12 text-white/80" />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white">{promo.title}</h3>
              <p className="mt-1 text-sm text-[#AAB5D0]">{promo.description}</p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#AAB5D0]/60">
                <Calendar className="h-3 w-3" />
                {promo.expiry}
              </div>
              <Button className="mt-4 w-full" size="sm">
                {promo.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
