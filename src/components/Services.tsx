import { BatteryCharging, Cable, Gauge, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export function Services() {
  const servicesList = [
    {
      icon: <BatteryCharging size={28} />,
      title: 'VENTA Y COLOCACIÓN',
      desc: 'Llevamos e instalamos tu batería nueva donde estés, sin cargo adicional dentro de la ciudad de Santa Fe.',
    },
    {
      icon: <Cable size={28} />,
      title: 'PUENTE DE BATERÍAS',
      desc: '¿Te quedaste sin carga? Vamos a auxiliarte para que puedas seguir tu camino rápidamente.',
    },
    {
      icon: <Gauge size={28} />,
      title: 'TESTEO DE SISTEMA',
      desc: 'Revisamos el estado de tu batería y el sistema de carga de tu vehículo con equipos profesionales.',
    },
    {
      icon: <Building2 size={28} />,
      title: 'PRECIOS MAYORISTAS',
      desc: 'Ofrecemos descuentos especiales para revendedores y talleres mecánicos.',
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#0d1117] border-y border-white/5" id="servicios">
      {/* dot-grid texture */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #60A5FA 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#1E40AF]/50 to-transparent"></div>
      <div className="max-w-[1280px] mx-auto px-5 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-center mb-16 tracking-wide drop-shadow-sm">NUESTROS SERVICIOS</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesList.map((service, idx) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              key={idx} 
              className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 hover:border-primary/50 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-fixed mb-6 border border-primary-container/20">
                {service.icon}
              </div>
              <h3 className="font-headline text-2xl mb-4 tracking-wide">{service.title}</h3>
              <p className="text-on-surface-variant font-body mb-6 leading-relaxed text-sm">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
