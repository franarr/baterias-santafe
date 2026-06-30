import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq, count } from 'drizzle-orm';
import Link from 'next/link';
import { Package, Eye, Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getStats() {
  try {
    const [{ total }] = await db.select({ total: count() }).from(products);
    const [{ published }] = await db.select({ published: count() }).from(products).where(eq(products.published, true));
    return { total, published };
  } catch {
    return { total: 0, published: 0 };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-white tracking-wide">DASHBOARD</h1>
        <p className="font-body text-sm text-white/40 mt-1">Panel de administración · Baterías Santa Fe</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-lg">
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Package size={18} className="text-[#60A5FA]" />
            <span className="font-body text-xs text-white/40 uppercase tracking-wider">Total productos</span>
          </div>
          <p className="font-display text-4xl text-white">{stats.total}</p>
        </div>

        <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Eye size={18} className="text-[#22C55E]" />
            <span className="font-body text-xs text-white/40 uppercase tracking-wider">Publicados</span>
          </div>
          <p className="font-display text-4xl text-white">{stats.published}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href="/admin/productos"
          className="flex items-center gap-2 bg-[#1E40AF] hover:bg-[#1d3a9e] text-white px-5 py-3 rounded-xl font-label text-sm tracking-wider transition-colors"
        >
          <Package size={16} />
          VER PRODUCTOS
        </Link>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-3 rounded-xl font-label text-sm tracking-wider transition-colors"
        >
          <Plus size={16} />
          NUEVO PRODUCTO
        </Link>
      </div>
    </div>
  );
}
