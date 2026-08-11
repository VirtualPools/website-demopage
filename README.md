# VirtualPools — /demo page

Single-page rebuild of the `/demo`, `/demo-step2`, `/demo-step3` Dorik pages as one React app with an internal 3-step lead form. React 18 + TypeScript, Vite, Tailwind CSS v4, Framer Motion, react-hook-form + zod.

## Running the project

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Opens the dev server at `http://localhost:5173`.

```bash
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build locally
```

## Environment variables

Copy `.env.example` to `.env` and fill in the real values:

```bash
cp .env.example .env
```

| Variable | Purpose |
|---|---|
| `VITE_N8N_WEBHOOK_URL` | n8n webhook that receives the step 1 and step 2 lead POSTs. If unset, submissions are logged to the console instead of sent, and the form still advances — useful for local dev. |
| `VITE_N8N_WEBHOOK_AUTH` | Optional. If set, sent as `Authorization: Bearer <value>` on the webhook POST. Adjust [src/lib/submitLead.ts](src/lib/submitLead.ts) if n8n expects a different header/scheme. |

## TODOs before shipping

**Lemcal embed** — [src/components/DemoForm/Step3.tsx](src/components/DemoForm/Step3.tsx) has a placeholder where the real Lemcal booking widget snippet needs to go (marked `{/* TODO: Lemcal embed */}`). There's also a commented-out sketch for prefilling `name`/`email` into the embed URL, pending confirmation that Lemcal supports it.

**Locally hosted assets** — everything below still points at the existing Dorik CDN and Google Fonts, flagged with `TODO` comments at each usage site:

- Client/testimonial logos and product screenshots in [src/data/content.ts](src/data/content.ts)
- The VirtualPools logo SVG (also in `content.ts`, reused by the header and footer)
- The `Plus Jakarta Sans` font, currently loaded from Google Fonts in [index.html](index.html) — swap for a self-hosted copy (e.g. `@fontsource/plus-jakarta-sans`)

## Decisions baked into this build

A couple of calls were made explicitly and are flagged in code in case they need to be reversed:

- **One form instance, not two.** The live site mounts a second, independent copy of the whole 3-step form further down the page. This rebuild has a single form in the hero, and the lower "Talk to us" CTA ([src/components/CtaBand.tsx](src/components/CtaBand.tsx)) just scrolls back up to it via `#demo-form`.
- **Step 2's webhook payload re-sends step 1's fields** (name/email/phone/company) alongside the new fields, rather than sending only what's new. See the comment in [src/lib/submitLead.ts](src/lib/submitLead.ts) — swap to a partial payload if the n8n workflow would rather look up step 1 by `leadId` itself.
- **Same webhook URL for both steps**, differentiated by a `step: 1 | 2` field in the payload. Split into two env vars/URLs if that's cleaner on the n8n side (also noted in `submitLead.ts`).
