<!-- THIRD-PARTY.md - the honest inventory of everything in this site that was not written for it: fonts, icons, images, npm packages. -->

# Third-party inventory

This site is a skeleton derived from the MIT-licensed Reef theme (Aloha Pixel).
Everything that was not created for it is listed here, with its license. If it
is not on this page, it was made for this project.

## Fonts

Two typefaces, delivered as npm packages by the Fontsource project and
self-hosted at build time. No font is fetched from a third-party CDN at
runtime. Both are under the SIL Open Font License 1.1, which permits bundling,
self-hosting and commercial use.

| Typeface | Package | License | Role |
|---|---|---|---|
| Space Grotesk (variable) | @fontsource-variable/space-grotesk | OFL-1.1 | Display headings (font-display), including the accent word |
| Instrument Sans (variable) | @fontsource-variable/instrument-sans | OFL-1.1 | Body text and interface labels (font-sans) |

The imports live at the top of src/layouts/BaseHead.astro.

## Icons

None are third party. The 60 icons of the set are original path data on a
24x24 grid (src/components/svg/icons/icons.ts, rendered by
src/components/svg/icons/Icon.astro). No icon library is imported.

## Images

No photograph and no remote image service. Every image is a generated abstract
SVG placeholder (src/assets/placeholders/), plus the share card and the
apple-touch-icon in public/, all produced by scripts/placeholders.mjs from the
Reef palette. They are covered by the project license and carry no third-party
terms. Replace them with your own images; if you add photographs, record their
source and license here in the same change.

## Demo copy

All demo copy (names, activities, addresses, phone numbers, e-mails, opening
hours, news) is placeholder text written for this skeleton, in English, French
and Spanish, with Lorem ipsum filler. Every contact detail is fictional
(example.com, 00 numbers). Replace all of it before publishing.

## npm dependencies

All under permissive licenses.

| Package | License | Why it is here |
|---|---|---|
| astro | MIT | The framework |
| @astrojs/sitemap | MIT | sitemap-index.xml at build |
| tailwindcss + @tailwindcss/vite | MIT | Styling, CSS-first tokens |
| tailwind-variants | MIT | Component variant configs (tv) |
| tailwind-merge | MIT | Class merging inside tv |
| @fontsource-variable/space-grotesk | OFL-1.1 | Space Grotesk files |
| @fontsource-variable/instrument-sans | OFL-1.1 | Instrument Sans files |

Development only, never shipped to the browser:

| Package | License | Why it is here |
|---|---|---|
| typescript | Apache-2.0 | Type checking |
| @astrojs/check | MIT | astro check |
| sharp | Apache-2.0 | Renders the share card and icons in scripts/placeholders.mjs |

There is no React, no animation library and no WebGL dependency. Every effect
on the page is CSS.

## What is deliberately absent

- No analytics, tracking or consent scripts.
- No remote image, font or script (no Unsplash, Lorem Picsum, Placeholder.com
  or CDN).
- No CMS, database, API, EmDash, Cloudflare Workers, D1, R2 or Capacitor.

## How to re-verify

```bash
pnpm list --prod --depth 0            # runtime packages
ls src/assets public                  # every raster or vector asset present
```
