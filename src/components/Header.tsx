import React, { useState } from 'react';
import { NavTab } from '../types';
import { Menu, X, User, MapPin } from 'lucide-react';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenPlanner: () => void;
  isLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenAuth,
  onOpenPlanner,
  isLoggedIn = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0F0F0F]/90 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="h-20 w-full px-6 md:px-12 flex items-center justify-between mx-auto max-w-7xl">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-8">
          <button 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="h-9 w-9 bg-white rounded-full flex items-center justify-center shrink-0">
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>
            <span className="font-['Plus_Jakarta_Sans'] font-black text-2xl tracking-tighter text-white uppercase hidden sm:block">
              SEAMLESS.
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 ml-2">
            <button
              onClick={() => handleNav('travel-guides')}
              className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-all ${
                activeTab === 'travel-guides'
                  ? 'text-white border-b-2 border-white pb-1 opacity-100'
                  : 'text-white/50 hover:text-white hover:opacity-100'
              }`}
            >
              Travel Guides
            </button>
            <button
              onClick={() => handleNav('hotels')}
              className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-all ${
                activeTab === 'hotels'
                  ? 'text-white border-b-2 border-white pb-1 opacity-100'
                  : 'text-white/50 hover:text-white hover:opacity-100'
              }`}
            >
              Hotels
            </button>
            <button
              onClick={() => handleNav('itineraries')}
              className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-all ${
                activeTab === 'itineraries'
                  ? 'text-white border-b-2 border-white pb-1 opacity-100'
                  : 'text-white/50 hover:text-white hover:opacity-100'
              }`}
            >
              Itineraries
            </button>
          </nav>
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenPlanner}
            className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/10 text-white hover:bg-white hover:text-black border border-white/20 font-bold text-[10px] uppercase tracking-[0.2em] rounded-full transition-all"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>AI Trip Builder</span>
          </button>

          <div className="hidden sm:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 font-bold text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-all"
                >
                  Log in
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-5 py-2 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-neutral-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                >
                  Sign up
                </button>
              </>
            ) : (
              <span className="text-xs font-mono text-white/80 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                USER: ALEX
              </span>
            )}
          </div>

          <button
            onClick={() => onOpenAuth('login')}
            className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-all"
            title="User Profile"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F0F0F] border-b border-white/10 px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <button
            onClick={() => handleNav('home')}
            className={`text-left py-2 text-sm font-bold uppercase tracking-[0.2em] ${
              activeTab === 'home' ? 'text-white' : 'text-white/50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('travel-guides')}
            className={`text-left py-2 text-sm font-bold uppercase tracking-[0.2em] ${
              activeTab === 'travel-guides' ? 'text-white' : 'text-white/50'
            }`}
          >
            Travel Guides
          </button>
          <button
            onClick={() => handleNav('hotels')}
            className={`text-left py-2 text-sm font-bold uppercase tracking-[0.2em] ${
              activeTab === 'hotels' ? 'text-white' : 'text-white/50'
            }`}
          >
            Hotels
          </button>
          <button
            onClick={() => handleNav('itineraries')}
            className={`text-left py-2 text-sm font-bold uppercase tracking-[0.2em] ${
              activeTab === 'itineraries' ? 'text-white' : 'text-white/50'
            }`}
          >
            Itineraries
          </button>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                onOpenPlanner();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-3 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-full"
            >
              Start AI Trip Planning
            </button>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => {
                  onOpenAuth('login');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 text-center py-2.5 text-white font-bold uppercase text-xs tracking-[0.2em] border border-white/20 rounded-full"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  onOpenAuth('signup');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 text-center py-2.5 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-full"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
