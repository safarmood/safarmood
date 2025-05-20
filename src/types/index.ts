export interface Establishment {
  id: string;
  name: string;
  type: 'hotel' | 'restaurant';
  description: string;
  city: string;
  moods: string[];
  cuisine?: string;
  services: string[];
  rating: number;
  priceRange?: PriceRange;
  reviews: Review[];
  images: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export type Mood = 
  | 'romantic'
  | 'family'
  | 'festive'
  | 'traditional'
  | 'modern'
  | 'quiet'
  | 'luxury';

export type City = 
  | 'Casablanca'
  | 'Marrakech'
  | 'Rabat'
  | 'Fes'
  | 'Tangier'
  | 'Agadir'
  | 'Essaouira';

export type CuisineType =
  | 'Marocaine'
  | 'Internationale'
  | 'Asiatique'
  | 'Méditerranéenne'
  | 'Fusion'
  | 'Européenne';

export type ServiceType =
  | 'pool'
  | 'spa'
  | 'restaurant'
  | 'terrace'
  | 'wifi'
  | 'accessibility'
  | 'gym'
  | 'bar'
  | 'garden'
  | 'kids club'
  | 'live music';

export type PriceRange = 
  | 'budget'
  | 'moderate'
  | 'premium'
  | 'luxury';