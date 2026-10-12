# Highness Construction — website

Marketing website for **Highness Construction**, a RERA-registered real-estate developer in Lucknow
(plots, villas and apartments). It is a Next.js port of the approved single-file homepage prototype (v1.0):
same design, copy and interactions, at desktop and mobile sizes.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · plain CSS (no Tailwind, no UI libraries).
Fonts (Fraunces with its `opsz`/`SOFT` axes, and Manrope) are self-hosted with `next/font/local`, so the
build needs no network access.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Homepage — hero with project switch, search, trust strip, categories, listings with filters, map, featured launch, why us, steps, EMI calculator, stories, advisors, guides, FAQ, booking form |
| `/projects/[slug]` | One page per project (7), with price, EMI, possession, RERA link, amenities, progress and a pre-filled booking form |
| `/guides/[slug]` | Buyer guides (3) with related guides |
| `/api/book` | `POST` endpoint for site-visit requests |
| `/sitemap.xml`, `/robots.txt` | Generated from the data files |

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (type-checks too)
npm start        # serve the production build
```

Requires Node.js 18.18 or newer (20+ recommended).

## Editing content

All content lives in `src/data/`:

- `site.ts` — phone, WhatsApp link, RERA number, GSTIN, address, email
- `projects.ts` — the listings and Summit Twin Towers (price in rupees, status, possession, amenities…)
- `guides.ts`, `faq.ts`, `team.ts`, `stories.ts`, `localities.ts`

Images are in `public/img/`. EMI maths and ₹ formatting are in `src/lib/emi.ts`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need. Both are optional.

| Variable | Purpose |
| --- | --- |
| `BOOKING_WEBHOOK_URL` | Every valid site-visit request is also `POST`ed here as JSON (Zapier, Make, Google Apps Script, a CRM…). Without it, leads are only written to the server log. |
| `NEXT_PUBLIC_SITE_URL` | Public URL used for canonical links, Open Graph and the sitemap (default `https://highness.in`). |

### Booking API

`POST /api/book` with JSON `{ "name", "phone", "project", "day", "whatsapp" }`.
The name must have at least 2 letters, the phone must be a 10-digit Indian mobile number
(`+91` is accepted) and the project must be one of the project names. Success returns
`{ "ok": true, "advisor": "Anjali Sharma" }`; invalid input returns `400` with `{ "ok": false, "errors": { … } }`.

## Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo `ai-bitmonky/rahul_real_estate`.
2. Vercel detects Next.js automatically — keep the default settings.
3. (Optional) add `BOOKING_WEBHOOK_URL` and `NEXT_PUBLIC_SITE_URL` under **Environment Variables**.
4. Click **Deploy**.

After that, every push to `main` deploys automatically, and pull requests get preview links.
