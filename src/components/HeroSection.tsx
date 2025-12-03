import { useEffect, useState } from 'react';

export function HeroSection() {
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
    <section className="relative z-10 px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl border border-[#facc45]/40 bg-gradient-to-br from-[#111] via-[#0a0a0a] to-[#050505] px-6 py-12 md:px-12 md:py-16 shadow-[0_20px_120px_rgba(0,0,0,0.8)]">
          <div className="space-y-8 text-center">
            <p className="text-sm uppercase tracking-[0.6em] text-[#facc45]/80">
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            <h1 className="text-5xl md:text-6xl font-cursive text-[#facc45] leading-snug">
              Together With Our Families
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              You are warmly invited to share in an evening of love, duas, and timeless celebration as our
              families unite for the Barat and Walima festivities. Your blessings illuminate our story.
            </p>

            <div className="space-y-6 pt-6">
              <p className="text-xs uppercase tracking-[0.6em] text-white/40">
                Countdown to Barat Departure
              </p>
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
              <p className="text-sm uppercase tracking-[0.4em] text-white/60 pt-4">
                January 1, 2026 · 9:00 PM · Barat Departure
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
