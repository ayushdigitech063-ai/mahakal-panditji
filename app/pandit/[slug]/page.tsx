import { getPanditBySlug, getPandits } from '@/services/panditService';
import { getPoojas } from '@/services/poojaService';
import PanditDetailClient from '@/components/pandit/PanditDetailClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pandits = await getPandits();
  return pandits.map((pandit) => ({
    slug: pandit.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const pandit = await getPanditBySlug(resolvedParams.slug);
  if (!pandit) return { title: 'Pandit Not Found | Mahakal Pandit' };

  return {
    title: `${pandit.name} - ${pandit.title} | Mahakal Pandit`,
    description: pandit.bio,
  };
}

export default async function PanditDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const pandit = await getPanditBySlug(resolvedParams.slug);
  const poojas = await getPoojas();

  if (!pandit) {
    notFound();
  }

  return <PanditDetailClient pandit={pandit} poojas={poojas} />;
}
