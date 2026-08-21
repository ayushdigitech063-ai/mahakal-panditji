'use client';

import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { showAlert } from '../../lib/swal';

interface NewModuleEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  moduleType: 'Hotel' | 'Tour' | 'Travel' | 'Package';
  prefilledItemName?: string;
}

export const NewModuleEnquiryModal: React.FC<NewModuleEnquiryModalProps> = ({
  isOpen,
  onClose,
  title,
  moduleType,
  prefilledItemName = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    travelDate: '',
    passengers: '2',
    pickupLocation: 'Ujjain Railway Station',
    dropLocation: 'Hotel / Temple',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate async submission
    setTimeout(async () => {
      setLoading(false);
      await showAlert.success(
        'Enquiry Submitted!',
        `Thank you ${formData.name}! Our Ujjain travel coordination team will contact you shortly regarding ${prefilledItemName || title}.`
      );
      setFormData({
        name: '',
        phone: '',
        email: '',
        travelDate: '',
        passengers: '2',
        pickupLocation: 'Ujjain Railway Station',
        dropLocation: 'Hotel / Temple',
        message: '',
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-[#eadfce] relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#eadfce] pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#c96b18] block">
              {moduleType} Booking Enquiry
            </span>
            <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">
              {prefilledItemName ? `Enquire for ${prefilledItemName}` : title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-amber-100/60 hover:bg-amber-200 text-[#7a1f1f] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase text-[#75695d] mb-1">Your Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Kumar"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#eadfce] bg-[#fffaf2] text-sm text-[#2b2118]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase text-[#75695d] mb-1">Mobile / WhatsApp No.</label>
              <input
                type="tel"
                required
                placeholder="10-digit number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#eadfce] bg-[#fffaf2] text-sm text-[#2b2118]"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-[#75695d] mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="email@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#eadfce] bg-[#fffaf2] text-sm text-[#2b2118]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase text-[#75695d] mb-1">Travel Date</label>
              <input
                type="date"
                required
                value={formData.travelDate}
                onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#eadfce] bg-[#fffaf2] text-sm text-[#2b2118]"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-[#75695d] mb-1">Total Guests / Passengers</label>
              <input
                type="number"
                min="1"
                required
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#eadfce] bg-[#fffaf2] text-sm text-[#2b2118]"
              />
            </div>
          </div>

          {moduleType === 'Travel' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Pickup Location</label>
                <input
                  type="text"
                  value={formData.pickupLocation}
                  onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eadfce] bg-[#fffaf2] text-sm text-[#2b2118]"
                />
              </div>
              <div>
                <label className="block font-semibold uppercase text-[#75695d] mb-1">Drop Location</label>
                <input
                  type="text"
                  value={formData.dropLocation}
                  onChange={(e) => setFormData({ ...formData, dropLocation: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eadfce] bg-[#fffaf2] text-sm text-[#2b2118]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold uppercase text-[#75695d] mb-1">Special Requirements / Message</label>
            <textarea
              rows={3}
              placeholder="Tell us any specific requirements (e.g. Mahakal Bhasma Aarti time, Senior Citizen assistance...)"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#eadfce] bg-[#fffaf2] text-sm text-[#2b2118]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-saffron-gradient text-white font-bold py-3.5 rounded-xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Submitting Request...' : 'Send Instant Enquiry'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
