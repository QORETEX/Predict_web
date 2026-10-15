"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  return (
    <AuthenticateWithRedirectCallback
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/welcome"
      signInUrl="/login"
      signUpUrl="/signup"
    />
  );
}
