import { MapPin } from 'lucide-react';

interface MapButtonProps {
  venueName: string;
  lat?: number;
  lng?: number;
}

export function MapButton({ venueName, lat, lng }: MapButtonProps) {
  const handleMapClick = () => {
    let mapUrl = `https://www.google.com/maps/search/${encodeURIComponent(venueName)}`;
    if (lat && lng) {
      mapUrl = `https://www.google.com/maps/?q=${lat},${lng}`;
    }
    window.open(mapUrl, '_blank');
  };

  return (
    <button
      onClick={handleMapClick}
      className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl border border-[#d4af37]/60 bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37]/20 transition duration-300 font-serif text-sm uppercase tracking-widest"
    >
      <MapPin className="w-5 h-5" />
      View on Map
    </button>
  );
}
