'use client';
import Link from 'next/link';
import Image from 'next/image';
import {useState} from 'react';
import {usePathname} from 'next/navigation';
import {Menu, X} from 'lucide-react';
import {site} from '@/app/data/site';

const navLinks: [string, string][] = [
  ['/', 'Home'],
  ['/about/', 'About'],
  ['/prices/', 'Spa packages'],
  ['/areas/', 'Areas'],
  ['/team/', 'Team'],
  ['/gallery/', 'Gallery'],
  ['/reviews/', 'Reviews'],
  ['/vouchers/', 'Vouchers'],
  ['/contact/', 'Contact'],
];

function isActive(pathname: string, href: string) {
  const clean = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);
  const path = clean(pathname || '/');
  const target = clean(href);
  return path === target || path.startsWith(target + '/');
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="bg-ink text-white text-sm">
        <div className="container flex justify-between py-2">
          <a href={'tel:' + site.phone.replace(/ /g, '')}><span className="opacity-80">Ready to Glow? Book Now:</span> {site.phone}</a>
          <span className="hidden sm:block">{site.address}</span>
        </div>
      </div>
      <header className="bg-white sticky top-0 z-50 border-b">
        <div className="container flex items-center justify-between py-3 sm:py-4">
          <Link href="/" onClick={() => setOpen(false)} className="shrink-0">
            <Image src="/Logo.png" alt="Oasis Beauty Salon" width={406} height={172} priority className="h-16 w-auto" />
          </Link>
          <nav className="hidden xl:flex items-center gap-0.5 text-sm flex-nowrap whitespace-nowrap">
            {navLinks.map(([href, label]) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={
                    'relative px-3 py-2 rounded-full font-medium whitespace-nowrap transition-colors duration-200 ' +
                    (active ? 'text-bronze bg-bronze/10' : 'text-ink/70 hover:text-bronze hover:bg-bronze/5')
                  }
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <a className="btn hidden xl:inline-flex" href={site.booking}>Book now</a>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="xl:hidden w-11 h-11 flex items-center justify-center rounded-full border border-line text-ink"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-nav" className="xl:hidden border-t border-line bg-white max-h-[calc(100vh-64px)] overflow-y-auto">
            <div className="container flex flex-col py-2">
              {navLinks.map(([href, label]) => {
                const active = isActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={
                      'py-3 border-b border-line last:border-none flex items-center justify-between font-medium ' +
                      (active ? 'text-bronze' : 'text-ink/80')
                    }
                  >
                    {label}
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-bronze" />}
                  </Link>
                );
              })}
              <a className="btn justify-center mt-4 mb-4" href={site.booking} onClick={() => setOpen(false)}>Book now</a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
