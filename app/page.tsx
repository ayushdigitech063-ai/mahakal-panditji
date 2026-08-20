import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import PanditSection from '@/components/home/PanditSection';
import MukhyaPoojaSection from '@/components/home/MukhyaPoojaSection';
import SpecialYearSection from '@/components/home/SpecialYearSection';
import GallerySection from '@/components/home/GallerySection';
import BlogSection from '@/components/home/BlogSection';
import ContactSection from '@/components/forms/ContactSection';
import { getPandits } from '@/services/panditService';
import { getPoojas } from '@/services/poojaService';
import { getBlogs } from '@/services/blogService';

export default async function HomePage() {
  const pandits = await getPandits();
  const poojas = await getPoojas();
  const blogs = await getBlogs();

  return (
    <>
      <HeroSection />
      <StatsSection />
      <PanditSection pandits={pandits} />
      <MukhyaPoojaSection poojas={poojas} />
      <GallerySection />
      <SpecialYearSection />
      <BlogSection blogs={blogs} />
      <ContactSection />
    </>
  );
}
