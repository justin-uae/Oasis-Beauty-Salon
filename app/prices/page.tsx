import PackageCard from '@/app/components/PackageCard';
import {spaPackages} from '@/app/data/packages';
import {site} from '@/app/data/site';

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
    </section>
  );
}
