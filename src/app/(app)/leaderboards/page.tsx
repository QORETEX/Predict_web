import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboards",
};

export default function LeaderboardsPage() {
  return (
    <div className="mx-auto max-w-lg px-4 pt-6">
      <h1 className="text-xl font-bold">Leaderboards</h1>
    </div>
  );
}
