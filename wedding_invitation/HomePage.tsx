import { FloralDecoration } from './FloralDecoration';
import { CelebrationOverview } from './CelebrationOverview';
import { DancingCoupleBackground } from './DancingCoupleBackground';

interface HomePageProps {
  onNavigate: (page: 'login') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-50 via-blush-50 to-gold-50 relative">
      <DancingCoupleBackground />
      <FloralDecoration position="top-left" color="text-blush-300" />
      <FloralDecoration position="bottom-right" color="text-gold-400" />
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <CelebrationOverview />
      </div>
    </div>
  );
}
