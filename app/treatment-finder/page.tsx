import Hero from '../components/Hero';
import TreatmentMenu from '../components/TreatmentMenu';

export const metadata = {title: 'Treatment finder', description: 'Browse facials, nails, brows and lashes, massage and more at Oasis Beauty Salon Altrincham.'};

export default function Page() {
  return (
    <>
      <Hero title="Treatment finder" lead="Choose a treatment to see what it involves, how to prepare and how to book." />
      <section className="container py-16">
        <TreatmentMenu />
      </section>
    </>
  );
}
