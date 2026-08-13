import React, { useState } from 'react';
import { X, Check, Mail, Lock, User as UserIcon } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onLoginSuccess: (userName: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('traveler@wanderlog.app');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Alex Turner');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(mode === 'signup' ? name || 'Traveler' : 'Alex Turner');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#161616] rounded-3xl max-w-md w-full p-8 border border-white/20 shadow-2xl text-white animate-in zoom-in-95 duration-150 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <img
            alt="Logo"
            className="h-8 w-auto object-contain invert brightness-200"
            src="https://lh3.googleusercontent.com/aida/AP1WRLsK5oemuOtMg8dwC0Ve_CyytcT-MP_xBLjLHIoZa-uZYIDXll8669bAIHmJLy41trL3VF9BLnODZQirx1tm-piXn3gwcI6Oed__lHbn88Nk5lERmHEpirSsKD121LxzOf9j2HsPORlG3VBs95ue3TOQkyrgLskett2kHuJCuonMxg6mLr6XLxpwok0yA4W3LeYcIaAhr4Y6aDd6ZZ6Dr_kRXtKlOYbyG02Ztru4n5PIs0zuTQsVDR3lR_w"
          />
          <span className="font-['Plus_Jakarta_Sans'] font-black text-xl text-white uppercase tracking-tight">
            SEAMLESS
          </span>
        </div>

        <h2 className="font-['Plus_Jakarta_Sans'] font-black text-2xl text-white uppercase tracking-tight mb-2">
          {mode === 'login' ? 'WELCOME BACK' : 'CREATE FREE ACCOUNT'}
        </h2>
        <p className="text-xs font-['Space_Grotesk'] text-white/60 mb-6">
          {mode === 'login'
            ? 'Access your saved travel guides, offline maps, and trips.'
            : 'Join over 1 million travelers planning seamless journeys.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-[10px] uppercase font-bold text-white/70 tracking-widest mb-1.5">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Turner"
                  className="w-full pl-11 pr-4 py-3 bg-[#222222] border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase font-bold text-white/70 tracking-widest mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#222222] border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-white/70 tracking-widest mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#222222] border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all cursor-pointer mt-2"
          >
            {mode === 'login' ? 'LOG IN' : 'SIGN UP FREE'}
          </button>
        </form>

        <div className="mt-8 text-center pt-4 border-t border-white/10">
          <p className="text-xs text-white/60 font-['Space_Grotesk']">
            {mode === 'login' ? "Don't have an account?" : 'Already registered?'}{' '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="font-bold text-white underline hover:text-white/80 uppercase tracking-wider"
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
