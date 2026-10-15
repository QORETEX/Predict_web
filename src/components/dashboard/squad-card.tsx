"use client";

import { ArrowRight, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SquadCard() {
  return (
    <div className="rounded-lg bg-[#0F1A36] p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Your Squad</h3>
        <button className="flex items-center gap-1 text-xs text-[#AAB5D0] transition-colors hover:text-white">
          View all
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* Squad info */}
      <div className="mt-3 flex items-center gap-3">
        {/* Squad avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/20">
          <Shield className="h-5 w-5 text-red-400" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            The Dreamers
          </p>
          <p className="text-[11px] text-[#AAB5D0]">
            32 members &middot; Level 4
          </p>
        </div>

        <Button variant="outline" size="sm">
          Join
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Divider */}
      <div className="my-3 border-t border-[#23315A]" />

      {/* Join a squad CTA */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#603BFF]/15">
          <Users className="h-5 w-5 text-[#603BFF]" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">Join a Squad</p>
          <p className="text-[11px] text-[#AAB5D0]">
            Play together. Earn more.
          </p>
        </div>

        <Button variant="outline" size="sm">
          Create / Join
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
