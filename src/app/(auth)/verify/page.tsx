import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify OTP",
};

export default function VerifyPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Enter code</h1>
      <p className="text-center text-muted-foreground">
        We sent a verification code to your phone
      </p>
    </div>
  );
}
