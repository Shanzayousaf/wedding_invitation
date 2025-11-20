import { useState } from 'react';
import { ArrowLeft, Check, X, Users, Utensils } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Input } from './ui/input';
import { FloralDecoration } from './wedding_invitation/FloralDecoration';
import { updateGuestRSVP } from './Data/mockData';
import { Guest, EventDetails } from './Types/guest';
import { toast } from 'sonner';

interface RSVPFormProps {
  guest: Guest;
  event: EventDetails;
  onBack: () => void;
  onUpdate: (updatedGuest: Guest) => void;
}

export function RSVPForm({ guest, event, onBack, onUpdate }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    rsvpStatus: guest.rsvpStatus,
    numberOfGuests: guest.numberOfGuests.toString(),
    dietaryRestrictions: guest.dietaryRestrictions || '',
    message: guest.message || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventColor = guest.eventType === 'reception' ? 'blush' : 'gold';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const updatedGuest = updateGuestRSVP(guest.id, {
        rsvpStatus: formData.rsvpStatus as 'attending' | 'declined' | 'pending',
        numberOfGuests: formData.rsvpStatus === 'attending' ? parseInt(formData.numberOfGuests) : 0,
        dietaryRestrictions: formData.rsvpStatus === 'attending' ? formData.dietaryRestrictions : undefined,
        message: formData.message,
      });

      if (updatedGuest) {
        toast.success(
          formData.rsvpStatus === 'attending' 
            ? "Thank you! We can't wait to celebrate with you!" 
            : "Thank you for letting us know. You'll be missed!"
        );
        onUpdate(updatedGuest);
        onBack();
      }
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-ivory-50 via-${eventColor}-50 to-${eventColor}-100`}>
      <FloralDecoration position="top-left" color={`text-${eventColor}-300`} />
      <FloralDecoration position="bottom-right" color={`text-${eventColor}-400`} />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Invitation
        </Button>

        <Card className={`shadow-2xl border-2 border-${eventColor}-200 animate-fade-in`}>
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl text-gray-800">RSVP Response</CardTitle>
            <p className="text-gray-600 mt-2">
              Please let us know if you can join us for the {event.type}
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* RSVP Status */}
              <div className="space-y-3">
                <Label className="text-base text-gray-700">Will you be attending?</Label>
                <RadioGroup
                  value={formData.rsvpStatus}
                  onValueChange={(value) => setFormData({ ...formData, rsvpStatus: value })}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem value="attending" id="attending" className="peer sr-only" />
                    <Label
                      htmlFor="attending"
                      className={`flex flex-col items-center justify-center gap-3 p-6 border-2 rounded-lg cursor-pointer transition-all peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-50 hover:border-${eventColor}-300`}
                    >
                      <Check className="w-8 h-8 text-green-600" />
                      <span className="text-gray-700">Joyfully Accept</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="declined" id="declined" className="peer sr-only" />
                    <Label
                      htmlFor="declined"
                      className={`flex flex-col items-center justify-center gap-3 p-6 border-2 rounded-lg cursor-pointer transition-all peer-data-[state=checked]:border-red-500 peer-data-[state=checked]:bg-red-50 hover:border-${eventColor}-300`}
                    >
                      <X className="w-8 h-8 text-red-600" />
                      <span className="text-gray-700">Regretfully Decline</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Conditional fields for attending */}
              {formData.rsvpStatus === 'attending' && (
                <>
                  {/* Number of Guests */}
                  <div className="space-y-2">
                    <Label htmlFor="numberOfGuests" className="text-gray-700">
                      <Users className="inline w-4 h-4 mr-2" />
                      Number of Guests
                    </Label>
                    <Input
                      id="numberOfGuests"
                      type="number"
                      min="1"
                      max={guest.plusOne ? "5" : "1"}
                      value={formData.numberOfGuests}
                      onChange={(e) => setFormData({ ...formData, numberOfGuests: e.target.value })}
                      className="h-12"
                      required
                    />
                    <p className="text-xs text-gray-500">
                      {guest.plusOne 
                        ? 'You are welcome to bring additional guests (up to 5 total)'
                        : 'This invitation is for one guest only'}
                    </p>
                  </div>

                  {/* Dietary Restrictions */}
                  <div className="space-y-2">
                    <Label htmlFor="dietary" className="text-gray-700">
                      <Utensils className="inline w-4 h-4 mr-2" />
                      Dietary Restrictions (Optional)
                    </Label>
                    <Input
                      id="dietary"
                      type="text"
                      placeholder="e.g., Vegetarian, Gluten-free, Allergies"
                      value={formData.dietaryRestrictions}
                      onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </>
              )}

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-700">
                  Message to the Couple (Optional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Share your wishes, memories, or let us know of any special requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full h-14 bg-gradient-to-r from-${eventColor}-500 to-${eventColor}-600 hover:from-${eventColor}-600 hover:to-${eventColor}-700 text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Submitting Response...</span>
                  ) : (
                    'Submit RSVP'
                  )}
                </Button>
              </div>
            </form>

            <div className={`mt-6 p-4 bg-${eventColor}-50 rounded-lg border border-${eventColor}-200`}>
              <p className="text-xs text-gray-600 text-center">
                You can update your RSVP anytime before the event by logging in with your invitation ID
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
