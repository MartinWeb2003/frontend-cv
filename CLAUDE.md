# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint (flat config)
```

## Architecture

Single-page portfolio built with React 19 + Vite. No routing — the entire site is one scroll-based page.

**Component layers:**
- `src/components/` — page sections (Navbar, Hero, About, Experience, Education, Projects, Skills, Contact, Footer). Each section has a co-located `.css` file.
- `src/bits/` — reusable micro-components that are purely visual/animation (TiltedCard, GlareHover, MagicBento, ImageTrail, etc.). These are self-contained and have no business logic.
- `src/hooks/` — custom hooks (`useInView.js` wraps `react-intersection-observer`).
- `src/locales/` — i18n JSON files for HR (default), EN, DE, PL. Config in `src/i18n.js`.

**Animation stack:**
- Framer Motion — scroll-driven transforms, entrance animations, layout transitions.
- GSAP — used inside `ThreeScene.jsx` and `ImageTrail.jsx` for timeline-based animations.
- Three.js — 3D scene in `ThreeScene.jsx`.
- tsparticles — particle background.

**Vite config** splits vendor chunks: `framer-motion`, `gsap`, and `react-icons` are each in their own chunk to keep the main bundle lean.

**Internationalization:** `react-i18next` with `useTranslation()` hook. Translation keys live in `src/locales/*.json`. Default language is Croatian (`hr`). The `LanguageSwitcher` component lets users change locale at runtime.

**Scroll behavior:** `react-scroll` handles anchor navigation from the Navbar. `ScrollProgress` renders the reading-progress bar. Parallax effects use `react-parallax`.

**Custom cursor:** `CustomCursor.jsx` replaces the default cursor with a tracked element — keep pointer-events in mind when adding interactive elements.
