'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';
import { enquiryService } from '@/services/otherServices';
import { Enquiry } from '@/types';
import { showAlert } from '@/lib/swal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEnquiries = async () => {
    try {
      const data = await enquiryService.getAdminEnquiries();
      setEnquiries(data);
    } catch (e: any) {
      showAlert.error('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await enquiryService.updateEnquiryStatus(id, newStatus);
      await showAlert.success('Updated', `Enquiry status changed to ${newStatus}`);
      loadEnquiries();
    } catch (e: any) {
      showAlert.error('Error', e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#eadfce] shadow-sm">
        <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">Manage Devotee Enquiries</h3>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-3xl border border-[#eadfce] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#2b2118]">
              <thead className="bg-[#fffaf2] text-[#75695d] uppercase border-b border-[#eadfce]">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Devotee Name</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eadfce]/60">
                {enquiries.map((e) => (
                  <tr key={e._id} className="hover:bg-amber-50/40">
                    <td className="py-3 px-4 text-[#75695d]">
                      {e.createdAt ? new Date(e.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#7a1f1f]">{e.name}</td>
                    <td className="py-3 px-4 font-semibold">{e.phone}</td>
                    <td className="py-3 px-4 font-semibold text-[#8f3f12]">{e.service}</td>
                    <td className="py-3 px-4 max-w-xs truncate">{e.message}</td>
                    <td className="py-3 px-4">
                      <select
                        value={e.status}
                        onChange={(ev) => handleStatusChange(e._id, ev.target.value)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border border-[#eadfce] ${
                          e.status === 'new'
                            ? 'bg-red-100 text-red-800'
                            : e.status === 'contacted'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
