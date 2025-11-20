import { useState } from 'react';
import { Mail, Lock, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { FloralDecoration } from './FloralDecoration';
import { getGuestById } from '../Data/mockData';
import { toast } from 'sonner';

interface LoginPageProps {
  onNavigate: (page: 'home' | 'invitation', guestId?: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [invitationId, setInvitationId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const guest = getGuestById(invitationId);
      
      if (guest) {
        toast.success(`Welcome, ${guest.name}!`);
        onNavigate('invitation', invitationId);
      } else {
        toast.error('Invalid invitation ID. Please check and try again.');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-50 via-blush-50 to-gold-50 flex items-center justify-center p-4">
      <FloralDecoration position="top-left" color="text-blush-300" />
      <FloralDecoration position="bottom-right" color="text-gold-400" />
      
      <div className="w-full max-w-md animate-fade-in">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Home
        </Button>

        <Card className="shadow-2xl border-2 border-blush-200/50 backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center pb-8">
            <div className="inline-block mx-auto mb-4 p-3 bg-gradient-to-br from-blush-100 to-gold-100 rounded-full">
              <Mail className="w-8 h-8 text-blush-600" />
            </div>
            <CardTitle className="text-3xl text-gray-800">
              Your Personal Invitation
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Enter your unique invitation ID to view your personalized details
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="invitationId" className="text-gray-700">
                  Invitation ID
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="invitationId"
                    type="text"
                    placeholder="e.g., REC001 or BAR001"
                    value={invitationId}
                    onChange={(e) => setInvitationId(e.target.value.toUpperCase())}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blush-400 transition-colors"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  You can find your invitation ID in the email or card we sent you
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-blush-500 to-gold-500 hover:from-blush-600 hover:to-gold-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <span className="animate-pulse">Verifying...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 w-5 h-5" />
                    View My Invitation
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-center text-gray-600">
                Need help? Contact us at{' '}
                <a href="mailto:support@weddingday.com" className="text-blush-600 hover:text-blush-700">
                  support@weddingday.com
                </a>
              </p>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blush-50 to-gold-50 rounded-lg border border-blush-200">
              <p className="text-xs text-gray-600 mb-2">
                <span className="font-semibold">Demo IDs to try:</span>
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/80 p-2 rounded border border-blush-200">
                  <span className="text-blush-600">REC001</span> - Reception Guest
                </div>
                <div className="bg-white/80 p-2 rounded border border-gold-300">
                  <span className="text-gold-700">BAR001</span> - Barat Guest
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
