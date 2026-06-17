import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { WhatsAppIcon } from './WhatsAppIcon';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-surface-container-lowest z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-container/20 via-surface to-surface"></div>
        <div 
          className="w-full h-full object-cover opacity-[0.15] mix-blend-overlay" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_9tY7KlpLwNfAaFaKCJjKFb49JnX_22Rlx5O1yuZnRuLuE_IESJ0HmO81DrZMdf5vE2FC_IIgidNZsB8ml8RTSw7Bm1ZDg3fnMfDwUSC1t1vxM0yhSbqj6-7lo5gllYY4MUFtg9yVAM6bNU8AvvIPH5M5W9wChEVwuLKwZxspvycRszP0I5dKe3OSW3lnvuuGMsqS4MDDs00p5EOQn9ZYkJo51JSE3uVaqn2J0o-L5N4udRKSAO88yfxMKyHDaxK70hVLTpmW6gtn')" }}
        />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[1280px] mx-auto px-5 text-center md:text-left flex flex-col lg:flex-row items-center gap-16"
      >
        <div className="flex-1 space-y-8 max-w-2xl mx-auto lg:mx-0">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary-container/30 text-primary border border-primary/20 font-label tracking-widest text-sm mb-2 shadow-[0_0_15px_rgba(30,64,175,0.3)]"
            >
              LÍDERES EN SANTA FE
            </motion.span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-[75px] font-bold text-on-surface leading-[0.95] tracking-tight drop-shadow-lg">
              BATERÍAS A DOMICILIO <br className="hidden sm:block" />
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-[#1E40AF] to-[#60A5FA]">SANTA FE</span>
            </h1>
            <p className="font-body text-lg sm:text-xl text-on-surface-variant leading-relaxed">
              Baterías Pioneiro con <strong className="text-white">entrega y colocación SIN COSTO</strong> en Santa Fe · Envíos a todo el país 🇦🇷
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="https://wa.me/5493425190098?text=Hola,%20necesito%20una%20bater%C3%ADa%20para%20mi%20veh%C3%ADculo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-full font-label tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:-translate-y-0.5 w-full sm:w-auto"
              id="hero-whatsapp-cta"
              aria-label="Consultar por WhatsApp"
            >
              <WhatsAppIcon size={22} />
              CONSULTAR PRECIO
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-label tracking-widest hover:border-[#60A5FA] hover:text-[#60A5FA] transition-all w-full sm:w-auto"
              href="#productos"
            >
              VER CATÁLOGO
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full max-w-lg lg:max-w-none relative"
        >
          {/* Subtle glow behind battery */}
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full transform scale-75 z-0"></div>
          
          <img 
            alt="Batería Automotor Pioneiro - Entrega e instalación en Santa Fe" 
            className="w-full h-auto drop-shadow-[0_30px_40px_rgba(0,0,0,0.4)] hover:scale-[1.02] transition-transform duration-500 relative z-10" 
            loading="lazy"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfNFKmDsKdW1DjxPcOjQw0fPAFCxGpzZaXIdFiwvAhGJIwjNVrkv8wklhR71c1AdjEMxhc2iYGP6SaFd8gBWx2iVkQg4ERrBIK2THvua2Pqtp51UJm6PXDonGA-RxuZVYtDmVyYuMEi4SAx6pGANRhlIZkUrPKEXOechxqyeRGIg8ytTBpbWnKfDSnHW40xxbgsY4BTmOmzF-Tzhc62R5pQXTHXU91K00abW9LtlEGl1_jbn6mdYLZ0m_JKxqXyRka8eQr5nm2QmZh" 
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
