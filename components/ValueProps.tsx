'use client';
import { Truck, Wrench, ShieldCheck, Headset } from 'lucide-react';
import { motion } from 'motion/react';

const props = [
  { icon: <Truck size={32} />, title: 'ENTREGA SIN COSTO', desc: 'En Santa Fe y envíos a todo el país' },
  { icon: <Wrench size={32} />, title: 'INSTALACIÓN INCLUIDA', desc: 'Por técnicos expertos, en el lugar' },
  { icon: <ShieldCheck size={32} />, title: 'GARANTÍA OFICIAL', desc: 'Productos Pioneiro 100% originales' },
  { icon: <Headset size={32} />, title: 'ATENCIÓN PERSONALIZADA', desc: 'Asesoramiento técnico especializado' },
];

export function ValueProps() {
  return (
    <section className="py-16 bg-[#1E40AF] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }}></div>
      <div className="max-w-[1280px] mx-auto px-5 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {props.map((prop, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              key={idx}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center text-white border border-white/30 backdrop-blur-sm">
                {prop.icon}
              </div>
              <h3 className="font-headline text-lg md:text-xl tracking-wide text-white">{prop.title}</h3>
              <p className="font-body text-sm text-white/70">{prop.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
