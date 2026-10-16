"use client";

import { useState } from "react";
import { Bell, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DownloadCta() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-[#23315A] bg-[#101A3A] p-8 sm:p-12">
        {/* Background decoration */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FBBF24]/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#FBBF24]/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBBF24]/10">
            <Bell className="h-7 w-7 text-[#FBBF24]" />
          </div>

          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Never Miss a Pick
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[#AAB5D0]">
            Get notified when big events go live, when your squad is competing, and when new competitions drop. Be the first to know.
          </p>

          {submitted ? (
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#22C55E]/10 px-5 py-3 text-sm font-medium text-[#22C55E]">
              <CheckCircle className="h-4 w-4" />
              You&apos;re on the list! We&apos;ll be in touch.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="h-11 flex-1 rounded-lg border border-[#23315A] bg-[#0C1532] px-5 text-sm text-white placeholder:text-[#AAB5D0]/50 focus:border-[#603BFF] focus:outline-none focus:ring-1 focus:ring-[#603BFF]"
              />
              <Button type="submit" className="h-11">
                Notify Me
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-[#AAB5D0]/50">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
