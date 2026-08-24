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

const siteUrl = 'https://ujjain-mahakal.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mahakal Pandit Ujjain — Book Authentic Ujjain Pooja & Pandits Online',
    template: '%s | Mahakal Pandit Ujjain',
  },
  description:
    'Book verified Pandits for Mahakal Rudrabhishek, Kaal Sarp Dosh Pooja, Mangal Dosh Nivaran, and Navgraha Shanti in Ujjain.',
  keywords: [
    'Mahakal Pandit Ujjain',
    'Ujjain Pooja Booking',
    'Kaal Sarp Dosh Pooja Ujjain',
    'Mangal Dosh Nivaran Ujjain',
    'Mahakal Rudrabhishek',
    'Book Pandit in Ujjain',
    'Ujjain Temple Priest',
    'Siddhavat Pitru Dosh',
    'Mangalnath Mandir Pooja',
    'Bhasma Aarti Ujjain',
  ],
  authors: [{ name: 'Mahakal Pandit Seva Sansthan', url: siteUrl }],
  publisher: 'Mahakal Pandit Seva Sansthan',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'hi_IN',
    url: siteUrl,
    title: 'Mahakal Pandit Ujjain — Book Authentic Ujjain Pooja & Pandits Online',
    description:
      'Book verified Pandits for Mahakal Rudrabhishek, Kaal Sarp Dosh Pooja, Mangal Dosh Nivaran, and Navgraha Shanti in Ujjain.',
    siteName: 'Mahakal Pandit Ujjain',
    images: [
      {
        url: `${siteUrl}/images/general/og_banner.jpg`,
        width: 1200,
        height: 630,
        alt: 'Mahakal Pandit Ujjain Seva Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahakal Pandit Ujjain — Book Authentic Ujjain Pooja & Pandits Online',
    description:
      'Book verified Pandits for Mahakal Rudrabhishek, Kaal Sarp Dosh Pooja, Mangal Dosh Nivaran, and Navgraha Shanti in Ujjain.',
    images: [`${siteUrl}/images/general/og_banner.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" data-scroll-behavior="smooth" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#fffaf2] text-[#2b2118] antialiased">
        {children}
      </body>
    </html>
  );
}
