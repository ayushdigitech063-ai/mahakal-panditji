'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { PackageCard } from '../../components/package/PackageCard';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { NewModuleEnquiryModal } from '../../components/forms/NewModuleEnquiryModal';
import { packageService } from '../../services/packageService';
import { SpiritualPackage } from '../../types';

export default function PackagesPage() {
  const [packages, setPackages] = useState<SpiritualPackage[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedPackageName, setSelectedPackageName] = useState('');

  useEffect(() => {
    async function fetchPackages() {
      const data = await packageService.getPackages();
      setPackages(data);
      setLoading(false);
    }
    fetchPackages();
  }, []);

  const handleOpenEnquiry = (packageName: string) => {
    setSelectedPackageName(packageName);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2]">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c96b18] bg-amber-100/60 border border-amber-200 px-3.5 py-1 rounded-full">
            All-In-One Pilgrimage Bundles
          </span>
          <h1 className="heading-spiritual text-3xl sm:text-5xl font-extrabold text-[#7a1f1f]">
            Complete Spiritual Packages
          </h1>
          <p className="text-sm text-[#75695d]">
            Combined experience bundling Pandit Ji, Pooja rituals, AC Hotel stay, and private Travel transfers in Ujjain.
          </p>
        </div>

        {/* Package Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : packages.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#eadfce]">
            <p className="text-base text-[#75695d]">No packages available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} onEnquire={handleOpenEnquiry} />
            ))}
          </div>
        )}
      </main>

      {/* Package Enquiry Modal */}
      <NewModuleEnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        title="Complete Package Enquiry"
        moduleType="Package"
        prefilledItemName={selectedPackageName}
      />

      <Footer />
    </div>
  );
}
