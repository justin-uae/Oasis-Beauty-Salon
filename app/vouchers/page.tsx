import Hero from "../components/Hero";

const GIFTUP_URL =
  "https://giftup.app/place-order/48e4af8e-f3ed-478c-b7ed-f83f6258be63?platform=hosted";

export const metadata = {
  title: "Gift vouchers",
  description:
    "Buy an Oasis Beauty Salon gift voucher online. Choose an amount, add a personal message and send it straight to the recipient.",
};

export default function Page() {
  return (
    <>
      <Hero
        title="Gift vouchers"
        lead="Treat someone to Oasis Beauty Salon with a digital gift voucher, delivered by email or ready to print."
        ctas={[{ label: "Buy a gift voucher", href: GIFTUP_URL, external: true }]}
      />
      <section className="container py-14 sm:py-16 lg:py-20 max-w-4xl">
        <div className="card p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl mb-3">Buy a gift voucher</h2>
          <p className="text-black/65 max-w-xl mx-auto mb-8">
            Choose your amount, add a personal message and send it straight
            to the recipient by email, or print it yourself. Vouchers can be
            redeemed against any treatment at Oasis Beauty Salon.
          </p>
          <a
            className="btn"
            href={GIFTUP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy a gift voucher
          </a>
        </div>

        <div className="prose mt-10">
          <p>
            Gift vouchers are sold securely through our voucher partner,
            GiftUp. Select the voucher, enter the recipient&apos;s details,
            complete payment and keep the issued PDF or email.
          </p>
          <p>
            The recipient can bring the voucher email or PDF to the salon.
            Voucher terms and remaining balance information should be checked
            with the voucher provider.
          </p>
        </div>
      </section>
    </>
  );
}
