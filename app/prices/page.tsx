import PackageCard from '@/app/components/PackageCard';
import {spaPackages} from '@/app/data/packages';
import {site} from '@/app/data/site';
import Image from 'next/image';
import {menuFlyer} from '@/app/data/media';

export const metadata = {title: 'Spa packages and prices Altrincham', description: 'Oasis Beauty Salon spa packages in Altrincham: Gold, Silver, Bronze and Detox packages combining facials, massage and nails.'};

export default function Prices() {
  return (
    <section className="container py-14 sm:py-16 lg:py-20">
      <div className="max-w-3xl mb-12">
        <p className="uppercase tracking-[.25em] text-bronze text-sm mb-4">Spa packages available</p>
        <h1 className="text-4xl sm:text-5xl mb-5">Spa packages</h1>
        <p className="text-black/60">Combine a facial, massage and nails in one relaxing visit. For individual treatments, please check availability on the <a className="underline" href={site.booking}>booking page</a> or contact the salon.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
        {spaPackages.map((p) => <PackageCard key={p.slug} p={p} detailHref={'/gift-packages/' + p.slug + '/'} />)}
      </div>
      <div className="card mt-14 p-6 sm:p-10 grid md:grid-cols-[1fr_260px] gap-8 items-center">
        <div>
          <h2 className="text-3xl">Our treatment menu</h2>
          <p className="mt-3 text-black/60">Facials, nails, brows &amp; lashes, hot stone massage, men&apos;s treatments and scalp micro pigmentation. Ask the salon or check the booking page for individual treatment availability.</p>
          <a className="btn mt-6" href={site.booking}>Book now</a>
        </div>
        {menuFlyer.type === 'image' && <Image src={menuFlyer.src} alt={menuFlyer.alt} width={634} height={1600} className="w-full max-w-[260px] h-auto mx-auto rounded-xl border border-line" />}
      </div>
    </section>
  );
}
