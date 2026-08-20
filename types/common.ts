export interface Review {
  id: string;
  userName: string;
  userLocation: string;
  rating: number;
  date: string;
  comment: string;
  poojaName: string;
  panditName: string;
}

export interface Stats {
  experiencedPandits: number;
  poojasPerformed: number;
  citiesServed: number;
  rating: number;
}

export interface Festival {
  id: string;
  name: string;
  date: string;
  year: number;
  poojaName: string;
  description: string;
  image: string;
  badge: string;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}
