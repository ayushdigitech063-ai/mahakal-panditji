export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://mahakal-panditji-backenda.onrender.com/api';

export const SERVER_ORIGIN =
  process.env.NEXT_PUBLIC_SERVER_ORIGIN || 'https://mahakal-panditji-backenda.onrender.com';

/**
 * Universal Image URL resolver helper function.
 * Supports Cloudinary HTTPS URLs directly, cleans up legacy localhost URLs,
 * and fallback gracefully to default local static images if image is missing.
 */
export const resolveImageUrl = (imagePath?: string, fallback = '/images/pandits/pandit1.jpg'): string => {
  if (!imagePath) return fallback;

  // Cloudinary or External HTTPS CDN URL
  if (imagePath.startsWith('http://res.cloudinary.com') || imagePath.startsWith('https://res.cloudinary.com') || imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Replace legacy hardcoded localhost with live production server origin
  if (imagePath.includes('localhost:5000')) {
    return imagePath.replace('http://localhost:5000', SERVER_ORIGIN).replace('https://localhost:5000', SERVER_ORIGIN);
  }

  // Handle relative upload paths
  if (imagePath.startsWith('/uploads')) {
    return `${SERVER_ORIGIN}${imagePath}`;
  }

  return imagePath;
};
