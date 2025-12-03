import { useState, useEffect } from 'react';
import { Toaster } from './ui/sonner';
import { HomePage } from './wedding_invitation/HomePage';
import { AnimatedBackground } from './wedding_invitation/AnimatedBackground';

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-20">
          <div className="container mx-auto px-4 py-6">
            <div>
              <p className="text-sm uppercase tracking-[0.6em] text-[#d4af37]">
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </p>
              <p className="text-white/70 text-sm">
                In the name of Allah, the Most Gracious, the Most Merciful
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <HomePage />
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