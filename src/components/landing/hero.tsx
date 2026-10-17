import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, Trophy, Goal, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[520px] overflow-hidden bg-[#070D25] pt-16 sm:min-h-[600px]">
      <div className="absolute inset-0 sm:left-auto sm:w-[65%]">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          className="object-cover object-[center_20%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070D25] via-[#070D25]/80 to-[#070D25]/40 sm:via-[#070D25]/70 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D25] via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#070D25]/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20">
        <div className="max-w-xl">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#23315A] bg-[#101A3A]/80 px-4 py-1.5 text-sm text-[#AAB5D0]">
            <Zap className="h-3.5 w-3.5 text-[#FBBF24]" />
            Free to play &middot; Tokens have no cash value
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
            Predict. Play.{" "}
            <span className="gradient-text">Climb.</span>
          </h1>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#AAB5D0] sm:text-base">
            Make predictions, compete with friends, join squads and schools, and earn tokens and XP. It&apos;s free, fun and built for Ghana&apos;s next generation.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/signup">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            <CategoryPill
              icon={<Trophy className="h-4 w-4 text-[#FBBF24]" />}
              label="NSMQ"
              sub="Regional & National"
            />
            <CategoryPill
              icon={<Goal className="h-4 w-4 text-[#FBBF24]" />}
              label="Football"
              sub="Premier League & more"
            />
            <CategoryPill
              icon={<Globe className="h-4 w-4 text-[#FBBF24]" />}
              label="Other Sports"
              sub="Trending events"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryPill({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#101A3A] ring-1 ring-[#23315A]">
        {icon}
      </div>
      <div className="text-sm">
        <span className="font-semibold text-white">{label}</span>
        <p className="text-xs text-[#AAB5D0]">{sub}</p>
      </div>
    </div>
  );
}
