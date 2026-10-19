import Image from "next/image";
import Hero from "../components/Hero";
const photos = [
    ["Salon interior", "salon-interior"],
    ["Treatment room", "treatment-room"],
    ["Facial treatments", "facial-treatments"],
    ["Fresha Highly Recommended 2025 and 2026", "fresha-awards"],
    ["Our shopfront on Old Market Place", "shopfront-corner"],
    ["Salon windows", "shopfront-windows"],
    ["Street view", "shopfront-street"],
    ["Entrance at 6a Old Market Place", "salon-entrance"],
];
export const metadata = {
    title: "Salon gallery",
    description:
        "Take a look inside Oasis Beauty Salon at 6a Old Market Place, Altrincham.",
};
export default function Page() {
    return (
        <>
            <Hero
                title="Salon gallery"
                lead="Take a look inside the salon and find us at 6a Old Market Place, Altrincham."
                image="/images/salon/salon-interior.webp"
            />
            <section className="container py-16">
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
                    {photos.map(([c, slug]) => (
                        <figure className="card overflow-hidden" key={slug}>
                            <div className="relative aspect-[3/4] bg-cream">
                                <Image
                                    src={`/images/salon/${slug}.webp`}
                                    alt={c}
                                    fill
                                    sizes="(max-width:640px) 100vw,(max-width:768px) 50vw,25vw"
                                    className="object-cover"
                                />
                            </div>
                            <figcaption className="p-5 text-lg font-serif">{c}</figcaption>
                        </figure>
                    ))}
                </div>
            </section>
        </>
    );
}
