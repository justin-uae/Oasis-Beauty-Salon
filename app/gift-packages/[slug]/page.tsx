import {notFound} from 'next/navigation';
import Link from 'next/link';
import Hero from '../../components/Hero';
import {spaPackages} from '../../data/packages';
import {site} from '../../data/site';

export function generateStaticParams() { return spaPackages.map((p) => ({slug: p.slug})); }

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const p = spaPackages.find((x) => x.slug === slug);
  return {title: p ? `${p.name} spa package Altrincham` : 'Spa package', description: p ? `${p.name}: ${p.headline}. ${p.duration}, £${p.price}.` : ''};
}

export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const p = spaPackages.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <>
      <Hero title={p.name} lead={p.headline + '.'} />
      <section className="container py-16 grid lg:grid-cols-[1fr_360px] gap-12">
        <article className="prose max-w-none">
          <h2>What is included</h2>
          <ul>{p.includes.map((t) => <li key={t}>{t}</li>)}</ul>
          <p>The full package takes around {p.duration}, so allow enough time to relax and enjoy each treatment without rushing.</p>
          <h2>A gift for someone else</h2>
          <p>This package can be bought for another person. When you contact the salon, provide the recipient&apos;s name and any short message you would like added. The salon can confirm the voucher format and redemption terms.</p>
          <h2>Before you book</h2>
          <p>Treatment suitability can vary, so please mention any allergies, skin concerns, pregnancy or health information to the salon before your appointment.</p>
        </article>
        <aside className="card overflow-hidden h-fit">
          <div className="metallic-bar px-7 py-3 text-sm uppercase tracking-[.2em] font-semibold">{p.name}</div>
          <div className="p-7">
            <p className="text-sm text-black/55">{p.duration}</p>
            <p className="text-4xl font-serif text-bronze-deep mt-2">£{p.price}</p>
            <a className="btn w-full justify-center mt-7" href={site.booking}>Book now</a>
            <a className="btn-alt w-full justify-center mt-3" href={`mailto:${site.email}?subject=${encodeURIComponent(p.name + ' gift enquiry')}`}>Buy as a gift</a>
            <Link className="block text-center mt-4 text-sm underline text-black/60" href="/gift-packages/">All spa packages</Link>
          </div>
        </aside>
      </section>
    </>
  );
}
