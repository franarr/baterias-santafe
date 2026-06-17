export interface Product {
  slug: string;
  title: string;
  model: string;
  price: string;
  priceNumber: number;
  tag: string;
  category: 'auto' | 'moto' | 'camion' | 'start-stop';
  categoryLabel: string;
  image: string;
  voltage: string;
  amperage: string;
  cca: string;
  warranty: string;
  warrantyMonths: number;
  technology: string;
  dimensions: string;
  weight: string;
  vehicles: string[];
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    slug: 'f45d-12x45',
    title: 'Batería Pioneiro F45D 12x45',
    model: 'F45D (12X45)',
    price: '$ 89.990',
    priceNumber: 89990,
    tag: 'Más Vendida',
    category: 'auto',
    categoryLabel: 'Autos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuTEqBJ5Xlx_2hpvxh9GsnLpmD6jv2i0NdHpeKY0EEVcC3mzl2NynzBJXWz1wR11cvKZBqX8SREfpqvrU8wpAe-FIL8pTL3P8zGjTT5mzROfnnYH_ubq-EVGfIz_mCb68Ne6YX_s9lH0hrvvrXioJuhntR-zufJyDgj9fNqXexUMqYEHc2NpF_kH0ZL6fUwg_vbDwXK2Wvz56FouuFbV-HRFCfDarR2RN1C1OHtI8BEySvRcqNIhIL2H7SkxhHdW7VEDKrWnCnw7Ey',
    voltage: '12V',
    amperage: '45 Ah',
    cca: '330 CCA',
    warranty: '18 Meses',
    warrantyMonths: 18,
    technology: 'Convencional',
    dimensions: '238 x 129 x 225 mm',
    weight: '11.5 kg',
    vehicles: ['Renault Clío', 'Ford Fiesta', 'Fiat Palio', 'Fiat Punto', 'Chevrolet Celta', 'Volkswagen Up!', 'Peugeot 107'],
    description: 'Batería Pioneiro F45D 12x45 ideal para autos compactos y city cars. Perfecta para vehículos con baja demanda eléctrica. Entrega e instalación sin costo en Santa Fe, envíos a todo el país. Garantía oficial de fábrica de 18 meses.',
    features: [
      'Libre de mantenimiento',
      'Indicador de carga visual',
      'Terminales de plomo reforzadas',
      'Resistente a vibraciones',
      'Ideal para city cars y autos compactos',
    ],
  },
  {
    slug: 'f50d-12x50',
    title: 'Batería Pioneiro F50D 12x50',
    model: 'F50D (12X50)',
    price: '$ 94.990',
    priceNumber: 94990,
    tag: 'Compactos',
    category: 'auto',
    categoryLabel: 'Autos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuTEqBJ5Xlx_2hpvxh9GsnLpmD6jv2i0NdHpeKY0EEVcC3mzl2NynzBJXWz1wR11cvKZBqX8SREfpqvrU8wpAe-FIL8pTL3P8zGjTT5mzROfnnYH_ubq-EVGfIz_mCb68Ne6YX_s9lH0hrvvrXioJuhntR-zufJyDgj9fNqXexUMqYEHc2NpF_kH0ZL6fUwg_vbDwXK2Wvz56FouuFbV-HRFCfDarR2RN1C1OHtI8BEySvRcqNIhIL2H7SkxhHdW7VEDKrWnCnw7Ey',
    voltage: '12V',
    amperage: '50 Ah',
    cca: '370 CCA',
    warranty: '18 Meses',
    warrantyMonths: 18,
    technology: 'Convencional',
    dimensions: '238 x 175 x 190 mm',
    weight: '12.8 kg',
    vehicles: ['Toyota Etios', 'Chevrolet Onix', 'Nissan March', 'Renault Logan', 'Fiat Mobi', 'Volkswagen Voyage'],
    description: 'Batería Pioneiro F50D 12x50 para autos medianos y sedanes compactos. Mayor capacidad de arranque para climas fríos. Con entrega a domicilio e instalación incluida en Santa Fe capital y alrededores.',
    features: [
      'Libre de mantenimiento',
      'Mayor reserva de energía que la F45D',
      'Arranque confiable en bajas temperaturas',
      'Terminales reforzadas anti-corrosión',
      'Ideal para autos medianos y sedanes',
    ],
  },
  {
    slug: 'f60-dg-12x65',
    title: 'Batería Pioneiro F60DG 12x65',
    model: 'F60 DG (12X65 REF)',
    price: '$ 109.990',
    priceNumber: 109990,
    tag: 'Instalación Incluida',
    category: 'auto',
    categoryLabel: 'Autos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzfCgf0jGMxbypbuitrUMIPHI2oG0NMngkfHHXl5JkxPgMgMDmWKvvwwX2Ixg1Gr4e-ia7YhA09zN9nSHZgpL7QgVQGYKyE_msV6xprqeeFn_lKhHx1g5qGSXQ0nnNu43tX_zlplSYM1nmicNh2_OZrF7HDZr2NLP9iuNd-M1MMQoadNwzdmzexkvd4HyaQKijJyW4rHBTFgdlXyLSALfTzAy_Vwc1x3VNpAHFufWSkCisxaNhiTyho1lnDO10vQBCdZAasxVrY27c',
    voltage: '12V',
    amperage: '60 Ah',
    cca: '480 CCA',
    warranty: '24 Meses',
    warrantyMonths: 24,
    technology: 'Doble Grilla (DG)',
    dimensions: '242 x 175 x 190 mm',
    weight: '14.2 kg',
    vehicles: ['Ford Focus', 'Volkswagen Gol', 'Peugeot 208', 'Chevrolet Corsa', 'Fiat Cronos', 'Renault Sandero', 'Toyota Corolla', 'Citroën C3'],
    description: 'Batería Pioneiro F60DG 12x65 con tecnología Doble Grilla para mayor vida útil y rendimiento. Es la batería más versátil de la línea, compatible con la mayoría de autos medianos y sedanes. Entrega e instalación sin cargo en Santa Fe. Garantía de 24 meses.',
    features: [
      'Tecnología Doble Grilla (DG) para mayor durabilidad',
      'Libre de mantenimiento',
      'Alta corriente de arranque en frío (480 CCA)',
      'Compatible con la mayoría de sedanes y hatchbacks',
      '24 meses de garantía oficial Pioneiro',
    ],
  },
  {
    slug: 'f75pd-12x80',
    title: 'Batería Pioneiro F75PD 12x80',
    model: 'F75PD (12X80)',
    price: '$ 149.990',
    priceNumber: 149990,
    tag: 'Alta Performance',
    category: 'auto',
    categoryLabel: 'Autos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAllWp8yWG_A8jHuYQu-1Fm5JddHMH6sbTxXuWfiexN4JwBvJihtMp2Lh0Th_dr-dVoqKcmPpmiLBQjHWHm5qiqzG3fjDOWl5THKuJ55tOEGrBo_yx2ONtbBrA959UldU2F3M1kAoyLUGzFiSw9GZPZTkHOcbBsPL44CixseF_PzfacQr-c3q1DWC-HrFw6CoCiDReCseDk_jkDtPCrOC-nTagRE-R6sS0zj6IQ-Drgc-a0Yr5MvgJgacUgPN7lkLM3qyx0MFZQLyoF',
    voltage: '12V',
    amperage: '75 Ah',
    cca: '650 CCA',
    warranty: '18 Meses',
    warrantyMonths: 18,
    technology: 'Placa Delgada (PD)',
    dimensions: '278 x 175 x 190 mm',
    weight: '17.5 kg',
    vehicles: ['Audi A3', 'BMW Serie 3', 'Mercedes-Benz C200', 'Toyota Hilux', 'Ford Ranger', 'Volkswagen Amarok', 'Chevrolet S10'],
    description: 'Batería Pioneiro F75PD 12x80 de alta performance para vehículos premium, SUVs y camionetas. Tecnología Placa Delgada que entrega 650 CCA de corriente de arranque, ideal para motores de alta cilindrada. Instalación profesional sin cargo en Santa Fe.',
    features: [
      'Tecnología Placa Delgada (PD) de alta performance',
      '650 CCA de arranque para motores exigentes',
      'Ideal para SUVs, pickups y vehículos premium',
      'Libre de mantenimiento',
      'Soporta alta demanda de accesorios eléctricos',
    ],
  },
  {
    slug: 'efb60d-l2-start-stop',
    title: 'Batería Pioneiro EFB60D L2 Start-Stop',
    model: 'EFB60D L2',
    price: '$ 139.990',
    priceNumber: 139990,
    tag: 'Start-Stop',
    category: 'start-stop',
    categoryLabel: 'Start-Stop',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuj7tu4oG-r9qGfYy8M1wO1rS4MJ_Ry9a6ddfeC4fcVsGzukUe0VrmKyvdOSQGcxgp3Q70hIDe5IKwJeUeSjHLWb7vyR_gCyE_DelhSqVRknbPS_2ackeIjPZY_uMBL0DRd_NyVk5RKpzAhz_2btU2vfsBRw06pCq0BhcSbhE_DnvDsHqU_U4nXo5bw9RR4R9xNJsudrJ5CmqiMW5pbJDWa1H7-nYBBikfvzFv_RcRTvSLeXqtdlpCWlwd7PTGCgblM1zJ_5E63nde',
    voltage: '12V',
    amperage: '60 Ah',
    cca: '570 CCA',
    warranty: '24 Meses',
    warrantyMonths: 24,
    technology: 'EFB (Enhanced Flooded Battery)',
    dimensions: '242 x 175 x 190 mm',
    weight: '15.8 kg',
    vehicles: ['Fiat Argo', 'Fiat Cronos', 'Peugeot 208 (nuevo)', 'Citroën C3 Aircross', 'Volkswagen T-Cross', 'Volkswagen Polo', 'Jeep Renegade'],
    description: 'Batería Pioneiro EFB60D para vehículos con sistema Start-Stop. Tecnología EFB (Enhanced Flooded Battery) diseñada para soportar ciclos intensos de arranque y parada. No uses baterías convencionales en autos Start-Stop: dañan el sistema eléctrico. Envío e instalación sin costo en Santa Fe.',
    features: [
      'Tecnología EFB diseñada para sistemas Start-Stop',
      'Soporta hasta 2x más ciclos de carga que una convencional',
      '570 CCA de arranque garantizado',
      '24 meses de garantía oficial',
      'No reemplazable por baterías convencionales',
    ],
  },
  {
    slug: 'efb70d-l3-start-stop',
    title: 'Batería Pioneiro EFB70D L3 Start-Stop',
    model: 'EFB70D L3',
    price: '$ 169.990',
    priceNumber: 169990,
    tag: 'Start-Stop Premium',
    category: 'start-stop',
    categoryLabel: 'Start-Stop',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuj7tu4oG-r9qGfYy8M1wO1rS4MJ_Ry9a6ddfeC4fcVsGzukUe0VrmKyvdOSQGcxgp3Q70hIDe5IKwJeUeSjHLWb7vyR_gCyE_DelhSqVRknbPS_2ackeIjPZY_uMBL0DRd_NyVk5RKpzAhz_2btU2vfsBRw06pCq0BhcSbhE_DnvDsHqU_U4nXo5bw9RR4R9xNJsudrJ5CmqiMW5pbJDWa1H7-nYBBikfvzFv_RcRTvSLeXqtdlpCWlwd7PTGCgblM1zJ_5E63nde',
    voltage: '12V',
    amperage: '70 Ah',
    cca: '680 CCA',
    warranty: '24 Meses',
    warrantyMonths: 24,
    technology: 'EFB (Enhanced Flooded Battery)',
    dimensions: '278 x 175 x 190 mm',
    weight: '18.2 kg',
    vehicles: ['Volkswagen Vento', 'Ford Territory', 'Chevrolet Tracker', 'Peugeot 3008', 'Citroën C4 Cactus', 'Jeep Compass', 'Toyota RAV4'],
    description: 'Batería Pioneiro EFB70D L3 Start-Stop de alta capacidad para SUVs y vehículos premium con sistema Start-Stop. 680 CCA de potencia de arranque para motores grandes. Tecnología EFB reforzada para ciclos intensivos. Entrega a domicilio con instalación en Santa Fe.',
    features: [
      'EFB de alta capacidad para SUVs y premium',
      '680 CCA: arranque garantizado en cualquier clima',
      'Diseñada para alta demanda eléctrica + Start-Stop',
      '24 meses de garantía de fábrica',
      'Resistencia superior a descargas profundas',
    ],
  },
  {
    slug: 'f100pd-12x110',
    title: 'Batería Pioneiro F100PD 12x110',
    model: 'F100PD (12X110)',
    price: '$ 219.990',
    priceNumber: 219990,
    tag: 'Camiones',
    category: 'camion',
    categoryLabel: 'Camiones',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAllWp8yWG_A8jHuYQu-1Fm5JddHMH6sbTxXuWfiexN4JwBvJihtMp2Lh0Th_dr-dVoqKcmPpmiLBQjHWHm5qiqzG3fjDOWl5THKuJ55tOEGrBo_yx2ONtbBrA959UldU2F3M1kAoyLUGzFiSw9GZPZTkHOcbBsPL44CixseF_PzfacQr-c3q1DWC-HrFw6CoCiDReCseDk_jkDtPCrOC-nTagRE-R6sS0zj6IQ-Drgc-a0Yr5MvgJgacUgPN7lkLM3qyx0MFZQLyoF',
    voltage: '12V',
    amperage: '110 Ah',
    cca: '850 CCA',
    warranty: '18 Meses',
    warrantyMonths: 18,
    technology: 'Placa Delgada (PD)',
    dimensions: '330 x 173 x 240 mm',
    weight: '25.0 kg',
    vehicles: ['Mercedes-Benz Sprinter', 'Iveco Daily', 'Ford F-100', 'Ford Transit', 'Volkswagen Worker', 'Scania (auxiliar)', 'Volvo (auxiliar)'],
    description: 'Batería Pioneiro F100PD 12x110 de uso pesado para camiones, utilitarios y transporte comercial. 850 CCA de arranque para motores diésel de alta cilindrada. Tecnología Placa Delgada para máxima durabilidad en condiciones exigentes. Envío a todo el país.',
    features: [
      '110 Ah de capacidad para uso pesado',
      '850 CCA: arranca motores diésel sin problemas',
      'Ideal para camiones, Sprinters y utilitarios',
      'Construcción reforzada anti-vibración',
      'Apta para múltiples accesorios y equipos auxiliares',
    ],
  },
  {
    slug: 'mbr-4-bs-moto',
    title: 'Batería Pioneiro MBR 4 BS para Motos',
    model: 'MBR 4 BS',
    price: '$ 49.990',
    priceNumber: 49990,
    tag: 'Motos',
    category: 'moto',
    categoryLabel: 'Motos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuj7tu4oG-r9qGfYy8M1wO1rS4MJ_Ry9a6ddfeC4fcVsGzukUe0VrmKyvdOSQGcxgp3Q70hIDe5IKwJeUeSjHLWb7vyR_gCyE_DelhSqVRknbPS_2ackeIjPZY_uMBL0DRd_NyVk5RKpzAhz_2btU2vfsBRw06pCq0BhcSbhE_DnvDsHqU_U4nXo5bw9RR4R9xNJsudrJ5CmqiMW5pbJDWa1H7-nYBBikfvzFv_RcRTvSLeXqtdlpCWlwd7PTGCgblM1zJ_5E63nde',
    voltage: '12V',
    amperage: '4 Ah',
    cca: '50 CCA',
    warranty: '12 Meses',
    warrantyMonths: 12,
    technology: 'AGM Sellada',
    dimensions: '114 x 71 x 106 mm',
    weight: '1.6 kg',
    vehicles: ['Zanella ZR 150', 'Motomel Skua 150', 'Honda Wave 110', 'Yamaha YBR 125', 'Corven Energy 110', 'Gilera Smash 110'],
    description: 'Batería Pioneiro MBR 4 BS sellada AGM para motos de baja y media cilindrada. Libre de mantenimiento, no pierde ácido en ninguna posición. Ideal para motos de calle, delivery y uso diario. Envíos a todo el país.',
    features: [
      'Tecnología AGM sellada: no pierde líquido',
      'Se puede instalar en cualquier posición',
      'Ideal para motos 110cc y 150cc',
      'Arranque confiable incluso en frío',
      'Compacta y liviana (1.6 kg)',
    ],
  },
  {
    slug: 'mbr-7-bs-moto',
    title: 'Batería Pioneiro MBR 7 BS para Motos',
    model: 'MBR 7 BS',
    price: '$ 64.990',
    priceNumber: 64990,
    tag: 'Motos 250cc+',
    category: 'moto',
    categoryLabel: 'Motos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuj7tu4oG-r9qGfYy8M1wO1rS4MJ_Ry9a6ddfeC4fcVsGzukUe0VrmKyvdOSQGcxgp3Q70hIDe5IKwJeUeSjHLWb7vyR_gCyE_DelhSqVRknbPS_2ackeIjPZY_uMBL0DRd_NyVk5RKpzAhz_2btU2vfsBRw06pCq0BhcSbhE_DnvDsHqU_U4nXo5bw9RR4R9xNJsudrJ5CmqiMW5pbJDWa1H7-nYBBikfvzFv_RcRTvSLeXqtdlpCWlwd7PTGCgblM1zJ_5E63nde',
    voltage: '12V',
    amperage: '7 Ah',
    cca: '85 CCA',
    warranty: '12 Meses',
    warrantyMonths: 12,
    technology: 'AGM Sellada',
    dimensions: '150 x 87 x 94 mm',
    weight: '2.5 kg',
    vehicles: ['Yamaha FZ 250', 'Honda CB 250', 'KTM Duke 200', 'Bajaj Rouser 200', 'Benelli TNT 300', 'Honda XR 250 Tornado'],
    description: 'Batería Pioneiro MBR 7 BS sellada AGM para motos de media y alta cilindrada (200cc a 400cc). Mayor capacidad de arranque para motores más grandes. Libre de mantenimiento, tecnología sellada. Envío a todo el país con garantía oficial.',
    features: [
      'AGM sellada de mayor capacidad para motos 200cc-400cc',
      '85 CCA de arranque para motores más exigentes',
      'Libre de mantenimiento total',
      'Resistente a vibraciones de alta frecuencia',
      'Garantía oficial Pioneiro de 12 meses',
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string, limit = 3): Product[] {
  const current = getProductBySlug(currentSlug);
  if (!current) return products.slice(0, limit);
  
  // Prioritize same category, then different
  const sameCategory = products.filter(p => p.slug !== currentSlug && p.category === current.category);
  const different = products.filter(p => p.slug !== currentSlug && p.category !== current.category);
  
  return [...sameCategory, ...different].slice(0, limit);
}

export const categories = [
  { value: 'all', label: 'Todas' },
  { value: 'auto', label: 'Autos' },
  { value: 'moto', label: 'Motos' },
  { value: 'camion', label: 'Camiones' },
  { value: 'start-stop', label: 'Start-Stop' },
];
