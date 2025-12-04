import { contactNumbers, whatsappLink } from './eventContent';

export function BaratShanzaYasirWalimaCard() {
  return (
    <article className="group relative overflow-hidden rounded-[32px] border border-[#facc45]/60 bg-[#0d0d0d]/90 p-1 shadow-[0_20px_80px_rgba(0,0,0,0.6)] transition duration-500 hover:border-[#facc45]">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-70 transition duration-700 blur-2xl bg-[#facc45]/30" />

      <div className="relative rounded-[28px] bg-gradient-to-b from-[#111] via-[#0d0d0d] to-[#050505]">
        <section className="relative">
          <header className="relative h-44 overflow-hidden rounded-t-[28px] bg-gradient-to-b from-[#111] to-[#050505]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d0d]/20 to-[#0d0d0d]" />
            <div className="absolute bottom-4 left-6">
              <p className="text-xs uppercase tracking-[0.6em] text-[#facc45]/80">Honoring Yousaf Family</p>
              <h3 className="mt-2 text-3xl font-serif text-[#facc45] flex flex-wrap items-center gap-2">
                <span className="text-2xl">💍</span> Barat Ceremony
              </h3>
              <p className="text-base text-white/70 mt-1 font-serif">
                Shanza Yousaf (D/O Mr. & Mrs. Tanveer Yousaf) &amp; Yasir Asghar (S/O Mr. &amp; Mrs. Asghar)
              </p>
            </div>
          </header>

          <div className="px-6 py-8 text-white/90">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-[#facc45]/70">Date &amp; Time</p>
                <p className="mt-2 text-lg font-serif text-white">January 2, 2026 — 6:00 PM–9:00 PM</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-[#facc45]/70">Venue</p>
                <p className="mt-2 text-lg font-serif text-white">Royal Challet Lawn</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  B-172, Block-11, Gulistan-e-Johar,
                  <br />
                  Near P.O.B Eye Hospital &amp; Be Energy Pump, Karachi
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-t border-white/10">
          <header className="relative h-44 overflow-hidden bg-gradient-to-t from-[#050505] via-[#0d0d0d]/40 to-transparent">
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#0d0d0d]/40 to-transparent" />
            <div className="absolute top-4 left-6">
              <p className="text-xs uppercase tracking-[0.6em] text-[#facc45]/80">Evening Elegance</p>
              <h3 className="mt-2 text-3xl font-serif text-[#facc45] flex flex-wrap items-center gap-2">
                <span className="text-2xl">✨</span> Walima Reception
              </h3>
              <p className="text-base text-white/70 mt-1 font-serif">
                M. Talha Yousaf (S/O Mr. & Mrs. Tanveer Yousaf) &amp; Muskan Kashan
              </p>
            </div>
          </header>

          <div className="px-6 py-8 text-white/90 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-[#facc45]/70">Date &amp; Time</p>
              <p className="mt-2 text-lg font-serif text-white">January 2, 2026 — 8:00 PM–11:00 PM</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-[#facc45]/70">Venue</p>
              <p className="mt-2 text-lg font-serif text-white">Royal Challet Lawn</p>
              <p className="text-sm text-white/70 leading-relaxed">
                B-172, Block-11, Gulistan-e-Johar,
                <br />
                Near P.O.B Eye Hospital &amp; Be Energy Pump, Karachi
              </p>
            </div>

            <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.5em] text-[#facc45]/70">Programme</p>
              <div className="flex flex-col gap-2 font-serif">
                <p className="text-white">
                  <span className="text-[#facc45]">Gathering</span>: 9:00 PM
                </p>
                <p className="text-white">
                  <span className="text-[#facc45]">Dinner</span>: 10:00 PM
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="text-xs uppercase tracking-[0.5em] text-[#facc45]/70">RSVP</p>
              <p className="mt-3 font-serif text-lg text-white">Tanveer Yousaf</p>
              <div className="flex flex-col gap-2 mt-2">
                {contactNumbers.map((entry) => (
                  <a
                    key={entry.number}
                    href={whatsappLink(entry.number)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-[#facc45] transition"
                  >
                    {entry.number}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

