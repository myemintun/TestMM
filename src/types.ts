export type NavTab = 'home' | 'travel-guides' | 'hotels' | 'itineraries';

export interface Activity {
  id: string;
  time: string;
  title: string;
  category: 'Sightseeing' | 'Dining' | 'Shopping' | 'Culture' | 'Transport' | 'Stay';
  cost: string;
  description: string;
  location: string;
  bookingUrl?: string;
  lat: number;
  lng: number;
  isCompleted?: boolean;
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  date?: string;
  activities: Activity[];
}

export interface Itinerary {
  id: string;
  title: string;
  destination: string;
  coverImage: string;
  daysCount: number;
  startDate?: string;
  totalBudget: number;
  currency: string;
  days: DayPlan[];
  collaborators?: string[];
}

export interface TravelGuide {
  id: string;
  title: string;
  destination: string;
  author: string;
  authorAvatar: string;
  coverImage: string;
  rating: number;
  reviewsCount: number;
  tags: string[];
  snippet: string;
  highlights: string[];
  locationCount: number;
  lat: number;
  lng: number;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  pricePerNight: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  image: string;
  address: string;
  amenities: string[];
  lat: number;
  lng: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  initials?: string;
  rating?: number;
  quote: string;
  colorClass?: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  category: string;
  date: string;
}
