"use client";

import Image from "next/image";
import {
  Megaphone,
  Calendar,
  Trophy,
  Star,
  Coins,
  Users,
  Swords,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const articles = [
  {
    title: "NSMQ 2026 Season Kicks Off",
    excerpt:
      "The highly anticipated NSMQ 2026 season is officially underway with schools from across the country competing for glory.",
    category: "Event",
    date: "Oct 15, 2026",
    gradient: "from-[#603BFF] to-[#7C3AED]",
    icon: Trophy,
  },
  {
    title: "New XP System Launched",
    excerpt:
      "We've revamped the XP rewards system to give you more ways to earn and level up with every prediction you make.",
    category: "Update",
    date: "Oct 12, 2026",
    gradient: "from-[#FBBF24] to-[#F59E0B]",
    icon: Star,
  },
  {
    title: "Weekend Prediction Boost",
    excerpt:
      "Earn double tokens on all weekend predictions! Stack your rewards and climb the leaderboard faster than ever.",
    category: "News",
    date: "Oct 10, 2026",
    gradient: "from-[#22C55E] to-[#16A34A]",
    icon: Coins,
  },
  {
    title: "Community Milestone: 50K Users",
    excerpt:
      "We've officially reached 50,000 active users on the platform. Thank you for being part of this incredible journey!",
    category: "News",
    date: "Oct 8, 2026",
    gradient: "from-[#F43F5E] to-[#E11D48]",
    icon: Users,
  },
  {
    title: "Squad Wars Tournament",
    excerpt:
      "Assemble your squad and compete in the upcoming Squad Wars tournament for exclusive prizes and bragging rights.",
    category: "Event",
    date: "Oct 5, 2026",
    gradient: "from-[#8B5CF6] to-[#6D28D9]",
    icon: Swords,
  },
  {
    title: "App Update v2.5",
    excerpt:
      "The latest update brings a redesigned dashboard, faster load times, and new social features to enhance your experience.",
    category: "Update",
    date: "Oct 3, 2026",
    gradient: "from-[#06B6D4] to-[#0891B2]",
    icon: Rocket,
  },
];

function categoryBadge(category: string) {
  switch (category) {
    case "Event":
      return "bg-[#603BFF]/15 text-[#603BFF]";
    case "Update":
      return "bg-[#FBBF24]/15 text-[#FBBF24]";
    case "News":
      return "bg-[#22C55E]/15 text-[#22C55E]";
    default:
      return "bg-[#603BFF]/15 text-[#603BFF]";
  }
}

export default function NewsPage() {
  return (
    <div className="space-y-5">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-lg bg-[#0F1A36]">
        <div className="absolute right-0 top-0 h-full w-1/2">
          <Image src="/images/hero.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A36] via-[#0F1A36]/80 to-transparent" />
        </div>
        <div className="relative px-6 py-7 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FBBF24]/15">
              <Megaphone className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                News & Updates
              </h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">
                Latest news, events and announcements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Article Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => {
          const Icon = article.icon;
          return (
            <div
              key={article.title}
              className="group overflow-hidden rounded-lg bg-[#0F1A36] transition-colors hover:border hover:border-[#23315A]"
            >
              {/* Gradient Image Area */}
              <div
                className={cn(
                  "flex h-40 items-center justify-center bg-gradient-to-br",
                  article.gradient
                )}
              >
                <Icon className="h-10 w-10 text-white/80" />
              </div>

              {/* Card Content */}
              <div className="space-y-3 p-4">
                {/* Category Badge */}
                <span
                  className={cn(
                    "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                    categoryBadge(article.category)
                  )}
                >
                  {article.category}
                </span>

                {/* Title */}
                <h3 className="font-semibold text-white">{article.title}</h3>

                {/* Excerpt */}
                <p className="line-clamp-2 text-sm text-[#AAB5D0]">
                  {article.excerpt}
                </p>

                {/* Date & Read More */}
                <div className="flex items-center justify-between pt-1">
                  <span className="flex items-center gap-1.5 text-xs text-[#AAB5D0]/60">
                    <Calendar className="h-3.5 w-3.5" />
                    {article.date}
                  </span>
                  <button className="text-sm text-[#603BFF] hover:underline">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
