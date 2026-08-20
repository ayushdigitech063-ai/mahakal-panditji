import { Blog } from '@/types/blog';

export const SEEDED_BLOGS: Blog[] = [
  {
    id: 'b-1',
    title: 'What Is Mahakal Pooja? Importance, Vidhi & Sacred Benefits',
    slug: 'what-is-mahakal-pooja',
    category: 'Vedic Knowledge',
    excerpt: 'Discover why worshipping Lord Shiva as Mahakal at Ujjain is revered as the ultimate remedy for fear of time, obstacles, and negative energies.',
    content: `
      <h2>The Significance of Lord Mahakal</h2>
      <p>Lord Mahakal is the master of Kaal (Time and Death). Worshipping Him in the sacred soil of Avantika (Ujjain) confers spiritual strength, removes the fear of untimely demise, and neutralizes severe astrological doshas.</p>
      
      <h2>Core Vidhi & Ritual Steps</h2>
      <p>The ritual starts with Ganesh Avahan, followed by Kalash Pujan and the recitation of powerful Vedic hymns such as Sri Rudram and Mahakal Mantras. Panchamrit Abhishekam is performed with milk, honey, ghee, curd, and sacred Bhasma.</p>

      <h2>Key Benefits of Mahakal Pooja</h2>
      <ul>
        <li>Overcomes fear, severe anxiety, and negative planetary impacts.</li>
        <li>Brings stability to family, health, and professional life.</li>
        <li>Instills peace and profound spiritual connection.</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1609102026400-3d0817730704?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Acharya Sharma Ji',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      role: 'Vedic Scholar & Priest'
    },
    publishDate: 'August 15, 2026',
    readTime: '6 min read',
    tags: ['Mahakal', 'Ujjain', 'Pooja Vidhi', 'Shiva']
  },
  {
    id: 'b-2',
    title: 'Unlocking the Sacred Power & Benefits of Rudrabhishek',
    slug: 'benefits-of-rudrabhishek',
    category: 'Ritual Insights',
    excerpt: 'Explore how offering Panchamrit to the Shivling while chanting Rudra Mantras purifies karma and opens avenues of success.',
    content: `
      <h2>What is Rudrabhishek?</h2>
      <p>Rudrabhishek is an ancient Vedic ritual where Lord Shiva in His Rudra form is bathed with sacred liquids including milk, honey, sugarcane juice, and Ganga Jal.</p>
      
      <h2>Why Perform Rudrabhishek?</h2>
      <p>Ancient scriptures state that when Shiva is pleased through Abhishekam, the entire universe showers grace. It dissolves sin, heals illnesses, and restores harmony.</p>
    `,
    image: 'https://images.unsplash.com/photo-1545641203-7d072a14e3b2?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Pt. Shastri Ji',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      role: 'Kashi Certified Pandit'
    },
    publishDate: 'August 10, 2026',
    readTime: '5 min read',
    tags: ['Rudrabhishek', 'Shiva Puja', 'Spiritual Healing']
  },
  {
    id: 'b-3',
    title: 'What Is Kaal Sarp Dosh? Types, Symptoms & Remedies in Ujjain',
    slug: 'what-is-kaal-sarp-dosh',
    category: 'Astrology & Dosh',
    excerpt: 'Understand how Kaal Sarp Dosh forms in a horoscope and why Ujjain is the most sacred destination to perform Nag Bali and Dosh Nivaran.',
    content: `
      <h2>Understanding Kaal Sarp Dosh</h2>
      <p>When all planets in a horoscope are positioned between Rahu and Ketu, Kaal Sarp Dosh is formed. It may cause delays in career, marriage, or financial distress.</p>

      <h2>Why Ujjain for Kaal Sarp Dosh Shanti?</h2>
      <p>Ujjain is the Nabhi-Sthan (Cosmic Center) of the Earth and the abode of Mahakaleshwar. Performing Rahu-Ketu Shanti at Kshipra Ghat neutralizes the dosha effectively.</p>
    `,
    image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Pandit Dixit Ji',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      role: 'Dosh Shanti Expert'
    },
    publishDate: 'August 02, 2026',
    readTime: '7 min read',
    tags: ['Kaal Sarp Dosh', 'Rahu Ketu', 'Ujjain Dosh Shanti']
  },
  {
    id: 'b-4',
    title: 'Importance of Grah Shanti Pooja for Peaceful Living',
    slug: 'importance-of-grah-shanti',
    category: 'Home & Wellbeing',
    excerpt: 'Learn how balancing planetary influences through Grah Shanti removes obstacles in daily domestic and professional life.',
    content: `
      <h2>The Cosmic Influence of Planets</h2>
      <p>The nine planets exert continuous subtle influence on human emotions, health, and fortunes. Grah Shanti balances these cosmic energies.</p>
    `,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Pt. Agnihotri Ji',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      role: 'Vastu & Grah Shanti Specialist'
    },
    publishDate: 'July 28, 2026',
    readTime: '4 min read',
    tags: ['Grah Shanti', 'Navgraha', 'Peace']
  },
  {
    id: 'b-5',
    title: 'Mahakal Darshan & Ujjain Yatra Guide for Devotees',
    slug: 'mahakal-darshan-guide',
    category: 'Yatra Guide',
    excerpt: 'Complete guide for pilgrims visiting Ujjain for Mahakal Bhasma Aarti, booking Pandits, and visiting nearby holy sanctums.',
    content: `
      <h2>Planning Your Sacred Trip to Ujjain</h2>
      <p>Ujjain is one of the seven Moksha-giving holy cities in India. Pre-booking your Pandit Ji ensures smooth ceremony arrangements without hassle.</p>
    `,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Acharya Joshi Ji',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      role: 'Yatra & Jyotish Scholar'
    },
    publishDate: 'July 20, 2026',
    readTime: '8 min read',
    tags: ['Ujjain Yatra', 'Bhasma Aarti', 'Darshan Guide']
  },
  {
    id: 'b-6',
    title: 'Best Auspicious Time & Tithis for Rudrabhishek in 2026',
    slug: 'best-time-for-rudrabhishek',
    category: 'Panchang & Muhurat',
    excerpt: 'Discover auspicious Muhurat timings, Pradosh dates, and Shivratri tithis in 2026 for maximum spiritual fruit.',
    content: `
      <h2>Selecting the Right Tithi</h2>
      <p>Performing Rudrabhishek during auspicious Muhurat aligned with your birth star exponentially amplifies the beneficial results.</p>
    `,
    image: 'https://images.unsplash.com/photo-1545641203-7d072a14e3b2?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Pandit Trivedi Ji',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
      role: 'Panchang & Veda Master'
    },
    publishDate: 'July 15, 2026',
    readTime: '5 min read',
    tags: ['Muhurat', 'Rudrabhishek', 'Panchang']
  }
];
