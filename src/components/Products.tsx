import { Zap, ShieldCheck, Car, Bike, Power } from 'lucide-react';
import { motion } from 'motion/react';

export function Products() {
  const products = [
    {
      title: 'F45D (12X45)',
      price: '$ 89.990',
      tag: 'Más Vendido',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuTEqBJ5Xlx_2hpvxh9GsnLpmD6jv2i0NdHpeKY0EEVcC3mzl2NynzBJXWz1wR11cvKZBqX8SREfpqvrU8wpAe-FIL8pTL3P8zGjTT5mzROfnnYH_ubq-EVGfIz_mCb68Ne6YX_s9lH0hrvvrXioJuhntR-zufJyDgj9fNqXexUMqYEHc2NpF_kH0ZL6fUwg_vbDwXK2Wvz56FouuFbV-HRFCfDarR2RN1C1OHtI8BEySvRcqNIhIL2H7SkxhHdW7VEDKrWnCnw7Ey',
      specs: [
        { icon: <Car size={16} className="text-on-surface-variant" />, text: 'Clío, Fiesta, Palio, Punto' },
        { icon: <Zap size={16} className="text-on-surface-variant" />, text: '45 Ah / 330 CCA' },
        { icon: <ShieldCheck size={16} className="text-on-surface-variant" />, text: '18 Meses Garantía' }
      ]
    },
    {
      title: 'F60 DG (12X65 REF)',
      price: '$ 109.990',
      tag: 'Instalación Incluida',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzfCgf0jGMxbypbuitrUMIPHI2oG0NMngkfHHXl5JkxPgMgMDmWKvvwwX2Ixg1Gr4e-ia7YhA09zN9nSHZgpL7QgVQGYKyE_msV6xprqeeFn_lKhHx1g5qGSXQ0nnNu43tX_zlplSYM1nmicNh2_OZrF7HDZr2NLP9iuNd-M1MMQoadNwzdmzexkvd4HyaQKijJyW4rHBTFgdlXyLSALfTzAy_Vwc1x3VNpAHFufWSkCisxaNhiTyho1lnDO10vQBCdZAasxVrY27c',
      specs: [
        { icon: <Car size={16} className="text-on-surface-variant" />, text: 'Focus, Gol, 208, Corsa' },
        { icon: <Zap size={16} className="text-on-surface-variant" />, text: '60 Ah / 480 CCA' },
        { icon: <ShieldCheck size={16} className="text-on-surface-variant" />, text: '24 Meses Garantía' }
      ]
    },
    {
      title: 'F75PD (12X80)',
      price: '$ 149.990',
      tag: 'Alta Performance',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAllWp8yWG_A8jHuYQu-1Fm5JddHMH6sbTxXuWfiexN4JwBvJihtMp2Lh0Th_dr-dVoqKcmPpmiLBQjHWHm5qiqzG3fjDOWl5THKuJ55tOEGrBo_yx2ONtbBrA959UldU2F3M1kAoyLUGzFiSw9GZPZTkHOcbBsPL44CixseF_PzfacQr-c3q1DWC-HrFw6CoCiDReCseDk_jkDtPCrOC-nTagRE-R6sS0zj6IQ-Drgc-a0Yr5MvgJgacUgPN7lkLM3qyx0MFZQLyoF',
      specs: [
        { icon: <Car size={16} className="text-on-surface-variant" />, text: 'Audi, BMW, MB C Class' },
        { icon: <Zap size={16} className="text-on-surface-variant" />, text: '75 Ah / 650 CCA' },
        { icon: <ShieldCheck size={16} className="text-on-surface-variant" />, text: '18 Meses Garantía' }
      ]
    },
    {
      title: 'EFB60D L2',
      price: '$ 139.990',
      tag: 'Start-Stop',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuj7tu4oG-r9qGfYy8M1wO1rS4MJ_Ry9a6ddfeC4fcVsGzukUe0VrmKyvdOSQGcxgp3Q70hIDe5IKwJeUeSjHLWb7vyR_gCyE_DelhSqVRknbPS_2ackeIjPZY_uMBL0DRd_NyVk5RKpzAhz_2btU2vfsBRw06pCq0BhcSbhE_DnvDsHqU_U4nXo5bw9RR4R9xNJsudrJ5CmqiMW5pbJDWa1H7-nYBBikfvzFv_RcRTvSLeXqtdlpCWlwd7PTGCgblM1zJ_5E63nde',
      specs: [
        { icon: <Power size={16} className="text-on-surface-variant" />, text: 'Start-Stop: Argo, Cronos, 208' },
        { icon: <Zap size={16} className="text-on-surface-variant" />, text: '60 Ah / 570 CCA' },
        { icon: <ShieldCheck size={16} className="text-on-surface-variant" />, text: '24 Meses Garantía' }
      ]
    },
    {
      title: 'MBR 4 BS (MOTO)',
      price: '$ 49.990',
      tag: 'Motocicletas',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuj7tu4oG-r9qGfYy8M1wO1rS4MJ_Ry9a6ddfeC4fcVsGzukUe0VrmKyvdOSQGcxgp3Q70hIDe5IKwJeUeSjHLWb7vyR_gCyE_DelhSqVRknbPS_2ackeIjPZY_uMBL0DRd_NyVk5RKpzAhz_2btU2vfsBRw06pCq0BhcSbhE_DnvDsHqU_U4nXo5bw9RR4R9xNJsudrJ5CmqiMW5pbJDWa1H7-nYBBikfvzFv_RcRTvSLeXqtdlpCWlwd7PTGCgblM1zJ_5E63nde',
      specs: [
        { icon: <Bike size={16} className="text-on-surface-variant" />, text: 'Skua, ZR y más' },
        { icon: <Zap size={16} className="text-on-surface-variant" />, text: '5 Ah' },
        { icon: <ShieldCheck size={16} className="text-on-surface-variant" />, text: 'Garantía Oficial' }
      ]
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#070e1d]" id="productos">
      {/* Decorative background lines/gradients */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary-container/5 via-[#070e1d] to-[#070e1d]"></div>
      
      <div className="max-w-[1280px] mx-auto px-5 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4"
        >
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-on-surface tracking-wide">PRODUCTOS DESTACADOS</h2>
            <p className="text-on-surface-variant mt-2 font-body text-base">Autos, Camionetas, Motos y Tecnología Start-Stop.</p>
          </div>
          <a 
            href="https://wa.me/5493425190098"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-fixed transition-colors font-label tracking-widest flex items-center gap-2 border-b border-primary pb-1"
          >
            VER TODOS LOS MODELOS
          </a>
        </motion.div>

        <div className="relative group flex overflow-hidden -mx-5 px-5 py-4">
          <motion.div 
            className="flex gap-8 w-max pr-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          >
            {[...products, ...products].map((product, idx) => (
              <div 
                key={idx} 
                className="w-[280px] sm:w-[320px] shrink-0 bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/10 hover:border-primary/50 hover:shadow-[0_10px_30px_rgba(30,64,175,0.2)] transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] p-6 bg-[#0a101d] flex items-center justify-center overflow-hidden">
                  <span className="absolute top-4 left-4 bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-10">
                    {product.tag}
                  </span>
                  <img 
                    className="w-[85%] h-auto object-contain hover:scale-110 transition-transform duration-500 relative z-0 mix-blend-lighten" 
                    alt={product.title}
                    loading="lazy"
                    src={product.image} 
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-headline text-2xl mb-1 text-on-surface tracking-wide">{product.title}</h3>
                  <div className="font-body text-2xl font-bold text-on-surface mb-6">{product.price}</div>
                  
                  <ul className="space-y-3 mb-8 text-sm text-on-surface-variant font-body flex-1">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-3">
                        {spec.icon} <span className="opacity-90">{spec.text}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a 
                    href={`https://wa.me/5493425190098?text=${encodeURIComponent('Hola, me interesa comprar la batería ' + product.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-[#1E40AF] text-white font-label tracking-widest py-3.5 rounded-xl hover:bg-[#173bab] hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer mt-auto"
                  >
                    COMPRAR AHORA
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
