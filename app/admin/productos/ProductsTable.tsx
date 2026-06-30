'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Eye, EyeOff, Loader2, ImageOff } from 'lucide-react';
import type { Product } from '@/lib/db/schema';
import { useAdminUI } from '@/components/admin/AdminUI';

const categoryColors: Record<string, string> = {
  auto: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  moto: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  camion: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'start-stop': 'bg-green-500/10 text-green-400 border-green-500/20',
};

export function ProductsTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const { toast, confirm } = useAdminUI();
  const [deleting, setDeleting] = useState<number | null>(null);
  const [toggling, setToggling] = useState<number | null>(null);

  async function handleDelete(p: Product) {
    const ok = await confirm({
      title: 'Eliminar producto',
      message: `Se eliminará "${p.model}" de forma permanente. Esta acción no se puede deshacer.`,
      confirmLabel: 'ELIMINAR',
      danger: true,
    });
    if (!ok) return;

    setDeleting(p.id);
    try {
      const res = await fetch(`/api/products/${p.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast(`"${p.model}" eliminado`, 'success');
      router.refresh();
    } catch {
      toast('No se pudo eliminar el producto', 'error');
    } finally {
      setDeleting(null);
    }
  }

  async function togglePublished(p: Product) {
    setToggling(p.id);
    try {
      const res = await fetch(`/api/products/${p.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !p.published }),
      });
      if (!res.ok) throw new Error();
      toast(!p.published ? `"${p.model}" publicado` : `"${p.model}" pasó a borrador`, 'success');
      router.refresh();
    } catch {
      toast('No se pudo cambiar el estado', 'error');
    } finally {
      setToggling(null);
    }
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
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-[#0a0d14] border border-white/5 flex items-center justify-center overflow-hidden shrink-0">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.model} className="w-full h-full object-contain" />
                    ) : (
                      <ImageOff size={16} className="text-white/20" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-body text-sm text-white font-medium truncate">{p.model}</p>
                    <p className="font-body text-xs text-white/30 mt-0.5 hidden sm:block truncate">{p.slug}</p>
                  </div>
                </div>
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
                <button
                  onClick={() => togglePublished(p)}
                  disabled={toggling === p.id}
                  title={p.published ? 'Click para pasar a borrador' : 'Click para publicar'}
                  className={`flex items-center gap-1.5 text-xs font-body rounded-full px-2.5 py-1 transition-colors disabled:opacity-50 ${
                    p.published
                      ? 'text-green-400 hover:bg-green-400/10'
                      : 'text-white/40 hover:bg-white/5'
                  }`}
                >
                  {toggling === p.id ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : p.published ? (
                    <Eye size={12} />
                  ) : (
                    <EyeOff size={12} />
                  )}
                  {p.published ? 'Publicado' : 'Borrador'}
                </button>
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
                    onClick={() => handleDelete(p)}
                    disabled={deleting === p.id}
                    className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all disabled:opacity-50"
                    title="Eliminar"
                  >
                    {deleting === p.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
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
