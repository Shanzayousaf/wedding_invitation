import { Phone } from 'lucide-react';

export function RSVPSection() {
  const contacts = [
    { label: 'Family Desk', number: '03422161007' },
    { label: 'Event Host', number: '03462468393' },
  ];

  const handleWhatsAppClick = (phoneNumber: string) => {
    const digits = phoneNumber.replace(/[^\d]/g, '');
    const formatted = digits.startsWith('0')
      ? `92${digits.slice(1)}`
      : digits.startsWith('92')
      ? digits
      : `92${digits}`;
    const whatsappUrl = `https://wa.me/${formatted}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative z-10 px-4 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.6em] text-[#d4af37]/80 font-serif mb-4">
            Contact for RSVP
          </p>
          <h2 className="text-4xl md:text-5xl font-cursive text-[#d4af37]">Tanveer Yousaf</h2>
          <p className="text-sm text-white/60 mt-2 uppercase tracking-widest font-serif">
            Reach out for seating, entry, or timing updates
          </p>
        </div>

        <div className="space-y-4">
          {/* Phone Number Boxes */}
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact.number}
                className="border-2 border-[#d4af37]/60 rounded-xl bg-[#050505]/50 p-6 flex items-center justify-between hover:border-[#d4af37] transition duration-300"
              >
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-[#d4af37]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-white/50 font-serif">
                      {contact.label}
                    </p>
                    <p className="text-lg font-serif text-white mt-1">{contact.number}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
            {contacts.map((contact) => (
              <button
                key={`wa-${contact.number}`}
                onClick={() => handleWhatsAppClick(contact.number)}
                className="px-6 py-4 rounded-xl border-2 border-[#d4af37]/60 bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37]/20 transition duration-300 font-serif font-semibold uppercase tracking-widest text-sm"
              >
                WhatsApp {contact.label}
              </button>
            ))}
          </div>

          {/* Decorative note */}
          <div className="mt-8 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-white/40 font-serif">
              Our family desk will respond promptly to all inquiries
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
