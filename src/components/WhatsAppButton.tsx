import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  label?: string;
}

export function WhatsAppButton({ phoneNumber, label = 'WhatsApp' }: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
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
    <button
      onClick={handleWhatsAppClick}
      className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl border border-[#d4af37]/60 bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37]/20 transition duration-300 font-serif text-sm uppercase tracking-widest"
    >
      <MessageCircle className="w-5 h-5" />
      {label}
    </button>
  );
}
