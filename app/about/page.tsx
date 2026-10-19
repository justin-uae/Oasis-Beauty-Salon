import Hero from '../components/Hero';import {site} from '../data/site';
export const metadata={title:'About Oasis Beauty Salon',description:'Oasis Beauty Salon is an independent beauty salon in Altrincham offering facials, nails, brows and lashes, massage and spa packages.'};
const values=[['Skilled therapists','Every treatment is carried out by a trained therapist who takes the time to understand what you want before you sit down.'],['Relaxed setting','The salon on Old Market Place is set up as a calm, unhurried space away from the busy high street.'],['Honest advice','We recommend treatments and aftercare that suit your skin and budget, not the most expensive option on the menu.'],['Easy booking','Book online through Fresha in a couple of taps, or call and speak to the salon directly.']];
export default function Page(){return <>
<Hero title='About Oasis Beauty Salon' lead='An independent beauty salon in the heart of Altrincham, offering facials, nails, brows and lashes, massage and spa packages in a relaxed, welcoming space.' image='/images/salon/shopfront-corner.webp'/>
<section className='container py-16 max-w-4xl'>
<div className='prose'>
<p>Oasis Beauty Salon has been looking after clients in Altrincham for more than 15 years. What started as a small, local salon has grown into a trusted name across Trafford, while keeping the same personal approach that clients come back for.</p>
<p>We are based at {site.address}, just off the town centre, and welcome clients for everything from a quick manicure to a full spa package. Our therapists get to know your skin, your preferences and your routine, so every visit feels considered rather than rushed.</p>
<h2>What we do</h2>
<p>Our treatment menu covers facials, nails, brows and lashes, hot stone massage, treatments for men and scalp micro pigmentation, alongside our Gold, Silver, Bronze and Detox spa packages. Package details and prices are on our <a href='/prices/'>spa packages page</a>, and you can find out more about each treatment from our <a href='/treatment-finder/'>treatment finder</a>.</p>
<h2>Why clients choose Oasis</h2>
</div>
<div className='grid md:grid-cols-2 gap-5 mt-8'>{values.map(([t,d])=><div className='card p-7' key={t}><h3 className='text-xl mb-2'>{t}</h3><p className='text-black/65'>{d}</p></div>)}</div>
<div className='card p-8 mt-10'>
<h2 className='text-3xl mb-3'>Visit or book</h2>
<p className='text-black/65 mb-6'>Come and see the salon for yourself, or book online in advance to guarantee your preferred time.</p>
<div className='flex gap-3 flex-wrap'><a className='btn' href={site.booking}>Book now</a><a className='btn-alt' href='/contact/'>Get in touch</a></div>
</div>
</section>
</>}
