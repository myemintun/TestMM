import React, { useState } from 'react';
import { Sparkles, Loader2, MapPin, Calendar, DollarSign, Heart } from 'lucide-react';
import { Itinerary } from '../types';

interface AITripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItineraryGenerated: (itinerary: Itinerary) => void;
}

export const AITripModal: React.FC<AITripModalProps> = ({
  isOpen,
  onClose,
  onItineraryGenerated
}) => {
  const [destination, setDestination] = useState('Kyoto, Japan');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState('moderate');
  const [interests, setInterests] = useState('temples, bamboo forest, matcha tea houses, traditional food');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, days, budget, interests })
      });

      const data = await res.json();

      if (data.itinerary) {
        const genItinerary: Itinerary = {
          id: `ai-gen-${Date.now()}`,
          title: data.itinerary.title || `${days}-Day ${destination} Trip`,
          destination: data.itinerary.destination || destination,
          coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
          daysCount: Number(days),
          totalBudget: budget === 'luxury' ? 2500 : budget === 'budget' ? 600 : 1200,
          currency: 'USD',
          days: data.itinerary.days.map((d: any, idx: number) => ({
            dayNumber: d.dayNumber || idx + 1,
            title: d.title || `Day ${idx + 1}: ${destination} Highlights`,
            activities: (d.activities || []).map((act: any, actIdx: number) => ({
              id: `ai-act-${idx}-${actIdx}-${Date.now()}`,
              time: act.time || '10:00 AM',
              title: act.title || 'Sightseeing spot',
              category: (act.category || 'Sightseeing') as any,
              cost: act.cost || '$15',
              description: act.description || 'Explore scenic area.',
              location: act.location || destination,
              lat: act.lat || 35.0116 + (idx * 0.01),
              lng: act.lng || 135.7681 + (actIdx * 0.01),
              isCompleted: false
            }))
          }))
        };

        onItineraryGenerated(genItinerary);
        onClose();
      } else {
        setErrorMsg('Could not parse response. Please try again.');
      }
    } catch (err: any) {
      console.error('API error:', err);
      setErrorMsg('Failed to connect to itinerary generator.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#161616] rounded-3xl max-w-lg w-full p-8 border border-white/20 shadow-2xl text-white animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-3 text-white font-mono font-bold text-[10px] uppercase tracking-[0.25em]">
          <Sparkles className="w-4 h-4 text-white" />
          <span>AI TRAVEL ENGINE</span>
        </div>

        <h2 className="font-['Plus_Jakarta_Sans'] font-black text-2xl uppercase tracking-tight text-white mb-2">
          GENERATE ITINERARY
        </h2>

        <p className="text-xs font-['Space_Grotesk'] text-white/60 mb-6">
          Powered by Gemini AI. Enter your dream destination and preferences to build an optimized day-by-day plan in seconds.
        </p>

        {errorMsg && (
          <div className="p-4 bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono font-semibold rounded-xl mb-6">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-white/70 tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span>DESTINATION *</span>
            </label>
            <input
              type="text"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Kyoto, Paris, Reykjavik"
              className="w-full px-4 py-3 bg-[#222222] border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-white/70 tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-white" />
                <span>DURATION</span>
              </label>
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full px-4 py-3 bg-[#222222] border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-white"
              >
                <option value={1}>1 Day Express</option>
                <option value={3}>3 Days Classic</option>
                <option value={5}>5 Days Full Trip</option>
                <option value={7}>7 Days Exploration</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-white/70 tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-white" />
                <span>BUDGET</span>
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 bg-[#222222] border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-white"
              >
                <option value="budget">Backpacker ($)</option>
                <option value="moderate">Balanced ($$)</option>
                <option value="luxury">Luxury ($$$)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-white/70 tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-white" />
              <span>INTERESTS & VIBES</span>
            </label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g. food, museums, photography"
              className="w-full px-4 py-3 bg-[#222222] border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-white text-black font-black text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Build AI Plan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
