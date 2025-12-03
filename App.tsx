import { useState, useEffect } from 'react';
import { Toaster } from './ui/sonner';
import { HomePage } from './wedding_invitation/HomePage';
import { InvitationPage } from './wedding_invitation/InvitationPage';
import { AnimatedBackground } from './wedding_invitation/AnimatedBackground';
import { ReceptionPage } from './wedding_invitation/ReceptionPage';
import { BaratPage } from './wedding_invitation/BaratPage';

type Page = 'home' | 'invitation' | 'reception' | 'barat';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Handle URL-based routing
  useEffect(() => {
    const handleRoute = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'reception' || hash === 'barat' || hash === 'invitation') {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    return () => window.removeEventListener('hashchange', handleRoute);
  }, []);

  const handleNavigation = (page: Page) => {
    if (page === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = page;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.6em] text-gold-400">
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </p>
              <p className="text-white/70 text-sm">
                In the name of Allah, the Most Gracious, the Most Merciful
              </p>
            </div>
            <nav className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.4em] text-white/70">
              {(['home', 'reception', 'barat', 'invitation'] as Page[]).map((page) => (
                <button
                  key={page}
                  onClick={() => handleNavigation(page)}
                  className={`px-4 py-2 rounded-full transition ${
                    currentPage === page
                      ? 'bg-white/15 text-white'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  {page}
                </button>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {currentPage === 'home' && <HomePage onNavigate={handleNavigation} />}
          {currentPage === 'reception' && <ReceptionPage onNavigate={handleNavigation} />}
          {currentPage === 'barat' && <BaratPage onNavigate={handleNavigation} />}
          {currentPage === 'invitation' && <InvitationPage onNavigate={handleNavigation} />}
        </main>

        <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-6 text-xs uppercase tracking-[0.4em] text-white/50 text-center">
            Crafted in charcoal &amp; gold · 2026
          </div>
        </footer>

        <Toaster position="top-center" richColors />
      </div>
    </div>
  );
}