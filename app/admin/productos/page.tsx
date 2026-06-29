import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { asc } from 'drizzle-orm';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { ProductsTable } from './ProductsTable';

async function getAllProducts() {
  try {
    return await db.select().from(products).orderBy(asc(products.id));
  } catch {
    return [];
  }
}

export default async function AdminProductsPage() {
  const allProducts = await getAllProducts();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-white tracking-wide">PRODUCTOS</h1>
          <p className="font-body text-sm text-white/40 mt-1">{allProducts.length} productos en total</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 bg-[#1E40AF] hover:bg-[#1d3a9e] text-white px-5 py-3 rounded-xl font-label text-sm tracking-wider transition-colors"
        >
          <Plus size={16} />
          NUEVO
        </Link>
      </div>

      <ProductsTable products={allProducts} />
    </div>
  );
}
