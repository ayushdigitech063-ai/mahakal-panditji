export interface Pandit {
  id: string;
  name: string;
  slug: string;
  title: string;
  image: string;
  experienceYears: number;
  location: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  specializations: string[];
  languages: string[];
  bio: string;
  startingPrice: number;
  stats: {
    poojasPerformed: number;
    happyDevotees: number;
    citiesServed: number;
  };
}
