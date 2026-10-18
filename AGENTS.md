<!-- AGENTS.md - the guide for coding agents working in this repo: stack, structure, conventions, commands, gotchas. -->

# Working in this site, as an agent

A static, trilingual (English, French, Spanish) showcase-site skeleton built
from the MIT-licensed Reef Astro theme. Every word of copy, every contact
detail and every image is a PLACEHOLDER, clearly identifiable as such. The
rule files below are LOADED into context by the @ syntax, because a rule an
agent has to decide to go and open is a rule a hurried agent skips.

@docs/conventions/astro.md
@docs/conventions/tailwind.md
@docs/conventions/typescript.md
@docs/conventions/motion.md
@docs/conventions/seo.md

**Climb this ladder before you add anything.** Does the page need it at all?
Does it already exist under src/components/ui? Can the platform do it with no
script (a native dialog, details, an anchor, `:has()`)? Can CSS alone do it?
Only then is it written, and what gets written is the smallest version that
works. Removing a section is a better answer than tuning it.

What none of that excuses: understanding the problem before touching it,
validating anything that crosses a boundary, and accessibility.

## What this site is

Five kinds of page, each in three languages: home (hero, three activities,
three latest news, call to action), activities (a list and three detail pages),
gallery, news (a list and one page per article) and "about and contact" (contact
details only, no form). Everything is generated statically. There is no search, no
filter, no topic or author page, no dark mode, no CMS, no API.

## Stack

Astro 7 (static output, no adapter), Tailwind CSS 4 (CSS-first, no
tailwind.config.js), tailwind-variants, @astrojs/sitemap, Fontsource for Space
Grotesk and Instrument Sans (the only two fonts). Node >= 22.18, pnpm.

**No React, no framework, no animation library.** Every effect is CSS; the only
scripts are the navbar (shrink on scroll, drawer closing) and the shared dialog
controller of the mobile drawer.

## Structure

```text
src/
  components/
    Cards/        ActivityCard, NewsCard
    Pages/        one component per kind of page, rendered by the route file
    Sections/     Global/ (navbar, footer, page hero, section header, call to action, 404),
                  Home/ (hero, activities, latest news)
    svg/icons/    60 original icons
    ui/           primitives, see ui/README.md (the contract)
  config/         siteData.ts: fictional e-mail, phone, socials, share card
  content.config.ts  the news collection (zod schema)
  data/           news/{en,fr,es}/*.md, gallery.ts, activities.ts (images)
  i18n/           config, routes (translated URL segments), helpers, ui/{en,fr,es}/ dictionaries
  js/             news.ts (collection reader), pages.ts (every page, per language), schema.ts, spring.ts, haptics.ts
  layouts/        BaseLayout (html shell) and BaseHead (the whole <head>)
  pages/          [...path].astro (the one route), 404.astro, [locale]/404.astro, robots.txt.ts
  styles/         tokens.css (design system), global.css, prose.css, motion/
scripts/          placeholders.mjs, check-seo.mjs, checks.mjs, house.mjs, ts-register.mjs
```

Import through aliases (tsconfig.json): @components/*, @config/*, @data/*,
@layouts/*, @styles/*, @js/*, @assets/*, @i18n.

## Commands

```bash
pnpm dev            # dev server
pnpm build          # static build into dist/
pnpm preview        # serve dist/
pnpm check          # astro check; must be 0/0/0 before you finish
pnpm test           # every *.selfcheck.ts and *.test.ts under src/, plain Node
pnpm lint:house     # the mechanical house rules
pnpm check:seo      # after a build: audits dist/ (head, hreflang, OG, JSON-LD, links, sitemap, robots)
pnpm build:check    # build, then the SEO audit
pnpm placeholders   # regenerate the SVG placeholders, share card and icons
```

What each check does NOT see: `pnpm build` does not type-check; `pnpm check`
never executes a line; `pnpm test` runs pure logic and has never seen a pixel;
`pnpm check:seo` reads HTML, not a rendered page; nothing here opens the site on a
real phone. Look at it on one before a release.

## i18n in one paragraph

Languages live in src/i18n/config.ts. URL segments are TRANSLATED and live in
src/i18n/routes.ts only (`/fr/actualites/`, `/es/noticias/`). Every internal
href goes through `sectionPath`, `activityPath` or `articlePath`. Every
displayed word lives in src/i18n/ui/<locale>/ (typed: a missing key in fr or es
breaks `pnpm check`). Every page passes its `translations` table (one address
per language) to BaseLayout, which feeds hreflang and the language switcher.
Articles are linked across languages by `translationKey`; the build fails if
one language is missing. The URLs of the original brief (`/galery/`,
`/fr/gallerie/`) are kept as written: fix them in `sectionSlugs` if they were
typos.

## Non-negotiable conventions

1. Every file starts with a one-line comment: its path and its role.
2. No file exceeds 400 lines.
3. No em dashes, no en dashes, anywhere: code, comments, copy, docs. Plain
   hyphens only.
4. Code comments are in French **without accents**. Displayed copy is in the
   dictionary, with accents, and never in a component.
5. Markup uses semantic tokens only (bg-background, text-foreground, bg-card,
   bg-primary, text-muted-foreground, border-border, bg-surface, text-accent-text,
   text-primary-text, ring-ring). Palette names (ink-*, coral-*, reef-*) and raw
   hex never leave src/styles.
6. Zero JavaScript by default. Native `<dialog>`, `<details>`, anchors and CSS
   before any `<script>`.
7. Buttons are pills (rounded-pill). Cards float (bg-card rounded-card). Sections
   breathe (py-24 md:py-32). Exactly one accent-script word per big title.
8. Trilingual is mandatory: a new page is a new entry in `listPages()`, a new
   word is a new key in the three dictionaries.
9. Accessibility is part of done: one h1 per page, 44px touch targets, correct
   aria, alt everywhere (localized), visible focus, reduced motion respected,
   no text drawn inside an image.
10. New third-party anything (package, font, asset) gets a THIRD-PARTY.md entry
    in the same change. Never depend on a remote image service.
11. NO DECORATIVE PILL, ANYWHERE. `rounded-pill` stays the shape of buttons,
    fields and links that are real controls.

## Gotchas that have already bitten

- View transitions re-run nothing: a naive inline script executes once and dies
  on the next navigation. Use document-level delegation or re-init on
  `astro:page-load` behind a guard. The navbar is not `transition:persist`.
- `assetsInlineLimit: 0` in astro.config.mjs is load-bearing. Leave it.
- Tailwind 4 has no config file. New tokens go in tokens.css; new utilities are
  declared with `@utility` (see src/styles/motion). Do not use `@apply` with
  palette names.
- There is no `dark:` variant and no `.dark` class. The only dark surfaces are
  the `.deep-scene` frames (hero, call to action), dark on purpose.
- A share card is ONE IMAGE AND NOTHING ELSE, and must be raster
  (public/og-default.png).
- tailwind-merge does not know `text-display-*`: in a `tv()` string never put a
  size before a text colour (pnpm lint:house checks it).

## Definition of done

`pnpm check` at 0 errors, 0 warnings, 0 hints; `pnpm build` green; `pnpm test`,
`pnpm lint:house` and `pnpm check:seo` passing; no em dash anywhere; no file over
400 lines. Then, and only then, the task is finished.
