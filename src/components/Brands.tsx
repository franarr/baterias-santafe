import { motion } from 'motion/react';

export function Brands() {
  const brands = [
    'VOLKSWAGEN', 'FORD', 'CHEVROLET', 'FIAT', 'PEUGEOT', 'RENAULT', 'TOYOTA', 'HONDA', 'NISSAN', 'BMW', 'AUDI'
  ];

  return (
    <section className="py-12 bg-[#080b10] border-y border-white/5">
      <div className="max-w-[1280px] mx-auto px-5">
        <div className="mb-8 text-center">
          <h3 className="font-label text-sm tracking-[0.2em] text-on-surface-variant">BATERÍAS COMPATIBLES CON LAS MEJORES MARCAS</h3>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 md:gap-x-12">
          {brands.map((brand, idx) => (
            <div 
              key={idx} 
              className="font-display text-xl md:text-2xl text-on-surface-variant/50 tracking-wider hover:text-on-surface-variant transition-colors"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
