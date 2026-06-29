'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, BatteryCharging, Wrench, Home, Phone, Instagram, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WhatsAppIcon } from './WhatsAppIcon';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'INICIO', isRoute: true },
    { href: '/#buscador', label: '¿QUÉ BATERÍA?', isRoute: false },
    { href: '/productos', label: 'PRODUCTOS', isRoute: true },
    { href: '/#servicios', label: 'SERVICIOS', isRoute: false },
    { href: '/#contacto', label: 'CONTACTO', isRoute: false },
  ];

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-[#0a0d14]/95 backdrop-blur-md border-b border-[#1E40AF]/30 shadow-[0_2px_20px_rgba(30,64,175,0.15)] transition-all duration-300">
        <div className="flex items-center justify-between px-4 h-16 md:h-20 w-full max-w-[1280px] mx-auto">

          <Link className="flex items-center" href="/" aria-label="Inicio - Baterías Santa Fe">
            <img
              alt="Baterías Santa Fe Logo"
              className="h-14 md:h-20 w-auto object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
              src="/image/logo.svg"
              loading="eager"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            {navLinks.map(link => (
              link.isRoute ? (
                <Link key={link.href} className="text-white/60 font-label text-sm tracking-widest hover:text-white transition-colors duration-200 py-2" href={link.href}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} className="text-white/60 font-label text-sm tracking-widest hover:text-white transition-colors duration-200 py-2" href={link.href}>
                  {link.label}
                </a>
              )
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-white/60 hover:text-white transition-colors" aria-label="Buscar">
              <Search size={20} />
            </button>
            <a
              className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-label text-sm tracking-widest hover:bg-[#128C7E] transition-colors shadow-[0_0_15px_rgba(37,211,102,0.4)]"
              href="https://wa.me/5493425190098"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
            >
              <WhatsAppIcon size={18} />
              WHATSAPP
            </a>
          </div>

          <button
            className="md:hidden text-white/80 hover:text-[#60A5FA] transition-colors p-2 rounded-lg"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-0 right-0 z-40 bg-[#0a0d14] border-b border-[#1E40AF]/30 shadow-2xl md:hidden"
            >
              <nav className="flex flex-col px-6 py-4 gap-0" aria-label="Menú móvil">
                {navLinks.map(link => (
                  link.isRoute ? (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-label tracking-widest text-base text-white/60 hover:text-white py-4 border-b border-white/5 last:border-0 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      className="font-label tracking-widest text-base text-white/60 hover:text-white py-4 border-b border-white/5 last:border-0 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  )
                ))}
                <a
                  href="https://wa.me/5493425190098"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 mb-2 flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-xl font-label tracking-widest text-base hover:bg-[#128C7E] transition-colors shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                  onClick={() => setMenuOpen(false)}
                >
                  <WhatsAppIcon size={22} />
                  CONSULTAR POR WHATSAPP
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function MobileNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center py-2 px-2 bg-[#0a0d14]/98 border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.6)] z-30"
      aria-label="Navegación mobile"
    >
      <Link className="flex flex-col items-center gap-1 px-4 py-2 text-[#60A5FA]" href="/">
        <Home size={20} strokeWidth={2} />
        <span className="font-label text-[9px] tracking-widest">INICIO</span>
      </Link>
      <Link className="flex flex-col items-center gap-1 px-4 py-2 text-white/40 hover:text-white transition-colors" href="/productos">
        <BatteryCharging size={20} strokeWidth={2} />
        <span className="font-label text-[9px] tracking-widest">BATERÍAS</span>
      </Link>
      <a className="flex flex-col items-center gap-1 px-4 py-2 text-white/40 hover:text-white transition-colors" href="#servicios">
        <Wrench size={20} strokeWidth={2} />
        <span className="font-label text-[9px] tracking-widest">SERVICIOS</span>
      </a>
      <a
        className="flex flex-col items-center gap-1 px-4 py-2 text-[#25D366] hover:text-[#128C7E] transition-colors"
        href="https://wa.me/5493425190098"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon size={22} />
        <span className="font-label text-[9px] tracking-widest">WHATSAPP</span>
      </a>
    </nav>
  );
}

export function WhatsAppFAB() {
  return (
    <a
      className="fixed bottom-20 md:bottom-8 right-5 z-50 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,211,102,0.5)] whatsapp-pulse hover:scale-110 transition-transform"
      href="https://wa.me/5493425190098"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear con nosotros en WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="w-full relative bg-[#000000] border-t border-white/5 pt-14 pb-28 md:pb-12" id="contacto">
      <div className="max-w-[1280px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-center md:text-left">

          <div>
            <img
              alt="Baterías Santa Fe Logo"
              className="h-24 w-auto object-contain mx-auto md:mx-0 mb-5"
              style={{ filter: 'brightness(0) invert(1)' }}
              src="/image/logo.svg"
              loading="lazy"
            />
            <p className="font-body text-sm text-white/50 mb-2 leading-relaxed">
              Especialistas en baterías Pioneiro. Venta, entrega e instalación profesional.
            </p>
            <p className="font-body text-sm text-[#60A5FA] font-semibold">Envíos a todo el país 🇦🇷</p>
          </div>

          <div>
            <h4 className="font-headline text-xl mb-5 text-white tracking-wide">CATEGORÍAS</h4>
            <ul className="space-y-3 font-body text-sm text-white/50">
              <li><Link href="/productos?cat=auto" className="hover:text-white transition-colors">Baterías para Autos</Link></li>
              <li><Link href="/productos?cat=moto" className="hover:text-white transition-colors">Baterías para Motos</Link></li>
              <li><Link href="/productos?cat=camion" className="hover:text-white transition-colors">Baterías para Camiones</Link></li>
              <li><Link href="/productos?cat=start-stop" className="hover:text-white transition-colors">Baterías Start-Stop EFB</Link></li>
              <li><a href="/#buscador" className="hover:text-white transition-colors">Encontrar mi batería</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-xl mb-5 text-white tracking-wide">CONTACTO</h4>
            <ul className="space-y-4">
              <li>
                <a className="flex items-center justify-center md:justify-start gap-3 text-white/50 hover:text-[#25D366] transition-colors text-sm" href="https://wa.me/5493425190098" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={18} className="text-[#25D366] shrink-0" />
                  342 519-0098
                </a>
              </li>
              <li>
                <a className="flex items-center justify-center md:justify-start gap-3 text-white/50 hover:text-[#25D366] transition-colors text-sm" href="https://wa.me/5493425263236" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={18} className="text-[#25D366] shrink-0" />
                  342 526-3236
                </a>
              </li>
              <li>
                <a className="flex items-center justify-center md:justify-start gap-3 text-white/50 hover:text-[#E1306C] transition-colors text-sm" href="https://instagram.com/bateriassantafe" target="_blank" rel="noopener noreferrer">
                  <Instagram size={18} className="text-[#E1306C] shrink-0" />
                  @bateriassantafe
                </a>
              </li>
              <li>
                <div className="flex flex-col md:items-start items-center text-white/40 text-xs mt-2 gap-1">
                  <p className="font-semibold text-white/70">Horarios:</p>
                  <p>Lunes a Viernes: 8 a 18 hs</p>
                  <p>Sábados: 8 a 12 hs</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-xl mb-5 text-white tracking-wide">MEDIOS DE PAGO</h4>
            <div className="space-y-4">
              <p className="font-body text-sm text-white/50 leading-relaxed">
                Comprá sin salir de casa. Pagá como más te convenga.
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-white/60 text-xs border border-white/10 px-3 h-8 rounded bg-white/5">
                  <CreditCard size={14} className="text-[#60A5FA]" />
                  <span>Tarjeta</span>
                </div>
                <div className="h-8 px-3 rounded border border-white/10 flex items-center bg-white/5 font-bold text-[10px] tracking-wider text-white/60">MERCADO PAGO</div>
                <div className="h-8 px-3 rounded border border-white/10 flex items-center bg-white/5 font-bold text-[10px] tracking-wider text-white/60">TRANSFERENCIA</div>
                <div className="h-8 px-3 rounded border border-white/10 flex items-center bg-white/5 font-bold text-[10px] tracking-wider text-white/60">EFECTIVO</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/30 text-center">© 2026 BATERÍAS SANTA FE · TODOS LOS DERECHOS RESERVADOS</p>
          <p className="font-body text-xs text-white/20 text-center">Baterías Pioneiro · Envíos a todo el país</p>
        </div>
      </div>
    </footer>
  );
}
