import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Show, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

function AuthButtons() {
  return (
    <>
      <Show when="signed-out">
        <Link href="/login">
          <Button variant="outline" size="sm">
            Log in
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="sm">
            Sign up
          </Button>
        </Link>
      </Show>
      <Show when="signed-in">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-9 w-9",
            },
          }}
        />
      </Show>
    </>
  );
}

function AuthButtonsFallback() {
  return (
    <>
      <Button variant="outline" size="sm" disabled>
        Log in
      </Button>
      <Button size="sm" disabled>
        Sign up
      </Button>
    </>
  );
}

export function Navbar() {
  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/icons/logo-icon.jpeg"
            alt="Predict"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-white">Predict</span>
        </Link>

        <div className="flex items-center gap-3">
          <Suspense fallback={<AuthButtonsFallback />}>
            <AuthButtons />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
