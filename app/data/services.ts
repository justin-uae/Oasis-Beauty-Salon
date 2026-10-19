export const categories = ['Facials', 'Nails', 'Brows & Lashes', 'And more'] as const;
export type Category = (typeof categories)[number];
export type Service = {name: string; slug: string; category: Category; summary: string};

export const services: Service[] = [
  {name: 'Hydrafacial', slug: 'hydrafacial', category: 'Facials', summary: 'A deep cleansing, exfoliating and hydrating facial for fresh, glowing skin.'},
  {name: 'Teen Facial', slug: 'teen-facial', category: 'Facials', summary: 'A gentle facial designed for younger skin and early skincare routines.'},
  {name: 'Anti-Aging Facial', slug: 'anti-ageing-facial', category: 'Facials', summary: 'A facial focused on firmness, hydration and the look of fine lines.'},
  {name: 'Skin Tightening & Lifting', slug: 'skin-tightening-and-lifting', category: 'Facials', summary: 'A treatment aimed at a firmer, more lifted look to the face and neck.'},
  {name: 'Manicures', slug: 'manicures', category: 'Nails', summary: 'Shaping, cuticle care and a polished finish for neat, healthy-looking hands.'},
  {name: 'Gel Nails - BIAB Nail', slug: 'gel-nails-and-biab', category: 'Nails', summary: 'Long-lasting gel polish and BIAB (builder in a bottle) for strength and shine.'},
  {name: 'Pedicures', slug: 'pedicures', category: 'Nails', summary: 'Foot care, nail shaping and a polished finish for soft, tidy feet.'},
  {name: 'Callus Peel', slug: 'callus-peel', category: 'Nails', summary: 'A targeted treatment to soften and remove hard skin from the feet.'},
  {name: 'Threading & Waxing', slug: 'threading-and-waxing', category: 'Brows & Lashes', summary: 'Precise brow shaping and hair removal by threading or waxing.'},
  {name: 'Lash Extensions', slug: 'lash-extensions', category: 'Brows & Lashes', summary: 'Individually applied lashes for added length and fullness.'},
  {name: 'LVL Lashes', slug: 'lvl-lashes', category: 'Brows & Lashes', summary: 'A lash lift that lengthens, volumises and lifts your natural lashes.'},
  {name: 'Hot Stone Massage', slug: 'hot-stone-massage', category: 'And more', summary: 'A deeply relaxing massage using warmed stones to ease tension.'},
  {name: "Men's Treatments", slug: 'mens-treatments', category: 'And more', summary: 'Facials, massage, nail care and grooming treatments for men.'},
  {name: 'Scalp Micro Pigmentation', slug: 'scalp-micro-pigmentation', category: 'And more', summary: 'Cosmetic pigmentation that creates the look of fuller hair or a closely shaved finish.'},
];
