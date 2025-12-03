import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, MapPin, Heart, ExternalLink, User, Users, CheckCircle2, XCircle, Clock, Share2, Copy, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { FloralDecoration } from './FloralDecoration';
import { ImageWithFallback } from './ImageWithFallback';
import { getGuestById, eventDetails, buildInvitationUrl } from '../Data/mockData';
import { Guest } from '../Types/guest';
import { RSVPForm } from '../RSVP-form';
import { CelebrationOverview } from './CelebrationOverview';
import { DancingCoupleBackground } from './DancingCoupleBackground';

// Helper function to parse name and parent info
const parseNameAndParent = (fullName: string) => {
  const match = fullName.match(/^(.+?)\s*\((.+)\)$/);
  if (match) {
    return { name: match[1].trim(), parent: `(${match[2]})` };
  }
  return { name: fullName, parent: '' };
};

interface InvitationPageProps {
  guestId: string;
  onNavigate: (page: 'home' | 'login') => void;
}

export function InvitationPage({ guestId, onNavigate }: InvitationPageProps) {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [showRSVP, setShowRSVP] = useState(false);
  const [copied, setCopied] = useState(false);
  const invitationUrl = buildInvitationUrl(guestId);

  useEffect(() => {
    const guestData = getGuestById(guestId);
    if (guestData) {
      setGuest(guestData);
    }
  }, [guestId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Wedding Invitation',
        text: 'You are invited to our wedding!',
        url: invitationUrl,
      });
    } else {
      handleCopyLink();
    }
  };

  if (!guest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ivory-50 via-blush-50 to-gold-50 flex items-center justify-center">
        <p className="text-gray-600">Loading your invitation...</p>
      </div>
    );
  }

  const event = eventDetails[guest.eventType];
  const eventColor = guest.eventType === 'reception' ? 'blush' : 'gold';
  const eventImageUrl = guest.eventType === 'reception' 
    ? 'https://images.unsplash.com/photo-1753559319967-8f959ad78b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvcmFsJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjM1NTYzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    : 'https://images.unsplash.com/photo-1517002152503-aeda5fe2cd36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVzaCUyMHdlZGRpbmclMjBmbG93ZXJzfGVufDF8fHx8MTc2MzU1NjM0MHww&ixlib=rb-4.1.0&q=80&w=1080';

  const getRSVPStatusIcon = () => {
    switch (guest.rsvpStatus) {
      case 'attending':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'declined':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getRSVPStatusText = () => {
    switch (guest.rsvpStatus) {
      case 'attending':
        return 'Confirmed';
      case 'declined':
        return 'Declined';
      default:
        return 'Pending';
    }
  };

  const getRSVPStatusColor = () => {
    switch (guest.rsvpStatus) {
      case 'attending':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'declined':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  if (showRSVP) {
    return (
      <RSVPForm 
        guest={guest} 
        event={event} 
        onBack={() => setShowRSVP(false)}
        onUpdate={(updatedGuest) => setGuest(updatedGuest)}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-ivory-50 via-${eventColor}-50 to-${eventColor}-100 relative`}>
      <DancingCoupleBackground />
      <FloralDecoration position="top-left" color={`text-${eventColor}-300`} />
      <FloralDecoration position="bottom-right" color={`text-${eventColor}-400`} />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Home
        </Button>

        <CelebrationOverview />

        <div className="mt-16 max-w-4xl mx-auto">
        {/* Invitation Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Badge variant="outline" className={`mb-4 px-4 py-1 border-2 ${getRSVPStatusColor()}`}>
            <span className="flex items-center gap-2">
              {getRSVPStatusIcon()}
              RSVP Status: {getRSVPStatusText()}
            </span>
          </Badge>
          <h1 className="text-4xl md:text-6xl mb-4 text-gray-800">
            You're Invited!
          </h1>
          <p className="text-lg text-gray-600">
            Dear <span className={`text-${eventColor}-600`}>{guest.name}</span>,
          </p>
          <p className="text-gray-600 mt-2">
            We are delighted to invite you to celebrate with us
          </p>
        </div>

        {/* Event Details Card */}
        <Card className={`mb-8 overflow-hidden border-2 border-${eventColor}-200 shadow-2xl animate-fade-in`} style={{ animationDelay: '0.2s' }}>
          <div className="relative h-64 md:h-80">
            <ImageWithFallback
              src={eventImageUrl}
              alt={event.type}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
              <h2 className="text-4xl md:text-5xl mb-4">
                {event.type === 'reception' ? 'Wedding Reception' : 'Barat Ceremony'}
              </h2>
              {event.type === 'barat' || event.type === 'reception' ? (
                <div className="font-cursive text-2xl md:text-4xl px-4">
                  <p>{parseNameAndParent(event.couple.groom).name} weds {parseNameAndParent(event.couple.bride).name}</p>
                  <p className="text-lg md:text-2xl mt-2">
                    {parseNameAndParent(event.couple.groom).parent} & {parseNameAndParent(event.couple.bride).parent}
                  </p>
                </div>
              ) : (
                <>
                  <p className="font-cursive text-3xl md:text-5xl mb-2">
                    {event.couple.bride}
                  </p>
                  <Heart className="w-8 h-8 my-2 fill-white animate-pulse" />
                  <p className="font-cursive text-3xl md:text-5xl">
                    {event.couple.groom}
                  </p>
                </>
              )}
            </div>
          </div>

          <CardContent className={`p-8 bg-gradient-to-br from-${eventColor}-50 to-white`}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-${eventColor}-100 rounded-full flex-shrink-0`}>
                    <Calendar className={`w-6 h-6 text-${eventColor}-600`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                    <p className="text-gray-800">{event.date}</p>
                    <p className="text-gray-700">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-${eventColor}-100 rounded-full flex-shrink-0`}>
                    <MapPin className={`w-6 h-6 text-${eventColor}-600`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Venue</p>
                    <p className="text-gray-800">{event.venue.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{event.venue.address}</p>
                    <Button
                      variant="link"
                      className={`text-${eventColor}-600 hover:text-${eventColor}-700 p-0 h-auto mt-2`}
                      onClick={() => window.open(event.venue.mapUrl, '_blank')}
                    >
                      View on Map
                      <ExternalLink className="ml-1 w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className={`p-4 bg-${eventColor}-100 rounded-lg border border-${eventColor}-200`}>
                  <p className="text-sm text-gray-600 mb-2">Your Invitation Details</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <User className="w-4 h-4" />
                      <span>Invitation ID: <span className={`text-${eventColor}-700`}>{guest.id}</span></span>
                    </div>
                    {guest.plusOne && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users className="w-4 h-4" />
                        <span>Plus one allowed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Button
                onClick={() => setShowRSVP(true)}
                className={`w-full h-14 bg-gradient-to-r from-${eventColor}-500 to-${eventColor}-600 hover:from-${eventColor}-600 hover:to-${eventColor}-700 text-white shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                {guest.rsvpStatus === 'pending' ? 'Respond to Invitation' : 'Update RSVP'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Personal Message */}
        <Card className="animate-fade-in border-gray-200 shadow-lg" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <div className="text-center">
              <Heart className={`w-10 h-10 text-${eventColor}-500 mx-auto mb-4 fill-${eventColor}-100`} />
              <h3 className="text-2xl text-gray-800 mb-2">We Can't Wait to Celebrate With You!</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Your presence would mean the world to us as we embark on this beautiful journey. 
                Please let us know if you can join us in making this day even more special.
              </p>
            </div>
          </CardHeader>
        </Card>

        {/* Share and Copy Link */}
        <div className="text-center mt-8 space-y-4">
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              className={`border-2 border-${eventColor}-300 text-${eventColor}-700 hover:bg-${eventColor}-50`}
              onClick={handleShareLink}
            >
              <Share2 className="mr-2 w-4 h-4" />
              Share Invitation
            </Button>
            <Button
              variant="outline"
              className={`border-2 border-${eventColor}-300 text-${eventColor}-700 hover:bg-${eventColor}-50`}
              onClick={handleCopyLink}
            >
              {copied ? (
                <>
                  <Check className="mr-2 w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 w-4 h-4" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
          
          <div className={`p-4 bg-${eventColor}-50 rounded-lg border border-${eventColor}-200 max-w-2xl mx-auto`}>
            <p className="text-xs text-gray-600 mb-2">Your unique invitation link:</p>
            <code className="text-sm text-gray-800 bg-white px-3 py-2 rounded border border-gray-200 block break-all">
              {invitationUrl}
            </code>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
