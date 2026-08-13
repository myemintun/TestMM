import React from 'react';

interface HeroSectionProps {
  onStartPlanning: () => void;
  onGetApp: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartPlanning,
  onGetApp
}) => {
  return (
    <section className="relative w-full pt-32 pb-20 md:pt-44 md:pb-32 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden bg-[#0F0F0F]">
      {/* Decorative Overlay Grid Line / Map Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay" 
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuArHtlfQmvXLQvYRhrzmS5eWdslRv7tgnWcEstEU_u1CHkZGX_R_s5ALOo4At7prhxdQVoTtsA4X5Qs7LAJWlAT2pKEvCMyJDN02o4U-qU4KNNUopJcXxyOTuOhUjJF-Xz_mMHLzkNCEWZ38OZjrNtobOHg505UV1ft7yQiodraPyA9mIhpmnzxGmThX5kMvga_2VOwlX2z7pBcSuesNHRiQZpbIj9296hgpijMCXXfPhXRL5XS15cA')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Eyebrow badge line */}
        <div className="flex items-center gap-4 mb-8 animate-in fade-in duration-500">
          <span className="h-[1px] w-12 bg-white/30" />
          <span className="text-[11px] uppercase tracking-[0.35em] font-bold text-white/70">
            SEAMLESS TRAVEL PLATFORM
          </span>
          <span className="h-[1px] w-12 bg-white/30" />
        </div>

        {/* Display Headline - Bold Typography Theme */}
        <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-[-0.05em] uppercase leading-[0.88] max-w-5xl mb-8">
          ONE APP FOR ALL YOUR <span className="text-[#3D3D3D]">TRAVEL NEEDS.</span>
        </h1>

        {/* Subtitle */}
        <p className="font-['Space_Grotesk'] text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mb-10 leading-relaxed tracking-wide uppercase font-medium">
          Create detailed itineraries, explore user-shared guides, and manage your bookings seamlessly — all in one view.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto items-center">
          <button 
            onClick={onStartPlanning}
            className="w-full sm:w-auto inline-flex justify-center items-center px-10 py-4 bg-white text-black font-black uppercase text-xs tracking-[0.25em] rounded-full hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-95 cursor-pointer"
          >
            Start Planning
          </button>
          <button 
            onClick={onGetApp}
            className="w-full sm:w-auto inline-flex justify-center items-center px-10 py-4 bg-transparent border border-white/20 text-white font-bold uppercase text-xs tracking-[0.25em] rounded-full hover:bg-white hover:text-black transition-all duration-300 active:scale-95 cursor-pointer"
          >
            Get the App
          </button>
        </div>
      </div>
    </section>
  );
};
