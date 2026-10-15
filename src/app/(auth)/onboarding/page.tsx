import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set up your profile",
};

export default function OnboardingPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Set up your profile</h1>
      <p className="text-center text-muted-foreground">
        Verify your identity and choose a display name
      </p>
    </div>
  );
}
