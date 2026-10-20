import Hero from "../components/Hero";
import { site } from "../data/site";
export const metadata = {
  title: "Meet the team",
  description:
    "Meet the therapists at Oasis Beauty Salon in Altrincham.",
};
export default function Page() {
  return (
    <>
      <Hero
        title="Meet the team"
        lead="Meet the therapists who look after you at Oasis Beauty Salon."
        image="/images/salon/reception.webp"
      />
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <article className="card p-8">
            <h2 className="text-3xl">Faz</h2>
            <p className="mt-3 text-black/65">
              Senior therapist. Book an appointment with Faz online to see available times.
            </p>
            <a className="btn mt-6" href={site.booking}>
              Book now
            </a>
          </article>
          <article className="card p-8">
            <h2 className="text-3xl">Ester</h2>
            <p className="mt-3 text-black/65">
              Therapist. Book an appointment with Ester online to see available times.
            </p>
            <a className="btn mt-6" href={site.booking}>
              Book now
            </a>
          </article>
        </div>
      </section>
    </>
  );
}
