export interface Pooja {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  duration: string;
  startingPrice: number;
  category: string;
  benefits: string[];
  samagriIncluded: boolean;
  isPopular?: boolean;
  isMukhya?: boolean;
  procedure?: string[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}
