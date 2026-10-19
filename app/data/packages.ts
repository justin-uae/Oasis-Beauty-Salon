export type SpaPackage = {slug: string; name: string; headline: string; includes: string[]; duration: string; price: number};

export const spaPackages: SpaPackage[] = [
  {slug: 'gold-package', name: 'Gold Package', headline: 'Hot stone massage, facial, gel polish on nails and toes', includes: ['Facial', 'Hot stone massage', 'Gel polish on nails', 'Gel polish on toes'], duration: '2 hrs 30 min', price: 180},
  {slug: 'silver-package', name: 'Silver Package', headline: 'Facial, back and scalp massage', includes: ['Facial', 'Back massage', 'Scalp massage'], duration: '1 hr 45 min', price: 145},
  {slug: 'bronze-package', name: 'Bronze Package', headline: 'Back massage, facial and manicure', includes: ['Facial', 'Back massage', 'Manicure'], duration: '1 hr 45 min', price: 105},
  {slug: 'detox-package', name: 'Detox Package', headline: 'Back massage, facial and ear candles', includes: ['Facial', 'Back massage', 'Ear candling'], duration: '1 hr 30 min', price: 105},
];
