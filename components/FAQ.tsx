'use client';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';

const faqs = [
  { q: '¿Hacen envíos a todo el país o solo en Santa Fe?', a: 'Ofrecemos entrega e instalación SIN COSTO en la ciudad de Santa Fe y alrededores. Para el resto del país realizamos envíos por correo o transporte privado. Consultanos por WhatsApp y te cotizamos el envío a tu ciudad en minutos.' },
  { q: '¿Cuánto demora la entrega e instalación en Santa Fe?', a: 'En la zona de Santa Fe capital y alrededores, nuestros técnicos llegan en menos de 45 minutos. La instalación se realiza en el acto, directamente en donde se encuentra tu vehículo: tu casa, trabajo o en la vía pública.' },
  { q: '¿Tienen garantía las baterías Pioneiro?', a: 'Sí. Todos nuestros productos son baterías Pioneiro 100% originales con garantía oficial de fábrica. La garantía va de 18 a 24 meses según el modelo: F45D (18 meses), F60DG (18 meses), EFB Start-Stop (24 meses) y otros modelos para camiones y motos. En caso de cualquier problema, gestionamos la garantía directamente nosotros.' },
  { q: '¿Cómo sé qué batería necesita mi auto?', a: 'Podés usar nuestro buscador de baterías en la web: elegís si es auto, moto o camión, seleccionás la marca y el modelo, y te recomendamos la batería correcta. También podés consultarnos directamente por WhatsApp indicando marca, modelo y año de tu vehículo y te asesoramos al instante.' },
  { q: '¿Cómo funciona el pago a domicilio?', a: 'Aceptamos efectivo, transferencia bancaria, Mercado Pago (con o sin tarjeta) y tarjetas de débito/crédito. El pago se realiza al momento de la entrega e instalación, directamente con el técnico. No se requiere pago previo para coordinar el servicio.' },
  { q: '¿Se llevan la batería vieja?', a: 'Sí. Retiramos tu batería usada sin cargo adicional para su correcto reciclaje y disposición final, conforme a las normativas ambientales vigentes en Argentina.' },
  { q: '¿Qué pasa si mi auto no arranca y necesito auxilio urgente?', a: 'Ofrecemos servicio de puente de baterías (arranque auxiliar). Si la batería no tiene solución, la reemplazamos en el acto. Contactanos por WhatsApp las 24 horas para coordinar la asistencia de emergencia.' },
  { q: '¿Las baterías Start-Stop son diferentes a las normales?', a: 'Sí, son tecnológicamente distintas. Las baterías EFB (Enhanced Flooded Battery) y AGM están diseñadas para vehículos con sistema Start-Stop, que apagan y encienden el motor en cada semáforo. Usar una batería convencional en estos autos deteriora la batería rápidamente y puede dañar el sistema eléctrico.' },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#111827] border-t border-white/5 relative overflow-hidden" id="faq">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '16px 16px' }}
      ></div>

      <div className="max-w-[900px] mx-auto px-5 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-on-surface tracking-wide">PREGUNTAS FRECUENTES</h2>
          <p className="text-on-surface-variant mt-4 font-body max-w-xl mx-auto leading-relaxed">
            Resolvemos tus dudas sobre nuestro servicio de baterías a domicilio en Santa Fe y envíos al resto del país.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="bg-[#0f1623] rounded-xl border border-white/[0.08] overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <h3 className="font-body text-base md:text-lg text-white font-semibold pr-6 leading-snug">{faq.q}</h3>
                <div className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${openIndex === idx ? 'rotate-45 border-[#60A5FA] text-[#60A5FA]' : 'border-white/20 text-white/40'}`}>
                  <Plus size={16} />
                </div>
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 font-body text-white/55 text-sm md:text-base leading-relaxed border-t border-white/5">
                  <p className="pt-4">{faq.a}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/40 font-body text-sm mb-4">¿Tenés otra pregunta? Escribinos directamente.</p>
          <a
            href="https://wa.me/5493425190098?text=Hola,%20tengo%20una%20consulta%20sobre%20bater%C3%ADas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-3.5 rounded-full font-label tracking-widest text-sm hover:bg-[#128C7E] transition-colors shadow-[0_0_20px_rgba(37,211,102,0.3)]"
          >
            <WhatsAppIcon size={20} />
            HACER UNA PREGUNTA
          </a>
        </div>
      </div>
    </section>
  );
}
