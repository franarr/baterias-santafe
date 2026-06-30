'use client';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Search, Zap, ShieldCheck, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import type { ParsedProduct } from '@/lib/db/schema';

const categories = [
  { value: 'all', label: 'Todas' },
  { value: 'auto', label: 'Autos' },
  { value: 'moto', label: 'Motos' },
  { value: 'camion', label: 'Camiones' },
  { value: 'start-stop', label: 'Start-Stop' },
];

export function CatalogView({ products }: { products: ParsedProduct[] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Lee filtros desde la URL al montar (?cat=auto, ?q=corolla) para que
  // funcionen los enlaces externos y el buscador del header.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    const q = params.get('q');
    if (cat && categories.some((c) => c.value === cat)) setActiveCategory(cat);
    if (q) setSearchQuery(q);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.vehicles.some((v) => v.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0c1322] pt-24 pb-32 md:pb-12">
      <div className="max-w-[1280px] mx-auto px-5 mb-8">
        <nav className="flex items-center gap-2 text-sm font-body text-white/40" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <ChevronRight size={14} />
          <span className="text-white/70">Productos</span>
        </nav>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 mb-12">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center md:text-left">
          <h1 className="font-display text-4xl md:text-6xl text-white tracking-wide mb-4">CATÁLOGO DE BATERÍAS</h1>
          <p className="font-body text-lg text-white/50 max-w-2xl">
            Baterías Pioneiro originales para autos, motos y camiones. Todas con entrega e instalación sin costo en Santa Fe y envíos a todo el país.
          </p>
        </motion.div>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-2.5 rounded-full font-label text-xs tracking-widest transition-all duration-200 border ${
                  activeCategory === cat.value
                    ? 'bg-[#1E40AF] text-white border-[#1E40AF] shadow-[0_0_15px_rgba(30,64,175,0.4)]'
                    : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat.label.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Buscar por modelo, marca o vehículo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-white font-body text-sm placeholder:text-white/30 focus:outline-none focus:border-[#1E40AF]/50 focus:ring-1 focus:ring-[#1E40AF]/30 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 mb-6">
        <p className="font-body text-sm text-white/30">
          {filtered.length} {filtered.length === 1 ? 'producto encontrado' : 'productos encontrados'}
        </p>
      </div>

      <div className="max-w-[1280px] mx-auto px-5">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-body text-xl text-white/40 mb-4">No se encontraron baterías con esa búsqueda.</p>
            <p className="font-body text-sm text-white/25">Probá con otro término o consultá por WhatsApp.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
              >
                <Link
                  href={`/productos/${product.slug}`}
                  className="block bg-[#111827] border border-white/5 rounded-2xl overflow-hidden hover:border-[#1E40AF]/30 hover:shadow-[0_0_30px_rgba(30,64,175,0.1)] transition-all duration-300 group h-full"
                >
                  <div className="relative bg-gradient-to-b from-[#0f1623] to-[#111827] p-6 flex items-center justify-center h-52 overflow-hidden">
                    <span className="absolute top-3 left-3 bg-[#1E40AF] text-white text-[10px] font-label tracking-widest px-3 py-1 rounded-full z-10">
                      {product.tag.toUpperCase()}
                    </span>
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-[70%] h-auto object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-lighten"
                        loading="lazy"
                      />
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <p className="font-label text-[10px] tracking-widest text-[#60A5FA] mb-1">{product.categoryLabel.toUpperCase()}</p>
                      <h3 className="font-headline text-xl text-white tracking-wide group-hover:text-[#60A5FA] transition-colors">{product.model}</h3>
                    </div>

                    <div className="flex items-center gap-4 text-white/40 text-xs font-body">
                      <span className="flex items-center gap-1"><Zap size={12} className="text-[#60A5FA]" />{product.amperage}</span>
                      <span className="flex items-center gap-1"><Zap size={12} className="text-[#60A5FA]" />{product.cca}</span>
                      <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-[#22C55E]" />{product.warranty}</span>
                    </div>

                    <p className="text-white/35 text-xs font-body line-clamp-2">{product.vehicles.slice(0, 4).join(', ')}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <p className="font-display text-2xl text-white">{product.price}</p>
                      <span className="text-[10px] font-label tracking-widest text-[#60A5FA] group-hover:translate-x-1 transition-transform">VER MÁS →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-[1280px] mx-auto px-5 mt-16 text-center">
        <p className="font-body text-white/40 text-sm mb-4">¿No encontrás la batería para tu vehículo? Consultanos.</p>
        <a
          href="https://wa.me/5493425190098?text=Hola,%20busco%20una%20bater%C3%ADa%20para%20mi%20veh%C3%ADculo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-3.5 rounded-full font-label tracking-widest text-sm hover:bg-[#128C7E] transition-colors shadow-[0_0_20px_rgba(37,211,102,0.3)]"
        >
          <WhatsAppIcon size={20} />
          CONSULTAR POR WHATSAPP
        </a>
      </div>
    </div>
  );
}
