import Link from 'next/link';
import {Clock} from 'lucide-react';
import type {SpaPackage} from '@/app/data/packages';
import {site} from '@/app/data/site';

export default function PackageCard({p, detailHref}: {p: SpaPackage; detailHref?: string}) {
  return (
    <article className="card h-full overflow-hidden flex flex-col">
      <div className="metallic-bar px-6 py-4 text-sm uppercase tracking-[.2em] font-semibold">{p.name}</div>
      <div className="px-6 pt-6 flex-1">
        <h3 className="text-xl leading-snug">{p.headline}</h3>
        <p className="mt-3 flex items-center gap-2 text-sm text-black/55"><Clock size={16} aria-hidden="true" /> {p.duration}</p>
        <ul className="mt-5 space-y-2 text-black/70">
          {p.includes.map((t) => <li key={t}>• {t}</li>)}
        </ul>
      </div>
      <div className="px-6 pb-6 pt-5 mt-6 border-t border-line">
        <p className="text-3xl font-serif text-bronze-deep">£{p.price}</p>
        <div className={'mt-4 grid gap-2 ' + (detailHref ? 'grid-cols-2' : 'grid-cols-1')}>
          <a className="btn justify-center !px-3" href={site.booking}>Book now</a>
          {detailHref && <Link className="btn-alt justify-center !px-3" href={detailHref}>Details</Link>}
        </div>
      </div>
    </article>
  );
}
