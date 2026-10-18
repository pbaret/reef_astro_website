<!-- docs/conventions/astro.md - how Astro is used in this repo: pure .astro, platform first, static only. -->

# Astro rules

## Static output is the product

- No adapter, on purpose (astro.config.mjs). The site compiles to plain HTML
  and imposes no host on its user. Never add an adapter, an endpoint that
  needs a server, or `export const prerender = false`. There is no CMS, no
  database, no API and no backend.
- There is no form on the site: contact goes through the `mailto:`, `tel:` and
  social links of the contact page, and nothing is collected, stored or sent.
- `trailingSlash: "always"` (astro.config.mjs). Every internal link ends
  with `/` and is built with the functions of src/i18n/routes.ts
  (`sectionPath`, `activityPath`, `articlePath`), never by string
  concatenation.

## Zero JavaScript first

- A component is pure `.astro` until the platform genuinely runs out:
  `<dialog>` (src/components/ui/dialog/Dialog.astro), `<details>`
  (src/components/ui/accordion/AccordionItem.astro), anchors, CSS. Only 10 of
  the 63 primitive files carry a `<script>`; hold that line.
- When a script is unavoidable it is short, delegated and idempotent. The
  model is src/components/ui/_dialog.ts: one set of document-level listeners,
  a `bound` flag, shared by Dialog and Sheet.
- There is no React and no island in this theme. Adding a framework here is a
  design failure, not a feature.

## Scripts must survive view transitions

The ClientRouter is on (src/layouts/BaseHead.astro, switched by
`useViewTransitions` in src/config/siteData.ts), so a page's scripts run once
and the DOM is later swapped underneath them. Every script follows one of
these proven patterns:

- Re-init on `astro:page-load`, guarded by a `data-*-ready` attribute, like
  src/components/ui/reveal/Reveal.astro.
- Document-level delegation that survives swaps by construction, like
  src/components/ui/_dialog.ts and the drawer-closing listener of
  src/components/Sections/Global/_navbar.ts.
- Clean up on `astro:before-swap` when a script holds a resource, like an
  IntersectionObserver or a listener bound to `window`.

The navbar is NOT `transition:persist`: it carries the current page and the
language switcher, which must follow every navigation.

`assetsInlineLimit: 0` (astro.config.mjs) keeps even tiny scripts as
files so they are not re-inlined and re-run unpredictably; do not remove it.

## Page assembly

There is ONE route file, src/pages/[...path].astro. Its getStaticPaths reads
`listPages()` (src/js/pages.ts): one description per page and per language,
with its address and its translations. The route file wraps the right
component from src/components/Pages/ in `BaseLayout` with a deliberate `title`
and `description`, and injects JSON-LD through `<Fragment slot="head">` using
the constructors from @js/schema. Pages compose Sections; they carry no raw
markup and no text of their own: every word is in src/i18n/ui/ or in the news
collection. A new kind of page is a new entry in `listPages()` plus a
component in src/components/Pages/.

## Content and imports

- The news collection is defined once in src/content.config.ts with a glob
  loader and a zod schema. It is read through src/js/news.ts only: drafts are
  excluded there, and the build fails if a `translationKey` lacks one of the
  three languages.
- Imports use the tsconfig aliases (@components/*, @config/*, @data/*,
  @layouts/*, @styles/*, @js/*, @i18n). No `../../` ladders.
- Wrapper components that change tag use `Polymorphic`
  (src/components/ui/reveal/Reveal.astro:7), not string-typed `as` props.

## House constraints

One-line header comment (path + role) on every file, 400 lines maximum per
file, plain hyphens only (no em or en dashes, anywhere), code comments in
French without accents, and demo copy in the dictionary (src/i18n/ui/) as
clearly identifiable placeholders, in English, French and Spanish.
