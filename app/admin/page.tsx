'use client';

import React, { useEffect, useState } from 'react';
import {
  Users,
  Flame,
  BookOpen,
  Star,
  MessageSquare,
  TrendingUp,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { apiClient } from '../../lib/apiClient';
import { ENDPOINTS } from '../../lib/endpoints';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await apiClient.get(ENDPOINTS.admin.dashboard);
        if (res.success) {
          setStats(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  const statCards = [
    { label: 'Total Pandits', value: stats?.totalPandits || 0, sub: `${stats?.activePandits || 0} Active`, icon: Users, color: 'bg-amber-500' },
    { label: 'Active Poojas', value: stats?.totalPoojas || 0, sub: 'Public Catalog', icon: Flame, color: 'bg-orange-600' },
    { label: 'Published Blogs', value: stats?.publishedBlogs || 0, sub: `${stats?.totalBlogs || 0} Total`, icon: BookOpen, color: 'bg-yellow-600' },
    { label: 'Devotee Reviews', value: stats?.totalReviews || 0, sub: `${stats?.pendingReviews || 0} Pending`, icon: Star, color: 'bg-emerald-600' },
    { label: 'Total Enquiries', value: stats?.totalEnquiries || 0, sub: `${stats?.newEnquiries || 0} New Requests`, icon: MessageSquare, color: 'bg-red-700' },
  ];

  const pieData = [
    { name: 'Active Pandits', value: stats?.activePandits || 1, color: '#c96b18' },
    { name: 'Hidden Pandits', value: stats?.hiddenPandits || 0, color: '#8f3f12' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#eadfce] shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#75695d] uppercase">{card.label}</span>
                <div className={`p-2.5 rounded-2xl text-white ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="heading-spiritual text-3xl font-extrabold text-[#7a1f1f]">
                  {card.value}
                </span>
                <span className="text-xs font-semibold text-[#8f3f12] block mt-1">{card.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enquiries Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#eadfce] shadow-sm space-y-4">
          <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">
            Enquiries & Booking Requests Growth
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.enquiriesChart || []}>
                <XAxis dataKey="_id" stroke="#75695d" fontSize={12} />
                <YAxis stroke="#75695d" fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="#c96b18" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pandit Distribution Donut */}
        <div className="bg-white rounded-3xl p-6 border border-[#eadfce] shadow-sm space-y-4 flex flex-col justify-between">
          <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">
            Pandit Status Distribution
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#c96b18]"></span>
              <span>Active ({stats?.activePandits || 0})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#8f3f12]"></span>
              <span>Hidden ({stats?.hiddenPandits || 0})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enquiries */}
        <div className="bg-white rounded-3xl p-6 border border-[#eadfce] shadow-sm space-y-4">
          <h3 className="heading-spiritual text-lg font-bold text-[#7a1f1f]">
            Recent Devotee Enquiries
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#2b2118]">
              <thead className="bg-[#fffaf2] text-[#75695d] uppercase border-b border-[#eadfce]">
                <tr>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Service</th>
                  <th className="py-2.5 px-3">Phone</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eadfce]/60">
                {stats?.recentEnquiries?.map((enq: any) => (
                  <tr key={enq._id}>
                    <td className="py-3 px-3 font-semibold">{enq.name}</td>
                    <td className="py-3 px-3">{enq.service}</td>
                    <td className="py-3 px-3">{enq.phone}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        enq.status === 'new' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Pandits */}
        <div className="bg-white rounded-3xl p-6 border border-[#eadfce] shadow-sm space-y-4">
          <h3 className="heading-spiritual text-lg font-bold text-[#7a1f1f]">
            Recently Added Pandits
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#2b2118]">
              <thead className="bg-[#fffaf2] text-[#75695d] uppercase border-b border-[#eadfce]">
                <tr>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Experience</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eadfce]/60">
                {stats?.recentPandits?.map((p: any) => (
                  <tr key={p._id}>
                    <td className="py-3 px-3 font-semibold">{p.name}</td>
                    <td className="py-3 px-3">{p.experience} Yrs</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {p.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
