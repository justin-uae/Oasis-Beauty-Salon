import {notFound} from 'next/navigation';
import Hero from '../../components/Hero';
import PackageCard from '../../components/PackageCard';
import {giftOccasions} from '../../data/gifts';
import {spaPackages} from '../../data/packages';

export function generateStaticParams() { return giftOccasions.map((x) => ({slug: x.slug})); }

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const o = giftOccasions.find((x) => x.slug === slug);
  return {title: o ? `${o.name} Altrincham` : 'Beauty gifts', description: o?.lead};
}

export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const o = giftOccasions.find((x) => x.slug === slug);
  if (!o) notFound();
  return (
    <>
      <Hero title={o.name} lead={o.lead} />
      <section className="container py-16">
        <div className="prose max-w-4xl">
          <h2>Choosing a beauty gift</h2>
          <p>A spa package is an easy gift for someone who enjoys facials, massage or nail treatments. Each Oasis package has a clear list of what is included and can be bought for another person. Gift vouchers are also available for any amount.</p>
          <p>Before buying, contact the salon about voucher terms, treatment suitability and booking arrangements.</p>
          <h2>Spa packages to consider</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch mt-8">
          {spaPackages.map((p) => <PackageCard key={p.slug} p={p} detailHref={'/gift-packages/' + p.slug + '/'} />)}
        </div>
      </section>
    </>
  );
}
