/**
 * Utility functions for handling images
 */

// Array of random placeholder images for establishments
const randomPlaceholderImages = [
  '/placeholder.svg',
  'https://source.unsplash.com/random/800x600/?hotel',
  'https://source.unsplash.com/random/800x600/?restaurant',
  'https://source.unsplash.com/random/800x600/?morocco',
  'https://source.unsplash.com/random/800x600/?travel',
  'https://source.unsplash.com/random/800x600/?food'
];

/**
 * Get a random placeholder image URL when no image is available
 * @returns A random placeholder image URL
 */
export const getRandomPlaceholderImage = (): string => {
  const randomIndex = Math.floor(Math.random() * randomPlaceholderImages.length);
  return randomPlaceholderImages[randomIndex];
};

/**
 * Get the establishment image or a random placeholder if none exists
 * @param images Array of image URLs
 * @param establishmentType Type of establishment (hotel or restaurant)
 * @returns An image URL
 */
export const getEstablishmentImage = (images: string[], establishmentType: 'hotel' | 'restaurant'): string => {
  if (images && images.length > 0 && images[0]) {
    return images[0];
  }
  
  // Use type-specific Unsplash image if we know the type
  if (establishmentType === 'hotel') {
    return 'https://source.unsplash.com/random/800x600/?hotel';
  } else if (establishmentType === 'restaurant') {
    return 'https://source.unsplash.com/random/800x600/?restaurant';
  }
  
  // Otherwise use a random placeholder
  return getRandomPlaceholderImage();
};
