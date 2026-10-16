"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Brain,
  FlaskConical,
  Calculator,
  BookOpen,
  Trophy,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Seed data                                                          */
/* ------------------------------------------------------------------ */

const categories = [
  { id: "science", title: "Science", Icon: FlaskConical, questions: 45 },
  { id: "maths", title: "Maths", Icon: Calculator, questions: 38 },
  { id: "general", title: "General Knowledge", Icon: BookOpen, questions: 52 },
];

const difficulties = [
  { id: "easy", label: "Easy", color: "bg-[#22C55E]" },
  { id: "medium", label: "Medium", color: "bg-[#FBBF24]" },
  { id: "hard", label: "Hard", color: "bg-[#F43F5E]" },
];

const recentScores = [
  { date: "Oct 16, 2026", category: "Science", score: "8/10", xp: 120 },
  { date: "Oct 14, 2026", category: "Maths", score: "7/10", xp: 95 },
  { date: "Oct 12, 2026", category: "General Knowledge", score: "9/10", xp: 150 },
  { date: "Oct 10, 2026", category: "Science", score: "6/10", xp: 70 },
  { date: "Oct 8, 2026", category: "Maths", score: "10/10", xp: 200 },
];

const leaderboard = [
  { rank: 1, name: "AmaB", score: 9850, initials: "AB", color: "bg-[#FBBF24]" },
  { rank: 2, name: "KofiM", score: 9200, initials: "KM", color: "bg-[#603BFF]" },
  { rank: 3, name: "EsiD", score: 8750, initials: "ED", color: "bg-[#22C55E]" },
  { rank: 4, name: "YawP", score: 8100, initials: "YP", color: "bg-[#F43F5E]" },
  { rank: 5, name: "AdjeiK", score: 7650, initials: "AK", color: "bg-[#8B5CF6]" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function NSMQQuizPage() {
  const [selectedCategory, setSelectedCategory] = useState("science");
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");

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
              <Brain className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">NSMQ Quiz</h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">Test your knowledge and earn rewards.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid gap-3 sm:grid-cols-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              "flex items-center gap-3 rounded-lg p-4 transition-colors",
              selectedCategory === cat.id
                ? "bg-[#603BFF]/15 ring-1 ring-[#603BFF]"
                : "bg-[#0F1A36] hover:bg-[#162042]"
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                selectedCategory === cat.id ? "bg-[#603BFF]/20" : "bg-[#0C1532]"
              )}
            >
              <cat.Icon
                className={cn(
                  "h-5 w-5",
                  selectedCategory === cat.id ? "text-[#603BFF]" : "text-[#AAB5D0]"
                )}
              />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">{cat.title}</p>
              <p className="text-xs text-[#AAB5D0]">{cat.questions} questions</p>
            </div>
          </button>
        ))}
      </div>

      {/* Start Quiz */}
      <div className="rounded-lg bg-[#0F1A36] p-6">
        <h2 className="text-base font-semibold text-white">Start Quiz</h2>
        <p className="mt-1 text-sm text-[#AAB5D0]">Select difficulty and begin.</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {difficulties.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setSelectedDifficulty(d.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                selectedDifficulty === d.id
                  ? cn(d.color, "text-white")
                  : "bg-[#0C1532] text-[#AAB5D0] hover:bg-[#162042]"
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
        <Button className="mt-4">
          <Zap className="mr-2 h-4 w-4" />
          Start Quiz
        </Button>
      </div>

      {/* Two-column: Scores + Leaderboard */}
      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        {/* Recent Scores */}
        <div className="rounded-lg bg-[#0F1A36]">
          <div className="flex items-center gap-2 border-b border-[#23315A]/40 px-5 py-4">
            <Star className="h-4 w-4 text-[#FBBF24]" />
            <h2 className="text-base font-semibold text-white">Recent Scores</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#23315A]/20">
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Date</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Category</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Score</th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium text-[#AAB5D0]/60">XP Earned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#23315A]/10">
                {recentScores.map((row, idx) => (
                  <tr key={idx} className="transition-colors hover:bg-[#0C1532]/60">
                    <td className="px-4 py-3 text-sm text-[#AAB5D0]">{row.date}</td>
                    <td className="px-4 py-3 text-sm font-medium text-white">{row.category}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-[#FBBF24]">{row.score}</td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-white">+{row.xp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="rounded-lg bg-[#0F1A36]">
          <div className="flex items-center gap-2 border-b border-[#23315A]/40 px-5 py-4">
            <Trophy className="h-4 w-4 text-[#FBBF24]" />
            <h2 className="text-base font-semibold text-white">Quiz Leaderboard</h2>
          </div>
          <div className="divide-y divide-[#23315A]/10">
            {leaderboard.map((player) => (
              <div key={player.rank} className="flex items-center gap-3 px-5 py-3.5">
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    player.rank <= 3 ? "bg-[#FBBF24]/15 text-[#FBBF24]" : "bg-[#0C1532] text-[#AAB5D0]"
                  )}
                >
                  {player.rank}
                </span>
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                    player.color
                  )}
                >
                  {player.initials}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{player.name}</p>
                </div>
                <span className="text-sm font-semibold text-[#FBBF24]">{player.score.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
