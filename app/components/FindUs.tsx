import Image from 'next/image';
import {site} from '@/app/data/site';

const photos = [
  {src: '/images/salon/shopfront-corner.webp', title: 'The building', text: 'A red-brick corner building on Old Market Place with tall, arched sandstone windows at street level.'},
  {src: '/images/salon/shopfront-street.webp', title: 'From the street', text: 'The salon is on the ground floor. The entrance is on the left, just past the arched windows.'},
  {src: '/images/salon/shopfront-windows.webp', title: 'Our windows', text: 'Look for the Oasis Beauty Salon poster and the Highly Recommended sticker in the arched windows.'},
  {src: '/images/salon/salon-entrance.webp', title: 'Our entrance', text: 'Come in through the grey glass door marked 6a.'},
];

const mapQuery = encodeURIComponent(`Oasis Beauty Salon, ${site.address}`);

export default function FindUs() {
  return (
    <section id="find-us" className="container py-16 scroll-mt-24">
      <div className="max-w-3xl mb-10">
        <p className="uppercase tracking-[.25em] text-bronze text-sm mb-3">How to find us</p>
        <h2 className="text-3xl sm:text-4xl">{site.address}</h2>
        <p className="mt-3 text-black/60">We&apos;re in Altrincham town centre. Here&apos;s what the salon looks like from outside, so you can spot us easily.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {photos.map((p, i) => (
          <figure key={p.src} className="card overflow-hidden flex flex-col">
            <div className="relative aspect-[3/4] bg-cream">
              <Image src={p.src} alt={p.title + ' — Oasis Beauty Salon, Old Market Place'} fill sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" className="object-cover" />
              <span className="absolute top-3 left-3 w-8 h-8 rounded-full bg-ink/80 text-white text-sm font-semibold flex items-center justify-center">{i + 1}</span>
            </div>
            <figcaption className="p-5">
              <h3 className="text-lg">{p.title}</h3>
              <p className="mt-1 text-sm text-black/60">{p.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="card overflow-hidden mt-8 grid lg:grid-cols-[1fr_320px]">
        <iframe
          title="Map showing Oasis Beauty Salon"
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          className="w-full h-[320px] lg:h-full min-h-[320px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="p-7 flex flex-col justify-center">
          <h3 className="text-2xl">Getting here</h3>
          <p className="mt-3 text-black/60">We&apos;re on Old Market Place in Altrincham town centre, within walking distance of the shops and Altrincham Interchange.</p>
          <a className="btn mt-6 justify-center" href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`} target="_blank" rel="noopener noreferrer">Get directions</a>
        </div>
      </div>
    </section>
  );
}
