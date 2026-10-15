import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Picks",
};

export default function PicksPage() {
  return (
    <div className="mx-auto max-w-lg px-4 pt-6">
      <h1 className="text-xl font-bold">My Picks</h1>
    </div>
  );
}
