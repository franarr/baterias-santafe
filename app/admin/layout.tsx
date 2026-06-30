'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BatteryCharging, LayoutDashboard, Package, LogOut, ExternalLink } from 'lucide-react';
import { AdminUIProvider } from '@/components/admin/AdminUI';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The login page is full-screen and must not render the authenticated chrome.
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      // Hard navigation so the cleared cookie takes effect immediately.
      window.location.assign('/admin/login');
    }
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/productos', label: 'Productos', icon: Package },
  ];

  return (
    <AdminUIProvider>
    <div className="min-h-screen bg-[#0a0d14] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#0d1117] border-r border-white/5 flex flex-col fixed inset-y-0 left-0 z-20">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1E40AF] rounded-xl flex items-center justify-center shrink-0">
              <BatteryCharging size={18} className="text-white" />
            </div>
            <div>
              <p className="font-label text-sm text-white tracking-wider">ADMIN</p>
              <p className="font-body text-[10px] text-white/30">Baterías SF</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/admin' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-all ${
                  active
                    ? 'bg-[#1E40AF]/20 text-[#60A5FA] border border-[#1E40AF]/20'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/5 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <ExternalLink size={16} />
            Ver sitio
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 ml-56 min-h-screen">
        {children}
      </main>
    </div>
    </AdminUIProvider>
  );
}
