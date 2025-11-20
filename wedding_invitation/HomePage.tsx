import { Heart, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { FloralDecoration } from './FloralDecoration';
import { ImageWithFallback } from './ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: 'login') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-50 via-blush-50 to-gold-50">
      <FloralDecoration position="top-left" color="text-blush-300" />
      <FloralDecoration position="bottom-right" color="text-gold-400" />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6">
            <Heart className="w-16 h-16 text-blush-500 mx-auto fill-blush-200 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl mb-4 text-gray-800">
            A Day of Love
          </h1>
          <p className="font-cursive text-3xl md:text-5xl text-blush-500 mb-6">
            Two Celebrations, One Perfect Day
          </p>
          <div className="flex items-center justify-center gap-3 text-gray-600 mb-8">
            <Calendar className="w-5 h-5 text-gold-500" />
            <span className="text-lg">June 15, 2025</span>
          </div>
          <Button 
            onClick={() => onNavigate('login')}
            className="bg-gradient-to-r from-blush-500 to-gold-500 hover:from-blush-600 hover:to-gold-600 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View Your Invitation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Reception Card */}
          <Card className="overflow-hidden border-2 border-blush-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in">
            <div className="relative h-64">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1753559319967-8f959ad78b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvcmFsJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjM1NTYzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Reception"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-3xl mb-1">Reception</h2>
                <p className="font-cursive text-xl">Emily & James</p>
              </div>
            </div>
            <CardContent className="p-6 bg-gradient-to-br from-blush-50 to-white">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blush-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="text-gray-800">June 15, 2025 | 6:00 PM - 11:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blush-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p className="text-gray-800">The Grand Ballroom</p>
                    <p className="text-sm text-gray-600">Downtown District</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-blush-100">
                  <p className="text-sm text-gray-600">
                    <span className="text-blush-600">Dress Code:</span> Black Tie Optional
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Barat Card */}
          <Card className="overflow-hidden border-2 border-gold-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative h-64">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1742240439165-60790db1ee93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwd2VkZGluZyUyMGx1eHVyeXxlbnwxfHx8fDE3NjM1NTYzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Barat"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-3xl mb-1">Barat</h2>
                <p className="font-cursive text-xl">Aisha & Rahul</p>
              </div>
            </div>
            <CardContent className="p-6 bg-gradient-to-br from-gold-50 to-white">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gold-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="text-gray-800">June 15, 2025 | 4:00 PM - 10:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p className="text-gray-800">Lotus Gardens & Banquet Hall</p>
                    <p className="text-sm text-gray-600">Garden District</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-gold-100">
                  <p className="text-sm text-gray-600">
                    <span className="text-gold-700">Dress Code:</span> Traditional Indian Attire
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-600 mb-6 text-lg">
              We are thrilled to celebrate this special day with two beautiful unions. 
              Join us for an unforgettable celebration of love, family, and new beginnings.
            </p>
            <div className="inline-flex items-center gap-2 text-blush-600 hover:text-blush-700 cursor-pointer">
              <Heart className="w-4 h-4 fill-current" />
              <span className="text-sm">With love and joy</span>
              <Heart className="w-4 h-4 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
