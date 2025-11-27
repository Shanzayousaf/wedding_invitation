import { useState, useEffect } from 'react';
import { Toaster } from './ui/sonner';
import { HomePage } from './wedding_invitation/HomePage';
import { LoginPage } from './wedding_invitation/LoginPage';
import { InvitationPage } from './wedding_invitation/InvitationPage';
import { AdminDashboard } from './wedding_invitation/AdminDashboard';
import { BackgroundVideo } from './wedding_invitation/BackgroundVideo';

type Page = 'home' | 'login' | 'invitation' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [guestId, setGuestId] = useState<string>('');

  // Handle URL-based routing
  useEffect(() => {
    const handleRoute = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      const [route, id] = hash.split('/');

      if (route === 'invitation' && id) {
        setGuestId(id);
        setCurrentPage('invitation');
      } else if (route === 'login') {
        setCurrentPage('login');
      } else if (route === 'admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('home');
      }
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    return () => window.removeEventListener('hashchange', handleRoute);
  }, []);

  const handleNavigation = (page: Page, id?: string) => {
    if (page === 'invitation' && id) {
      window.location.hash = `invitation/${id}`;
    } else if (page === 'login') {
      window.location.hash = 'login';
    } else if (page === 'admin') {
      window.location.hash = 'admin';
    } else {
      window.location.hash = '';
    }
  };

  // Admin access - in production, this would be password-protected
  const handleAdminAccess = () => {
    handleNavigation('admin');
  };

  return (
    <div className="min-h-screen">
      {/* Bismillah Banner */}
      <header className="bg-white text-center py-6 border-b border-blush-100 shadow-sm">
        <p className="text-2xl md:text-3xl font-serif text-gray-900 tracking-wide">
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          In the name of Allah, the Most Gracious, the Most Merciful
        </p>
      </header>

      {/* Hidden admin button - click bottom right corner */}
      <button
        onClick={handleAdminAccess}
        className="fixed bottom-4 right-4 w-12 h-12 opacity-0 hover:opacity-100 transition-opacity z-50"
        aria-label="Admin Access"
        title="Admin Dashboard"
      >
        <div className="w-full h-full bg-gradient-to-br from-blush-500 to-gold-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all">
          <span className="text-white text-xs">Admin</span>
        </div>
      </button>

      {currentPage === 'home' && <HomePage onNavigate={handleNavigation} />}
      {currentPage === 'login' && <LoginPage onNavigate={handleNavigation} />}
      {currentPage === 'invitation' && guestId && (
        <InvitationPage guestId={guestId} onNavigate={handleNavigation} />
      )}
      {currentPage === 'admin' && <AdminDashboard onNavigate={handleNavigation} />}
      
      <Toaster position="top-center" richColors />
    </div>
  );
}