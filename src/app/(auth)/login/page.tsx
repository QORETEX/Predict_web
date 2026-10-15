import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Predict</h1>
      <p className="text-center text-muted-foreground">
        Enter your phone number to get started
      </p>
    </div>
  );
}
