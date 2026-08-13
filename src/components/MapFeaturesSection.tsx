import React, { useState } from 'react';
import { InteractiveMap } from './InteractiveMap';

interface MapFeaturesSectionProps {
  onSelectFeature?: (featureIndex: number) => void;
  onOpenPlanner?: () => void;
}

export const MapFeaturesSection: React.FC<MapFeaturesSectionProps> = ({
  onOpenPlanner
}) => {
  const [activeOverlayIndex, setActiveOverlayIndex] = useState(0);

  // Map markers for Tokyo demonstration
  const tokyoMarkers = [
    { id: 'meiji', lat: 35.6764, lng: 139.6993, title: '10:00 AM - Meiji Shrine', subtitle: 'Harajuku Shrine Garden', category: 'Culture', isHighlighted: activeOverlayIndex === 0 },
    { id: 'ichiran', lat: 35.6601, lng: 139.7001, title: '12:30 PM - Ichiran Ramen', subtitle: 'Lunch in Shibuya', category: 'Dining', isHighlighted: activeOverlayIndex === 1 },
    { id: 'shibuya', lat: 35.6595, lng: 139.7004, title: 'Shibuya Scramble', subtitle: 'Famous Intersection', category: 'Sightseeing' },
    { id: 'shinjuku', lat: 35.6938, lng: 139.7034, title: 'Shinjuku Gyoen', subtitle: 'Botanical Garden', category: 'Sightseeing' },
    { id: 'nakano', lat: 35.7058, lng: 139.6658, title: 'Nakano Broadway', subtitle: 'Shopping Street', category: 'Shopping' }
  ];

  return (
    <section className="w-full px-6 md:px-12 py-16 md:py-24 bg-[#0F0F0F] border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Features */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/60">
                INTEGRATED MAP VIEW
              </span>
            </div>

            <h2 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-4">
              YOUR ITINERARY & YOUR MAP IN <span className="text-[#3D3D3D]">ONE VIEW.</span>
            </h2>
            
            <p className="font-['Space_Grotesk'] text-sm md:text-base text-white/60 mb-8 leading-relaxed">
              No more switching between different apps, tabs, and tools. Visualize your entire journey on a high-contrast interactive map.
            </p>

            <div className="flex flex-col gap-4">
              {/* Feature Item 1 */}
              <div 
                onClick={() => setActiveOverlayIndex(0)}
                className={`flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all ${
                  activeOverlayIndex === 0 
                    ? 'bg-[#222222] border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                    : 'bg-[#161616] border border-white/10 hover:border-white/30'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 font-bold">
                  <span className="material-symbols-outlined text-[20px]">touch_app</span>
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-black text-sm uppercase tracking-wide text-white">
                    ONE TAP FROM SUGGESTED ACTIVITY
                  </h3>
                  <p className="font-['Space_Grotesk'] text-xs text-white/60 mt-1 leading-normal">
                    Seamlessly transition from a suggested location to live booking links and map coordinates.
                  </p>
                </div>
              </div>

              {/* Feature Item 2 */}
              <div 
                onClick={() => setActiveOverlayIndex(1)}
                className={`flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all ${
                  activeOverlayIndex === 1 
                    ? 'bg-[#222222] border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                    : 'bg-[#161616] border border-white/10 hover:border-white/30'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 font-bold">
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-black text-sm uppercase tracking-wide text-white">
                    PERSONALIZED ITINERARIES IN MINUTES
                  </h3>
                  <p className="font-['Space_Grotesk'] text-xs text-white/60 mt-1 leading-normal">
                    Get custom day-by-day plans tailored to your interests, pace, and destination.
                  </p>
                </div>
              </div>

              {/* Feature Item 3 */}
              <div 
                onClick={() => setActiveOverlayIndex(2)}
                className={`flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all ${
                  activeOverlayIndex === 2 
                    ? 'bg-[#222222] border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                    : 'bg-[#161616] border border-white/10 hover:border-white/30'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-green-500 text-black flex items-center justify-center shrink-0 font-bold">
                  <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-black text-sm uppercase tracking-wide text-white">
                    BUDGET-AWARE PLANNING & TRACKING
                  </h3>
                  <p className="font-['Space_Grotesk'] text-xs text-white/60 mt-1 leading-normal">
                    Keep track of costs and split expenses effortlessly while building your trip.
                  </p>
                </div>
              </div>
            </div>

            {onOpenPlanner && (
              <button
                onClick={onOpenPlanner}
                className="mt-8 self-start inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.25em] text-white hover:text-white/80 transition-colors group"
              >
                <span>OPEN INTERACTIVE ITINERARIES</span>
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            )}
          </div>

          {/* Right Column: Map Preview with Floating Cards */}
          <div className="w-full md:w-1/2 relative">
            {/* Subtle glow border */}
            <div className="absolute -inset-1 bg-white/10 rounded-3xl blur-md z-0 pointer-events-none" />

            <div className="relative z-10 w-full h-[520px] rounded-3xl shadow-2xl overflow-hidden border border-white/15 bg-[#121212]">
              
              {/* Floating Itinerary Overlay Cards matching dark theme */}
              <div className="absolute top-5 left-5 z-20 flex flex-col gap-3 max-w-[220px] pointer-events-auto">
                <div 
                  onClick={() => setActiveOverlayIndex(0)}
                  className={`p-3.5 rounded-xl border backdrop-blur-md cursor-pointer transition-all ${
                    activeOverlayIndex === 0 
                      ? 'bg-[#181818]/95 border-white text-white shadow-lg' 
                      : 'bg-[#121212]/80 border-white/10 text-white/70 hover:border-white/30'
                  }`}
                >
                  <div className="font-mono font-bold text-xs text-white uppercase tracking-wider">
                    DAY 1: SHIBUYA
                  </div>
                  <div className="text-[11px] text-white/60 mt-1">
                    10:00 AM - Meiji Shrine
                  </div>
                </div>

                <div 
                  onClick={() => setActiveOverlayIndex(1)}
                  className={`p-3.5 rounded-xl border backdrop-blur-md cursor-pointer transition-all ${
                    activeOverlayIndex === 1 
                      ? 'bg-[#181818]/95 border-white text-white shadow-lg' 
                      : 'bg-[#121212]/80 border-white/10 text-white/70 hover:border-white/30'
                  }`}
                >
                  <div className="font-mono font-bold text-xs text-white uppercase tracking-wider">
                    12:30 PM - LUNCH
                  </div>
                  <div className="text-[11px] text-white/60 mt-1">
                    Ichiran Ramen
                  </div>
                </div>
              </div>

              {/* Interactive Leaflet Map */}
              <InteractiveMap 
                centerLat={35.6762} 
                centerLng={139.6503} 
                zoom={12} 
                markers={tokyoMarkers}
                className="w-full h-full"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
