import React, { useState } from 'react';
import { X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalPolicy, setModalPolicy] = useState<'privacy' | 'terms' | 'support' | null>(null);

  return (
    <>
      <footer className="w-full bg-[#0F0F0F] py-8 border-t border-white/10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/50 text-xs font-mono uppercase tracking-widest">
            © 2024 SEAMLESS TRAVEL PLATFORM. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8">
            <button 
              onClick={() => setModalPolicy('privacy')}
              className="text-white/50 hover:text-white font-bold text-xs uppercase tracking-[0.2em] transition-colors"
            >
              Privacy
            </button>
            <button 
              onClick={() => setModalPolicy('terms')}
              className="text-white/50 hover:text-white font-bold text-xs uppercase tracking-[0.2em] transition-colors"
            >
              Terms
            </button>
            <button 
              onClick={() => setModalPolicy('support')}
              className="text-white/50 hover:text-white font-bold text-xs uppercase tracking-[0.2em] transition-colors"
            >
              Support
            </button>
          </div>
        </div>
      </footer>

      {/* Policy / Support Modal */}
      {modalPolicy && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161616] rounded-3xl max-w-lg w-full p-8 border border-white/20 shadow-2xl text-white animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-5">
              <h3 className="font-['Plus_Jakarta_Sans'] font-black text-lg text-white uppercase tracking-tight">
                {modalPolicy === 'privacy' && 'Privacy Policy'}
                {modalPolicy === 'terms' && 'Terms of Service'}
                {modalPolicy === 'support' && 'Travel Support Center'}
              </h3>
              <button 
                onClick={() => setModalPolicy(null)}
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="font-['Space_Grotesk'] text-sm text-white/70 space-y-4 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              {modalPolicy === 'privacy' && (
                <>
                  <p>Your privacy is paramount. Seamless Travel Planner stores your trip itineraries securely to enable multi-device sync and offline maps access.</p>
                  <p>We do not sell or share personal travel routes or booking history with third-party advertisers without explicit consent.</p>
                </>
              )}
              {modalPolicy === 'terms' && (
                <>
                  <p>By utilizing Seamless Travel Planner services, you agree to fair usage policies regarding travel guide downloads and automated route optimizations.</p>
                  <p>All third-party booking references are subject to respective airline, hotel, and activity vendor guidelines.</p>
                </>
              )}
              {modalPolicy === 'support' && (
                <>
                  <p>Need assistance with your itinerary or account sync? Our support team is available 24/7.</p>
                  <p className="font-bold text-white uppercase font-mono">Email: support@seamlesstravel.app</p>
                  <p className="text-xs text-white/50">Live chat support is active within the mobile app and web dashboard.</p>
                </>
              )}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setModalPolicy(null)}
                className="px-6 py-2.5 bg-white text-black font-black text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
