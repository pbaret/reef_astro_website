<!-- README.md - the front page of the repo: what the site is, how to run it, how to make it yours. -->

# Reef showcase skeleton

A minimal, static, trilingual (English, French, Spanish) showcase-site skeleton
for presenting a professional activity, built from the MIT-licensed
[Reef](https://github.com/alohapixelcom-hash/reef) Astro theme. It keeps Reef's
look (typography, spacing, floating cards, light transitions, framed hero, mobile
drawer menu) and removes everything a showcase does not need: search, filters,
topics, authors, dark mode, the optional CMS engine and the native-app wrapper.

Every text, name, address, phone number, e-mail and image is a placeholder.

## Quick start

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

Node 22.18 or later and pnpm.

```bash
pnpm build          # static site into dist/
pnpm preview        # serve the build locally
pnpm check          # astro check: types and templates
pnpm test           # selfchecks: dictionaries, addresses, news translations
pnpm lint:house     # the mechanical house rules
pnpm check:seo      # after a build: audits dist/ (head, hreflang, Open Graph, JSON-LD, links, sitemap, robots)
pnpm build:check    # build, then the SEO audit
pnpm placeholders   # regenerate the SVG placeholders, share card and icons
```

## Pages and addresses

| Page | English | French | Spanish |
|---|---|---|---|
| Home | `/` | `/fr/` | `/es/` |
| Activities | `/activities/` | `/fr/activites/` | `/es/actividades/` |
| Activity 1 to 3 | `/activities/activity-1/` | `/fr/activites/activite-1/` | `/es/actividades/actividad-1/` |
| Gallery | `/galery/` | `/fr/gallerie/` | `/es/galeria/` |
| News | `/news/` | `/fr/actualites/` | `/es/noticias/` |
| Article | `/news/<slug>/` | `/fr/actualites/<slug>/` | `/es/noticias/<slug>/` |
| About and contact | `/contact/` | `/fr/contact/` | `/es/contacto/` |

The gallery addresses are written exactly as in the original brief. To spell
them `gallery` and `galerie`, change two lines of `sectionSlugs` in
`src/i18n/routes.ts`: every link, hreflang tag and the sitemap follow.

## Make it yours

1. `astro.config.mjs`: `site`, your production address (canonical links,
   share cards, sitemap, robots.txt).
2. `src/config/siteData.ts`: e-mail, phone, social links (all fictional).
3. `src/i18n/ui/<locale>/`: every word of the interface, one folder per
   language. Types make `fr` and `es` fail to compile if a key is missing.
4. `src/data/news/<locale>/`: one Markdown file per article and per language;
   the three versions share a `translationKey`.
5. `src/assets/placeholders/`: replace the SVGs by your images (same names, or
   edit `src/data/gallery.ts`, `src/data/activities.ts`, and the `image` field
   of the articles). Update the alt texts in the dictionaries.
6. `public/og-default.png`: your 1200x630 share image (a raster, not an SVG).

To add a language, follow the checklist at the top of `src/i18n/config.ts`.

## Deploy

Upload `dist/` to any static host. No environment variable is required.
`404.html`, `fr/404.html` and `es/404.html` are written for hosts that serve
the nearest 404 page.

## License

MIT. See [LICENSE](LICENSE) and [THIRD-PARTY.md](THIRD-PARTY.md).
