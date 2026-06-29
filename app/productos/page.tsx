import { db } from '@/lib/db';
import { products as productsTable } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';
import { Header, MobileNav, WhatsAppFAB, Footer } from '@/components/Layout';
import { CatalogView } from '@/components/CatalogView';
import type { ParsedProduct } from '@/lib/db/schema';

export const metadata = {
  title: 'Catálogo de Baterías | Baterías Santa Fe',
  description: 'Baterías Pioneiro para autos, motos y camiones. Entrega e instalación sin costo en Santa Fe.',
};

async function getAllProducts(): Promise<ParsedProduct[]> {
  try {
    const rows = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.published, true))
      .orderBy(asc(productsTable.id));

    return rows.map((p) => ({
      ...p,
      vehicles: JSON.parse(p.vehicles || '[]'),
      features: JSON.parse(p.features || '[]'),
    }));
  } catch {
    return [];
  }
}

export default async function CatalogPage() {
  const products = await getAllProducts();

  return (
    <div className="bg-surface text-on-surface font-body antialiased overflow-x-hidden min-h-screen">
      <Header />
      <main className="pt-20 pb-24 md:pb-0">
        <CatalogView products={products} />
      </main>
      <MobileNav />
      <WhatsAppFAB />
      <Footer />
    </div>
  );
}
