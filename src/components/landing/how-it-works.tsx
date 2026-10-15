import React from "react";
import { UserPlus, Target, Trophy, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up free in seconds. No payment needed — just pick a username.",
    step: "01",
  },
  {
    icon: Target,
    title: "Make Your Picks",
    description: "Browse live and upcoming events. Lock in your predictions before kick-off.",
    step: "02",
  },
  {
    icon: Trophy,
    title: "Earn XP & Tokens",
    description: "Correct picks earn XP, tokens, and achievements. Better picks, bigger rewards.",
    step: "03",
  },
  {
    icon: TrendingUp,
    title: "Climb the Ranks",
    description: "Join squads, represent your school, and rise through the leaderboard.",
    step: "04",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          How It Works
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-[#AAB5D0]">
          Get started in minutes. No money involved — just your knowledge, your predictions, and bragging rights.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
        {steps.map((step, i) => (
          <React.Fragment key={step.step}>
            <div
              className="group relative rounded-2xl border border-[#23315A] bg-[#101A3A] p-6 transition-all duration-300 hover:border-[#603BFF]/40 hover:shadow-[0_0_24px_-4px_rgba(96,59,255,0.25)] sm:m-2"
            >
              <span className="absolute right-5 top-5 text-3xl font-extrabold text-white/5">
                {step.step}
              </span>

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#603BFF]/10 transition-colors duration-300 group-hover:bg-[#603BFF]/20">
                <step.icon className="h-6 w-6 text-[#603BFF]" />
              </div>

              <h3 className="text-base font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#AAB5D0]">
                {step.description}
              </p>
            </div>

            {i < steps.length - 1 && (
              <div className="hidden w-8 self-center border-t border-dashed border-[#23315A] lg:block" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
