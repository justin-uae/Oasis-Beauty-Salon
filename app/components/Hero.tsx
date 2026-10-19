import {site} from '@/app/data/site';

type Cta = {label: string; href: string; variant?: 'btn' | 'btn-alt'; external?: boolean};

const defaultCtas: Cta[] = [
  {label: 'Book now', href: site.booking, variant: 'btn'},
  {label: 'Spa packages', href: '/prices/', variant: 'btn-alt'},
];

export default function Hero({title, lead, image, ctas}: {title: string, lead: string, image?: string, ctas?: Cta[]}) {
  const buttons = ctas ?? defaultCtas;
  const ctaButtons = (
    <div className="flex flex-wrap gap-3">
      {buttons.map((c) => (
        <a
          key={c.label}
          className={c.variant === 'btn-alt' ? 'btn-alt' : 'btn'}
          href={c.href}
          {...(c.external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
        >
          {c.label}
        </a>
      ))}
    </div>
  );

  if (image) {
    return (
      <section className="page-hero" style={{'--hero-image': `url(${image})`} as React.CSSProperties}>
        <div className="container py-14 sm:py-16 lg:py-20">
          <div className="max-w-xl">
            <p className="uppercase tracking-[.28em] text-bronze text-xs sm:text-sm mb-4">Oasis Beauty Salon Altrincham</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">{title}</h1>
            <p className="text-base sm:text-lg text-black/70 max-w-xl mb-8">{lead}</p>
            {ctaButtons}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-pattern">
      <div className="container grid lg:grid-cols-2 items-center gap-10 lg:gap-12 py-14 sm:py-16 lg:py-20">
        <div>
          <p className="uppercase tracking-[.28em] text-bronze text-xs sm:text-sm mb-4">Oasis Beauty Salon Altrincham</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">{title}</h1>
          <p className="text-base sm:text-lg text-black/65 max-w-xl mb-8">{lead}</p>
          {ctaButtons}
        </div>
        <div className="relative min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] card overflow-hidden metallic">
          <div className="absolute inset-8 rounded-full border border-white/80"></div>
          <div className="absolute inset-20 rounded-full border border-white/60"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-serif">O</div>
            <p className="tracking-[.35em] text-xs">OASIS</p>
            <p className="text-xs mt-2">BEAUTY SALON</p>
          </div>
        </div>
      </div>
    </section>
  );
}
