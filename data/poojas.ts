import { Pooja } from '@/types/pooja';

export const SEEDED_POOJAS: Pooja[] = [
  {
    id: 'pooja-1',
    name: 'Mahakal Pooja',
    slug: 'mahakal-pooja',
    shortDescription: 'Sacred worship of Lord Mahakaleshwar for protection, longevity, and divine grace in Ujjain.',
    fullDescription: 'Mahakal Pooja is a sacred ceremony performed to seek the supreme blessings of Lord Shiva in his fiercest and most protective avatar, Mahakal. Performed on the banks of Shipra in Ujjain or at holy sanctums, this pooja eliminates dark energies, fear of untimely death, and grants strength.',
    image: 'https://images.unsplash.com/photo-1609102026400-3d0817730704?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Removes fear of negative planetary transitions and untimely obstacles.',
      'Brings supreme mental tranquility, clarity, and spiritual elevation.',
      'Protects business and personal life from malevolent influences.',
      'Invokes the powerful protective energy of Lord Shiva Mahakal.'
    ],
    procedure: [
      'Sankalpam (Sacred Vow with name and gotra)',
      'Ganesh Ambika Pujan & Kalash Sthapana',
      'Laghu Rudra / Mahakal Mantras Chanting',
      'Abhishekam with Panchamrit, Bhasma & Sacred Water',
      'Aarti, Havan & Pushpanjali'
    ],
    duration: '2 - 3 Hours',
    samagriIncluded: true,
    startingPrice: 3500,
    category: 'Shiva Seva',
    isMukhya: true,
    faqs: [
      {
        question: 'Can this pooja be performed online on my behalf?',
        answer: 'Yes, Pandit Ji can perform the Sankalp in your name with live video feed or personalized video recordings.'
      },
      {
        question: 'What items do I need to prepare if attending in person?',
        answer: 'All primary Samagri is arranged by our team. Devotees are requested to wear traditional clean attire.'
      }
    ]
  },
  {
    id: 'pooja-2',
    name: 'Rudrabhishek',
    slug: 'rudrabhishek',
    shortDescription: 'Holy bath ritual offering 108 Vedic chants for Lord Shiva to wash away past karma and bestow happiness.',
    fullDescription: 'Rudrabhishek is one of the most powerful ancient Vedic rituals dedicated to Lord Shiva. By bathing the Shivling with Panchamrit, Sugandhit Jal, Ganga Jal, and Honey while chanting Sri Rudram, all desires are fulfilled and cosmic peace is attained.',
    image: 'https://images.unsplash.com/photo-1545641203-7d072a14e3b2?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Neutralizes karmic debts and chronic ailments.',
      'Bestows prosperity, harmonious family bonds, and peace.',
      'Clears negative planetary influences (Shani / Rahu).',
      'Provides deep spiritual rejuvenation and focus.'
    ],
    procedure: [
      'Sankalp with family Gotra details',
      'Rudra Parayan Chanting (11 or 121 recitations)',
      'Continuous Abhishekam with Milk, Curd, Ghee, Honey & Water',
      'Maha Aarti & Prasad Distribution'
    ],
    duration: '1.5 - 2.5 Hours',
    samagriIncluded: true,
    startingPrice: 3100,
    category: 'Abhishekam',
    isMukhya: true,
    faqs: [
      {
        question: 'Which day is best for Rudrabhishek?',
        answer: 'Mondays, Shivratri, Pradosh, and Shravan month are exceptionally auspicious.'
      }
    ]
  },
  {
    id: 'pooja-3',
    name: 'Kaal Sarp Dosh Pooja',
    slug: 'kaal-sarp-dosh-pooja',
    shortDescription: 'Specialized Ujjain ritual to resolve planetary misalignment caused by Rahu and Ketu.',
    fullDescription: 'When all seven planets are hemmed between Rahu and Ketu in a horoscope, Kaal Sarp Dosh occurs. Ujjain is universally revered as the supreme location for Kaal Sarp Dosh Nivaran. This ritual eliminates struggles in career, marriage, and health.',
    image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Removes recurring obstacles in financial and professional life.',
      'Restores peace of mind and overcomes chronic anxiety.',
      'Encourages success in higher studies and business ventures.',
      'Resolves marital delays and relationship strain.'
    ],
    procedure: [
      'Rahu-Ketu Nag Pujan & Sarpa Bali',
      'Maha Sankalp at Kshipra Ghat / Sanctum',
      'Jaap of Rahu-Ketu Vedic Mantras',
      'Nag Naagin Visarjan in sacred waters',
      'Daan and Purna Ahuti Havan'
    ],
    duration: '3 - 4 Hours',
    samagriIncluded: true,
    startingPrice: 4500,
    category: 'Dosh Shanti',
    isMukhya: true,
    faqs: [
      {
        question: 'Why is Ujjain recommended for Kaal Sarp Dosh?',
        answer: 'Ujjain lies on the Tropic of Cancer and is governed by Lord Mahakal (Master of Time), making it uniquely powerful for Rahu-Ketu remedies.'
      }
    ]
  },
  {
    id: 'pooja-4',
    name: 'Navgraha Shanti',
    slug: 'navgraha-shanti',
    shortDescription: 'Harmonize all 9 astrological planets for prosperity, good health, and success.',
    fullDescription: 'Navgraha Shanti Pooja aligns the nine planets (Surya, Chandra, Mangal, Budh, Guru, Shukra, Shani, Rahu, Ketu). It reduces malefic impacts and enhances beneficial cosmic vibrations in your birth chart.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Balances overall energy fields and personal aura.',
      'Prevents sudden career drops or health ailments.',
      'Harmonizes planetary periods (Dasha and Antardasha).',
      'Brings luck, wisdom, and financial stability.'
    ],
    procedure: [
      'Navgraha Sthapana & Avahan',
      'Specific Mantras Chanting for each Planet',
      'Navgraha Havan with specific Woods & Samagri',
      'Planetary Grain Daan & Aartis'
    ],
    duration: '2 - 3 Hours',
    samagriIncluded: true,
    startingPrice: 2800,
    category: 'Grah Shanti',
    isMukhya: true,
    faqs: [
      {
        question: 'Should I bring my Kundali?',
        answer: 'Pandit Ji will review birth details prior to the ceremony to focus on malefic planets.'
      }
    ]
  },
  {
    id: 'pooja-5',
    name: 'Grah Shanti',
    slug: 'grah-shanti',
    shortDescription: 'Peace ritual for home and family to invite divine blessings and harmonious living.',
    fullDescription: 'Grah Shanti Pooja purifies living environments, banishing negative forces and invoking peace, prosperity, and joy for all family members.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Ensures domestic bliss and mutual understanding.',
      'Clears lingering negative aura from residential premises.',
      'Fosters financial growth and physical well-being.'
    ],
    procedure: [
      'Kula Devata Pujan',
      'Vastu & Grah Mandal Sthapana',
      'Peace Havan & Purna Ahuti'
    ],
    duration: '2 Hours',
    samagriIncluded: true,
    startingPrice: 2500,
    category: 'Grah Shanti',
    isMukhya: true,
    faqs: []
  },
  {
    id: 'pooja-6',
    name: 'Maha Mrityunjaya Jaap',
    slug: 'maha-mrityunjaya-jaap',
    shortDescription: 'Powerful recitation of 1,25,000 Vedic Mantras for life-protection and holistic healing.',
    fullDescription: 'The Maha Mrityunjaya Mantra is an immortal divine hymn from the Rigveda. Performing this Jaap creates an impenetrable shield against fatal illnesses, accidents, and life obstacles.',
    image: 'https://images.unsplash.com/photo-1609102026400-3d0817730704?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Grants long health, rejuvenation, and physical vigor.',
      'Neutralizes acute planetary affliction causing severe health crises.',
      'Infuses divine grace, courage, and spiritual awakening.'
    ],
    procedure: [
      'Sankalp with Gotra & Specific Intention',
      'Continuous Chanting by Qualified Veda Pandits',
      'Daily Abhishekam',
      'Grand Dashansh Havan & Tarpan'
    ],
    duration: '3 - 7 Days',
    samagriIncluded: true,
    startingPrice: 11000,
    category: 'Special Jaap',
    isMukhya: true,
    faqs: [
      {
        question: 'How many Pandits participate?',
        answer: 'Usually 3 to 5 Veda Pandits chant simultaneously based on the total count.'
      }
    ]
  }
];
