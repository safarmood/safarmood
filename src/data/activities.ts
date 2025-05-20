import { Activity } from '@/types/activities';

export const activities: Activity[] = [
  {
    id: '1',
    name: 'Randonnée dans les montagnes de l\'Atlas',
    type: 'activity',
    description: 'Découvrez les magnifiques paysages des montagnes de l\'Atlas lors d\'une randonnée guidée.',
    long_description: 'Partez à l\'aventure dans les majestueuses montagnes de l\'Atlas avec nos guides expérimentés. Cette randonnée vous permettra de découvrir des paysages à couper le souffle, des villages berbères traditionnels et une faune et flore diversifiées. Une expérience inoubliable pour les amoureux de la nature et de l\'aventure.',
    ambiences: ['adventurous', 'nature'],
    city: 'Marrakech',
    duration: 'full-day',
    price: 75,
    rating: 4.7,
    images: ['/hiking.jpg', '/atlas.jpg'],
    inclusions: [
      'Guide professionnel',
      'Transport depuis votre hôtel',
      'Déjeuner traditionnel berbère',
      'Eau minérale'
    ],
    exclusions: [
      'Pourboires',
      'Équipement personnel de randonnée'
    ],
    booking_url: 'https://example.com/book/atlas-hike'
  },
  {
    id: '2',
    name: 'Circuit culturel des villes impériales',
    type: 'tour',
    description: 'Un voyage à travers l\'histoire du Maroc en visitant les quatre villes impériales.',
    long_description: 'Ce circuit vous emmène à la découverte des quatre villes impériales du Maroc : Rabat, Meknès, Fès et Marrakech. Chacune de ces villes a été à un moment donné la capitale du royaume et possède un riche patrimoine historique et culturel. Vous visiterez des palais royaux, des médinas anciennes, des mosquées impressionnantes et des souks animés.',
    ambiences: ['cultural', 'traditional'],
    city: 'Rabat',
    duration: 'multi-day',
    price: 450,
    rating: 4.9,
    images: ['/imperial-cities.jpg', '/fes-medina.jpg'],
    itinerary: {
      days: [
        'Jour 1: Rabat - Visite du Palais Royal, de la Kasbah des Oudayas et de la Tour Hassan',
        'Jour 2: Meknès - Découverte de la place El Hedim, des greniers et écuries de Moulay Ismaïl',
        'Jour 3: Fès - Exploration de la médina, visite des tanneries et des madrasas',
        'Jour 4: Marrakech - Visite de la place Jemaa el-Fna, des jardins Majorelle et du palais Bahia'
      ]
    },
    inclusions: [
      'Transport en véhicule climatisé',
      'Guide francophone',
      'Hébergement en hôtels 4 étoiles',
      'Petits déjeuners et dîners',
      'Entrées aux sites mentionnés'
    ],
    exclusions: [
      'Vols internationaux',
      'Déjeuners',
      'Pourboires',
      'Dépenses personnelles'
    ],
    booking_url: 'https://example.com/book/imperial-cities'
  },
  {
    id: '3',
    name: 'Cours de cuisine marocaine',
    type: 'activity',
    description: 'Apprenez à préparer des plats traditionnels marocains avec un chef local.',
    long_description: 'Immergez-vous dans la riche tradition culinaire marocaine lors de ce cours de cuisine interactif. Accompagné d\'un chef expérimenté, vous découvrirez les secrets des épices marocaines et apprendrez à préparer un repas complet comprenant une entrée, un plat principal (tajine ou couscous) et un dessert traditionnel. Le cours se termine par un repas convivial où vous dégusterez vos créations.',
    ambiences: ['gastronomic', 'cultural', 'traditional'],
    city: 'Fes',
    duration: 'half-day',
    price: 60,
    rating: 4.8,
    images: ['/cooking-class.jpg', '/moroccan-food.jpg'],
    inclusions: [
      'Tous les ingrédients',
      'Thé à la menthe et pâtisseries d\'accueil',
      'Repas complet',
      'Livret de recettes à emporter'
    ],
    exclusions: [
      'Transport vers le lieu du cours',
      'Boissons alcoolisées'
    ],
    booking_url: 'https://example.com/book/cooking-class'
  }
];
