import Image from 'next/image';
import {site} from '@/app/data/site';

type Cta = {label: string; href: string; variant?: 'btn' | 'btn-alt'; external?: boolean};

const defaultCtas: Cta[] = [
  {label: 'Book now', href: site.booking, variant: 'btn'},
  {label: 'Spa packages', href: '/prices/', variant: 'btn-alt'},
];

export default function Hero({title, lead, image, video, ctas}: {title: string, lead: string, image?: string, video?: {src: string; poster: string}, ctas?: Cta[]}) {
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

  if (image || video) {
    return (
      <section className="page-hero" style={{'--hero-image': `url(${image ?? video?.poster})`} as React.CSSProperties}>
        {video && <video className="page-hero-video" src={video.src} poster={video.poster} autoPlay muted loop playsInline aria-hidden="true" />}
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
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <Image src="/Logo.png" alt="" width={406} height={172} className="w-3/4 max-w-[360px] h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
