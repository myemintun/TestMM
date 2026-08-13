import React from 'react';
import { X, Smartphone, QrCode, CheckCircle2 } from 'lucide-react';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#161616] rounded-3xl max-w-md w-full p-8 border border-white/20 shadow-2xl text-white animate-in zoom-in-95 duration-150 relative text-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mx-auto mb-4 border border-white/20">
          <Smartphone className="w-6 h-6" />
        </div>

        <h2 className="font-['Plus_Jakarta_Sans'] font-black text-2xl uppercase tracking-tight text-white mb-2">
          GET THE SEAMLESS APP
        </h2>

        <p className="text-xs font-['Space_Grotesk'] text-white/60 mb-6 leading-relaxed">
          Take your offline maps, real-time GPS route navigation, and expense splitters on iOS & Android.
        </p>

        {/* QR Code Container */}
        <div className="bg-[#222222] p-6 rounded-2xl border border-white/20 inline-block mb-6 shadow-inner">
          <QrCode className="w-28 h-28 text-white mx-auto mb-3" />
          <div className="text-[10px] font-mono font-bold text-white/70 uppercase tracking-widest">
            SCAN TO DOWNLOAD
          </div>
        </div>

        <div className="space-y-2.5 text-left text-xs font-['Space_Grotesk'] text-white/70 mb-6 bg-[#222222] p-4 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
            <span>100% Offline Map Sync for international travel</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
            <span>Instant booking confirmation import from Gmail</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
            <span>Collaborative real-time editing with travel buddies</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all cursor-pointer"
        >
          GOT IT
        </button>
      </div>
    </div>
  );
};
