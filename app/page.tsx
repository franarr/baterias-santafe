import { db } from '@/lib/db';
import { products as productsTable } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';
import { Header, MobileNav, WhatsAppFAB, Footer } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { ValueProps } from '@/components/ValueProps';
import { BatteryFinder } from '@/components/BatteryFinder';
import { Products } from '@/components/Products';
import { Services } from '@/components/Services';
import { Brands } from '@/components/Brands';
import { FAQ } from '@/components/FAQ';
import type { ParsedProduct } from '@/lib/db/schema';

async function getFeaturedProducts(): Promise<ParsedProduct[]> {
  try {
    const rows = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.published, true))
      .orderBy(asc(productsTable.id))
      .limit(6);

    return rows.map((p) => ({
      ...p,
      vehicles: JSON.parse(p.vehicles || '[]'),
      features: JSON.parse(p.features || '[]'),
    }));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="bg-surface text-on-surface font-body antialiased overflow-x-hidden min-h-screen">
      <Header />
      <main className="pt-20 pb-24 md:pb-0">
        <Hero />
        <ValueProps />
        <BatteryFinder />
        <Products products={featuredProducts} />
        <Brands />
        <FAQ />
        <Services />
      </main>
      <MobileNav />
      <WhatsAppFAB />
      <Footer />
    </div>
  );
}
