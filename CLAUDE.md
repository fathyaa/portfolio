@AGENTS.md

# Project: Fathya's Portfolio

Personal portfolio for Fathya — a software engineer (iOS, backend, system design, IoT, UI engineering). The site must communicate craftsmanship: someone who builds beautiful products on solid engineering.

## Design North Star

- **Feel**: Apple / Linear / Raycast / Notion. Minimal, editorial, calm, sophisticated. Modern but timeless.
- **Typography is the hero.** Projects support the typography; animations support the projects.
- **Generous whitespace, asymmetric balance.** Every spacing decision intentional.
- **Colors**: mostly white/off-white, neutral grays, near-black type, ONE subtle accent. No rainbow gradients, no neon.
- **Avoid**: startup-landing aesthetics, templates, excessive gradients, glassmorphism everywhere, huge shadows, generic hero sections.
- The inspiration reference (editorial collage with text-selection highlights and floating objects) is inspiration ONLY — never copy its layout. Visitors must not recognize the source. Steal the *ideas*: editorial type, floating elements, playful asymmetry, premium restraint.

## Animation Philosophy

"Alive, not distracting." Framer Motion throughout.

- Hero: fade + blur + stagger; rotating role text should feel like selected text changing naturally (blur, fade, slight upward motion) — never a slideshow.
- Cards: slow float, subtle rotation, hover lift + scale + deeper shadow, slight cursor parallax.
- Scroll: stagger reveals (opacity + translateY), restrained parallax.
- Transitions: shared layout transitions, springs.
- GPU-friendly only (transform / opacity / filter). Always respect `prefers-reduced-motion`.
- Keep motion primitives reusable (`components/motion/`).

## Tech Stack & Conventions

- Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + shadcn/ui + Lucide.
- **This repo uses a custom Next.js build (16.x) with breaking changes.** Before writing code that touches a Next API, read the matching guide in `node_modules/next/dist/docs/` and verify the API exists in the installed package. Heed deprecation notices.
- Components modular and single-purpose; sections are independent components; no duplicated code.
- Site content (profile, projects, socials) lives in `data/` — components stay content-agnostic.
- Semantic HTML. Optimize for performance (compress media, lazy-load below the fold).
- Mobile is designed intentionally, not shrunk: cards reposition, typography stays impactful.

## Process

- Propose before building; implement section by section.
- After each section, self-critique: Does it feel premium? Handcrafted? Would another frontend engineer be impressed? Can it be simplified? Is the animation tasteful? Iterate if any answer is no — never settle for the first solution.

## UX Narrative

Curiosity → Exploration → Admiration → Reading projects → Contacting. The site tells a story, it doesn't display information.
