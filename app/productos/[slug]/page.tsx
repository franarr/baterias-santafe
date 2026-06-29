import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { products as productsTable } from '@/lib/db/schema';
import { eq, and, ne, asc } from 'drizzle-orm';
import { Header, MobileNav, WhatsAppFAB, Footer } from '@/components/Layout';
import { ProductView } from '@/components/ProductView';
import type { ParsedProduct } from '@/lib/db/schema';

async function getProduct(slug: string): Promise<ParsedProduct | null> {
  try {
    const [p] = await db
      .select()
      .from(productsTable)
      .where(and(eq(productsTable.slug, slug), eq(productsTable.published, true)));

    if (!p) return null;
    return { ...p, vehicles: JSON.parse(p.vehicles || '[]'), features: JSON.parse(p.features || '[]') };
  } catch {
    return null;
  }
}

async function getRelated(currentSlug: string, category: string): Promise<ParsedProduct[]> {
  try {
    const same = await db
      .select()
      .from(productsTable)
      .where(
        and(
          eq(productsTable.category, category),
          ne(productsTable.slug, currentSlug),
          eq(productsTable.published, true)
        )
      )
      .orderBy(asc(productsTable.id))
      .limit(3);

    if (same.length >= 3) {
      return same.map((p) => ({ ...p, vehicles: JSON.parse(p.vehicles || '[]'), features: JSON.parse(p.features || '[]') }));
    }

    const diff = await db
      .select()
      .from(productsTable)
      .where(
        and(
          ne(productsTable.category, category),
          ne(productsTable.slug, currentSlug),
          eq(productsTable.published, true)
        )
      )
      .orderBy(asc(productsTable.id))
      .limit(3 - same.length);

    return [...same, ...diff].map((p) => ({
      ...p,
      vehicles: JSON.parse(p.vehicles || '[]'),
      features: JSON.parse(p.features || '[]'),
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.title} | Baterías Santa Fe`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const related = await getRelated(slug, product.category);

  return (
    <div className="bg-surface text-on-surface font-body antialiased overflow-x-hidden min-h-screen">
      <Header />
      <main className="pt-20 pb-24 md:pb-0">
        <ProductView product={product} related={related} />
      </main>
      <MobileNav />
      <WhatsAppFAB />
      <Footer />
    </div>
  );
}
