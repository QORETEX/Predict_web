"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SchoolRow {
  rank: number;
  name: string;
  points: string;
  winRate: string;
}

const schools: SchoolRow[] = [
  { rank: 1, name: "Kumasi Academy", points: "12,480", winRate: "78%" },
  { rank: 2, name: "Prempeh College", points: "11,290", winRate: "72%" },
  { rank: 3, name: "Accra Academy", points: "10,965", winRate: "64%" },
  { rank: 4, name: "St. Roses SHS", points: "9,760", winRate: "63%" },
  { rank: 5, name: "Wesley Girls", points: "8,920", winRate: "60%" },
];

function RankBadge({ rank }: { rank: number }) {
  const colorMap: Record<number, string> = {
    1: "bg-yellow-500/20 text-yellow-400",
    2: "bg-gray-400/20 text-gray-300",
    3: "bg-amber-700/20 text-amber-500",
  };

  const colors = colorMap[rank];

  if (colors) {
    return (
      <span
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
          colors
        )}
      >
        {rank}
      </span>
    );
  }

  return (
    <span className="inline-flex h-6 w-6 items-center justify-center text-xs font-medium text-[#AAB5D0]">
      {rank}
    </span>
  );
}

export function TopSchools() {
  return (
    <section>
      {/* Section header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Top Schools</h2>
        <Link
          href="/leaderboards"
          className="flex items-center gap-1 text-sm text-[#603BFF] hover:underline"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Table card */}
      <div className="overflow-x-auto rounded-lg bg-[#0F1A36]">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#23315A] text-xs uppercase tracking-wider text-[#AAB5D0]">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">School</th>
              <th className="px-4 py-3 text-right font-medium">Points</th>
              <th className="px-4 py-3 text-right font-medium">Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school, idx) => (
              <tr
                key={school.rank}
                className={cn(
                  "transition-colors hover:bg-[#162042]",
                  idx < schools.length - 1 && "border-b border-[#23315A]/50"
                )}
              >
                <td className="px-4 py-3">
                  <RankBadge rank={school.rank} />
                </td>
                <td className="px-4 py-3 font-medium text-white">
                  {school.name}
                </td>
                <td className="px-4 py-3 text-right text-[#AAB5D0]">
                  {school.points}
                </td>
                <td className="px-4 py-3 text-right text-[#AAB5D0]">
                  {school.winRate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
