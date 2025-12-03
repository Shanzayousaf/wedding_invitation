import { ArrowLeft, MapPin, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { contactNumbers, eventContent, whatsappLink } from './eventContent';

interface ReceptionPageProps {
  onNavigate: (page: 'home' | 'barat' | 'invitation' | 'reception') => void;
}

export function ReceptionPage({ onNavigate }: ReceptionPageProps) {
  const event = eventContent.reception;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10 text-white animate-fade-in">
            <Button
                variant="ghost"
                onClick={() => onNavigate('home')}
                className="mb-6 text-gold-400 hover:text-gold-300 hover:bg-white/10"
            >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Home
            </Button>

            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-7xl font-cursive text-gold-500 mb-4">{event.title}</h1>
                <p className="text-2xl md:text-3xl text-white/90 font-serif">
                    {event.couple.groom} <span className="text-gold-500">&</span> {event.couple.bride}
                </p>
            </div>

            <div className="bg-charcoal-900/80 border border-gold-500/30 rounded-3xl p-8 backdrop-blur-sm shadow-2xl">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-gold-400 text-lg mb-2 font-serif tracking-wide">Date & Time</h3>
                            <p className="text-xl text-white">{event.date}</p>
                            <p className="text-lg text-gray-300">{event.time}</p>
                        </div>

                        <div>
                            <h3 className="text-gold-400 text-lg mb-2 font-serif tracking-wide">Venue</h3>
                            <p className="text-xl text-white">{event.venue.name}</p>
                            <p className="text-gray-300 mb-3">{event.venue.address}</p>
                            <Button
                                variant="link"
                                className="text-gold-400 hover:text-gold-300 p-0 h-auto"
                                onClick={() => window.open(event.venue.mapUrl, '_blank')}
                            >
                                <MapPin className="mr-2 w-4 h-4" />
                                View on Map
                            </Button>
                        </div>

                        <div>
                            <h3 className="text-gold-400 text-lg mb-3 font-serif tracking-wide">Contact</h3>
                            <div className="space-y-3">
                                {contactNumbers.map((entry) => (
                                    <Button
                                        key={entry.number}
                                        variant="outline"
                                        className="w-full justify-start border-gold-500/30 text-gold-400 hover:bg-gold-500/10 hover:text-gold-300 bg-transparent"
                                        onClick={() => window.open(whatsappLink(entry.number), '_blank')}
                                    >
                                        <Phone className="mr-2 w-4 h-4" />
                                        <span className="flex flex-col text-left">
                                            <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                                                {entry.label}
                                            </span>
                                            <span>{entry.number.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')}</span>
                                        </span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="h-64 md:h-full min-h-[300px] rounded-xl overflow-hidden border border-gold-500/20 shadow-inner">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={event.venue.mapEmbedUrl}
                            style={{ filter: 'grayscale(100%) invert(90%)' }}
                        >
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
