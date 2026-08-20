import { getPoojaBySlug, getPoojas } from '@/services/poojaService';
import PoojaDetailClient from '@/components/pooja/PoojaDetailClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const poojas = await getPoojas();
  return poojas.map((pooja) => ({
    slug: pooja.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const pooja = await getPoojaBySlug(resolvedParams.slug);
  if (!pooja) return { title: 'Pooja Not Found | Mahakal Pandit' };

  return {
    title: `${pooja.name} in Ujjain | Mahakal Pandit`,
    description: pooja.shortDescription,
  };
}

export default async function PoojaDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const pooja = await getPoojaBySlug(resolvedParams.slug);

  if (!pooja) {
    notFound();
  }

  return <PoojaDetailClient pooja={pooja} />;
}
