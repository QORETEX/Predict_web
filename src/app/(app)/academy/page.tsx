"use client";

import Image from "next/image";
import {
  BookOpen,
  Rocket,
  Target,
  BarChart3,
  Wallet,
  Zap,
  GraduationCap,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Seed data                                                          */
/* ------------------------------------------------------------------ */

const courses = [
  {
    title: "Getting Started",
    Icon: Rocket,
    lessons: 5,
    progress: 100,
    status: "completed" as const,
  },
  {
    title: "Advanced Strategies",
    Icon: Target,
    lessons: 8,
    progress: 60,
    status: "in-progress" as const,
  },
  {
    title: "Reading Odds",
    Icon: BarChart3,
    lessons: 6,
    progress: 30,
    status: "in-progress" as const,
  },
  {
    title: "Bankroll Management",
    Icon: Wallet,
    lessons: 4,
    progress: 0,
    status: "not-started" as const,
  },
  {
    title: "Live Betting Tips",
    Icon: Zap,
    lessons: 7,
    progress: 0,
    status: "not-started" as const,
  },
  {
    title: "NSMQ Predictions",
    Icon: GraduationCap,
    lessons: 10,
    progress: 45,
    status: "in-progress" as const,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AcademyPage() {
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
              <BookOpen className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">Predict Academy</h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">Learn strategies, tips and insights.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.title}
            className="rounded-lg bg-[#0F1A36] p-5 transition-colors hover:bg-[#162042]"
          >
            {/* Icon */}
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0C1532]">
              <course.Icon
                className={cn(
                  "h-5 w-5",
                  course.status === "completed" ? "text-[#22C55E]" : "text-[#603BFF]"
                )}
              />
            </div>

            {/* Title & lessons */}
            <h3 className="mt-3 text-sm font-semibold text-white">{course.title}</h3>
            <p className="mt-0.5 text-xs text-[#AAB5D0]">{course.lessons} lessons</p>

            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#AAB5D0]">Progress</span>
                <span className="font-medium text-white">{course.progress}%</span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-[#0C1532]">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    course.status === "completed" ? "bg-[#22C55E]" : "bg-[#603BFF]"
                  )}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            {/* Button */}
            <div className="mt-4">
              {course.status === "completed" ? (
                <Button
                  size="sm"
                  className="w-full bg-[#22C55E] hover:bg-[#22C55E]/90"
                  disabled
                >
                  <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                  Completed
                </Button>
              ) : course.status === "in-progress" ? (
                <Button size="sm" className="w-full">
                  Continue
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-[#23315A] bg-transparent text-white hover:bg-[#0C1532]"
                >
                  Start
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
