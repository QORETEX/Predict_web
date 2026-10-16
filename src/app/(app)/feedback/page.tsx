"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Star,
  Send,
  ThumbsUp,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FeedbackCategory = "bug" | "feature" | "general" | "ui-ux";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [selectedCategory, setSelectedCategory] =
    useState<FeedbackCategory | null>(null);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const categories: { key: FeedbackCategory; label: string }[] = [
    { key: "bug", label: "Bug Report" },
    { key: "feature", label: "Feature Request" },
    { key: "general", label: "General" },
    { key: "ui-ux", label: "UI/UX" },
  ];

  const recentFeedback = [
    {
      user: "KwesiTech",
      category: "Feature Request",
      message: "Would love to see live chat during matches!",
      status: "Under Review",
      votes: 24,
    },
    {
      user: "AmaDesigner",
      category: "UI/UX",
      message: "Dark mode looks great but notifications could be clearer",
      status: "Implemented",
      votes: 18,
    },
    {
      user: "YawBugHunter",
      category: "Bug Report",
      message: "Login page sometimes doesn't redirect properly",
      status: "Fixed",
      votes: 12,
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
              <MessageSquare className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Feedback
              </h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">
                Share your thoughts and help us improve.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="rounded-lg bg-[#0F1A36] p-6">
        <h2 className="mb-4 text-base font-semibold text-white">
          Submit Feedback
        </h2>

        {/* Rating */}
        <div className="mb-5">
          <label className="mb-2 block text-sm text-[#AAB5D0]">
            Rate your experience
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    "h-8 w-8 transition-colors",
                    star <= rating
                      ? "fill-[#FBBF24] text-[#FBBF24]"
                      : "text-[#AAB5D0]/40"
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Category pills */}
        <div className="mb-5">
          <label className="mb-2 block text-sm text-[#AAB5D0]">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  selectedCategory === cat.key
                    ? "bg-[#603BFF] text-white"
                    : "border border-[#23315A] bg-[#0C1532] text-[#AAB5D0] hover:border-[#603BFF]/40 hover:text-white"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="mb-5">
          <label className="mb-2 block text-sm text-[#AAB5D0]">
            Your feedback
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what you think..."
            className="min-h-[120px] w-full resize-none rounded-lg border border-[#23315A] bg-[#0C1532] p-4 text-sm text-white outline-none transition-colors focus:border-[#603BFF]"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="mb-2 block text-sm text-[#AAB5D0]">
            Email (optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="h-11 w-full rounded-lg border border-[#23315A] bg-[#0C1532] px-4 text-sm text-white outline-none transition-colors focus:border-[#603BFF]"
          />
        </div>

        <Button className="h-11 gap-2 px-8">
          <Send className="h-4 w-4" />
          Submit Feedback
        </Button>
      </div>

      {/* Recent Feedback */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-white">
          Recent Community Feedback
        </h2>
        <div className="space-y-3">
          {recentFeedback.map((item, idx) => (
            <div key={idx} className="rounded-lg bg-[#0F1A36] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">
                      {item.user}
                    </span>
                    <span className="rounded-full bg-[#603BFF]/20 px-2 py-0.5 text-xs font-medium text-[#603BFF]">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#AAB5D0]">{item.message}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2 py-1 text-xs font-medium",
                      item.status === "Implemented" || item.status === "Fixed"
                        ? "bg-[#22C55E]/15 text-[#22C55E]"
                        : "bg-[#F59E0B]/15 text-[#F59E0B]"
                    )}
                  >
                    {item.status === "Implemented" || item.status === "Fixed" ? (
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        {item.status}
                      </span>
                    ) : (
                      item.status
                    )}
                  </span>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4 text-[#AAB5D0]" />
                    <span className="text-sm font-semibold text-white">
                      {item.votes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
