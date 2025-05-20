import { Establishment } from '@/types';

export const establishments: Establishment[] = [
  {
    id: '1',
    name: 'Riad Yasmine',
    type: 'hotel',
    description: 'Un riad traditionnel avec une ambiance romantique au cœur de la médina.',
    city: 'Marrakech',
    moods: ['romantic', 'traditional'],
    services: ['pool', 'spa', 'restaurant', 'wifi', 'garden'],
    priceRange: 'premium',
    rating: 4.8,
    reviews: [
      {
        id: '101',
        author: 'Sophie L.',
        rating: 5,
        comment: 'Séjour parfait pour notre anniversaire de mariage. Très romantique !',
        date: '2023-10-15'
      },
      {
        id: '102',
        author: 'Jean M.',
        rating: 4.5,
        comment: 'Cadre magnifique et personnel attentionné.',
        date: '2023-09-22'
      }
    ],
    images: ['/riad1.jpg', '/riad2.jpg']
  },
  {
    id: '2',
    name: 'La Mamounia',
    type: 'hotel',
    description: 'Hôtel de luxe offrant une expérience marocaine authentique avec des installations modernes.',
    city: 'Marrakech',
    moods: ['luxury', 'romantic'],
    services: ['pool', 'spa', 'restaurant', 'gym', 'wifi', 'accessibility'],
    priceRange: 'luxury',
    rating: 4.9,
    reviews: [
      {
        id: '201',
        author: 'Pierre D.',
        rating: 5,
        comment: 'Un palace exceptionnel, service impeccable.',
        date: '2023-11-05'
      }
    ],
    images: ['/mamounia1.jpg', '/mamounia2.jpg']
  },
  {
    id: '3',
    name: 'Dar Moha',
    type: 'restaurant',
    description: 'Restaurant traditionnel marocain dans un cadre élégant avec jardin.',
    city: 'Marrakech',
    moods: ['romantic', 'traditional'],
    cuisine: 'Marocaine',
    services: ['terrace', 'garden', 'wifi'],
    priceRange: 'premium',
    rating: 4.7,
    reviews: [
      {
        id: '301',
        author: 'Marie F.',
        rating: 5,
        comment: 'Cuisine délicieuse dans un cadre enchanteur.',
        date: '2023-10-10'
      }
    ],
    images: ['/darmoha1.jpg', '/darmoha2.jpg']
  },
  {
    id: '4',
    name: 'Taros Café',
    type: 'restaurant',
    description: 'Restaurant avec terrasse sur le toit offrant une vue panoramique sur la médina.',
    city: 'Essaouira',
    moods: ['festive', 'modern'],
    cuisine: 'Fusion',
    services: ['terrace', 'bar', 'live music', 'wifi'],
    priceRange: 'moderate',
    rating: 4.5,
    reviews: [
      {
        id: '401',
        author: 'Thomas B.',
        rating: 4.5,
        comment: 'Ambiance festive et vue magnifique.',
        date: '2023-08-15'
      }
    ],
    images: ['/taros1.jpg', '/taros2.jpg']
  },
  {
    id: '5',
    name: 'Hôtel Sofitel Casablanca',
    type: 'hotel',
    description: 'Hôtel moderne avec vue sur l\'océan, idéal pour les voyages d\'affaires et familiaux.',
    city: 'Casablanca',
    moods: ['modern', 'family'],
    services: ['pool', 'spa', 'restaurant', 'kids club', 'wifi', 'accessibility', 'gym'],
    priceRange: 'premium',
    rating: 4.6,
    reviews: [
      {
        id: '501',
        author: 'Ahmed K.',
        rating: 4.5,
        comment: 'Excellent pour un séjour en famille, activités pour enfants très appréciées.',
        date: '2023-07-20'
      }
    ],
    images: ['/sofitel1.jpg', '/sofitel2.jpg']
  },
  {
    id: '6',
    name: 'Restaurant Umayya',
    type: 'restaurant',
    description: 'Restaurant asiatique moderne proposant des plats fusion et une ambiance élégante.',
    city: 'Casablanca',
    moods: ['modern', 'romantic'],
    cuisine: 'Asiatique',
    services: ['terrace', 'bar', 'wifi', 'accessibility'],
    priceRange: 'premium',
    rating: 4.7,
    reviews: [
      {
        id: '601',
        author: 'Leila M.',
        rating: 5,
        comment: 'Cuisine asiatique raffinée, service impeccable.',
        date: '2023-11-12'
      }
    ],
    images: ['/umayya1.jpg', '/umayya2.jpg']
  },
  {
    id: '7',
    name: 'Riad Fes',
    type: 'hotel',
    description: 'Riad traditionnel au cœur de la médina de Fes avec une décoration authentique.',
    city: 'Fes',
    moods: ['traditional', 'luxury'],
    services: ['pool', 'spa', 'restaurant', 'wifi', 'garden'],
    priceRange: 'luxury',
    rating: 4.8,
    reviews: [
      {
        id: '701',
        author: 'Michel P.',
        rating: 5,
        comment: 'Une immersion totale dans la culture marocaine, service exceptionnel.',
        date: '2023-10-05'
      }
    ],
    images: ['/riadfes1.jpg', '/riadfes2.jpg']
  }
];