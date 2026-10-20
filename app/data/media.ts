// Media is not repeated within a page. Shared across pages: salon-interior (home + team banners) and the outside photos (gallery, About banner, Contact find-us).
export type MediaItem =
  | {type: 'image'; src: string; alt: string}
  | {type: 'video'; src: string; poster: string; alt: string};

const img = (name: string, alt: string): MediaItem => ({type: 'image', src: `/images/salon/${name}.webp`, alt});
const vid = (name: string, alt: string): Extract<MediaItem, {type: 'video'}> => ({type: 'video', src: `/videos/${name}.mp4`, poster: `/videos/posters/${name}.webp`, alt});

// Shown on the matching treatment page.
export const treatmentMedia: Partial<Record<string, MediaItem>> = {
  'hydrafacial': vid('hydrafacial', 'Hydrafacial treatment at Oasis'),
  'anti-ageing-facial': img('anti-wrinkle-treatment', 'Anti-wrinkle facial treatment'),
  'skin-tightening-and-lifting': img('facial-treatments', 'Skin tightening and lifting facial treatments'),
  'manicures': vid('manicure-you-deserve-this', 'Manicure at Oasis Beauty Salon'),
  'gel-nails-and-biab': vid('gel-nails-burgundy', 'Burgundy gel nails'),
  'pedicures': vid('pedicure-station', 'Pedicure station at Oasis'),
  'lash-extensions': vid('lash-extensions', 'Lash extensions'),
  'lvl-lashes': vid('lvl-lashes', 'LVL lash lift result'),
  'hot-stone-massage': img('treatment-room', 'Massage treatment room'),
};

export const reviewsVideo = vid('fresha-award', 'Fresha Highly Recommended award for Oasis Beauty Salon');
export const menuFlyer = img('treatment-menu-flyer', 'Oasis Beauty Salon treatment menu');

export const gallery: (MediaItem & {caption: string})[] = [
  {...img('nails-pink-sparkle', 'Pink sparkle gel nails'), caption: 'Pink sparkle gel'},
  {...vid('salon-walkthrough', 'A walk through Oasis Beauty Salon'), caption: 'Inside the salon'},
  {...vid('nails-soft-pink', 'Soft pink gel nails'), caption: 'Soft pink gel'},
  {...img('nails-silver-glitter', 'Silver glitter nails'), caption: 'Silver glitter'},
  {...vid('nails-forest-green', 'Forest green gel nails'), caption: 'Forest green gel'},
  {...img('nails-classic-red', 'Classic red nails'), caption: 'Classic red'},
  {...vid('lashes-and-brows', 'Lashes and brows'), caption: 'Lashes & brows'},
  {...img('nails-dark-cherry', 'Dark cherry gel nails'), caption: 'Dark cherry gel'},
  {...vid('nails-berry-sparkle', 'Berry sparkle nails'), caption: 'Berry sparkle'},
  {...img('nails-milky-white', 'Milky white BIAB nails'), caption: 'Milky white BIAB'},
  {...vid('nails-raspberry', 'Raspberry pink gel nails'), caption: 'Raspberry gel'},
  {...img('shopfront-corner', 'Oasis Beauty Salon building on Old Market Place'), caption: 'Our building on Old Market Place'},
  {...img('shopfront-street', 'Street view of Oasis Beauty Salon'), caption: 'Street view'},
  {...img('shopfront-windows', 'Oasis Beauty Salon windows on Old Market Place'), caption: 'Our windows on Old Market Place'},
  {...img('salon-entrance', 'Oasis Beauty Salon entrance at 6a Old Market Place'), caption: 'Our entrance at 6a'},
  {...img('reception', 'Reception with our Fresha award'), caption: 'Reception'},
  {...vid('nails-mauve', 'Mauve gel nails'), caption: 'Mauve gel'},
  {...vid('nails-rose-glitter', 'Rose glitter nails'), caption: 'Rose glitter'},
];
