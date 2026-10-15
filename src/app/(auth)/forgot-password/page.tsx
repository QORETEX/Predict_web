"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  if (submitted) {
    return (
      <div>
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#603BFF]/15">
          <Mail className="h-7 w-7 text-[#603BFF]" />
        </div>

        {/* Header */}
        <h1 className="text-center text-2xl font-bold text-white">Check your inbox</h1>
        <p className="mt-2 text-center text-sm text-[#AAB5D0]">
          We&apos;ve sent a password reset link to{" "}
          <span className="font-medium text-white">{email}</span>. Check your
          email and follow the instructions.
        </p>

        {/* Actions */}
        <Button
          onClick={() => setSubmitted(false)}
          variant="outline"
          className="mt-6 h-11 w-full border-[#23315A]"
        >
          Didn&apos;t receive it? Resend
        </Button>

        <p className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#603BFF] hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to login
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <h1 className="text-center text-2xl font-bold text-white">Forgot password?</h1>
      <p className="mt-2 text-center text-sm text-[#AAB5D0]">
        No worries. Enter your email and we&apos;ll send you a reset link.
      </p>

      {/* Form */}
      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (email) setSubmitted(true);
        }}
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#AAB5D0]">
            Email address
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="h-11 border-[#23315A] bg-[#0C1532] text-white placeholder:text-[#AAB5D0]/40"
          />
        </div>

        <Button type="submit" className="!mt-6 h-11 w-full">
          Send reset link
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#603BFF] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to login
        </Link>
      </p>
    </div>
  );
}
