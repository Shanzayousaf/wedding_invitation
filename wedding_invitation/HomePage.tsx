import { HeroSection } from '../src/components/HeroSection';
import { TileBaratTalha } from '../src/components/TileBaratTalha';
import { TileShanzaBaratAndWalima } from '../src/components/TileShanzaBaratAndWalima';
import { RSVPSection } from '../src/components/RSVPSection';

interface HomePageProps {
  onNavigate?: (page: 'home' | 'reception' | 'barat' | 'invitation') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 space-y-12 md:space-y-16 pb-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Tiles Section */}
        <section className="px-4 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TileBaratTalha />
              <TileShanzaBaratAndWalima />
            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <RSVPSection />
      </div>
    </div>
  );
}
