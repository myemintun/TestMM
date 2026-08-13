import { TravelGuide, Hotel, Testimonial, Itinerary } from '../types';

export const SAMPLE_ITINERARY: Itinerary = {
  id: 'tokyo-5day',
  title: 'Tokyo 5-Day Cultural & Culinary Exploration',
  destination: 'Tokyo, Japan',
  coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx_C2SFrlHEaE-0AJCJlinNfR_d-HCHNyFkN0bDLHngyUJb6bpp0IV8vBGgrZ66abixyMUIhPi7cQvvj4fFQ7rUbsdVRp0kTarOtt0BJbMFde35zhcmrupFyLjmWL4DSVLjWWwx8m3YjZswh5Bvc5-JI-jrNoqgT7dQihB5vsk95AWBKNnbUKNU6UUwXWf50YWQQi-F54VFuLk4VI6F_vROCuEkqeaYMXmGy2C3YubKGGa27hocdR3',
  daysCount: 5,
  startDate: '2026-10-12',
  totalBudget: 1250,
  currency: 'USD',
  days: [
    {
      dayNumber: 1,
      title: 'Day 1: Shibuya & Harajuku Highlights',
      date: '2026-10-12',
      activities: [
        {
          id: 'act-1',
          time: '10:00 AM',
          title: 'Meiji Shrine (Meiji Jingu)',
          category: 'Sightseeing',
          cost: '$0',
          description: 'Serene Shinto shrine located in a lush forest in Harajuku.',
          location: '1-1 Yoyogikamizonocho, Shibuya, Tokyo',
          bookingUrl: 'https://www.meijijingu.or.jp/en/',
          lat: 35.6764,
          lng: 139.6993,
          isCompleted: true
        },
        {
          id: 'act-2',
          time: '12:30 PM',
          title: 'Ichiran Ramen Lunch',
          category: 'Dining',
          cost: '$14',
          description: 'Famous single-booth tonkotsu ramen experience near Shibuya crossing.',
          location: '1-22-7 Jinnan, Shibuya City, Tokyo',
          bookingUrl: 'https://ichiran.com',
          lat: 35.6601,
          lng: 139.7001,
          isCompleted: false
        },
        {
          id: 'act-3',
          time: '02:30 PM',
          title: 'Shibuya Crossing & Miyashita Park',
          category: 'Culture',
          cost: '$0',
          description: 'Walk across the world famous scramble intersection and visit rooftop Miyashita Park.',
          location: '2-2-1 Dogenzaka, Shibuya City, Tokyo',
          lat: 35.6595,
          lng: 139.7004,
          isCompleted: false
        },
        {
          id: 'act-4',
          time: '05:00 PM',
          title: 'Shibuya Sky Observation Deck',
          category: 'Sightseeing',
          cost: '$18',
          description: 'Panoramic 360-degree open-air rooftop views over Mount Fuji and Tokyo cityscape.',
          location: '2-24-12 Shibuya, Shibuya City, Tokyo',
          bookingUrl: 'https://www.shibuya-scramble-square.com/sky/',
          lat: 35.6585,
          lng: 139.7022,
          isCompleted: false
        }
      ]
    },
    {
      dayNumber: 2,
      title: 'Day 2: Historic Asakusa & Futuristic Akihabara',
      date: '2026-10-13',
      activities: [
        {
          id: 'act-5',
          time: '09:30 AM',
          title: 'Senso-ji Temple & Nakamise Street',
          category: 'Sightseeing',
          cost: '$0',
          description: 'Tokyo’s oldest Buddhist temple surrounded by bustling traditional craft stalls.',
          location: '2-3-1 Asakusa, Taito City, Tokyo',
          lat: 35.7148,
          lng: 139.7967,
          isCompleted: false
        },
        {
          id: 'act-6',
          time: '01:00 PM',
          title: 'Sometaro Okonomiyaki Lunch',
          category: 'Dining',
          cost: '$20',
          description: 'Cook-your-own Japanese savory pancakes in a historic wooden teahouse.',
          location: '2-2-2 Nishi-Asakusa, Taito City, Tokyo',
          lat: 35.7118,
          lng: 139.7905,
          isCompleted: false
        },
        {
          id: 'act-7',
          time: '03:30 PM',
          title: 'Akihabara Electric Town & Retro Gaming',
          category: 'Shopping',
          cost: '$40',
          description: 'Explore multi-story anime stores, Super Potato retro games, and maid cafes.',
          location: 'Sotokanda, Chiyoda City, Tokyo',
          lat: 35.6997,
          lng: 139.7714,
          isCompleted: false
        }
      ]
    },
    {
      dayNumber: 3,
      title: 'Day 3: Digital Art at teamLab & Toyosu Seafood Market',
      date: '2026-10-14',
      activities: [
        {
          id: 'act-8',
          time: '10:00 AM',
          title: 'teamLab Planets Immersive Exhibition',
          category: 'Culture',
          cost: '$32',
          description: 'Walk through water and light installations in this interactive digital art museum.',
          location: '6-1-16 Toyosu, Koto City, Tokyo',
          bookingUrl: 'https://planets.teamlab.art',
          lat: 35.6491,
          lng: 139.7898,
          isCompleted: false
        },
        {
          id: 'act-9',
          time: '01:30 PM',
          title: 'Fresh Sushi at Toyosu Market Senkyaku Banrai',
          category: 'Dining',
          cost: '$45',
          description: 'Ultra-fresh omakase sushi and hot spring footbath with Tokyo Bay view.',
          location: '6-5-1 Toyosu, Koto City, Tokyo',
          lat: 35.6441,
          lng: 139.7801,
          isCompleted: false
        }
      ]
    }
  ]
};

export const MOCK_GUIDES: TravelGuide[] = [
  {
    id: 'guide-1',
    title: 'Ultimate 7-Day First-Timer Guide to Tokyo',
    destination: 'Tokyo, Japan',
    author: 'Nadia (Couple Travel)',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVuZmaZuEsCtdSe25psWYxvPgrqPWO-oB3RLT5FityQtjPs4Bur83jKll4GNVsYW8ZBVaWzGXVE3O6VDtkkJwEdkudALZggPOOms2_DVXkUHQxOq-ja93c-5NJvU4M23sUPGnzW7LHjEcaycpfe5s0UYisIQkDoP6bIWeUrzZRT3v1D0XIPQk4DThyRnAzZNrqoQ8AGhYACG8-1XtZuYHaJ8iPbxvk2G1EQvqoXJkwwp5-p_Jr9Ip-',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 382,
    tags: ['Must-See', 'Foodie', 'Culture', 'Transit-Friendly'],
    snippet: 'Navigating Tokyo’s distinct neighborhoods, secret ramen alleys, hidden shrines, and efficient subway tips.',
    highlights: ['Shibuya Crossing', 'Meiji Shrine', 'Tsukiji Outer Market', 'Ghibli Museum', 'Akihabara'],
    locationCount: 24,
    lat: 35.6762,
    lng: 139.6503
  },
  {
    id: 'guide-2',
    title: 'Parisian Secret Cafes & Art Walking Tour',
    destination: 'Paris, France',
    author: 'Claire Dubois',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    rating: 4.85,
    reviewsCount: 219,
    tags: ['Romance', 'Art & Museums', 'Boutique', 'Pastries'],
    snippet: 'Discover quiet courtyards in Le Marais, authentic croissant bakeries, and golden hour views at Montmartre.',
    highlights: ['Musée d’Orsay', 'Sainte-Chapelle', 'Rue Cler Market', 'Place des Vosges'],
    locationCount: 18,
    lat: 48.8566,
    lng: 2.3522
  },
  {
    id: 'guide-3',
    title: 'Bali Eco-Resorts & Waterfall Adventure Itinerary',
    destination: 'Bali, Indonesia',
    author: 'Lydia Yang',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzctpa2fSb83a1zZE3jv4lcR6lUrdabe8Uudiu1AnwlLdY-NAJYDkwTi_8Z_hJJXqxAD6dHiVpDfkRge4K8N2bQjxgSFlnFoVEc7IqOajsk2A4Q2zPmAuQFxGZ-D_HJb0RTPnxBnRfey3gsPS_1P_Jys0C0H5Dzc-aTp7sd8dakHgHHpRFu0wdm3U4SGYu6W6Ap481viFz4zKSt04gqhWuKcHDo5jvCsWeoRtbl56kdXT5olJj14pv',
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    rating: 4.92,
    reviewsCount: 412,
    tags: ['Nature', 'Waterfalls', 'Wellness', 'Roadtrip'],
    snippet: 'Trek to Sekumpul waterfalls, sunrise yoga in Ubud rice terraces, and sunset cliffside beach clubs in Uluwatu.',
    highlights: ['Tegallalang Rice Terrace', 'Nungnung Waterfall', 'Uluwatu Temple', 'Canggu Beach'],
    locationCount: 20,
    lat: -8.4095,
    lng: 115.1889
  },
  {
    id: 'guide-4',
    title: 'New York City 4-Day Architecture & Rooftop Highlights',
    destination: 'New York, USA',
    author: 'Alan MacKinnon',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    rating: 4.88,
    reviewsCount: 195,
    tags: ['Skyline', 'Broadway', 'Food Trucks', 'Museums'],
    snippet: 'From Central Park picnics to High Line strolls and speakeasy cocktail bars in Greenwich Village.',
    highlights: ['The High Line', 'Summit One Vanderbilt', 'Brooklyn Bridge Walk', 'MoMA'],
    locationCount: 22,
    lat: 40.7128,
    lng: -74.0060
  }
];

export const MOCK_HOTELS: Hotel[] = [
  {
    id: 'hotel-1',
    name: 'Trunk Hotel Shibuya',
    city: 'Tokyo',
    pricePerNight: 280,
    currency: 'USD',
    rating: 4.8,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    address: '5-31 Jingumae, Shibuya City, Tokyo',
    amenities: ['Free High-Speed WiFi', 'Rooftop Bar & Lounge', 'Organic Breakfast', 'Bicycle Rental', 'Pet Friendly'],
    lat: 35.6662,
    lng: 139.7042
  },
  {
    id: 'hotel-2',
    name: 'Hotel Gracery Shinjuku',
    city: 'Tokyo',
    pricePerNight: 165,
    currency: 'USD',
    rating: 4.6,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    address: '1-19-1 Kabukicho, Shinjuku City, Tokyo',
    amenities: ['Godzilla Terrace View', '24/7 Front Desk', 'Concierge', 'Subway Station Direct Access'],
    lat: 35.6953,
    lng: 139.7018
  },
  {
    id: 'hotel-3',
    name: 'Hôtel Le Relais Saint-Germain',
    city: 'Paris',
    pricePerNight: 340,
    currency: 'USD',
    rating: 4.9,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
    address: '9 Carrefour de l’Odéon, 75006 Paris',
    amenities: ['Complimentary Wine Hour', 'Gourmet French Bistro', 'Air Conditioning', 'Luxurious Linens'],
    lat: 48.8522,
    lng: 2.3387
  },
  {
    id: 'hotel-4',
    name: 'Alila Ubud Eco-Resort',
    city: 'Bali',
    pricePerNight: 220,
    currency: 'USD',
    rating: 4.95,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    address: 'Desa Melinggih Kelod, Payangan, Ubud',
    amenities: ['Infinity Jungle Pool', 'Spa & Wellness Center', 'Organic Dining', 'Free Shuttle to Ubud Center'],
    lat: -8.4312,
    lng: 115.2411
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Nadia',
    role: 'Travel Blogger @Couple Travel The World',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVuZmaZuEsCtdSe25psWYxvPgrqPWO-oB3RLT5FityQtjPs4Bur83jKll4GNVsYW8ZBVaWzGXVE3O6VDtkkJwEdkudALZggPOOms2_DVXkUHQxOq-ja93c-5NJvU4M23sUPGnzW7LHjEcaycpfe5s0UYisIQkDoP6bIWeUrzZRT3v1D0XIPQk4DThyRnAzZNrqoQ8AGhYACG8-1XtZuYHaJ8iPbxvk2G1EQvqoXJkwwp5-p_Jr9Ip-',
    rating: 5,
    quote: '"Planning your trip by having all the attractions already plugged into a map makes trip planning so much easier."'
  },
  {
    id: 'rev-2',
    name: 'Belinda & Kathy K.',
    role: 'Frequent Globetrotters',
    initials: 'BK',
    colorClass: 'bg-[#dde0e5] text-[#606368]',
    quote: '"I have used several trip planning apps. This one by far is the best. The interaction between google maps makes the planning so much easier. Adding an adventure not in the app is also easy. Everything is connected including booking a stay. Easy to use on phone, tablets and computer!"'
  },
  {
    id: 'rev-3',
    name: 'Alan MacKinnon',
    role: 'Solo Explorer & Photographer',
    initials: 'AM',
    colorClass: 'bg-[#009fbd] text-white',
    quote: '"This app is exceptional for trip planning. The AI feature, with a Map view allows you to visualize the attraction locations - the optimization feature provides a quick way to plan the day(s). Finally, a more holistic planning tool."'
  },
  {
    id: 'rev-4',
    name: 'Lydia Yang',
    role: 'Founder @LydiaScapes',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzctpa2fSb83a1zZE3jv4lcR6lUrdabe8Uudiu1AnwlLdY-NAJYDkwTi_8Z_hJJXqxAD6dHiVpDfkRge4K8N2bQjxgSFlnFoVEc7IqOajsk2A4Q2zPmAuQFxGZ-D_HJb0RTPnxBnRfey3gsPS_1P_Jys0C0H5Dzc-aTp7sd8dakHgHHpRFu0wdm3U4SGYu6W6Ap481viFz4zKSt04gqhWuKcHDo5jvCsWeoRtbl56kdXT5olJj14pv',
    rating: 5,
    quote: '"So much easier to visualize and plan a road trip to my favourite rock climbing destinations and explore the area around."'
  }
];
