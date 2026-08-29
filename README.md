# Md. Iftakhar Awal Chowdhury (@AtifChy) — Modern Personal Portfolio

> High-performance personal portfolio built with **Astro 7**, **Tailwind CSS v4**, **React 19**, and **Bun**. Features zero-JS static HTML by default with selective client hydration islands, live GitHub REST API statistics, deep-dive case studies via Astro Content Layer, and full light/dark theming.

---

## ⚡ Tech Stack

- **Framework:** [Astro 7](https://astro.build/) (Zero-JS SSG, Island Architecture, Content Layer)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first design tokens, OKLCH palette, glassmorphism)
- **Interactive Islands:** [React 19](https://react.dev/) + `@astrojs/react`
- **Typography:** Inter Variable, Merriweather Variable, JetBrains Mono
- **Icons:** [Lucide React](https://lucide.dev/)
- **Data Layer:** GitHub REST API v3 with offline snapshot fallback
- **Runtime & Package Manager:** [Bun](https://bun.sh/)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
bun install
```

### 2. Development Server
```bash
bun run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### 3. Production Build
```bash
bun run build
```
The static build outputs to `./dist/`.

### 4. Preview Production Build
```bash
bun run preview
```

---

## 📂 Project Architecture

```
portfolio/
├── public/
│   ├── favicon.svg
│   └── resume.pdf                   # Downloadable resume PDF
├── src/
│   ├── components/                  # UI components & React islands
│   │   ├── AcademicHonors.astro     # AIUB & Scholarshome honors
│   │   ├── AvailabilityBadge.astro  # Pulsing availability pill
│   │   ├── CopyEmailButton.tsx      # Interactive 1-click email copy island
│   │   ├── ExperienceTimeline.astro # Timeline milestones
│   │   ├── Footer.astro             # Modern footer with timezone & links
│   │   ├── GitHubStatsStrip.astro   # Zero-JS live GitHub metrics strip
│   │   ├── Header.astro             # Sticky glassmorphic navbar
│   │   ├── ProjectCard.astro        # Bento grid card component
│   │   ├── RepoFilterGrid.tsx       # Live repo search & filter island
│   │   ├── SkillsMatrix.astro       # Engineering domain skills grid
│   │   ├── TechBadge.astro          # Tech stack badge with mono font
│   │   └── ThemeToggle.tsx          # Smooth light/dark theme island
│   ├── content/
│   │   └── projects/                # Markdown case studies
│   │       ├── aiub-companion.md
│   │       ├── hospital-appointment-system.md
│   │       ├── recruitbd-ai.md
│   │       ├── sahara-ecommerce.md
│   │       └── winrt-toast-reborn.md
│   ├── content.config.ts            # Astro 7 Content Collections schema
│   ├── data/
│   │   └── github-fallback.json     # Offline snapshot for zero-fail builds
│   ├── layouts/
│   │   ├── BaseLayout.astro         # Root layout with SEO & JSON-LD
│   │   └── ProjectLayout.astro      # Case study layout with ADR & metrics
│   ├── lib/
│   │   ├── github.ts                # GitHub REST API client & stat aggregator
│   │   └── utils.ts                 # Class merging & formatters
│   ├── pages/
│   │   ├── index.astro              # Homepage
│   │   ├── projects/
│   │   │   ├── index.astro          # All repos catalog
│   │   │   └── [slug].astro         # Dynamic case study route
│   │   └── 404.astro                # Custom 404 page
│   └── styles/
│       └── global.css               # Tailwind v4, themes, & glass styles
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## 🌐 Deployment

### Cloudflare Pages / Vercel
Set the build settings to:
- **Build command:** `bun run build`
- **Output directory:** `dist`
- **Environment variables (optional):** `GITHUB_TOKEN` (for higher rate limits)
