'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RotateCw, Wand2, ImageOff, AlertCircle } from 'lucide-react';
import type { Product } from '@/lib/db/schema';
import { ImageUpload } from '@/components/ImageUpload';
import { useAdminUI, Spinner } from '@/components/admin/AdminUI';
import { toSlug } from '@/lib/products';

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

function formatPrice(n: number): string {
  if (!n || !Number.isFinite(n)) return '';
  return `$ ${n.toLocaleString('es-AR')}`;
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
    slug: p.slug, title: p.title, model: p.model, price: p.price,
    priceNumber: p.priceNumber ?? 0, tag: p.tag, category: p.category,
    categoryLabel: p.categoryLabel, image: p.image, voltage: p.voltage,
    amperage: p.amperage, cca: p.cca, warranty: p.warranty,
    warrantyMonths: p.warrantyMonths ?? 12, technology: p.technology,
    dimensions: p.dimensions, weight: p.weight,
    vehicles: JSON.parse(p.vehicles || '[]').join('\n'),
    description: p.description,
    features: JSON.parse(p.features || '[]').join('\n'),
    published: p.published,
  };
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const { toast } = useAdminUI();
  const isEdit = !!product;
  const [form, setForm] = useState<FormData>(productToForm(product));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewError, setPreviewError] = useState(false);

  function set(field: keyof FormData, value: string | number | boolean) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'category') next.categoryLabel = CATEGORY_LABELS[value as string] || '';
      // Auto-slug from model while it hasn't been manually set (new products)
      if (field === 'model' && !isEdit && (!prev.slug || prev.slug === toSlug(prev.model))) {
        next.slug = toSlug(value as string);
      }
      // Auto price text from number when text is still empty
      if (field === 'priceNumber' && !prev.price) {
        next.price = formatPrice(Number(value));
      }
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
        toast(isEdit ? 'Cambios guardados' : 'Producto creado', 'success');
        router.push('/admin/productos');
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = data.error || 'Error al guardar';
        setError(msg);
        toast(msg, 'error');
      }
    } catch {
      setError('Error de conexión');
      toast('Error de conexión', 'error');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = 'w-full px-4 py-2.5 bg-[#0a0d14] border border-white/10 rounded-xl text-white font-body text-sm placeholder:text-white/20 focus:outline-none focus:border-[#1E40AF]/60 focus:ring-1 focus:ring-[#1E40AF]/30 transition-all';
  const labelClass = 'font-body text-xs text-white/40 uppercase tracking-wider mb-1.5 block';

  const previewCategory = form.categoryLabel || CATEGORY_LABELS[form.category] || '';

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start max-w-5xl">
      {/* ---------------- Left: fields ---------------- */}
      <div className="space-y-6 min-w-0">
        {error && (
          <p className="font-body text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" /> {error}
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
              <div className="flex gap-2">
                <input value={form.slug} onChange={(e) => set('slug', e.target.value)} className={inputClass} placeholder="f60-dg-12x65" />
                <button
                  type="button"
                  onClick={() => set('slug', toSlug(form.model || form.title))}
                  title="Generar desde el modelo"
                  className="shrink-0 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <RotateCw size={15} />
                </button>
              </div>
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
              <label className={labelClass}>Precio (número) *</label>
              <input required type="number" value={form.priceNumber || ''} onChange={(e) => set('priceNumber', Number(e.target.value))} className={inputClass} placeholder="109990" />
            </div>
            <div>
              <label className={labelClass}>Precio (texto) *</label>
              <div className="flex gap-2">
                <input required value={form.price} onChange={(e) => set('price', e.target.value)} className={inputClass} placeholder="$ 109.990" />
                <button
                  type="button"
                  onClick={() => set('price', formatPrice(form.priceNumber))}
                  title="Formatear desde el número"
                  className="shrink-0 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <Wand2 size={15} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Tag / Etiqueta</label>
              <input value={form.tag} onChange={(e) => set('tag', e.target.value)} className={inputClass} placeholder="Instalación Incluida" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Imagen del producto</label>
            <ImageUpload value={form.image} onChange={(url) => set('image', url)} />
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
              <input type="number" value={form.warrantyMonths || ''} onChange={(e) => set('warrantyMonths', Number(e.target.value))} className={inputClass} placeholder="24" />
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

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#1E40AF] hover:bg-[#1d3a9e] text-white px-8 py-3 rounded-xl font-label tracking-wider text-sm transition-colors disabled:opacity-50"
          >
            {loading && <Spinner />}
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
      </div>

      {/* ---------------- Right: live preview + publish ---------------- */}
      <aside className="lg:sticky lg:top-8 space-y-4">
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-5">
          <p className="font-body text-[11px] text-white/30 uppercase tracking-wider mb-3">Vista previa</p>

          <div className="rounded-xl border border-white/5 bg-[#0a0d14] overflow-hidden">
            <div className="relative flex items-center justify-center min-h-[160px] p-5 bg-gradient-to-b from-white/[0.03] to-transparent">
              {form.tag && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#1E40AF] text-white text-[10px] font-label tracking-widest">
                  {form.tag.toUpperCase()}
                </span>
              )}
              {form.image && !previewError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.image}
                  alt={form.title || 'Producto'}
                  onError={() => setPreviewError(true)}
                  className="max-h-36 w-auto object-contain drop-shadow-lg"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-white/20">
                  <ImageOff size={28} />
                  <span className="font-body text-[11px]">Sin imagen</span>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/5">
              {previewCategory && (
                <p className="font-label text-[10px] tracking-widest text-[#60A5FA] mb-1">{previewCategory.toUpperCase()}</p>
              )}
              <p className="font-body text-sm text-white font-medium leading-tight">
                {form.title || 'Título del producto'}
              </p>
              {form.model && <p className="font-body text-xs text-white/30 mt-0.5">{form.model}</p>}
              <p className="font-display text-2xl text-white mt-2">
                {form.price || formatPrice(form.priceNumber) || '$ —'}
              </p>
              {(form.voltage || form.amperage || form.cca) && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {[form.voltage, form.amperage, form.cca].filter(Boolean).map((spec, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 text-white/50 text-[11px] font-body">
                      {spec}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#111827] border border-white/5 rounded-2xl p-5">
          <label className="flex items-center justify-between gap-3 cursor-pointer">
            <span>
              <span className="font-body text-sm text-white block">Publicado</span>
              <span className="font-body text-xs text-white/30">
                {form.published ? 'Visible en el sitio' : 'Guardado como borrador'}
              </span>
            </span>
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => set('published', e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-[#0a0d14] accent-[#1E40AF]"
            />
          </label>
        </div>
      </aside>
    </form>
  );
}
