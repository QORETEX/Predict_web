"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Is Predict free to play?",
    answer: "Yes, completely free. You never need to pay anything to play. Tokens are earned through gameplay and have no cash value — they're purely for fun, competition, and bragging rights.",
  },
  {
    question: "What are tokens and XP?",
    answer: "Tokens (TKN) are the in-app currency you earn by making correct predictions. XP (Experience Points) track your overall progress and determine your rank on the leaderboard. Neither has any real-world monetary value.",
  },
  {
    question: "How old do I need to be to play?",
    answer: "You must be at least 15 years old to create an account. We require Ghana Card verification to confirm your age and keep the platform safe for everyone.",
  },
  {
    question: "Is this gambling?",
    answer: "No. Predict is a free-to-play prediction platform. There is no real money involved — you can't deposit, withdraw, or win cash. It's about testing your knowledge and competing with friends.",
  },
  {
    question: "What events can I predict?",
    answer: "We cover NSMQ (National Science & Maths Quiz) at regional and national levels, Premier League and UEFA Champions League football, and other trending sports events. New events are added regularly.",
  },
  {
    question: "What are squads and schools?",
    answer: "Squads are teams you can create or join to compete together. Schools let you represent your institution on the leaderboard. Both add a social, competitive layer to the experience.",
  },
  {
    question: "How do I climb the leaderboard?",
    answer: "Make accurate predictions consistently. The more correct picks you make, the more XP you earn, and the higher you climb. Bonus XP is awarded for streaks, early picks, and squad achievements.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-[#AAB5D0]">
          Everything you need to know about Predict. Can&apos;t find what you&apos;re looking for? Reach out to our support team.
        </p>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="rounded-xl border border-[#23315A] bg-[#101A3A] transition-colors hover:border-[#603BFF]/30"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="pr-4 text-sm font-semibold text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-[#AAB5D0] transition-transform duration-200",
                    isOpen && "rotate-180 text-[#603BFF]",
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-200",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-sm leading-relaxed text-[#AAB5D0]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
