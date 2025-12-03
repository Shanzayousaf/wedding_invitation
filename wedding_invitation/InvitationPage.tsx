import { useMemo, useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Heart, Share2, Copy, Check, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ImageWithFallback } from './ImageWithFallback';
import { contactNumbers, eventContent, invitationCopy, whatsappLink } from './eventContent';

interface InvitationPageProps {
  onNavigate: (page: 'home' | 'reception' | 'barat' | 'invitation') => void;
}

export function InvitationPage({ onNavigate }: InvitationPageProps) {
  const [copied, setCopied] = useState(false);

  const invitationUrl = useMemo(() => {
    if (typeof window === 'undefined') return 'https://your-invitation.com';
    return window.location.href;
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Talha & Muskan · Yasir & Shanza',
        text: invitationCopy.tagline,
        url: invitationUrl,
      });
    } else {
      handleCopyLink();
    }
  };

  const eventOrder: Array<keyof typeof eventContent> = ['reception', 'barat'];

  return (
    <div className="relative min-h-screen px-4 py-12 text-white">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="text-white/70 hover:text-white"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
          <div className="hidden md:flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-white/60">
            <button onClick={() => onNavigate('reception')} className="hover:text-white transition">
              Reception
            </button>
            <span className="text-white/30">•</span>
            <button onClick={() => onNavigate('barat')} className="hover:text-white transition">
              Barat
            </button>
          </div>
        </div>

        <Card className="border border-white/10 bg-[#050505]/80 backdrop-blur-2xl shadow-[0_30px_120px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-10 space-y-6">
              <p className="text-sm uppercase tracking-[0.6em] text-gold-400">
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </p>
              <h1 className="text-4xl md:text-5xl font-serif text-white">
                You're Invited to a Luminous Celebration
              </h1>
              <p className="text-white/70 max-w-2xl text-lg">{invitationCopy.message}</p>
              <p className="text-sm uppercase tracking-[0.5em] text-gold-300">
                {invitationCopy.dressCode}
              </p>
            </div>
            <div className="relative h-72 lg:h-full">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1479708231022-4be40f711aad?auto=format&fit=crop&w=900&q=80"
                alt="Wedding ambience"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white/60 text-xs uppercase tracking-[0.4em]">Hosted by</p>
                <p className="text-2xl font-cursive text-gold-200 mt-2">
                  Talha &amp; Muskan · Yasir &amp; Shanza
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-8 md:grid-cols-2">
          {eventOrder.map((key) => {
            const detail = eventContent[key];
            return (
              <Card
                key={detail.key}
                className="overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
              >
                <div className="relative h-56">
                  <ImageWithFallback
                    src={
                      detail.key === 'reception'
                        ? 'https://images.unsplash.com/photo-1753559319967-8f959ad78b2d?auto=format&fit=crop&w=1000&q=80'
                        : 'https://images.unsplash.com/photo-1517002152503-aeda5fe2cd36?auto=format&fit=crop&w=1000&q=80'
                    }
                    alt={detail.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs uppercase tracking-[0.5em] text-white/70">
                      {detail.heroLabel}
                    </p>
                    <h2 className="text-3xl font-serif text-white">{detail.title}</h2>
                  </div>
                </div>
                <CardContent className="space-y-6 p-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-gold-300 mt-1" />
                      <div>
                        <p className="text-sm text-white/60 uppercase tracking-[0.3em]">Date & Time</p>
                        <p className="text-lg text-white">
                          {detail.date} · {detail.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gold-300 mt-1" />
                      <div>
                        <p className="text-sm text-white/60 uppercase tracking-[0.3em]">Venue</p>
                        <p className="text-lg text-white">{detail.venue.name}</p>
                        <p className="text-sm text-white/70">{detail.venue.address}</p>
                        <Button
                          variant="link"
                          className="text-gold-300 hover:text-gold-200 p-0 h-auto mt-2"
                          onClick={() => window.open(detail.venue.mapUrl, '_blank')}
                        >
                          View on Map
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <p className="text-sm text-white/60">Honoring</p>
                    <p className="text-2xl font-cursive text-white">
                      {detail.couple.groom} &amp; {detail.couple.bride}
                    </p>
                    <p className="text-xs text-white/60 mt-2">
                      {detail.couple.groomParents} · {detail.couple.brideParents}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-white/10 bg-transparent backdrop-blur-xl">
            <CardHeader>
              <div className="text-center space-y-4">
                <Heart className="w-10 h-10 text-gold-300 mx-auto fill-white/5" />
                <h3 className="text-2xl">Graceful Guidance</h3>
                <p className="text-white/70">
                  Reach out on WhatsApp for seating, entry, or timing updates. Our family desk will
                  respond promptly.
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {contactNumbers.map((entry) => (
                <Button
                  key={entry.number}
                  variant="outline"
                  className="w-full justify-between border-white/20 text-white hover:border-gold-300 hover:text-gold-200"
                  onClick={() => window.open(whatsappLink(entry.number), '_blank')}
                >
                  <span className="flex items-center gap-3">
                    <Phone className="w-4 h-4" />
                    <span className="text-left">
                      <span className="block text-xs uppercase tracking-[0.4em] text-white/50">
                        {entry.label}
                      </span>
                      <span>{entry.number}</span>
                    </span>
                  </span>
                  <span className="text-xs uppercase tracking-[0.4em] text-white/60">WhatsApp</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-white/60">
              Share this invitation
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant="outline"
                className="border border-white/30 text-white/80 hover:text-white"
                onClick={handleShareLink}
              >
                <Share2 className="mr-2 w-4 h-4" />
                Share
              </Button>
              <Button
                variant="outline"
                className="border border-white/30 text-white/80 hover:text-white"
                onClick={handleCopyLink}
              >
                {copied ? (
                  <>
                    <Check className="mr-2 w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 w-4 h-4" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>
            <code className="block w-full truncate rounded-2xl bg-black/60 px-4 py-3 text-sm border border-white/10">
              {invitationUrl}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
