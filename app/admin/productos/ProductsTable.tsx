'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import type { Product } from '@/lib/db/schema';

const categoryColors: Record<string, string> = {
  auto: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  moto: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  camion: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'start-stop': 'bg-green-500/10 text-green-400 border-green-500/20',
};

export function ProductsTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<number | null>(null);

  async function handleDelete(id: number) {
    if (!confirm('¿Eliminar este producto?')) return;
    setDeleting(id);
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    router.refresh();
    setDeleting(null);
  }

  if (products.length === 0) {
    return (
      <div className="bg-[#111827] border border-white/5 rounded-2xl p-12 text-center">
        <p className="font-body text-white/40">No hay productos. ¡Creá el primero!</p>
      </div>
    );
  }

  return (
    <div className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left px-5 py-4 font-body text-xs text-white/30 uppercase tracking-wider">Producto</th>
            <th className="text-left px-5 py-4 font-body text-xs text-white/30 uppercase tracking-wider hidden md:table-cell">Categoría</th>
            <th className="text-left px-5 py-4 font-body text-xs text-white/30 uppercase tracking-wider hidden sm:table-cell">Precio</th>
            <th className="text-left px-5 py-4 font-body text-xs text-white/30 uppercase tracking-wider">Estado</th>
            <th className="text-right px-5 py-4 font-body text-xs text-white/30 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
              <td className="px-5 py-4">
                <p className="font-body text-sm text-white font-medium">{p.model}</p>
                <p className="font-body text-xs text-white/30 mt-0.5 hidden sm:block">{p.slug}</p>
              </td>
              <td className="px-5 py-4 hidden md:table-cell">
                <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-label tracking-widest border ${categoryColors[p.category] || 'bg-white/5 text-white/40 border-white/10'}`}>
                  {p.categoryLabel.toUpperCase()}
                </span>
              </td>
              <td className="px-5 py-4 hidden sm:table-cell">
                <span className="font-body text-sm text-white">{p.price}</span>
              </td>
              <td className="px-5 py-4">
                {p.published ? (
                  <span className="flex items-center gap-1.5 text-xs font-body text-green-400">
                    <Eye size={12} />
                    Publicado
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-body text-white/30">
                    <EyeOff size={12} />
                    Borrador
                  </span>
                )}
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/productos/${p.id}`}
                    className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
                    title="Editar"
                  >
                    <Pencil size={15} />
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    disabled={deleting === p.id}
                    className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all disabled:opacity-50"
                    title="Eliminar"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
