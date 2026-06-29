'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/db/schema';
import { ImageUpload } from '@/components/ImageUpload';

const CATEGORIES = [
  { value: 'auto', label: 'Autos' },
  { value: 'moto', label: 'Motos' },
  { value: 'camion', label: 'Camiones' },
  { value: 'start-stop', label: 'Start-Stop' },
];

const CATEGORY_LABELS: Record<string, string> = {
  auto: 'Autos',
  moto: 'Motos',
  camion: 'Camiones',
  'start-stop': 'Start-Stop',
};

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e').replace(/[íìï]/g, 'i')
    .replace(/[óòö]/g, 'o').replace(/[úùü]/g, 'u').replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

type FormData = {
  slug: string;
  title: string;
  model: string;
  price: string;
  priceNumber: number;
  tag: string;
  category: string;
  categoryLabel: string;
  image: string;
  voltage: string;
  amperage: string;
  cca: string;
  warranty: string;
  warrantyMonths: number;
  technology: string;
  dimensions: string;
  weight: string;
  vehicles: string;
  description: string;
  features: string;
  published: boolean;
};

function productToForm(p?: Product): FormData {
  if (!p) return {
    slug: '', title: '', model: '', price: '', priceNumber: 0, tag: '',
    category: 'auto', categoryLabel: 'Autos', image: '',
    voltage: '12V', amperage: '', cca: '', warranty: '', warrantyMonths: 18,
    technology: '', dimensions: '', weight: '', vehicles: '', description: '',
    features: '', published: true,
  };
  return {
    ...p,
    priceNumber: p.priceNumber ?? 0,
    warrantyMonths: p.warrantyMonths ?? 12,
    vehicles: JSON.parse(p.vehicles || '[]').join('\n'),
    features: JSON.parse(p.features || '[]').join('\n'),
  };
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const isEdit = !!product;
  const [form, setForm] = useState<FormData>(productToForm(product));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function set(field: keyof FormData, value: string | number | boolean) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'category') next.categoryLabel = CATEGORY_LABELS[value as string] || '';
      if (field === 'model' && !isEdit) next.slug = toSlug(value as string);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      ...form,
      vehicles: form.vehicles.split('\n').map((v) => v.trim()).filter(Boolean),
      features: form.features.split('\n').map((f) => f.trim()).filter(Boolean),
    };

    try {
      const res = isEdit
        ? await fetch(`/api/products/${product!.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        : await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

      if (res.ok) {
        router.push('/admin/productos');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Error al guardar');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = 'w-full px-4 py-2.5 bg-[#0a0d14] border border-white/10 rounded-xl text-white font-body text-sm placeholder:text-white/20 focus:outline-none focus:border-[#1E40AF]/60 focus:ring-1 focus:ring-[#1E40AF]/30 transition-all';
  const labelClass = 'font-body text-xs text-white/40 uppercase tracking-wider mb-1.5 block';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <p className="font-body text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 space-y-5">
        <h2 className="font-headline text-lg text-white tracking-wide">INFORMACIÓN BÁSICA</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Modelo *</label>
            <input required value={form.model} onChange={(e) => set('model', e.target.value)} className={inputClass} placeholder="F60 DG (12X65 REF)" />
          </div>
          <div>
            <label className={labelClass}>Slug (URL)</label>
            <input value={form.slug} onChange={(e) => set('slug', e.target.value)} className={inputClass} placeholder="f60-dg-12x65" />
          </div>
        </div>

        <div>
          <label className={labelClass}>Título *</label>
          <input required value={form.title} onChange={(e) => set('title', e.target.value)} className={inputClass} placeholder="Batería Pioneiro F60DG 12x65" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Categoría *</label>
            <select required value={form.category} onChange={(e) => set('category', e.target.value)} className={inputClass}>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Precio (texto) *</label>
            <input required value={form.price} onChange={(e) => set('price', e.target.value)} className={inputClass} placeholder="$ 109.990" />
          </div>
          <div>
            <label className={labelClass}>Precio (número) *</label>
            <input required type="number" value={form.priceNumber} onChange={(e) => set('priceNumber', Number(e.target.value))} className={inputClass} placeholder="109990" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Tag / Etiqueta</label>
            <input value={form.tag} onChange={(e) => set('tag', e.target.value)} className={inputClass} placeholder="Instalación Incluida" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Imagen del producto</label>
            <ImageUpload value={form.image} onChange={(url) => set('image', url)} />
          </div>
        </div>
      </div>

      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 space-y-5">
        <h2 className="font-headline text-lg text-white tracking-wide">ESPECIFICACIONES TÉCNICAS</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Voltaje</label>
            <input value={form.voltage} onChange={(e) => set('voltage', e.target.value)} className={inputClass} placeholder="12V" />
          </div>
          <div>
            <label className={labelClass}>Amperaje</label>
            <input value={form.amperage} onChange={(e) => set('amperage', e.target.value)} className={inputClass} placeholder="60 Ah" />
          </div>
          <div>
            <label className={labelClass}>CCA</label>
            <input value={form.cca} onChange={(e) => set('cca', e.target.value)} className={inputClass} placeholder="480 CCA" />
          </div>
          <div>
            <label className={labelClass}>Garantía (texto)</label>
            <input value={form.warranty} onChange={(e) => set('warranty', e.target.value)} className={inputClass} placeholder="24 Meses" />
          </div>
          <div>
            <label className={labelClass}>Garantía (meses)</label>
            <input type="number" value={form.warrantyMonths} onChange={(e) => set('warrantyMonths', Number(e.target.value))} className={inputClass} placeholder="24" />
          </div>
          <div>
            <label className={labelClass}>Tecnología</label>
            <input value={form.technology} onChange={(e) => set('technology', e.target.value)} className={inputClass} placeholder="Doble Grilla (DG)" />
          </div>
          <div>
            <label className={labelClass}>Dimensiones</label>
            <input value={form.dimensions} onChange={(e) => set('dimensions', e.target.value)} className={inputClass} placeholder="242 x 175 x 190 mm" />
          </div>
          <div>
            <label className={labelClass}>Peso</label>
            <input value={form.weight} onChange={(e) => set('weight', e.target.value)} className={inputClass} placeholder="14.2 kg" />
          </div>
        </div>
      </div>

      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 space-y-5">
        <h2 className="font-headline text-lg text-white tracking-wide">DESCRIPCIÓN Y CONTENIDO</h2>

        <div>
          <label className={labelClass}>Descripción</label>
          <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Descripción del producto..." />
        </div>

        <div>
          <label className={labelClass}>Vehículos compatibles (uno por línea)</label>
          <textarea value={form.vehicles} onChange={(e) => set('vehicles', e.target.value)} rows={4} className={`${inputClass} resize-none`} placeholder={'Ford Focus\nVolkswagen Gol\nPeugeot 208'} />
        </div>

        <div>
          <label className={labelClass}>Características (una por línea)</label>
          <textarea value={form.features} onChange={(e) => set('features', e.target.value)} rows={4} className={`${inputClass} resize-none`} placeholder={'Libre de mantenimiento\n24 meses de garantía'} />
        </div>
      </div>

      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => set('published', e.target.checked)}
            className="w-4 h-4 rounded border-white/20 bg-[#0a0d14] accent-[#1E40AF]"
          />
          <span className="font-body text-sm text-white">Publicado (visible en el sitio)</span>
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#1E40AF] hover:bg-[#1d3a9e] text-white px-8 py-3 rounded-xl font-label tracking-wider text-sm transition-colors disabled:opacity-50"
        >
          {loading ? 'GUARDANDO...' : isEdit ? 'GUARDAR CAMBIOS' : 'CREAR PRODUCTO'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/productos')}
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3 rounded-xl font-label tracking-wider text-sm transition-colors"
        >
          CANCELAR
        </button>
      </div>
    </form>
  );
}
