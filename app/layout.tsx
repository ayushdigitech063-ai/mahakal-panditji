import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

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
  title: 'Mahakal Pandit — Book Authentic Ujjain Pooja & Pandits Online',
  description:
    'Book verified Pandits for Mahakal Rudrabhishek, Kaal Sarp Dosh Pooja, Mangal Dosh Nivaran, and Navgraha Shanti in Ujjain.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#fffaf2] text-[#2b2118] antialiased">
        {children}
      </body>
    </html>
  );
}
