# Noya Tech — fictional Moroccan computer shop

A complete, responsive storefront demo built with React, Vite, and TypeScript. The catalogue contains six fictional products with illustrative specifications and **sample prices in MAD**. The artwork is original local SVG/CSS, and DM Sans is bundled locally. No paid service, remote photos, backend, payment processing, fake reviews, or API keys are required.

## Install and run

Use **Node.js 22.12+ or 24 LTS** and npm. This environment was verified with Node.js 24.19.0.

```sh
cd /workspace/pc-sales
npm ci
npm run dev
```

For a normal local clone, replace the first line with `cd pc-sales`. Vite prints its local address (normally port 5173). The development server binds to all interfaces for cloud environments; to restrict it to your own computer, run `npm run dev -- --host 127.0.0.1`.

```sh
npm run build       # strict TypeScript check + optimized production build
npm run preview     # serve the production build, normally on port 4173
npm test            # catalogue, validation, number safety, and URL encoding tests
npm run test:e2e    # Chromium browser checks at desktop and mobile sizes
```

The browser tests use `/usr/bin/chromium` when available. Otherwise, install the Playwright browser once with `npx playwright install chromium`. A different system Chromium can be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/path/to/chromium npm run test:e2e`. Tests start their own development server on port 4173, so keep that port free.

## Replace the demo business details

All business identity and contact settings live in **`src/config/business.ts`**:

- `name` and `tagline`: fictional demo identity.
- `whatsappNumber`: currently `YOUR_WHATSAPP_NUMBER`. **Configure this first to enable WhatsApp.** Use your own international number including the country code, ideally digits only, with no local leading zero. Optional `+`, spaces, parentheses, and hyphens are accepted. Never publish someone else’s number as sample content.
- `address`: currently `YOUR_ADDRESS`.
- `openingHours`: currently `YOUR_OPENING_HOURS`. You can use a multi-line string for a weekly schedule.
- `socialLinks`: obvious placeholders. Only configured HTTPS URLs become clickable links; placeholders remain labelled as unconfigured.

No real contact details are shipped. Unconfigured address and hours are honestly labelled in the interface. The visible name, wordmark, document title, and description all follow the configuration. Replace the original favicon in `public/favicon.svg` if appropriate for your own branding.

Products are in `src/data/products.ts`. Replace fictional model names, specifications, and prices with the business’s actual catalogue before publishing a real storefront. The interface does not claim live inventory or book pickup or delivery.

## How the enquiry works

“Ask about this” and the product dialog preselect the product in the contact form. Name, interest, and message are required. A name needs 2–80 characters and the message needs 10–1,000 characters. Validation errors are associated with the fields, and focus moves to the first invalid field.

With a configured international number, submitting opens `https://wa.me/…` in a new tab with a URL-encoded message. **The visitor must press Send in WhatsApp**; the website does not send it or make a booking. A visible “Open WhatsApp” link is available if the browser blocks the automatic tab.

With the shipped placeholder, submission validates and shows a copyable message preview and a configuration notice. It does not open an invalid contact or claim anything was sent. Clipboard copying shows progress, success, or a manual-copy fallback when clipboard access is unavailable. Editing the enquiry invalidates the previous message preview. Form data is held in memory only; this website does not store it. WhatsApp is an external service with its own privacy policies.

## Structure and design

```text
src/config/business.ts   Business details and contact placeholders
src/data/products.ts     Fictional catalogue and MAD prices
src/components/          Navigation, illustrations, catalogue, and form
src/lib/                 Catalogue and enquiry logic, with unit tests
src/styles.css           Original mobile-first responsive design
tests/                   Desktop/mobile browser tests
```

The site has a skip link, semantic landmarks, labelled form controls, live result/status messages, keyboard-operable category buttons, native accessible product dialogs, native FAQ disclosures, focus indicators, and reduced-motion support. Search matches product names, categories, descriptions, and specifications; sorting does not change the underlying catalogue. Empty results have a working reset action. All fonts, icons (Lucide, ISC licence), and illustrations load locally, so only WhatsApp and configured social links require third-party access. DM Sans is under the SIL Open Font License; dependency packages contain their licence files.

The project needs no `.env` file or credentials. The project `.npmrc` keeps npm’s cache in the ignored `.npm-cache/` directory, which works in restricted cloud filesystems. Build output is `dist/` and can be served by a static web host. This is a demo, not a deployed site.
