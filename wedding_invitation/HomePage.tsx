
import { useEffect, useState } from 'react';
import { BaratTalhaMuskanCard } from './BaratTalhaMuskanCard';
import { BaratShanzaYasirWalimaCard } from './BaratShanzaYasirWalimaCard';

interface HomePageProps {
  onNavigate: (page: 'home' | 'reception' | 'barat' | 'invitation') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const BARAT_DEPARTURE = new Date('2026-01-01T21:00:00+05:00');
  const getTimeRemaining = () => {
    const now = Date.now();
    const distance = Math.max(0, BARAT_DEPARTURE.getTime() - now);
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);
    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdownSegments = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="min-h-screen relative bg-[#050505]">
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10 space-y-16">
        <section className="rounded-[40px] border border-[#facc45]/40 bg-gradient-to-br from-[#111] via-[#0a0a0a] to-[#050505] px-6 py-10 md:px-12 md:py-14 shadow-[0_20px_120px_rgba(0,0,0,0.8)]">
          <div className="space-y-6 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.6em] text-[#facc45]/80">
              Talha &amp; Muskan · Yasir &amp; Shanza
            </p>
            <h1 className="text-5xl md:text-6xl font-cursive text-[#facc45] leading-snug">
              Together With Our Families
            </h1>
            <p className="text-lg text-white/80">
              You are warmly invited to share in an evening of love, duas, and timeless celebration as our
              families unite for the Barat and Walima festivities. Your blessings illuminate our story.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('reception')}
                className="rounded-full bg-[#facc45] text-[#0d0d0d] px-6 py-3 text-sm tracking-[0.4em] uppercase hover:shadow-[0_10px_30px_rgba(250,204,69,0.4)] transition"
              >
                Reception
              </button>
              <button
                onClick={() => onNavigate('barat')}
                className="rounded-full border border-[#facc45]/60 px-6 py-3 text-sm tracking-[0.4em] uppercase text-[#facc45] hover:bg-[#facc45]/10 transition"
              >
                Barat
              </button>
              <button
                onClick={() => onNavigate('invitation')}
                className="rounded-full border border-white/20 px-6 py-3 text-sm tracking-[0.4em] uppercase text-white/80 hover:text-white hover:border-[#facc45]/60 transition"
              >
                Invitation
              </button>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.6em] text-white/40 mb-4">Countdown to Barat Departure</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {countdownSegments.map((segment) => (
                <div
                  key={segment.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center transition duration-300 hover:border-[#facc45]/50"
                >
                  <p className="text-4xl font-serif text-[#facc45] leading-none">
                    {String(segment.value).padStart(2, '0')}
                  </p>
                  <p className="mt-3 text-[0.6rem] uppercase tracking-[0.55em] text-white/60">
                    {segment.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm uppercase tracking-[0.4em] text-white/60">
              January 1, 2026 · 9:00 PM · Barat Departure
            </p>
          </div>
        </section>

        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <p className="text-xs uppercase tracking-[0.6em] text-[#facc45]/80">Celebration Highlights</p>
            <h2 className="text-4xl md:text-5xl font-cursive text-[#facc45]">A Tale of Two Families</h2>
            <p className="text-white/70">
              Two radiant unions, one graceful narrative—discover the full itinerary within these bespoke
              invitations.
            </p>
          </div>
          <div className="grid gap-10 lg:grid-cols-2">
            <BaratTalhaMuskanCard />
            <BaratShanzaYasirWalimaCard />
          </div>
        </section>
      </div>
    </div>
  );
}
