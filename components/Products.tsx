'use client';
import { Zap, ShieldCheck, Car, Bike, Truck, Power } from 'lucide-react';
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

  const duplicated = [...products, ...products];

  return (
    <section className="py-24 relative overflow-hidden bg-[#070e1d]" id="productos">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary-container/5 via-[#070e1d] to-[#070e1d]"></div>

      <div className="max-w-[1280px] mx-auto px-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4"
        >
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-on-surface tracking-wide">PRODUCTOS DESTACADOS</h2>
            <p className="text-on-surface-variant mt-2 font-body text-base">Autos, Camionetas, Motos y Tecnología Start-Stop.</p>
          </div>
          <Link
            href="/productos"
            className="text-primary hover:text-primary-fixed transition-colors font-label tracking-widest flex items-center gap-2 border-b border-primary pb-1"
          >
            VER TODOS LOS MODELOS
          </Link>
        </motion.div>

        <div className="relative flex overflow-hidden -mx-5 px-5 py-4">
          <motion.div
            className="flex gap-8 w-max pr-8"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
          >
            {duplicated.map((product, idx) => (
              <Link
                key={idx}
                href={`/productos/${product.slug}`}
                className="w-[280px] sm:w-[320px] shrink-0 bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/10 hover:border-primary/50 hover:shadow-[0_10px_30px_rgba(30,64,175,0.2)] transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] p-6 bg-[#0a101d] flex items-center justify-center overflow-hidden">
                  <span className="absolute top-4 left-4 bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-10">
                    {product.tag}
                  </span>
                  {product.image && (
                    <img
                      className="w-[85%] h-auto object-contain hover:scale-110 transition-transform duration-500 relative z-0 mix-blend-lighten"
                      alt={product.title}
                      loading="lazy"
                      src={product.image}
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="font-label text-[10px] tracking-widest text-[#60A5FA] mb-1">{product.categoryLabel.toUpperCase()} · PIONEIRO</p>
                  <h3 className="font-headline text-2xl mb-1 text-on-surface tracking-wide">{product.model}</h3>
                  <div className="font-body text-2xl font-bold text-on-surface mb-6">{product.price}</div>

                  <ul className="space-y-3 mb-8 text-sm text-on-surface-variant font-body flex-1">
                    <li className="flex items-center gap-3">
                      <CategoryIcon category={product.category} />
                      <span className="opacity-90">{product.vehicles.slice(0, 3).join(', ')}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Zap size={16} className="text-on-surface-variant" />
                      <span className="opacity-90">{product.amperage} / {product.cca}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <ShieldCheck size={16} className="text-on-surface-variant" />
                      <span className="opacity-90">{product.warranty}</span>
                    </li>
                  </ul>

                  <span className="block w-full text-center bg-[#1E40AF] text-white font-label tracking-widest py-3.5 rounded-xl hover:bg-[#173bab] hover:shadow-lg hover:shadow-primary/20 transition-all mt-auto">
                    VER MODELO
                  </span>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
