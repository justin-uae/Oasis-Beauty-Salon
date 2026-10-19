import Link from 'next/link';
import {services} from '@/app/data/services';
import {site} from '@/app/data/site';
import LongContent from '@/app/components/LongContent';
import {notFound} from 'next/navigation';

export function generateStaticParams() { return services.map((s) => ({slug: s.slug})); }

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const s = services.find((x) => x.slug === slug);
  return {title: s ? `${s.name} Altrincham` : 'Beauty treatment', description: s ? `${s.summary} ${s.name} at Oasis Beauty Salon in Altrincham.` : ''};
}

export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return notFound();
  const related = services.filter((x) => x.category === s.category && x.slug !== s.slug);
  return (
    <section className="container py-14 sm:py-16 lg:py-20 max-w-4xl">
      <p className="uppercase tracking-[.25em] text-bronze text-sm mb-4">{s.category}</p>
      <h1 className="text-3xl sm:text-4xl md:text-5xl mb-5">{s.name} in Altrincham</h1>
      <p className="text-xl text-black/60 mb-8">{s.summary}</p>
      <div className="flex flex-wrap gap-3 mb-12">
        <a className="btn" href={site.booking}>Book now</a>
        <Link className="btn-alt" href="/prices/">Spa packages</Link>
      </div>
      <LongContent subject={s.name} />
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl mb-5">More {s.category.toLowerCase()} treatments</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => <Link className="px-4 py-2 bg-white border border-line rounded-full" href={'/treatments/' + r.slug + '/'} key={r.slug}>{r.name}</Link>)}
          </div>
        </div>
      )}
    </section>
  );
}
