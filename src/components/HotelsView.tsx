import React, { useState } from 'react';
import { MOCK_HOTELS } from '../data/mockData';
import { Hotel } from '../types';
import { Search, Star, MapPin, Building, Check, Wifi, Coffee, ExternalLink } from 'lucide-react';
import { InteractiveMap } from './InteractiveMap';

interface HotelsViewProps {
  onAddHotelToItinerary: (hotel: Hotel) => void;
}

export const HotelsView: React.FC<HotelsViewProps> = ({
  onAddHotelToItinerary
}) => {
  const [searchCity, setSearchCity] = useState('');
  const [selectedCityFilter, setSelectedCityFilter] = useState('All');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [addedHotels, setAddedHotels] = useState<string[]>([]);
  const [showMapView, setShowMapView] = useState(false);

  const cities = ['All', 'Tokyo', 'Paris', 'Bali'];

  const filteredHotels = MOCK_HOTELS.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchCity.toLowerCase()) ||
      h.city.toLowerCase().includes(searchCity.toLowerCase()) ||
      h.address.toLowerCase().includes(searchCity.toLowerCase());
    const matchesCity = selectedCityFilter === 'All' || h.city === selectedCityFilter;
    return matchesSearch && matchesCity;
  });

  const hotelMarkers = filteredHotels.map((h) => ({
    id: h.id,
    lat: h.lat,
    lng: h.lng,
    title: h.name,
    subtitle: `$${h.pricePerNight}/night · ⭐ ${h.rating}`,
    category: 'Stay',
    isHighlighted: selectedHotel?.id === h.id
  }));

  const handleAdd = (h: Hotel) => {
    onAddHotelToItinerary(h);
    if (!addedHotels.includes(h.id)) {
      setAddedHotels([...addedHotels, h.id]);
    }
  };

  return (
    <div className="w-full pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] mb-3">
            <Building className="w-3.5 h-3.5 text-white" />
            <span>CURATED ACCOMMODATIONS</span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
            FIND & MANAGE <span className="text-[#3D3D3D]">HOTELS.</span>
          </h1>
          <p className="text-sm font-['Space_Grotesk'] text-white/60 mt-2">
            Compare handpicked boutique hotels, eco-resorts, and central stays with map location context.
          </p>
        </div>

        {/* Right Search & Map Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Search hotel, city..."
              className="w-full pl-11 pr-4 py-3 bg-[#161616] border border-white/20 rounded-full text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white"
            />
          </div>
          <button
            onClick={() => setShowMapView(!showMapView)}
            className={`px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              showMapView
                ? 'bg-white text-black'
                : 'bg-[#161616] border border-white/20 text-white hover:border-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>{showMapView ? 'Hide Map' : 'Map View'}</span>
          </button>
        </div>
      </div>

      {/* City Filters */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-3 mb-10">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCityFilter(city)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              selectedCityFilter === city
                ? 'bg-white text-black font-black'
                : 'bg-[#161616] text-white/60 border border-white/10 hover:border-white/30'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Split Map View or Grid View */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Hotels Grid */}
        <div className={`grid grid-cols-1 ${showMapView ? 'lg:w-1/2 md:grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-2'} gap-8 flex-1`}>
          {filteredHotels.map((hotel) => {
            const isAdded = addedHotels.includes(hotel.id);

            return (
              <div
                key={hotel.id}
                className="bg-[#161616] rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all flex flex-col group text-white"
              >
                <div className="relative h-52 overflow-hidden bg-black/40">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-white shadow-sm">
                    ${hotel.pricePerNight} <span className="text-[10px] font-normal text-white/60">/ night</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-white flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-white text-white" />
                    <span>{hotel.rating}</span>
                    <span className="text-[10px] opacity-60">({hotel.reviewsCount})</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans'] font-black text-lg text-white mb-1.5 uppercase tracking-tight">
                      {hotel.name}
                    </h3>
                    <p className="text-xs font-['Space_Grotesk'] text-white/60 flex items-center gap-1.5 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-white/80 shrink-0" />
                      <span>{hotel.address}</span>
                    </p>

                    {/* Amenities tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {hotel.amenities.map((amenity) => (
                        <span key={amenity} className="px-2.5 py-1 bg-white/5 text-white/70 text-[10px] font-mono font-bold uppercase rounded-md border border-white/10">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedHotel(hotel)}
                      className="text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>Details</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => handleAdd(hotel)}
                      className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                        isAdded
                          ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                          : 'bg-white text-black hover:bg-neutral-200'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <span>Add Stay</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Side Map View */}
        {showMapView && (
          <div className="lg:w-1/2 h-[600px] sticky top-24 rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-[#121212]">
            <InteractiveMap
              centerLat={selectedHotel ? selectedHotel.lat : 35.6762}
              centerLng={selectedHotel ? selectedHotel.lng : 139.6503}
              zoom={11}
              markers={hotelMarkers}
              className="w-full h-full"
            />
          </div>
        )}
      </div>

      {/* Hotel Detail Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161616] rounded-3xl max-w-lg w-full overflow-hidden border border-white/20 shadow-2xl text-white animate-in zoom-in-95 duration-200">
            <div className="relative h-52 bg-black/50">
              <img src={selectedHotel.image} alt={selectedHotel.name} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedHotel(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-black font-bold border border-white/20"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-black text-xl text-white uppercase tracking-tight">
                    {selectedHotel.name}
                  </h3>
                  <p className="text-xs font-['Space_Grotesk'] text-white/60 mt-1">{selectedHotel.address}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-mono font-bold text-white">${selectedHotel.pricePerNight}</div>
                  <div className="text-[10px] font-mono text-white/50 uppercase">per night</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-6">
                <Star className="w-4 h-4 fill-white text-white" />
                <span>{selectedHotel.rating}</span>
                <span className="text-xs font-mono text-white/50">({selectedHotel.reviewsCount} reviews)</span>
              </div>

              <div className="mb-8">
                <div className="text-xs font-mono uppercase font-bold text-white/50 tracking-widest mb-3">AMENITIES & SERVICES</div>
                <div className="grid grid-cols-2 gap-2.5">
                  {selectedHotel.amenities.map((a) => (
                    <div key={a} className="p-3 bg-[#222222] border border-white/10 rounded-xl text-xs font-semibold text-white flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedHotel(null)}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleAdd(selectedHotel);
                    setSelectedHotel(null);
                  }}
                  className="px-6 py-2.5 bg-white text-black font-black text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 cursor-pointer"
                >
                  Add Stay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
