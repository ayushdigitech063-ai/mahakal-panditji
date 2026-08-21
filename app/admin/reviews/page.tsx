'use client';

import React, { useEffect, useState } from 'react';
import { Star, CheckCircle, EyeOff, Eye, Trash2 } from 'lucide-react';
import { reviewService } from '@/services/otherServices';
import { Review } from '@/types';
import { showAlert } from '@/lib/swal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    try {
      const data = await reviewService.getAdminReviews();
      setReviews(data);
    } catch (e: any) {
      showAlert.error('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleToggleApprove = async (id: string, current: boolean) => {
    try {
      await reviewService.updateReviewStatus(id, { isApproved: !current });
      await showAlert.success('Updated', `Review ${!current ? 'approved' : 'unapproved'}`);
      loadReviews();
    } catch (e: any) {
      showAlert.error('Error', e.message);
    }
  };

  const handleToggleVisibility = async (id: string, current: boolean) => {
    try {
      await reviewService.updateReviewStatus(id, { isVisible: !current });
      await showAlert.success('Updated', `Review ${!current ? 'visible' : 'hidden'}`);
      loadReviews();
    } catch (e: any) {
      showAlert.error('Error', e.message);
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = await showAlert.confirm('Delete Review?', 'Are you sure you want to delete this review?');
    if (confirm.isConfirmed) {
      try {
        await reviewService.deleteReview(id);
        await showAlert.success('Deleted', 'Review deleted successfully');
        loadReviews();
      } catch (e: any) {
        showAlert.error('Error', e.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#eadfce] shadow-sm">
        <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">Moderate Devotee Reviews</h3>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-3xl border border-[#eadfce] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#2b2118]">
              <thead className="bg-[#fffaf2] text-[#75695d] uppercase border-b border-[#eadfce]">
                <tr>
                  <th className="py-3 px-4">Devotee Name</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Comment</th>
                  <th className="py-3 px-4">Approved</th>
                  <th className="py-3 px-4">Visible</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eadfce]/60">
                {reviews.map((r) => (
                  <tr key={r._id} className="hover:bg-amber-50/40">
                    <td className="py-3 px-4 font-bold text-[#7a1f1f]">{r.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span className="font-bold">{r.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-sm truncate">{r.comment}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleApprove(r._id, r.isApproved)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          r.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {r.isApproved ? 'Approved' : 'Pending'}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleVisibility(r._id, r.isVisible)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          r.isVisible ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {r.isVisible ? 'Visible' : 'Hidden'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="p-1.5 rounded-lg border border-red-200 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
