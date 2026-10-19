import Link from 'next/link';
import {categories, services} from '@/app/data/services';

export default function TreatmentMenu() {
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat} className="bg-white rounded-2xl border border-line overflow-hidden shadow-[0_10px_30px_-18px_rgba(31,26,23,.35)] hover:shadow-[0_18px_40px_-18px_rgba(31,26,23,.45)] transition-shadow">
            <div className="menu-head relative px-6 py-5 text-ink">
              <h3 className="text-xl uppercase tracking-[.18em]">{cat}</h3>
            </div>
            <ul className="px-3 py-3">
              {services.filter((s) => s.category === cat).map((s) => (
                <li key={s.slug} className="border-b border-line/70 last:border-b-0">
                  <Link
                    href={'/treatments/' + s.slug + '/'}
                    className="block rounded-xl px-3 py-3 text-[15px] font-medium text-ink/80 hover:bg-cream hover:text-bronze-deep transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="metallic-soft mt-8 rounded-2xl px-5 py-7 sm:px-10 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
        <div>
          <p className="uppercase tracking-[.18em] sm:tracking-[.3em] text-[11px] sm:text-xs font-semibold text-ink/75">Spa packages available</p>
          <p className="font-serif text-xl sm:text-2xl text-ink mt-2 sm:mt-1">Facials, massage &amp; nails from £105</p>
        </div>
        <Link href="/prices/" className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center rounded-full bg-ink text-white px-6 py-3 font-semibold hover:bg-bronze-deep transition-colors">
          View packages
        </Link>
      </div>
    </div>
  );
}
