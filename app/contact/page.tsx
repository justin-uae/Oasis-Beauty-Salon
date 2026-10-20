import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';
import FindUs from '../components/FindUs';
import {site} from '../data/site';
import {Send, Sparkles, Phone, Mail, MapPin, Instagram} from 'lucide-react';

export const metadata = {title: 'Contact Oasis Beauty Salon', description: 'Get in touch with Oasis Beauty Salon in Altrincham — call, WhatsApp, email or send a message and our team will get back to you.'};

export default function Page() {
  return (
    <>
      <Hero title="Contact Oasis Beauty Salon" lead="Have a question about a treatment, a booking or a gift voucher? Send us a message or reach out directly and our team will get back to you."/>
      <section className="container py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="card p-5 sm:p-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-11 h-11 rounded-xl bg-bronze/90 text-white flex items-center justify-center"><Send size={20} /></span>
              <h2 className="text-3xl">Send a Message</h2>
            </div>
            <ContactForm />
          </div>

          <div className="card p-5 sm:p-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-11 h-11 rounded-xl bg-bronze/90 text-white flex items-center justify-center"><Sparkles size={20} /></span>
              <h2 className="text-3xl">Contact Details</h2>
            </div>
            <div className="grid gap-4">
              <a href={'tel:' + site.phone.replace(/ /g, '')} className="card p-5 flex items-start gap-4 bg-cream border-line">
                <span className="w-11 h-11 rounded-xl bg-bronze/10 text-bronze flex items-center justify-center shrink-0"><Phone size={20} /></span>
                <span>
                  <span className="block font-bold">Phone</span>
                  <span className="block text-black/65">{site.phone}</span>
                </span>
              </a>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="card p-5 flex items-start gap-4 bg-cream border-line">
                <span className="w-11 h-11 rounded-xl bg-bronze/10 text-bronze flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.697 4.611 1.902 6.484L4 29l7.72-1.862A11.93 11.93 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3zm0 21.75a9.7 9.7 0 0 1-4.95-1.357l-.355-.21-4.583 1.105 1.127-4.472-.232-.366A9.71 9.71 0 0 1 5.25 15c0-5.937 4.813-10.75 10.751-10.75S26.75 9.063 26.75 15 21.938 24.75 16.001 24.75z" /></svg>
                </span>
                <span>
                  <span className="block font-bold">WhatsApp</span>
                  <span className="block text-black/65">+{site.whatsapp}</span>
                </span>
              </a>
              <a href={'mailto:' + site.email} className="card p-5 flex items-start gap-4 bg-cream border-line">
                <span className="w-11 h-11 rounded-xl bg-bronze/10 text-bronze flex items-center justify-center shrink-0"><Mail size={20} /></span>
                <span>
                  <span className="block font-bold">Email</span>
                  <span className="block text-black/65">{site.email}</span>
                </span>
              </a>
              <div className="card p-5 flex items-start gap-4 bg-cream border-line">
                <span className="w-11 h-11 rounded-xl bg-bronze/10 text-bronze flex items-center justify-center shrink-0"><MapPin size={20} /></span>
                <span>
                  <span className="block font-bold">Address</span>
                  <span className="block text-black/65">{site.address}</span>
                  <a href="#find-us" className="block mt-1 text-sm underline text-bronze-deep">See photos &amp; map</a>
                </span>
              </div>
              <div className="card p-5 flex items-start gap-4 bg-cream border-line">
                <span className="w-11 h-11 rounded-xl bg-bronze/10 text-bronze flex items-center justify-center shrink-0"><Instagram size={20} /></span>
                <span>
                  <span className="block font-bold">Follow us</span>
                  <span className="block text-black/65"><a href={site.instagram}>Instagram</a> &middot; <a href={site.facebook}>Facebook</a></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FindUs />
    </>
  );
}
