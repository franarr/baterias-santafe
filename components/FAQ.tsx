'use client';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';

const faqs = [
  { q: '¿Hacen envíos a todo el país o solo en Santa Fe?', a: 'Ofrecemos entrega e instalación SIN COSTO en la ciudad de Santa Fe y alrededores. Para el resto del país realizamos envíos por correo o transporte privado. Consultanos por WhatsApp y te cotizamos el envío a tu ciudad en minutos.' },
  { q: '¿Cuánto demora la entrega e instalación en Santa Fe?', a: 'En la zona de Santa Fe capital y alrededores, nuestros técnicos llegan en menos de 45 minutos. La instalación se realiza en el acto, directamente en donde se encuentra tu vehículo: tu casa, trabajo o en la vía pública.' },
  { q: '¿Tienen garantía las baterías Pioneiro?', a: 'Sí. Todos nuestros productos son baterías Pioneiro 100% originales con garantía oficial de fábrica. La garantía va de 18 a 24 meses según el modelo.' },
  { q: '¿Cómo sé qué batería necesita mi auto?', a: 'Podés usar nuestro buscador de baterías en la web: elegís si es auto, moto o camión, seleccionás la marca y el modelo, y te recomendamos la batería correcta. También podés consultarnos directamente por WhatsApp.' },
  { q: '¿Cómo funciona el pago a domicilio?', a: 'Aceptamos efectivo, transferencia bancaria, Mercado Pago (con o sin tarjeta) y tarjetas de débito/crédito. El pago se realiza al momento de la entrega e instalación.' },
  { q: '¿Se llevan la batería vieja?', a: 'Sí. Retiramos tu batería usada sin cargo adicional para su correcto reciclaje y disposición final.' },
  { q: '¿Qué pasa si mi auto no arranca y necesito auxilio urgente?', a: 'Ofrecemos servicio de puente de baterías (arranque auxiliar). Si la batería no tiene solución, la reemplazamos en el acto. Contactanos por WhatsApp las 24 horas.' },
  { q: '¿Las baterías Start-Stop son diferentes a las normales?', a: 'Sí. Las baterías EFB están diseñadas para vehículos con sistema Start-Stop. Usar una batería convencional en estos autos deteriora la batería rápidamente y puede dañar el sistema eléctrico.' },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 bg-surface relative" id="faq">
      <div className="max-w-3xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl tracking-wide text-on-surface mb-3">PREGUNTAS FRECUENTES</h2>
          <p className="font-body text-on-surface-variant">Todo lo que necesitás saber sobre nuestras baterías y servicios.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-surface-container border border-outline-variant/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-container-high transition-colors"
              >
                <span className="font-body text-sm font-semibold text-on-surface pr-4">{faq.q}</span>
                <Plus size={18} className={`shrink-0 text-[#60A5FA] transition-transform ${open === idx ? 'rotate-45' : ''}`} />
              </button>
              {open === idx && (
                <div className="px-5 pb-5">
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-body text-on-surface-variant text-sm mb-4">¿Tenés otra pregunta? ¡Escribinos!</p>
          <a
            href="https://wa.me/5493425190098"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-3.5 rounded-full font-label tracking-widest text-sm hover:bg-[#128C7E] transition-colors shadow-[0_0_20px_rgba(37,211,102,0.3)]"
          >
            <WhatsAppIcon size={20} />
            CONSULTAR POR WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}
