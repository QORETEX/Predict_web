import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { QuickNav } from "@/components/dashboard/quick-nav";
import { EventsPanel } from "@/components/dashboard/events-panel";
import { FeaturedCompetitions } from "@/components/dashboard/featured-competitions";
import { TopSchools } from "@/components/dashboard/top-schools";
import { RecentResultsSection } from "@/components/dashboard/recent-results";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <WelcomeBanner />
      <QuickNav />
      <FeaturedCompetitions />
      <EventsPanel />
      <div className="grid gap-6 xl:grid-cols-2">
        <TopSchools />
        <RecentResultsSection />
      </div>
    </div>
  );
}
