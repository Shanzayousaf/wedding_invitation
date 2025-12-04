import { MapButton } from './MapButton';
import { WhatsAppButton } from './WhatsAppButton';
import { CalendarButton } from './CalendarButton';

export function TileBaratTalha() {
  const startDate = new Date('2026-01-01T21:00:00+05:00');
  const endDate = new Date('2026-01-01T23:59:00+05:00');

  return (
    <article className="group relative overflow-hidden rounded-3xl border-2 border-[#d4af37] bg-gradient-to-b from-[#1a1a1a] via-[#0d0d0d] to-[#050505] shadow-[0_20px_80px_rgba(0,0,0,0.7)]">
      {/* Decorative corner accent */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#d4af37] opacity-40" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#d4af37] opacity-40" />

      <div className="relative p-8 md:p-10 space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center border-b border-[#d4af37]/30 pb-8">
          <p className="text-xs uppercase tracking-[0.8em] text-[#d4af37] font-serif">
            Wedding Ceremony of their Beloved Son
          </p>
          <h2 className="text-4xl font-cursive text-[#d4af37]">M. Talha Yousaf</h2>
          <p className="text-xs text-white/50 font-serif">(S/O Mr. & Mrs. Tanveer Yousaf)</p>
          <p className="text-sm uppercase tracking-widest text-white/60">WITH</p>
          <h2 className="text-4xl font-cursive text-[#d4af37]">Muskan Kashan</h2>
          <p className="text-xs text-white/50 font-serif">(D/O Mr. & Mrs. M. Kashan)</p>
        </div>

        {/* Date */}
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[#d4af37]/70 font-serif">Date</p>
          <p className="text-lg font-serif text-white">Thursday, January 01, 2026</p>
        </div>

        {/* Venue */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.5em] text-[#d4af37]/70 font-serif text-center">
            Venue
          </p>
          <div className="border border-[#d4af37]/30 rounded-xl bg-[#050505]/50 p-5 text-center">
            <p className="text-lg font-serif text-white">FC Marriage Banquet</p>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">
              Shahra-e-Faisal opposite Iqra University Malir Campus
              <br />
              Shamsi Society, Rafah-e-Aam Society, Malir Halt, Karachi
            </p>
          </div>
        </div>

        {/* Programme */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.5em] text-[#d4af37]/70 font-serif text-center">
            Programme
          </p>
          <div className="border border-[#d4af37]/30 rounded-xl bg-[#050505]/50 p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white font-serif">Departure of Barat</span>
              <span className="text-[#d4af37] font-serif font-semibold">09:00 PM</span>
            </div>
            <div className="border-t border-white/10" />
            <div className="flex justify-between items-center">
              <span className="text-white font-serif">Dinner</span>
              <span className="text-[#d4af37] font-serif font-semibold">10:00 PM</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-4">
          <MapButton venueName="FC Marriage Banquet, Karachi" />
          <WhatsAppButton phoneNumber="03422161007" label="WhatsApp Tanveer" />
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-white/40 font-serif mb-3 text-center">
              Add to Calendar
            </p>
            <CalendarButton
              eventTitle="Talha & Muskan Barat"
              startDate={startDate}
              endDate={endDate}
              location="FC Marriage Banquet, Karachi"
            />
          </div>
        </div>

        {/* RSVP Footer */}
        <div className="border-t border-[#d4af37]/30 pt-6 text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.5em] text-[#d4af37]/70 font-serif">RSVP</p>
          <p className="text-xl font-serif text-white">Tanveer Yousaf</p>
        </div>
      </div>
    </article>
  );
}
