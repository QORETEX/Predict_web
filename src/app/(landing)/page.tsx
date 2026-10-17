import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { FeaturedCompetitions } from "@/components/landing/featured-competitions";
import { EventsTable } from "@/components/landing/events-table";
import { RewardsCta } from "@/components/landing/rewards-cta";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { Faq } from "@/components/landing/faq";
import { DownloadCta } from "@/components/landing/download-cta";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <Hero />
      <FeaturedCompetitions />

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-4 xl:grid-cols-[1fr_350px]">
          <EventsTable />
          <RewardsCta />
        </div>
      </section>

      <HowItWorks />
      <Testimonials />
      <Faq />
      <DownloadCta />
      <Footer />
    </div>
  );
}
