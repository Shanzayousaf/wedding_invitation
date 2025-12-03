import { Calendar } from 'lucide-react';

interface CalendarButtonProps {
  eventTitle: string;
  startDate: Date;
  endDate: Date;
  location: string;
}

export function CalendarButton({
  eventTitle,
  startDate,
  endDate,
  location,
}: CalendarButtonProps) {
  const handleGoogleCalendar = () => {
    const startStr = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endStr = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventTitle
    )}&dates=${startStr}/${endStr}&location=${encodeURIComponent(location)}`;
    window.open(calendarUrl, '_blank');
  };

  const handleIcsDownload = () => {
    const startStr = formatIcsDate(startDate);
    const endStr = formatIcsDate(endDate);
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@wedding-invitation
DTSTAMP:${formatIcsDate(new Date())}
DTSTART:${startStr}
DTEND:${endStr}
SUMMARY:${eventTitle}
LOCATION:${location}
DESCRIPTION:${eventTitle} - Wedding Celebration
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${eventTitle.replace(/\s+/g, '-')}.ics`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleGoogleCalendar}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#d4af37]/60 bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37]/20 transition duration-300 font-serif text-xs uppercase tracking-widest"
      >
        <Calendar className="w-4 h-4" />
        Google
      </button>
      <button
        onClick={handleIcsDownload}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#d4af37]/60 bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37]/20 transition duration-300 font-serif text-xs uppercase tracking-widest"
      >
        <Calendar className="w-4 h-4" />
        Download
      </button>
    </div>
  );
}

function formatIcsDate(date: Date): string {
  return (
    date.getUTCFullYear() +
    String(date.getUTCMonth() + 1).padStart(2, '0') +
    String(date.getUTCDate()).padStart(2, '0') +
    'T' +
    String(date.getUTCHours()).padStart(2, '0') +
    String(date.getUTCMinutes()).padStart(2, '0') +
    String(date.getUTCSeconds()).padStart(2, '0') +
    'Z'
  );
}
