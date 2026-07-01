# From Cells to Circuits — Smart Health Systems Workshop

A premium, production-ready website for the **5-Day Hands-on Biomedical Engineering Workshop** organized by the School of Biomedical Engineering & Health Sciences, Shobhit Institute of Engineering & Technology (Deemed-to-be University), Meerut.

---

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **TailwindCSS**
- **Framer Motion** — scroll animations, page transitions, micro-interactions
- **Lenis** — smooth scrolling
- **Lucide React** — icons
- **React Icons** — social media icons
- **next/font** — optimized Google Fonts (Inter + Syne)

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

---

## Customization

### Replace Placeholder Links

Edit `lib/constants.ts` and update these values:

```ts
export const PLACEHOLDERS = {
  GOOGLE_FORM_LINK: "https://forms.google.com/your-actual-form",
  WHATSAPP_COMMUNITY_LINK: "https://chat.whatsapp.com/your-actual-link",
  BROCHURE_LINK: "/downloads/brochure.pdf",     // add PDF to /public/downloads/
  SCHEDULE_LINK: "/downloads/schedule.pdf",
  PREP_GUIDE_LINK: "/downloads/preparation-guide.pdf",
  CAMPUS_MAP_LINK: "/downloads/campus-map.pdf",
  EMAIL: "your.actual@email.com",
  PHONE: "+91-XXXXXXXXXX",
};
```

### Add Real Photos to Gallery

Replace the emoji placeholders in `components/sections/Gallery.tsx` with `<Image>` components from `next/image`. Place photos in `public/gallery/`.

### Update Workshop Dates

Add date fields to `lib/constants.ts` and reference them in the Hero and Schedule sections.

### Favicon

Replace `public/favicon.ico` with your actual favicon. You can generate one from your logo at [favicon.io](https://favicon.io).

---

## Project Structure

```
cell2circuits/
├── app/
│   ├── globals.css          # Global styles, animations, CSS variables
│   ├── layout.tsx           # Root layout with fonts, navigation, footer
│   ├── page.tsx             # Home page — all sections assembled here
│   ├── not-found.tsx        # Custom 404 page
│   ├── loading.tsx          # Loading screen
│   ├── error.tsx            # Error boundary page
│   ├── sitemap.ts           # Auto-generated sitemap
│   └── robots.ts            # SEO robots.txt
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx   # Sticky nav with mobile menu
│   │   └── Footer.tsx       # Footer with links, social, CTA
│   ├── providers/
│   │   └── LenisProvider.tsx # Smooth scroll wrapper
│   ├── sections/
│   │   ├── Hero.tsx          # Full-screen hero with ECG, DNA, particles
│   │   ├── Welcome.tsx       # Introduction & story
│   │   ├── WhyBiomedical.tsx # Interactive domain cards
│   │   ├── Journey.tsx       # Animated accordion journey
│   │   ├── WhoShouldAttend.tsx
│   │   ├── LearningOutcomes.tsx
│   │   ├── Schedule.tsx      # Interactive 5-day schedule
│   │   ├── Laboratories.tsx  # Lab showcase cards
│   │   ├── Highlights.tsx    # Workshop activity checklist
│   │   ├── Statistics.tsx    # Animated counters
│   │   ├── CareerExplorer.tsx
│   │   ├── DayInLife.tsx     # Timeline
│   │   ├── Gallery.tsx       # Masonry gallery with lightbox
│   │   ├── Registration.tsx  # Registration card linking to Google Form
│   │   ├── WhatsAppCTA.tsx   # WhatsApp community CTA
│   │   ├── Downloads.tsx     # Document downloads
│   │   ├── FAQ.tsx           # Accordion FAQ
│   │   └── Contact.tsx       # Contact info + map
│   └── shared/
│       ├── AnimatedSection.tsx  # Scroll-triggered reveal wrapper
│       └── SectionHeader.tsx    # Reusable section heading
├── lib/
│   ├── constants.ts    # Workshop data, placeholder links
│   └── utils.ts        # cn() utility (tailwind-merge + clsx)
├── public/             # Static assets (favicons, OG image, PDFs)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Deploying to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Cell2Circuits workshop website"
git remote add origin https://github.com/YOUR_USERNAME/cell2circuits.git
git branch -M main
git push -u origin main
```

---

## Deploying to Vercel

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. Your site will be live at `https://cell2circuits.vercel.app` (or your chosen domain).

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Click Deploy — Vercel auto-detects Next.js

No configuration needed. Zero changes required for deployment.

---

## After Deployment

1. Update `app/sitemap.ts` with your actual production URL
2. Update `app/layout.tsx` metadata `url` field
3. Add a real `og-image.png` (1200×630px) to `/public/`
4. Replace all `PLACEHOLDERS` in `lib/constants.ts` with real links

---

## Design Credits

Built with a dark medical aesthetic inspired by premium tech brands. Color palette: Medical Blue (#0EA5E9), Teal (#14B8A6), Navy (#0A1628). Typography: Inter (body) + Syne (display).
