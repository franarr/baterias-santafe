import { Header, MobileNav, WhatsAppFAB, Footer } from './components/Layout';
import { Hero } from './components/Hero';
import { ValueProps } from './components/ValueProps';
import { BatteryFinder } from './components/BatteryFinder';
import { Products } from './components/Products';
import { Services } from './components/Services';
import { Brands } from './components/Brands';
import { FAQ } from './components/FAQ';

export default function App() {
  return (
    <div className="bg-surface text-on-surface font-body antialiased overflow-x-hidden min-h-screen">
      <Header />
      <main className="pt-20 pb-24 md:pb-0">
        <Hero />
        <ValueProps />
        <BatteryFinder />
        <Products />
        <Brands />
        <FAQ />
        <Services />
      </main>
      <MobileNav />
      <WhatsAppFAB />
      <Footer />
    </div>
  );
}
