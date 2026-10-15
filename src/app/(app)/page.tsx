import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-lg px-4 pt-6">
      <h1 className="text-2xl font-bold">Predict</h1>
      <p className="mt-1 text-muted-foreground">
        Make your picks. Climb the ranks.
      </p>
    </div>
  );
}
