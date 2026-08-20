import { getPandits } from '@/services/panditService';
import PanditsClientListing from '@/components/pandit/PanditsClientListing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verified Veda Pandits in Ujjain | Mahakal Pandit',
  description:
    'Find and book experienced, Gurukul-certified Pandits in Ujjain for Mahakal Pooja, Rudrabhishek, and Dosh Shanti remedies.',
};

export default async function PanditsPage() {
  const pandits = await getPandits();
  return <PanditsClientListing initialPandits={pandits} />;
}
