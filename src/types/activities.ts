export interface Activity {
  id: string;
  name: string;
  type: ActivityType;
  description: string;
  long_description?: string;
  ambiences: string[];
  city: string;
  duration: DurationType;
  price: number;
  provider_id?: string;
  rating: number;
  images: string[];
  itinerary?: {
    stops?: string[];
    days?: string[];
    steps?: string[];
    route?: string[];
    schedule?: string[];
  };
  inclusions?: string[];
  exclusions?: string[];
  booking_url?: string;
  created_at?: string;
  updated_at?: string;
}

export type ActivityType = 'activity' | 'tour' | 'event';

export type DurationType = 'half-day' | 'full-day' | 'multi-day';

export type ActivityAmbience = 
  | 'adventurous'
  | 'nature'
  | 'cultural'
  | 'traditional'
  | 'festive'
  | 'gastronomic'
  | 'romantic'
  | 'quiet';