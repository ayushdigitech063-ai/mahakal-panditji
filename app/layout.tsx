import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingActionButtons from '@/components/ui/FloatingActionButtons';
import { LanguageProvider } from '@/context/LanguageContext';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-spiritual',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'महाकाल पंडित | उज्जैन सिद्ध पूजन एवं पंडित बुकिंग केंद्र',
  description:
    'उज्जैन महाकालेश्वर धाम में काल सर्प दोष, रुद्राभिषेक, भात पूजा एवं ग्रह शांति अनुष्ठान हेतु प्रामाणिक विद्वान पंडित जी बुकिंग।',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#fffaf2] text-[#2b2118]">
        <LanguageProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingActionButtons />
        </LanguageProvider>
      </body>
    </html>
  );
}
