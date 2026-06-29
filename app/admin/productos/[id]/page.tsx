import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { ProductForm } from '../ProductForm';

async function getProduct(id: number) {
  try {
    const [p] = await db.select().from(products).where(eq(products.id, id));
    return p || null;
  } catch {
    return null;
  }
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(Number(id));
  if (!product) notFound();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-white tracking-wide">EDITAR PRODUCTO</h1>
        <p className="font-body text-sm text-white/40 mt-1">{product.model}</p>
      </div>
      <ProductForm product={product} />
    </div>
  );
}
