import { Review, Stats, Festival } from '@/types/common';

export const SEEDED_REVIEWS: Review[] = [
  {
    id: 'r-1',
    userName: 'Rajesh Sharma',
    userLocation: 'Delhi NCR',
    rating: 5,
    date: '12 August 2026',
    comment: 'Acharya Sharma Ji arranged our Kaal Sarp Dosh Pooja flawlessly in Ujjain. The peace of mind after the ceremony is priceless. Highly recommended!',
    poojaName: 'Kaal Sarp Dosh Pooja',
    panditName: 'Acharya Sharma Ji'
  },
  {
    id: 'r-2',
    userName: 'Sunita Patel',
    userLocation: 'Ahmedabad, Gujarat',
    rating: 5,
    date: '05 August 2026',
    comment: 'We booked Rudrabhishek online for our family. Pt. Shastri Ji conducted the live video ceremony with complete Vedic precision. Very divine experience.',
    poojaName: 'Rudrabhishek',
    panditName: 'Pt. Shastri Ji'
  },
  {
    id: 'r-3',
    userName: 'Vikramaditya Rao',
    userLocation: 'Bengaluru',
    rating: 5,
    date: '28 July 2026',
    comment: 'Authentic rituals, transparent pricing, and wonderful support by Mahakal Pandit team. Pandit Dixit Ji explained every mantra step in detail.',
    poojaName: 'Mahakal Pooja',
    panditName: 'Pandit Dixit Ji'
  },
  {
    id: 'r-4',
    userName: 'Meenakshi Iyer',
    userLocation: 'Mumbai',
    rating: 5,
    date: '19 July 2026',
    comment: 'Maha Mrityunjaya Jaap was conducted over 3 days for my father’s recovery. Blessed to find such humble and learned Veda Pandits.',
    poojaName: 'Maha Mrityunjaya Jaap',
    panditName: 'Pandit Trivedi Ji'
  }
];

export const SEEDED_STATS: Stats = {
  experiencedPandits: 500,
  poojasPerformed: 10000,
  citiesServed: 50,
  rating: 4.9
};

export const SEEDED_FESTIVALS_2026: Festival[] = [
  {
    id: 'fest-1',
    name: 'Maha Shivratri Mahotsav',
    date: 'February 15, 2026',
    year: 2026,
    poojaName: 'Akhand Maha Rudrabhishek & Bhasma Seva',
    description: 'The most sacred night of Shiva. Special 4-Pahar Mahakal Abhishekam with 108 Veda Pandits.',
    image: 'https://images.unsplash.com/photo-1545641203-7d072a14e3b2?auto=format&fit=crop&w=600&q=80',
    badge: 'Supreme Night of Shiva'
  },
  {
    id: 'fest-2',
    name: 'Shravan Month Special Pooja',
    date: 'July - August 2026',
    year: 2026,
    poojaName: 'Shravan Somvar Rudrabhishek & Bilvarchana',
    description: 'Perform month-long daily Rudrabhishek for divine blessings, prosperity, and obstacle removal.',
    image: 'https://images.unsplash.com/photo-1609102026400-3d0817730704?auto=format&fit=crop&w=600&q=80',
    badge: 'Auspicious Month'
  },
  {
    id: 'fest-3',
    name: 'Nag Panchami Ujjain Parv',
    date: 'August 18, 2026',
    year: 2026,
    poojaName: 'Nag Bali & Kaal Sarp Dosh Shanti',
    description: 'Unique annual window when Nagchandreshwar Temple gates open. Ideal for Kaal Sarp Dosh Nivaran.',
    image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=600&q=80',
    badge: 'Rare Celestial Window'
  },
  {
    id: 'fest-4',
    name: 'Kartik Somvar & Dev Deepawali',
    date: 'November 24, 2026',
    year: 2026,
    poojaName: 'Deepotsav & Mahakal Sahasranama Archana',
    description: 'Light up 1008 Deepams on Shipra Ghat and participate in grand Sahasranama Archana.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    badge: 'Festival of Lights'
  }
];
