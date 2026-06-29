'use client';
import { useState } from 'react';
import { Car, Bike, Truck, Search } from 'lucide-react';
import { motion } from 'motion/react';

const brands = ['Volkswagen', 'Ford', 'Chevrolet', 'Fiat', 'Peugeot', 'Renault', 'Toyota', 'Honda', 'Otra'];

export function BatteryFinder() {
  const [vehicle, setVehicle] = useState('Auto');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');

  const handleConsult = () => {
    const text = `Hola, necesito una batería para mi ${vehicle} ${brand} ${model}.`;
    window.open(`https://wa.me/5493425190098?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-20 bg-[#111827] relative overflow-hidden" id="buscador">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(96,165,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-container/10 via-surface to-surface"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-5 relative z-10"
      >
        <div className="bg-surface-container-highest p-8 md:p-12 rounded-3xl border border-outline-variant/20 shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl tracking-wide text-on-surface">¿QUÉ BATERÍA NECESITÁS?</h2>
            <p className="font-body text-on-surface-variant mt-2">Buscá por tu vehículo y te sugerimos la batería ideal.</p>
          </div>

          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleConsult(); }}>
            <div className="flex gap-4 p-2 bg-surface rounded-2xl border border-outline-variant/20 overflow-x-auto hide-scrollbar">
              {(['Auto', 'Moto', 'Camión'] as const).map((type) => {
                const Icon = type === 'Auto' ? Car : type === 'Moto' ? Bike : Truck;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setVehicle(type)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-label tracking-wider text-sm transition-all whitespace-nowrap ${
                      vehicle === type
                        ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(30,64,175,0.3)]'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <Icon size={18} />
                    {type.toUpperCase()}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-body text-sm text-on-surface-variant mb-2 block">Marca</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface font-body text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                >
                  <option value="">Seleccioná una marca</option>
                  {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="font-body text-sm text-on-surface-variant mb-2 block">Modelo</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="ej: Gol, Corolla, YBR 125..."
                  className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface font-body text-sm placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-primary-container text-white py-4 rounded-2xl font-label tracking-widest text-base hover:bg-[#1d3a9e] transition-all duration-300 shadow-[0_0_20px_rgba(30,64,175,0.3)]"
            >
              <Search size={20} />
              CONSULTAR POR WHATSAPP
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
