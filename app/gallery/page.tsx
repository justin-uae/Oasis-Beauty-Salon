import Hero from "../components/Hero";
import Media from "../components/Media";
import { gallery } from "../data/media";
import { site } from "../data/site";

export const metadata = {
    title: "Salon gallery",
    description:
        "Photos and videos of recent nail, lash and brow work at Oasis Beauty Salon, 6a Old Market Place, Altrincham.",
};

export default function Page() {
    return (
        <>
            <Hero
                title="Salon gallery"
                lead="Recent nail, lash and brow work from the Oasis team, plus a look at the salon on Old Market Place."
            />
            <section className="container py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {gallery.map((m) => (
                        <figure className="card overflow-hidden" key={m.src}>
                            <div className="relative aspect-[3/4] bg-cream">
                                <Media item={m} sizes="(max-width:768px) 50vw,(max-width:1024px) 33vw,25vw" />
                                {m.type === "video" && (
                                    <span className="absolute top-3 left-3 rounded-full bg-ink/70 text-white text-[11px] uppercase tracking-widest px-2.5 py-1 pointer-events-none">Video</span>
                                )}
                            </div>
                            <figcaption className="px-4 py-3 text-sm sm:text-base font-serif">{m.caption}</figcaption>
                        </figure>
                    ))}
                </div>
                <div className="card p-8 mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                    <div>
                        <h2 className="text-2xl">See more of our work</h2>
                        <p className="mt-2 text-black/60">New photos and videos are shared regularly on our social pages.</p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <a className="btn" href={site.instagram}>Instagram</a>
                        <a className="btn-alt" href={site.facebook}>Facebook</a>
                    </div>
                </div>
            </section>
        </>
    );
}
