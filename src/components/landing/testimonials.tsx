import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Kwame A.",
    role: "NSMQ Predictor",
    avatar: "KA",
    avatarColor: "bg-gradient-to-br from-[#603BFF] to-[#9B5CFF]",
    quote: "I predicted 8 out of 10 NSMQ regional results correctly. My school squad couldn't believe it. This app is addictive!",
    rating: 5,
  },
  {
    name: "Ama D.",
    role: "Football Fan",
    avatar: "AD",
    avatarColor: "bg-gradient-to-br from-[#2563EB] to-[#603BFF]",
    quote: "Finally a platform that lets me prove I know football better than my friends. The leaderboard rivalry is real.",
    rating: 5,
  },
  {
    name: "Kofi M.",
    role: "Squad Leader",
    avatar: "KM",
    avatarColor: "bg-gradient-to-br from-[#22C55E] to-[#2563EB]",
    quote: "Our school squad has 45 members now. We compete every week and it's brought our school community closer together.",
    rating: 5,
  },
  {
    name: "Efua S.",
    role: "Top 50 Predictor",
    avatar: "ES",
    avatarColor: "bg-gradient-to-br from-[#F43F5E] to-[#603BFF]",
    quote: "I started just for fun but now I'm ranked in the top 50. The XP system keeps me coming back every single day.",
    rating: 5,
  },
];

const stats = [
  { value: "50,000+", label: "Active Players" },
  { value: "1.2M+", label: "Predictions Made" },
  { value: "500+", label: "Schools & Squads" },
  { value: "98%", label: "Say It's Fun" },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Loved by Predictors Across Ghana
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-[#AAB5D0]">
          Join thousands of students, football fans, and quiz enthusiasts already making their picks.
        </p>
      </div>

      {/* Stats bar */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#23315A] bg-[#101A3A] p-5 text-center"
          >
            <div className="text-2xl font-extrabold text-[#603BFF]">
              {stat.value}
            </div>
            <div className="mt-1 text-xs text-[#AAB5D0]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Testimonial cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col rounded-2xl border border-[#23315A] bg-[#101A3A] p-5 transition-all duration-300 hover:border-[#603BFF]/40"
          >
            <div className="mb-3 flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-[#FBBF24] text-[#FBBF24]"
                />
              ))}
            </div>

            <p className="flex-1 text-sm leading-relaxed text-[#AAB5D0]">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="mt-4 flex items-center gap-3 border-t border-[#23315A] pt-4">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${t.avatarColor}`}
              >
                {t.avatar}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{t.name}</div>
                <div className="text-xs text-[#AAB5D0]">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
