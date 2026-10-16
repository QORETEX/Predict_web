"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MessageCircle,
  TrendingUp,
  ThumbsUp,
  Clock,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CommunityPage() {
  const [discussionText, setDiscussionText] = useState("");

  const trendingPicks = [
    {
      user: "KwesiPicks",
      pick: "Man City to win",
      odds: 1.72,
      votes: 234,
      confidence: "High",
    },
    {
      user: "AmaFootball",
      pick: "Lakers Over 224.5",
      odds: 1.9,
      votes: 198,
      confidence: "Medium",
    },
    {
      user: "NSMQMaster",
      pick: "Prempeh to win NSMQ",
      odds: 2.15,
      votes: 165,
      confidence: "High",
    },
  ];

  const threads = [
    {
      title: "Best strategies for NSMQ predictions?",
      author: "KofiAnalyst",
      replies: 24,
      lastActive: "5 min ago",
      category: "NSMQ",
    },
    {
      title: "Premier League weekend predictions",
      author: "AkuaFootie",
      replies: 18,
      lastActive: "12 min ago",
      category: "Football",
    },
    {
      title: "How to manage your bankroll",
      author: "YawBets",
      replies: 31,
      lastActive: "24 min ago",
      category: "Strategy",
    },
    {
      title: "Lakers vs Warriors analysis",
      author: "AbenaHoops",
      replies: 15,
      lastActive: "1h ago",
      category: "Basketball",
    },
    {
      title: "New to Predict - tips for beginners?",
      author: "NewPredictor",
      replies: 42,
      lastActive: "2h ago",
      category: "General",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-lg bg-[#0F1A36]">
        <div className="absolute right-0 top-0 h-full w-1/2">
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A36] via-[#0F1A36]/80 to-transparent" />
        </div>
        <div className="relative px-6 py-7 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FBBF24]/15">
              <MessageCircle className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Community
              </h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">
                Share picks, discuss strategies, and connect.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Picks */}
      <div className="rounded-lg bg-[#0F1A36] p-5">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#FBBF24]" />
          <h2 className="text-base font-semibold text-white">
            Trending Picks
          </h2>
        </div>
        <div className="space-y-3">
          {trendingPicks.map((pick, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg bg-[#0C1532] p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#603BFF]/20 text-sm font-bold text-[#603BFF]">
                  {pick.user.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {pick.pick}
                  </p>
                  <p className="text-xs text-[#AAB5D0]">
                    by {pick.user} · {pick.odds.toFixed(2)} odds
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "rounded-full px-2 py-1 text-xs font-medium",
                    pick.confidence === "High"
                      ? "bg-[#22C55E]/15 text-[#22C55E]"
                      : "bg-[#F59E0B]/15 text-[#F59E0B]"
                  )}
                >
                  {pick.confidence}
                </span>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4 text-[#AAB5D0]" />
                  <span className="text-sm font-semibold text-white">
                    {pick.votes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discussion Threads */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-white">
          Recent Discussions
        </h2>
        <div className="space-y-3">
          {threads.map((thread, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between gap-4 rounded-lg bg-[#0F1A36] p-4 transition-colors hover:bg-[#162042]"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">
                    {thread.title}
                  </h3>
                  <span className="shrink-0 rounded-full bg-[#603BFF]/20 px-2 py-0.5 text-xs font-medium text-[#603BFF]">
                    {thread.category}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#AAB5D0]">
                  by {thread.author}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <div className="flex items-center gap-1 text-xs text-[#AAB5D0]">
                  <MessageCircle className="h-3 w-3" />
                  {thread.replies} replies
                </div>
                <div className="flex items-center gap-1 text-xs text-[#AAB5D0]/60">
                  <Clock className="h-3 w-3" />
                  {thread.lastActive}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start Discussion */}
      <div className="rounded-lg bg-[#0F1A36] p-5">
        <div className="mb-4 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-[#FBBF24]" />
          <h2 className="text-base font-semibold text-white">
            Start a Discussion
          </h2>
        </div>
        <textarea
          value={discussionText}
          onChange={(e) => setDiscussionText(e.target.value)}
          placeholder="Share your thoughts, ask questions, or start a discussion..."
          className="min-h-[120px] w-full resize-none rounded-lg border border-[#23315A] bg-[#0C1532] p-4 text-sm text-white outline-none transition-colors focus:border-[#603BFF]"
        />
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#AAB5D0]">
            <Users className="h-4 w-4" />
            <span>Share with 12,450 community members</span>
          </div>
          <Button size="sm" className="h-9 px-6">
            Post Discussion
          </Button>
        </div>
      </div>
    </div>
  );
}
