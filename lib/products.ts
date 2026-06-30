import type { NewProduct } from '@/lib/db/schema';

export function toSlug(text: string): string {
  return (text || '')
    .toLowerCase()
    .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e').replace(/[íìï]/g, 'i')
    .replace(/[óòö]/g, 'o').replace(/[úùü]/g, 'u').replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function str(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : v == null ? fallback : String(v);
}

function num(v: unknown, fallback = 0): number {
  const n = typeof v === 'number' ? v : parseFloat(String(v));
  return Number.isFinite(n) ? n : fallback;
}

function arr(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  if (typeof v === 'string') {
    return v.split('\n').map((x) => x.trim()).filter(Boolean);
  }
  return [];
}

/**
 * Whitelists and normalizes incoming product data so that volatile fields
 * coming from the client (id, createdAt, updatedAt) can never overwrite the row.
 * Returns null on validation error along with a human-readable message.
 */
type CleanProduct = Omit<NewProduct, 'id' | 'createdAt' | 'updatedAt'>;
type SanitizeResult =
  | { ok: true; data: CleanProduct }
  | { ok: false; error: string };

export function sanitizeProductInput(body: Record<string, unknown>): SanitizeResult {
  const model = str(body.model).trim();
  const title = str(body.title).trim();
  const price = str(body.price).trim();

  if (!model) return { ok: false, error: 'El modelo es obligatorio' };
  if (!title) return { ok: false, error: 'El título es obligatorio' };
  if (!price) return { ok: false, error: 'El precio (texto) es obligatorio' };

  const category = str(body.category, 'auto').trim() || 'auto';
  const slug = (toSlug(str(body.slug)) || toSlug(model) || toSlug(title)).trim();

  if (!slug) return { ok: false, error: 'No se pudo generar un slug válido' };

  const data = {
    slug,
    title,
    model,
    price,
    priceNumber: num(body.priceNumber),
    tag: str(body.tag).trim(),
    category,
    categoryLabel: str(body.categoryLabel).trim(),
    image: str(body.image).trim(),
    voltage: str(body.voltage, '12V').trim(),
    amperage: str(body.amperage).trim(),
    cca: str(body.cca).trim(),
    warranty: str(body.warranty).trim(),
    warrantyMonths: Math.round(num(body.warrantyMonths, 12)),
    technology: str(body.technology).trim(),
    dimensions: str(body.dimensions).trim(),
    weight: str(body.weight).trim(),
    vehicles: JSON.stringify(arr(body.vehicles)),
    description: str(body.description).trim(),
    features: JSON.stringify(arr(body.features)),
    published: body.published === undefined ? true : Boolean(body.published),
  };

  return { ok: true, data };
}
