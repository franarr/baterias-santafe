import { Hero } from '../components/Hero';
import { ValueProps } from '../components/ValueProps';
import { BatteryFinder } from '../components/BatteryFinder';
import { Products } from '../components/Products';
import { Services } from '../components/Services';
import { Brands } from '../components/Brands';
import { FAQ } from '../components/FAQ';

export function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <BatteryFinder />
      <Products />
      <Brands />
      <FAQ />
      <Services />
    </>
  );
}
