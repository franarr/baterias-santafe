import { useState } from 'react';
import { Car, Bike, Truck, Search } from 'lucide-react';
import { motion } from 'motion/react';

export function BatteryFinder() {
  const [vehicle, setVehicle] = useState('Auto');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');

  const handleConsult = () => {
    const text = `Hola, necesito una batería para mi ${vehicle} ${brand} ${model}.`;
    window.open(`https://wa.me/5493425190098?text=${encodeURIComponent(text)}`, '_blank');
  };

  const brands = [
    'Volkswagen', 'Ford', 'Chevrolet', 'Fiat', 'Peugeot', 'Renault', 'Toyota', 'Honda', 'Otra'
  ];

  return (
    <section className="py-20 bg-[#111827] relative overflow-hidden" id="buscador">
      {/* crosshair grid texture */}
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
          
          <form className="space-y-8">
            {/* Vehicle Type Tabs */}
            <div className="flex gap-4 p-2 bg-surface rounded-2xl border border-outline-variant/20 overflow-x-auto hide-scrollbar">
              <button 
                className={`flex-1 flex flex-col items-center gap-2 p-5 rounded-xl min-w-[100px] transition-all duration-300 ${vehicle === 'Auto' ? 'bg-[#1E40AF] text-white shadow-lg' : 'text-on-surface-variant hover:bg-surface-variant'}`} 
                type="button"
                onClick={() => setVehicle('Auto')}
              >
                <Car size={28} />
                <span className="font-label text-sm tracking-widest">AUTO</span>
              </button>
              <button 
                className={`flex-1 flex flex-col items-center gap-2 p-5 rounded-xl min-w-[100px] transition-all duration-300 ${vehicle === 'Moto' ? 'bg-[#1E40AF] text-white shadow-lg' : 'text-on-surface-variant hover:bg-surface-variant'}`} 
                type="button"
                onClick={() => setVehicle('Moto')}
              >
                <Bike size={28} />
                <span className="font-label text-sm tracking-widest">MOTO</span>
              </button>
              <button 
                className={`flex-1 flex flex-col items-center gap-2 p-5 rounded-xl min-w-[100px] transition-all duration-300 ${vehicle === 'Camión' ? 'bg-[#1E40AF] text-white shadow-lg' : 'text-on-surface-variant hover:bg-surface-variant'}`} 
                type="button"
                onClick={() => setVehicle('Camión')}
              >
                <Truck size={28} />
                <span className="font-label text-sm tracking-widest">CAMIÓN</span>
              </button>
            </div>
            
            {/* Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-label tracking-widest text-on-surface-variant block mb-3 text-sm">MARCA</label>
                <select 
                  className="w-full outline-hidden bg-surface border border-outline-variant/50 rounded-xl px-5 py-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body appearance-none cursor-pointer"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  <option value="" disabled>Seleccioná la marca</option>
                  {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              
              <div>
                <label className="font-label tracking-widest text-on-surface-variant block mb-3 text-sm">MODELO</label>
                <input 
                  className="w-full outline-hidden bg-surface border border-outline-variant/50 rounded-xl px-5 py-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body placeholder:text-on-surface-variant/30" 
                  placeholder="Ej: Gol Trend 1.6" 
                  type="text" 
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
            </div>
            
            <button 
              className="w-full flex items-center justify-center gap-3 bg-[#22C55E] text-white px-6 py-5 rounded-xl font-label tracking-widest text-xl hover:bg-[#16A34A] transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] cursor-pointer mt-4" 
              type="button"
              onClick={handleConsult}
            >
              <Search size={24} />
              ENCONTRAR MI BATERÍA
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
