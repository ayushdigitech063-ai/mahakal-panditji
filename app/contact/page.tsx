import React from 'react';
import ContactSection from '@/components/forms/ContactSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Mahakal Pandit | Support & Booking Helpline Ujjain',
  description:
    'Get in touch with Mahakal Pandit support team in Ujjain for Mahakal Pooja, Kaal Sarp Dosh consultation, and authentic Vedic ritual bookings.',
};

export default function ContactPage() {
  return (
    <div className="py-8 bg-[#fffaf2]">
      <ContactSection />
    </div>
  );
}
