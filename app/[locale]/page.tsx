import HeroSection from '@/components/sections/HeroSection';
import StatsBar from '@/components/sections/StatsBar';
import ChallengeShowcase from '@/components/sections/ChallengeShowcase';
import MedalShowcase from '@/components/sections/MedalShowcase';
import FeatureShowcase from '@/components/sections/FeatureShowcase';
import ImpactSection from '@/components/sections/ImpactSection';
import ActivityTypes from '@/components/sections/ActivityTypes';
import FinalCTA from '@/components/sections/FinalCTA';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <ChallengeShowcase />
      <MedalShowcase />
      <FeatureShowcase />
      <ImpactSection />
      <ActivityTypes />
      <FinalCTA />
      <ContactSection />
    </main>
  );
}
