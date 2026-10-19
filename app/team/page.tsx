import Hero from "../components/Hero";
import { site } from "../data/site";
export const metadata = {
  title: "Meet the team",
  description:
    "Meet the therapists at Oasis Beauty Salon in Altrincham and find the right booking option for your treatment.",
};
export default function Page() {
  return (
    <>
      <Hero
        title="Meet the team"
        lead="Find out who provides treatments at Oasis Beauty Salon and book through the salon appointment system."
        image="/images/salon/salon-interior.webp"
      />
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <article className="card p-8">
            <h2 className="text-3xl">Faz</h2>
            <p className="mt-3 text-black/65">
              Faz is listed as a senior therapist on the salon booking profile.
              Available services and appointment options are shown on the live
              booking menu.
            </p>
            <a className="btn mt-6" href={site.booking}>
              View appointments
            </a>
          </article>
          <article className="card p-8">
            <h2 className="text-3xl">Ester</h2>
            <p className="mt-3 text-black/65">
              Ester is listed as a therapist on the salon booking profile. Use
              the live booking menu to see current treatment options.
            </p>
            <a className="btn mt-6" href={site.booking}>
              View appointments
            </a>
          </article>
        </div>
      </section>
    </>
  );
}
