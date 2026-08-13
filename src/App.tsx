import React, { useState } from 'react';
import { NavTab, Itinerary, TravelGuide, Hotel } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MapFeaturesSection } from './components/MapFeaturesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { TravelGuidesView } from './components/TravelGuidesView';
import { HotelsView } from './components/HotelsView';
import { ItineraryPlannerView } from './components/ItineraryPlannerView';
import { AuthModal } from './components/AuthModal';
import { AITripModal } from './components/AITripModal';
import { AppDownloadModal } from './components/AppDownloadModal';
import { SAMPLE_ITINERARY } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Alex Turner');

  const [currentItinerary, setCurrentItinerary] = useState<Itinerary>(SAMPLE_ITINERARY);

  // Handle importing guide spots to itinerary
  const handleImportGuideToItinerary = (guide: TravelGuide) => {
    const newDayPlan = {
      dayNumber: currentItinerary.days.length + 1,
      title: `Day ${currentItinerary.days.length + 1}: ${guide.title} Highlights`,
      activities: guide.highlights.map((spot, idx) => ({
        id: `act-guide-${idx}-${Date.now()}`,
        time: `${9 + idx * 2}:00 AM`,
        title: spot,
        category: 'Culture' as const,
        cost: '$15',
        description: `Imported spot from ${guide.author}'s guide.`,
        location: `${spot}, ${guide.destination}`,
        lat: guide.lat + (idx * 0.005),
        lng: guide.lng + (idx * 0.005),
        isCompleted: false
      }))
    };

    setCurrentItinerary({
      ...currentItinerary,
      daysCount: currentItinerary.daysCount + 1,
      days: [...currentItinerary.days, newDayPlan]
    });

    setActiveTab('itineraries');
  };

  // Handle adding hotel to itinerary
  const handleAddHotelToItinerary = (hotel: Hotel) => {
    const hotelAct = {
      id: `act-hotel-${Date.now()}`,
      time: '03:00 PM',
      title: `Check-in at ${hotel.name}`,
      category: 'Stay' as const,
      cost: `$${hotel.pricePerNight}/night`,
      description: hotel.address,
      location: hotel.address,
      lat: hotel.lat,
      lng: hotel.lng,
      isCompleted: false
    };

    const updatedDays = currentItinerary.days.map((d) => {
      if (d.dayNumber === 1) {
        return {
          ...d,
          activities: [hotelAct, ...d.activities]
        };
      }
      return d;
    });

    setCurrentItinerary({
      ...currentItinerary,
      days: updatedDays
    });

    setActiveTab('itineraries');
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col font-['Space_Grotesk'] selection:bg-white selection:text-black">
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenAuth={handleOpenAuth}
        onOpenPlanner={() => setAiModalOpen(true)}
        isLoggedIn={isLoggedIn}
      />

      {/* Main Content Area based on activeTab */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <div className="flex flex-col w-full relative">
            <HeroSection
              onStartPlanning={() => setAiModalOpen(true)}
              onGetApp={() => setAppModalOpen(true)}
            />
            <MapFeaturesSection
              onOpenPlanner={() => setActiveTab('itineraries')}
            />
            <TestimonialsSection />
          </div>
        )}

        {activeTab === 'travel-guides' && (
          <TravelGuidesView
            onImportGuideToItinerary={handleImportGuideToItinerary}
          />
        )}

        {activeTab === 'hotels' && (
          <HotelsView
            onAddHotelToItinerary={handleAddHotelToItinerary}
          />
        )}

        {activeTab === 'itineraries' && (
          <ItineraryPlannerView
            currentItinerary={currentItinerary}
            onOpenAIGenerator={() => setAiModalOpen(true)}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AITripModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        onItineraryGenerated={(itinerary) => {
          setCurrentItinerary(itinerary);
          setActiveTab('itineraries');
        }}
      />

      <AppDownloadModal
        isOpen={appModalOpen}
        onClose={() => setAppModalOpen(false)}
      />
    </div>
  );
}
