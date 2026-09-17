# Grains of Time — Official Website & Living Archive

A production-ready website and living archive for **Grains of Time**, North Carolina State University's premier all-male a cappella group, founded in 1968.

Conceived as a **living archive of sound, people, and time**, this site combines an editorial music publication aesthetic with a concert film title sequence, a curated historical archive, and a contemporary creative agency portfolio.

---

## Architecture & Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) | Server Components, fast streaming, ISR caching, robust SEO |
| **Language** | TypeScript | Strict type safety for content schemas and data contracts |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Custom editorial tokens, off-black canvas, Wolfpack Red accents |
| **CMS** | [Sanity Studio v3](https://www.sanity.io/) | Organization-owned headless CMS embedded directly at `/studio` |
| **Image Pipeline** | Sanity CDN + `@sanity/image-url` | Responsive crops, focal-point preservation, automated WebP/AVIF |
| **Validation** | [Zod](https://zod.dev/) | Server-side validation for booking inquiries |
| **Hosting Target** | [Vercel](https://vercel.com/) | Git-integrated deployments, preview branches, edge routing |
| **DNS / Security** | Cloudflare | Apex domain routing, SSL/TLS, DDoS protection |

---

## Visual Design System & Philosophy

- **Wolfpack Red (`#CC0000`)**: Used strictly as an intentional accent and moment of emphasis, never as an overpowering background.
- **Deep Atmosphere**: Deep canvas tones (`#09090b`), elevated card surfaces (`#121215`), and warm archival paper neutrals (`#f7f6f2`).
- **Archival Grain**: Lightweight SVG noise overlay providing filmic tactile depth without compromising performance or readability.
- **Accessibility (WCAG 2.1 AA)**: High-contrast focus rings, skip-to-content links, ARIA dialogs/modals, keyboard-trapped lightboxes, and strict adherence to `prefers-reduced-motion`.
- **Zero AI Slop**: No decorative glassmorphism, no generic SaaS card grids, no purple/blue gradients, no random blobs, no fake stats, and zero AI-generated human faces.

---

## Site Pages & Directory Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Metadata, Grain, Header, Footer)
│   ├── page.tsx                # Cinematic Homepage living archive
│   ├── about/                  # Group story, heritage, and vocal craft
│   ├── members/                # Current ensemble roster & vocal sections
│   ├── events/                 # Upcoming concerts & past performance archive
│   ├── history/                # Living timeline (1968–Present)
│   ├── repertoire/             # Arranged charts and active setlists
│   ├── gallery/                # Filterable photographic archive with Lightbox
│   ├── music/                  # Discography, streaming links & tracklists
│   ├── merch/                  # External bridge to official Shopify store
│   ├── book/                   # Booking inquiry form & technical rider
│   ├── studio/[[...tool]]/     # Embedded Sanity Studio CMS route
│   ├── api/
│   │   ├── revalidate/         # On-demand ISR revalidation webhook
│   │   └── draft-mode/         # Draft mode preview endpoints
│   ├── sitemap.ts              # Dynamic search engine sitemap
│   └── robots.ts               # Crawler rules
├── components/
│   ├── layout/                 # Header, Footer, MobileNav, AnnouncementBanner
│   ├── ui/                     # SkipToContent, EditorialImage, Lightbox, Modal, Badges
│   ├── forms/                  # BookingForm (accessible server-action form)
│   ├── home/                   # HeroSection, ArchivalFeature, InstagramShowcase
│   ├── members/                # EnsembleGrid with section filters and bio modal
│   ├── events/                 # EventsView with upcoming/archived tabs
│   ├── repertoire/             # RepertoireList with search and status filters
│   └── gallery/                # GalleryGrid with category pills
├── lib/
│   ├── data/                   # Fallback verified content & initial settings
│   ├── sanity/                 # Resilient client, GROQ queries, fetch wrapper
│   └── utils/                  # Tailwind cn helper, date formatters
└── sanity/
    ├── sanity.config.ts        # Sanity Studio configuration
    ├── structure.ts            # Custom desk structure
    └── schemas/                # 9 modular schemas (members, events, timeline, etc.)
```

---

## Local Development Setup

### 1. Prerequisites
- Node.js `v18.18+` or `v20+` (tested on Node `v24.20.0`)
- npm `v9+`

### 2. Installation
```bash
git clone <repository-url>
cd GrainsPro
npm install
```

### 3. Environment Configuration
Copy the example environment configuration:
```bash
cp .env.example .env.local
```
Update `.env.local` with your Sanity credentials when provisioned. (The site will run seamlessly on local fallback data if credentials are not yet set).

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public site.
Open [http://localhost:3000/studio](http://localhost:3000/studio) to access the embedded Sanity Studio.

### 5. Production Build Verification
```bash
npm run build
npm start
```

---

## Production Deployment to Vercel

1. Push this repository to the official **Grains of Time** GitHub organization (e.g. `github.com/grainsoftime/website`).
2. Log into the organization Vercel team account and import the repository.
3. Configure the Environment Variables in the Vercel Project Settings:
   - `NEXT_PUBLIC_SITE_URL`: `https://grainsoftime.com`
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
   - `NEXT_PUBLIC_SANITY_DATASET`: `production`
   - `SANITY_API_READ_TOKEN`: Sanity token with viewer privileges (for Draft Mode)
   - `SANITY_REVALIDATE_SECRET`: Shared secret for publish webhooks
   - `BOOKING_RECIPIENT_EMAIL`: Organization booking inbox (e.g. `booking@grainsoftime.com`)
   - `RESEND_API_KEY`: (Optional) API key for transactional email delivery
4. Deploy the project. Vercel automatically generates production and preview builds.

---

## Cloudflare DNS & Domain Connection

1. In Cloudflare DNS for `grainsoftime.com`:
   - Add a CNAME record for `www` pointing to `cname.vercel-dns.com`.
   - Add an A record for `@` (apex) pointing to `76.76.21.21` (or Vercel's recommended anycast IP).
   - In Cloudflare SSL/TLS settings, set encryption mode to **Full (strict)**.
2. In Vercel Project Settings → Domains:
   - Add `grainsoftime.com` and `www.grainsoftime.com`.
   - Set `grainsoftime.com` to redirect to `www.grainsoftime.com` (or vice versa according to organization preference).

---

## License & University Affiliation

Grains of Time is a registered student organization at North Carolina State University, Raleigh, NC. All photographs, recordings, arrangements, and archival materials remain the intellectual property of Grains of Time and their respective creators.
