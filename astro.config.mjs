// @ts-check
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { existsSync, readdirSync, readFileSync, renameSync, rmdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Le dossier des fichiers servis, pour relire les pages construites.
const DIST = fileURLToPath(new URL("./dist/", import.meta.url));

// L'adresse publique du site, ecrite une fois : canonical, Open Graph, sitemap,
// robots.txt. C'est un PLACEHOLDER : a remplacer par le vrai domaine.
const SITE = "https://example.com";

// Lit les hreflang que la page construite porte deja : le head est la seule
// source, le plan de site ne peut donc plus le contredire. Les adresses sont
// traduites (/fr/actualites/ et non /fr/news/) : l'appariement des langues par
// identite de chemin, que fait l'integration sitemap seule, ne les relierait pas.
// `serialize` est appele apres le build, donc dist/ existe et on y relit la verite.
function hreflangDuHtml(/** @type {string} */ pathname) {
  const relatif = pathname.replace(/^\/+/, "");
  const fichier = `${DIST}${relatif === "" || relatif.endsWith("/") ? relatif : `${relatif}/`}index.html`;
  let html = "";
  try {
    html = readFileSync(fichier, "utf8");
  } catch {
    return [];
  }
  const links = [];
  const motif = /<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"\s*\/?>/g;
  for (const m of html.matchAll(motif)) links.push({ lang: m[1], url: m[2] });
  return links;
}

// LA PAGE INTROUVABLE DE CHAQUE LANGUE. src/pages/[locale]/404.astro sort en
// fr/404/index.html, comme toute page ; un hebergeur statique cherche le
// 404.html le plus proche de l'adresse demandee. On la range donc en
// fr/404.html, au build : `dir` est le dossier des fichiers servis.
/** @returns {import("astro").AstroIntegration} */
function pagesIntrouvables() {
  return {
    name: "site:pages-introuvables",
    hooks: {
      "astro:build:done": ({ dir }) => {
        for (const entree of readdirSync(dir, { withFileTypes: true })) {
          if (!entree.isDirectory()) continue;
          const page = new URL(`${entree.name}/404/index.html`, dir);
          if (!existsSync(page)) continue;
          renameSync(page, new URL(`${entree.name}/404.html`, dir));
          rmdirSync(new URL(`${entree.name}/404/`, dir));
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: SITE,

  // Une seule forme d'URL canonique : le build en repertoires emet un slash final.
  trailingSlash: "always",

  // Pas d'adapter, volontairement : le site compile en HTML 100% statique et
  // n'impose aucun hebergeur.
  security: { checkOrigin: true },

  // Routage trilingue. L'anglais est servi a la racine (/, /contact/), le
  // francais sous /fr/ et l'espagnol sous /es/. prefixDefaultLocale: false
  // evite un /en/ inutile. La liste vit dans src/i18n/config.ts.
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "es"],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },

  integrations: [
    pagesIntrouvables(),
    sitemap({
      filter: (page) => !page.includes("/404"),
      // Les alternatives (x-default compris) viennent du head de chaque page.
      serialize(item) {
        const links = hreflangDuHtml(new URL(item.url).pathname);
        return links.length > 1 ? { ...item, links } : item;
      },
    }),
  ],

  // LA FEUILLE DE STYLE VOYAGE DANS LE HTML : "always" la pose dans le <head> au
  // lieu de trois requetes bloquantes avant le premier pixel. Sur un site ou la
  // plupart des visites arrivent d'un moteur sur UNE page, la premiere vue y
  // gagne plus que la navigation interne n'y perd. Qui sert un site ou le
  // visiteur enchaine dix pages remet "auto" ici, et rien d'autre ne bouge.
  build: { inlineStylesheets: "always" },

  vite: {
    plugins: [tailwindcss()],
    build: {
      // N'inline pas les petits scripts, pour qu'ils survivent aux view transitions.
      assetsInlineLimit: 0,
    },
  },
});
