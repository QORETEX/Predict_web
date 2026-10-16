import Image from "next/image";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#070D25]">
      {/* Background image — left side */}
      <div className="absolute left-0 top-0 hidden h-full w-[55%] lg:block">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          sizes="55vw"
          className="object-cover object-[center_20%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#070D25] via-[#070D25]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D25] via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#070D25]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-dvh">
        {/* Left — text over image */}
        <div className="hidden flex-1 flex-col justify-end p-10 lg:flex">
          <h1 className="text-3xl font-extrabold leading-tight text-white">
            Predict.
            <br />
            Play. <span className="text-[#603BFF]">Climb.</span>
          </h1>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#AAB5D0]">
            Make predictions, compete with friends, join squads and schools,
            and earn tokens and XP. It&apos;s free, fun and built for
            Ghana&apos;s next generation.
          </p>
          <div className="mt-8 flex items-center gap-2 text-xs text-[#AAB5D0]/60">
            <Zap className="h-3 w-3 text-[#FBBF24]" />
            Free to play &middot; Tokens have no cash value
          </div>
        </div>

        {/* Right — form panel */}
        <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-[600px] lg:shrink-0">
          {/* Logo */}
          <div className="mb-10">
            <Link href="/">
              <Image
                src="/icons/logo-icon.jpeg"
                alt="Predict"
                width={48}
                height={48}
                className="rounded-xl"
              />
            </Link>
          </div>

          <div className="w-full max-w-[400px]">{children}</div>
        </div>
      </div>
    </div>
  );
}
