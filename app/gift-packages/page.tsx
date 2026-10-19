import Hero from '../components/Hero';
import PackageCard from '../components/PackageCard';
import {spaPackages} from '../data/packages';

export const metadata = {
  title: 'Spa packages Altrincham',
  description: 'Oasis Beauty Salon spa packages: Gold, Silver, Bronze and Detox. Book for yourself or give as a gift.',
};

export default function Page() {
  return (
    <>
      <Hero
        title="Spa packages"
        lead="Facials, massage and nails combined into one relaxing visit. Book one for yourself or give it as a gift."
        image="/images/salon/treatment-room.webp"
      />
      <section className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {spaPackages.map((p) => <PackageCard key={p.slug} p={p} detailHref={'/gift-packages/' + p.slug + '/'} />)}
        </div>
      </section>
    </>
  );
}
