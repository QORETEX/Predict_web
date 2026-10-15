"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedCompetition {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  logo: string;
}

const competitions: FeaturedCompetition[] = [
  {
    title: "NSMQ 2027",
    subtitle: "Regional Championships",
    href: "/nsmq",
    image: "/illustrations/NSMQ 2027_ Champions of Tomorrow.png",
    logo: "https://static.wixstatic.com/media/a1e1f8_8706e696c8fc47bd82b930a71515301d~mv2.png/v1/fill/w_80,h_80,al_c,q_85,enc_avif,quality_auto/NSMQ%20Logo.png",
  },
  {
    title: "Premier League",
    subtitle: "Top clubs. Bigger rivalries.",
    href: "/football/premier-league",
    image: "/illustrations/Premier League Manchester City Celebration-2.png",
    logo: "https://crests.football-data.org/PL.png",
  },
  {
    title: "UEFA Champions League",
    subtitle: "Europe's biggest stage.",
    href: "/football/ucl",
    image: "/illustrations/Manchester City Under Neon Lights-1.png",
    logo: "https://crests.football-data.org/CL.png",
  },
  {
    title: "Other Sports",
    subtitle: "Basketball, Tennis, Athletics & more.",
    href: "/sports",
    image: "/illustrations/Manchester City Premier League Spotlight-3.png",
    logo: "",
  },
];

export function FeaturedCompetitions() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Featured Competitions
        </h2>
        <Link
          href="/competitions"
          className="flex items-center gap-1 text-sm text-[#603BFF] hover:underline"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
        {competitions.map((comp) => (
          <Link
            key={comp.title}
            href={comp.href}
            className={cn(
              "group relative flex min-h-[160px] min-w-[220px] flex-col justify-end overflow-hidden rounded-lg border border-transparent p-4 transition-all hover:border-[#603BFF]/40",
              "lg:min-w-0"
            )}
          >
            {/* Background image */}
            <Image
              src={comp.image}
              alt={comp.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Dark overlay — heavier for readability */}
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

            {/* Logo */}
            <div className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white p-1.5 shadow-md">
              {comp.logo ? (
                <Image
                  src={comp.logo}
                  alt={`${comp.title} logo`}
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              ) : (
                <Gamepad2 className="h-5 w-5 text-[#603BFF]" />
              )}
            </div>

            {/* Text */}
            <div className="relative z-10">
              <h3 className="text-base font-bold text-white drop-shadow-md">{comp.title}</h3>
              <p className="mt-0.5 text-sm text-white/70">{comp.subtitle}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#603BFF] transition-transform duration-300 group-hover:translate-x-1 group-hover:underline">
                Learn more
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
