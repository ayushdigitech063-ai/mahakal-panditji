import { getPoojas } from '@/services/poojaService';
import PoojaClientListing from '@/components/pooja/PoojaClientListing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sacred Pooja & Anusthan Services in Ujjain | Mahakal Pandit',
  description:
    'Explore authentic Vedic Poojas: Mahakal Pooja, Rudrabhishek, Kaal Sarp Dosh Shanti, Navgraha Havan, and Maha Mrityunjaya Jaap in Ujjain.',
};

export default async function PoojaPage() {
  const poojas = await getPoojas();
  return <PoojaClientListing initialPoojas={poojas} />;
}
