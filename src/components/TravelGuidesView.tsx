import React, { useState } from 'react';
import { MOCK_GUIDES } from '../data/mockData';
import { TravelGuide } from '../types';
import { Search, Star, MapPin, Bookmark, Check, Sparkles, Plus } from 'lucide-react';

interface TravelGuidesViewProps {
  onImportGuideToItinerary: (guide: TravelGuide) => void;
}

export const TravelGuidesView: React.FC<TravelGuidesViewProps> = ({
  onImportGuideToItinerary
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedGuide, setSelectedGuide] = useState<TravelGuide | null>(null);
  const [importedGuides, setImportedGuides] = useState<string[]>([]);

  const allTags = ['All', 'Must-See', 'Foodie', 'Culture', 'Romance', 'Nature', 'Skyline'];

  const filteredGuides = MOCK_GUIDES.filter((g) => {
    const matchesSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || g.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleImport = (guide: TravelGuide) => {
    onImportGuideToItinerary(guide);
    if (!importedGuides.includes(guide.id)) {
      setImportedGuides([...importedGuides, guide.id]);
    }
  };

  return (
    <div className="w-full pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Title & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>COMMUNITY GUIDES</span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
            EXPLORE <span className="text-[#3D3D3D]">TRAVEL GUIDES.</span>
          </h1>
          <p className="text-sm font-['Space_Grotesk'] text-white/60 mt-2">
            Discover real itineraries crafted by travel bloggers, locals, and experienced globetrotters.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destination, author..."
            className="w-full pl-11 pr-4 py-3 bg-[#161616] border border-white/20 rounded-full text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-3 mb-10">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              selectedTag === tag
                ? 'bg-white text-black font-black'
                : 'bg-[#161616] text-white/60 border border-white/10 hover:border-white/30'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuides.map((guide) => {
          const isImported = importedGuides.includes(guide.id);

          return (
            <div
              key={guide.id}
              className="bg-[#161616] rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all flex flex-col group text-white"
            >
              <div className="relative h-52 overflow-hidden bg-black/40">
                <img
                  src={guide.coverImage}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                  <span>{guide.rating}</span>
                  <span className="text-[10px] text-white/50">({guide.reviewsCount})</span>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-white" />
                  <span>{guide.destination}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Author */}
                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src={guide.authorAvatar}
                      alt={guide.author}
                      className="w-6 h-6 rounded-full object-cover border border-white/20"
                    />
                    <span className="text-xs font-mono text-white/60">{guide.author}</span>
                  </div>

                  <h3 className="font-['Plus_Jakarta_Sans'] font-black text-lg text-white mb-2 uppercase tracking-tight group-hover:text-white/80 transition-colors">
                    {guide.title}
                  </h3>

                  <p className="text-xs font-['Space_Grotesk'] text-white/60 leading-relaxed mb-4 line-clamp-2">
                    {guide.snippet}
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {guide.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/80 text-[10px] font-mono font-bold uppercase rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedGuide(guide)}
                    className="text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white transition-colors"
                  >
                    Read ({guide.locationCount} spots)
                  </button>

                  <button
                    onClick={() => handleImport(guide)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      isImported
                        ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                        : 'bg-white text-black hover:bg-neutral-200'
                    }`}
                  >
                    {isImported ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Import</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guide Detail Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161616] rounded-3xl max-w-2xl w-full overflow-hidden border border-white/20 shadow-2xl text-white animate-in zoom-in-95 duration-200">
            <div className="relative h-60 bg-black/50">
              <img src={selectedGuide.coverImage} alt={selectedGuide.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedGuide(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-black font-bold border border-white/20"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-white uppercase border border-white/20">
                📍 {selectedGuide.destination}
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-2 mb-3">
                <img src={selectedGuide.authorAvatar} alt={selectedGuide.author} className="w-7 h-7 rounded-full object-cover border border-white/20" />
                <span className="text-xs font-mono text-white/70">BY {selectedGuide.author}</span>
                <span className="text-xs text-white/50">· ⭐ {selectedGuide.rating} ({selectedGuide.reviewsCount} reviews)</span>
              </div>

              <h2 className="font-['Plus_Jakarta_Sans'] font-black text-2xl uppercase tracking-tight text-white mb-3">
                {selectedGuide.title}
              </h2>

              <p className="text-sm font-['Space_Grotesk'] text-white/70 leading-relaxed mb-6">
                {selectedGuide.snippet}
              </p>

              <div className="mb-8">
                <div className="text-xs font-mono uppercase font-bold text-white/50 tracking-widest mb-3">KEY FEATURED SPOTS ({selectedGuide.highlights.length}):</div>
                <div className="grid grid-cols-2 gap-3">
                  {selectedGuide.highlights.map((spot, i) => (
                    <div key={i} className="p-3 bg-[#222222] border border-white/10 rounded-xl text-xs font-semibold text-white flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-white text-black text-[11px] flex items-center justify-center shrink-0 font-black">{i + 1}</span>
                      <span className="truncate">{spot}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleImport(selectedGuide);
                    setSelectedGuide(null);
                  }}
                  className="px-6 py-2.5 bg-white text-black font-black text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 cursor-pointer"
                >
                  Import All {selectedGuide.locationCount} Spots
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
