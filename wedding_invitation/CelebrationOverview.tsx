import { Heart, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from './ImageWithFallback';
import { eventDetails } from '../Data/mockData';

// Helper function to parse name and parent info
const parseNameAndParent = (fullName: string) => {
  const match = fullName.match(/^(.+?)\s*\((.+)\)$/);
  if (match) {
    return { name: match[1].trim(), parent: `(${match[2]})` };
  }
  return { name: fullName, parent: '' };
};

const celebrationEvents = [
  {
    id: 'reception' as const,
    title: 'Reception',
    coupleLabel: `${eventDetails.reception.couple.bride} & ${eventDetails.reception.couple.groom}`,
    dateTime: `${eventDetails.reception.date} | ${eventDetails.reception.time}`,
    venueName: eventDetails.reception.venue.name,
    venueAddress: eventDetails.reception.venue.address,
    image:
      'https://images.unsplash.com/photo-1753559319967-8f959ad78b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvcmFsJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjM1NTYzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cardClasses:
      'border-2 border-blush-200 shadow-xl hover:shadow-2xl hover:-translate-y-2',
    contentGradient: 'from-blush-50 to-white',
    iconColor: 'text-blush-500',
    borderColor: 'border-blush-100',
    message: "We can’t wait to celebrate with you.",
  },
  {
    id: 'barat' as const,
    title: 'Barat',
    coupleLabel: `${eventDetails.barat.couple.groom} weds ${eventDetails.barat.couple.bride}`,
    dateTime: `${eventDetails.barat.date} | ${eventDetails.barat.time}`,
    venueName: eventDetails.barat.venue.name,
    venueAddress: eventDetails.barat.venue.address,
    image:
      'https://images.unsplash.com/photo-1742240439165-60790db1ee93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwd2VkZGluZyUyMGx1eHVyeXxlbnwxfHx8fDE3NjM1NTYzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cardClasses:
      'border-2 border-gold-300 shadow-xl hover:shadow-2xl hover:-translate-y-2',
    contentGradient: 'from-gold-50 to-white',
    iconColor: 'text-gold-600',
    borderColor: 'border-gold-100',
    message: 'Come ready to dance the night away.',
  },
];

export function CelebrationOverview() {
  const celebrationDate = eventDetails.reception.date;

  return (
    <section className="space-y-12">
      <div className="text-center animate-fade-in">
        <div className="inline-block mb-6">
          <Heart className="w-16 h-16 text-blush-500 mx-auto fill-blush-200 animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-7xl mb-4 text-gray-800">A Day of Love</h1>
        <p className="font-cursive text-3xl md:text-5xl text-blush-500 mb-6">
          Two Celebrations, One Perfect Day
        </p>
        <div className="flex items-center justify-center gap-3 text-gray-600 mb-8">
          <Calendar className="w-5 h-5 text-gold-500" />
          <span className="text-lg">{celebrationDate}</span>
        </div>
        <div className="max-w-2xl mx-auto bg-white/80 border border-blush-100 rounded-3xl p-6 shadow-lg">
          <p className="text-gray-700 text-lg">
            Each guest receives a personalised QR code. When scanned, it opens the
            private invitation page with every detail shown below.
          </p>
          <p className="text-sm text-gray-500 mt-3">Keep your QR handy—no login needed.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {celebrationEvents.map((event, index) => (
          <Card
            key={event.id}
            className={`overflow-hidden transition-all duration-300 animate-fade-in ${event.cardClasses}`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="relative h-64">
              <ImageWithFallback
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-3xl mb-1">{event.title}</h2>
                {event.id === 'barat' ? (
                  <div className="font-cursive text-xl">
                    <p>{parseNameAndParent(eventDetails.barat.couple.groom).name} weds {parseNameAndParent(eventDetails.barat.couple.bride).name}</p>
                    <p className="text-sm mt-1">
                      {parseNameAndParent(eventDetails.barat.couple.groom).parent} & {parseNameAndParent(eventDetails.barat.couple.bride).parent}
                    </p>
                  </div>
                ) : event.id === 'reception' ? (
                  <div className="font-cursive text-xl">
                    <p>{parseNameAndParent(eventDetails.reception.couple.groom).name} weds {parseNameAndParent(eventDetails.reception.couple.bride).name}</p>
                    <p className="text-sm mt-1">
                      {parseNameAndParent(eventDetails.reception.couple.groom).parent} & {parseNameAndParent(eventDetails.reception.couple.bride).parent}
                    </p>
                  </div>
                ) : (
                  <p className="font-cursive text-xl">{event.coupleLabel}</p>
                )}
              </div>
            </div>
            <CardContent className={`p-6 bg-gradient-to-br ${event.contentGradient}`}>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className={`w-5 h-5 ${event.iconColor} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="text-gray-800">{event.dateTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className={`w-5 h-5 ${event.iconColor} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p className="text-gray-800">{event.venueName}</p>
                    <p className="text-sm text-gray-600">{event.venueAddress}</p>
                  </div>
                </div>
                <div className={`pt-3 border-t ${event.borderColor}`}>
                  <p className="text-sm text-gray-600">{event.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600 mb-6 text-lg">
            We are thrilled to celebrate this special day with two beautiful unions. Join us for an
            unforgettable celebration of love, family, and new beginnings.
          </p>
          <div className="inline-flex items-center gap-2 text-blush-600 hover:text-blush-700 cursor-pointer">
            <Heart className="w-4 h-4 fill-current" />
            <span className="text-sm">With love and joy</span>
            <Heart className="w-4 h-4 fill-current" />
          </div>
        </div>
      </div>
    </section>
  );
}

