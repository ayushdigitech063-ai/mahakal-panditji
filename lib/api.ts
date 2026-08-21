export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://mahakal-panditji-backenda.onrender.com/api';

export const SERVER_ORIGIN =
  process.env.NEXT_PUBLIC_SERVER_ORIGIN || 'https://mahakal-panditji-backenda.onrender.com';

/**
 * Universal Image URL resolver helper function.
 * Cleans up legacy hardcoded 'http://localhost:5000' strings stored in DB
 * and replaces them with live production SERVER_ORIGIN.
 */
export const resolveImageUrl = (imagePath?: string, fallback = '/images/pandits/pandit1.jpg'): string => {
  if (!imagePath) return fallback;

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
