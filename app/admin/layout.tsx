'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Flame,
  BookOpen,
  Star,
  Calendar,
  MessageSquare,
  Home,
  Settings,
  LogOut,
  Menu,
  X,
  UserCheck,
  Images,
} from 'lucide-react';
import { apiClient } from '../../lib/apiClient';
import { ENDPOINTS } from '../../lib/endpoints';
import { showAlert } from '../../lib/swal';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState('Super Admin');

  // Skip auth checks on login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) return;

    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    apiClient
      .get(ENDPOINTS.auth.me)
      .then((res) => {
        if (res.success) {
          setAuthenticated(true);
          setAdminName(res.data.name || 'Super Admin');
        } else {
          localStorage.removeItem('admin_token');
          router.push('/admin/login');
        }
      })
      .catch(() => {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
      });
  }, [pathname, isLoginPage, router]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    const confirm = await showAlert.confirm('Logout Confirmation', 'Are you sure you want to sign out?');
    if (confirm.isConfirmed) {
      try {
        await apiClient.post(ENDPOINTS.auth.logout);
      } catch {}
      localStorage.removeItem('admin_token');
      router.push('/admin/login');
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#fffaf2] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#c96b18] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Pandit Ji', href: '/admin/pandits', icon: Users },
    { name: 'Pooja Services', href: '/admin/poojas', icon: Flame },
    { name: 'Blog Articles', href: '/admin/blogs', icon: BookOpen },
    { name: 'Devotee Reviews', href: '/admin/reviews', icon: Star },
    { name: 'Festivals CMS', href: '/admin/festivals', icon: Calendar },
    { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
    { name: 'Live Gallery', href: '/admin/gallery', icon: Images },
    { name: 'Homepage CMS', href: '/admin/homepage', icon: Home },
    { name: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-[#fffaf2] text-[#2b2118] relative">
      {/* Mobile Backdrop Drawer Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Desktop & Mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-spiritual-gradient text-[#eadfce] border-r border-amber-950/40 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-amber-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-saffron-gradient flex items-center justify-center shadow-md">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="heading-spiritual text-lg font-bold text-amber-300 block leading-tight">
                Mahakal CMS
              </span>
              <span className="text-[10px] text-amber-200/60 uppercase tracking-widest block">Super Admin</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-amber-200 hover:text-white p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-saffron-gradient text-white shadow-md'
                    : 'text-amber-100/70 hover:bg-amber-900/40 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-amber-900/40">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-950/60 hover:bg-red-900/80 text-rose-300 font-semibold py-2.5 rounded-xl border border-red-800/40 transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-[#eadfce] py-4 px-6 sticky top-0 z-20 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl border border-[#eadfce] text-[#7a1f1f] bg-[#fffaf2] hover:bg-amber-100 transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h2 className="heading-spiritual text-xl font-bold text-[#7a1f1f] truncate">
              {navItems.find((i) => i.href === pathname)?.name || 'Admin Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-saffron-gradient text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <UserCheck className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-[#2b2118] hidden sm:inline">{adminName}</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
