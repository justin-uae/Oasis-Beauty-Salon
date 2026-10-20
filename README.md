# Oasis Beauty Salon website

Static website for Oasis Beauty Salon, 6a Old Market Place, Altrincham. Built with Next.js, React, TypeScript and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

## Build for upload

```bash
npm install
npm run build
```

The static site is generated in `out/`. Upload the contents of `out/` to the web root.

Stop `npm run dev` before running a build — both use the `.next` folder.

## Environment

- `.env` (project root, used at build time): `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, optional `NEXT_PUBLIC_GA_ID`. See `.env.example`.
- `.env` next to `submit.php` on the server: `RECAPTCHA_SECRET_KEY`, `NOTIFY_EMAIL`, `FROM_EMAIL`. See `public/.env.example`. The contact form will not send until the secret key is set. `.htaccess` blocks web access to `.env` files.

## Content

- **Treatments** (`app/data/services.ts`): the 14 services from the salon flyer, grouped into Facials, Nails, Brows & Lashes and And more.
- **Spa packages** (`app/data/packages.ts`): Gold, Silver, Bronze and Detox — the only published prices.
- **Photos and videos** (`app/data/media.ts`): each file in `public/images/salon/` and `public/videos/` is used in one place (the salon interior photo is shared by the home and team banners).
- 20 Trafford area pages, 18 local search guides and 10 gift occasion pages.

## Design

Colours are taken from the logo's rose-gold background. See `BRAND-KIT.md`.
