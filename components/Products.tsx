'use client';
import { Zap, ShieldCheck, Car, Bike, Truck, Power, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import type { ParsedProduct } from '@/lib/db/schema';

function CategoryIcon({ category }: { category: string }) {
  if (category === 'moto') return <Bike size={16} className="text-on-surface-variant" />;
  if (category === 'camion') return <Truck size={16} className="text-on-surface-variant" />;
  if (category === 'start-stop') return <Power size={16} className="text-on-surface-variant" />;
  return <Car size={16} className="text-on-surface-variant" />;
}

export function Products({ products }: { products: ParsedProduct[] }) {
  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-surface-container-lowest" id="productos">
      <div className="max-w-[1280px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl tracking-wide text-on-surface mb-3">BATERÍAS DESTACADAS</h2>
          <p className="font-body text-on-surface-variant">Pioneiro originales con garantía oficial · Entrega e instalación incluida en Santa Fe</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07, duration: 0.4 }}
            >
              <Link
                href={`/productos/${product.slug}`}
                className="block bg-[#111827] border border-white/5 rounded-2xl overflow-hidden hover:border-[#1E40AF]/30 hover:shadow-[0_0_30px_rgba(30,64,175,0.1)] transition-all duration-300 group h-full"
              >
                <div className="relative bg-gradient-to-b from-[#0f1623] to-[#111827] p-6 flex items-center justify-center h-48 overflow-hidden">
                  <span className="absolute top-3 left-3 bg-[#1E40AF] text-white text-[10px] font-label tracking-widest px-3 py-1 rounded-full z-10">
                    {product.tag.toUpperCase()}
                  </span>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-[65%] h-auto object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-lighten"
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <p className="font-label text-[10px] tracking-widest text-[#60A5FA] mb-1">{product.categoryLabel.toUpperCase()} · PIONEIRO</p>
                    <h3 className="font-headline text-xl text-white tracking-wide group-hover:text-[#60A5FA] transition-colors">{product.model}</h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-white/40 text-xs font-body">
                    <span className="flex items-center gap-1">
                      <CategoryIcon category={product.category} />
                      {product.vehicles.slice(0, 2).join(', ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-body text-white/40">
                    <span className="flex items-center gap-1"><Zap size={11} className="text-[#60A5FA]" />{product.amperage}</span>
                    <span className="flex items-center gap-1"><Zap size={11} className="text-[#60A5FA]" />{product.cca}</span>
                    <span className="flex items-center gap-1"><ShieldCheck size={11} className="text-[#22C55E]" />{product.warranty}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <p className="font-display text-2xl text-white">{product.price}</p>
                    <span className="text-[10px] font-label tracking-widest text-[#60A5FA] group-hover:translate-x-1 transition-transform">VER MÁS →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/productos"
            className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full font-label tracking-widest hover:border-[#60A5FA] hover:text-[#60A5FA] transition-all"
          >
            VER CATÁLOGO COMPLETO
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
