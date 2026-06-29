'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ChevronRight, Zap, ShieldCheck, Ruler, Weight, BatteryCharging, Car, Check } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import type { ParsedProduct } from '@/lib/db/schema';

export function ProductView({ product, related }: { product: ParsedProduct; related: ParsedProduct[] }) {
  const whatsappMessage = encodeURIComponent(`Hola, quiero consultar por la ${product.title} (${product.price})`);

  return (
    <div className="min-h-screen bg-[#0c1322] pt-24 pb-32 md:pb-12">
      <div className="max-w-[1280px] mx-auto px-5 mb-8">
        <nav className="flex items-center gap-2 text-sm font-body text-white/40 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <ChevronRight size={14} />
          <Link href="/productos" className="hover:text-white transition-colors">Productos</Link>
          <ChevronRight size={14} />
          <span className="text-white/70">{product.model}</span>
        </nav>
      </div>

      <div className="max-w-[1280px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative">
            <div className="bg-[#111827] rounded-2xl border border-white/5 p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[#1E40AF]/5 blur-[80px] rounded-full"></div>
              <span className="absolute top-4 left-4 bg-[#1E40AF] text-white text-xs font-label tracking-widest px-4 py-1.5 rounded-full z-10">
                {product.tag.toUpperCase()}
              </span>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-[80%] h-auto object-contain relative z-10 mix-blend-lighten"
                  loading="eager"
                />
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="space-y-6">
            <span className="inline-block font-label text-[10px] tracking-widest text-[#60A5FA] bg-[#1E40AF]/10 px-3 py-1 rounded-full border border-[#1E40AF]/20">
              {product.categoryLabel.toUpperCase()} · PIONEIRO
            </span>

            <h1 className="font-display text-4xl md:text-5xl text-white tracking-wide leading-tight">{product.model}</h1>

            <p className="font-body text-white/50 leading-relaxed">{product.description}</p>

            <div className="flex items-end gap-4">
              <span className="font-display text-4xl md:text-5xl text-white">{product.price}</span>
              <span className="font-body text-sm text-white/30 pb-1">IVA incluido</span>
            </div>

            <div className="flex items-center gap-3 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-xl px-5 py-3">
              <Check size={18} className="text-[#22C55E] shrink-0" />
              <p className="font-body text-sm text-[#22C55E]">
                Entrega e instalación <strong>SIN COSTO</strong> en Santa Fe · Envíos a todo el país
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/5493425190098?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-label tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:bg-[#128C7E] hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <WhatsAppIcon size={22} />
                COMPRAR AHORA
              </a>
              <a
                href={`https://wa.me/5493425190098?text=${encodeURIComponent(`Hola, quiero consultar el precio actual de la ${product.model}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full font-label tracking-widest hover:border-[#60A5FA] hover:text-[#60A5FA] transition-all w-full sm:w-auto"
              >
                CONSULTAR PRECIO
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#111827] rounded-2xl border border-white/5 p-6 md:p-8">
            <h2 className="font-headline text-2xl text-white tracking-wide mb-6">FICHA TÉCNICA</h2>
            <div className="space-y-4">
              {[
                { icon: <BatteryCharging size={18} />, label: 'Voltaje', value: product.voltage },
                { icon: <Zap size={18} />, label: 'Capacidad', value: product.amperage },
                { icon: <Zap size={18} />, label: 'Corriente de arranque (CCA)', value: product.cca },
                { icon: <ShieldCheck size={18} />, label: 'Garantía', value: product.warranty },
                { icon: <Ruler size={18} />, label: 'Dimensiones', value: product.dimensions },
                { icon: <Weight size={18} />, label: 'Peso', value: product.weight },
                { icon: <BatteryCharging size={18} />, label: 'Tecnología', value: product.technology },
              ].map((spec, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3 text-white/40">
                    <span className="text-[#60A5FA]">{spec.icon}</span>
                    <span className="font-body text-sm">{spec.label}</span>
                  </div>
                  <span className="font-body text-sm text-white font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#111827] rounded-2xl border border-white/5 p-6 md:p-8">
              <h2 className="font-headline text-2xl text-white tracking-wide mb-6">CARACTERÍSTICAS</h2>
              <ul className="space-y-3">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={16} className="text-[#22C55E] shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-white/60">{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-[#111827] rounded-2xl border border-white/5 p-6 md:p-8">
              <h2 className="font-headline text-2xl text-white tracking-wide mb-6">VEHÍCULOS COMPATIBLES</h2>
              <div className="flex flex-wrap gap-2">
                {product.vehicles.map((vehicle, i) => (
                  <span key={i} className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/5 rounded-lg font-body text-xs text-white/60">
                    <Car size={12} className="text-[#60A5FA]" />
                    {vehicle}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="max-w-[1280px] mx-auto px-5 mt-20">
          <h2 className="font-display text-3xl text-white tracking-wide mb-8">TAMBIÉN TE PUEDE INTERESAR</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rp, idx) => (
              <motion.div
                key={rp.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <Link
                  href={`/productos/${rp.slug}`}
                  className="block bg-[#111827] border border-white/5 rounded-2xl overflow-hidden hover:border-[#1E40AF]/30 transition-all duration-300 group"
                >
                  <div className="bg-[#0f1623] p-6 flex items-center justify-center h-40 overflow-hidden">
                    {rp.image && (
                      <img
                        src={rp.image}
                        alt={rp.title}
                        className="w-[60%] h-auto object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-lighten"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="font-label text-[10px] tracking-widest text-[#60A5FA] mb-1">{rp.categoryLabel.toUpperCase()}</p>
                    <h3 className="font-headline text-lg text-white tracking-wide mb-2">{rp.model}</h3>
                    <p className="font-display text-xl text-white">{rp.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
