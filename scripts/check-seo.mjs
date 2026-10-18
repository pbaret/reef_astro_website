// scripts/check-seo.mjs - audite le site CONSTRUIT (dist/) : head, hreflang, Open Graph, JSON-LD, liens internes, sitemap, robots.txt.
//
// Ce script CONTROLE, il ne genere rien et ne reecrit aucun fichier : Astro
// produit le SEO, ce script le verifie. Lancer `pnpm build` puis `pnpm check:seo`
// (ou `pnpm build:check`). Une erreur fait sortir en code 1 ; un avertissement
// (recommandation non critique) n'a aucun effet sur le code de sortie.
// Aucune dependance : des fichiers et des expressions regulieres suffisent pour
// du HTML genere par Astro. Le domaine est lu dans astro.config.mjs (`site`).
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import config from "../astro.config.mjs";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const DIST = join(ROOT, "dist");
const LANGS = ["en", "fr", "es"];
const DEFAULT_LANG = "en";
// Les routes du theme Reef d'origine : aucune ne doit exister, ni dans dist/ ni dans le sitemap.
const REMOVED = ["search", "blog", "topics", "tags", "authors", "privacy", "terms", "legal", "about", "examples", "rss.xml"];

const errors = [];
const warnings = [];
const fail = (where, message) => errors.includes(`${where} : ${message}`) || errors.push(`${where} : ${message}`);
const warn = (where, message) => warnings.includes(`${where} : ${message}`) || warnings.push(`${where} : ${message}`);

if (!existsSync(DIST)) {
  console.error("dist/ est absent : lancer `pnpm build` d'abord.");
  process.exit(1);
}
if (!config.site) {
  console.error("astro.config.mjs : `site` est absent, aucune URL absolue ne peut etre verifiee.");
  process.exit(1);
}
const ORIGIN = new URL(config.site).origin;
if (/example\.(com|org|net)$/.test(new URL(ORIGIN).hostname)) warn("astro.config.mjs", `le domaine ${ORIGIN} est un placeholder a remplacer avant la mise en ligne`);

/* ------------------------------------------------------------------ */
/* Lecture de dist/                                                    */
/* ------------------------------------------------------------------ */

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else files.push(full);
  }
})(DIST);

const publicPath = (file) => `/${relative(DIST, file).split("\\").join("/")}`;
const decode = (text) => text.replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], decode(m[2])]));
const strip = (html) => decode(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
/** Vrai si l'adresse interne (sans domaine) designe un fichier ou une page construite. */
function exists(pathname) {
  const clean = decodeURIComponent(pathname.split("#")[0].split("?")[0]);
  const target = join(DIST, clean);
  return clean.endsWith("/") ? existsSync(join(target, "index.html")) : existsSync(target) && statSync(target).isFile();
}
/** "/fr/contact/" devient "fr" ; une adresse sans prefixe est la langue par defaut. */
const langOfPath = (path) => LANGS.find((code) => code !== DEFAULT_LANG && (path === `/${code}/` || path.startsWith(`/${code}/`))) ?? DEFAULT_LANG;

const pages = new Map();
for (const file of files.filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  const path = publicPath(file).replace(/index\.html$/, "");
  const head = html.slice(0, html.indexOf("</head>"));
  const metas = [...head.matchAll(/<meta\b[^>]*>/g)].map((m) => attrs(m[0]));
  const links = [...head.matchAll(/<link\b[^>]*>/g)].map((m) => attrs(m[0]));
  const meta = (key) => metas.find((m) => m.name === key || m.property === key)?.content;
  pages.set(path, {
    path,
    html,
    head,
    metas,
    links,
    meta,
    is404: path.endsWith("/404.html"),
    noindex: /noindex/i.test(meta("robots") ?? ""),
    lang: /<html[^>]*\slang="([^"]*)"/.exec(html)?.[1] ?? "",
    title: decode(/<title>([\s\S]*?)<\/title>/.exec(head)?.[1] ?? "").trim(),
    canonical: links.find((l) => l.rel === "canonical")?.href,
    alternates: new Map(links.filter((l) => l.rel === "alternate" && l.hreflang).map((l) => [l.hreflang, l.href])),
  });
}
const indexable = [...pages.values()].filter((p) => !p.is404 && !p.noindex);
const toPath = (url) => (url.startsWith(ORIGIN) ? url.slice(ORIGIN.length) || "/" : null);

/* ------------------------------------------------------------------ */
/* Pages : head, structure, multilingue, Open Graph, JSON-LD           */
/* ------------------------------------------------------------------ */

const titles = new Map();
const descriptions = new Map();

for (const page of pages.values()) {
  const at = page.path;
  const expectedLang = langOfPath(page.is404 ? at.replace(/404\.html$/, "") : at);
  if (page.lang !== expectedLang) fail(at, `<html lang="${page.lang}"> au lieu de "${expectedLang}"`);

  const h1 = [...page.html.matchAll(/<h1[\s>]/g)].length;
  if (h1 !== 1) fail(at, `${h1} balises h1 au lieu d'une`);

  for (const img of page.html.matchAll(/<img\b[^>]*>/g)) {
    const a = attrs(img[0]);
    if (a.alt === undefined) fail(at, `image sans alt ${img[0].slice(0, 70)}`);
    if (!a.width || !a.height) fail(at, `image sans width/height ${img[0].slice(0, 70)}`);
  }

  // Les valeurs accidentelles dans le head, partout, 404 comprise.
  const values = [page.title, ...page.metas.map((m) => m.content ?? ""), ...page.links.map((l) => l.href ?? "")];
  for (const value of values) {
    if (/\bundefined\b|\[object Object\]|\bnull\b|localhost|127\.0\.0\.1|:\/\/0\.0\.0\.0/.test(value)) fail(at, `valeur invalide dans le head : "${value.slice(0, 80)}"`);
  }

  if (page.is404 || page.noindex) {
    if (!page.noindex) fail(at, "la page 404 doit etre en noindex");
    continue;
  }

  // Title et description.
  if (!page.title) fail(at, "title vide");
  else {
    if (page.title.length < 10 || page.title.length > 70) warn(at, `title de ${page.title.length} caracteres (10 a 70 recommandes) : "${page.title}"`);
    if (titles.has(page.title)) fail(at, `title deja utilise par ${titles.get(page.title)}`);
    titles.set(page.title, at);
  }
  const description = page.meta("description");
  if (!description?.trim()) fail(at, "meta description absente ou vide");
  else {
    if (description.length < 50 || description.length > 170) warn(at, `description de ${description.length} caracteres (50 a 170 recommandes)`);
    if (descriptions.has(description)) warn(at, `description identique a celle de ${descriptions.get(description)}`);
    descriptions.set(description, at);
  }

  // Canonical : absolue, sur le domaine, egale a l'adresse publique reelle, dans la langue de la page.
  if (!page.canonical) fail(at, "canonical absente");
  else if (page.canonical !== `${ORIGIN}${at}`) fail(at, `canonical ${page.canonical} differente de l'adresse publique ${ORIGIN}${at}`);

  // hreflang : les trois langues et x-default, des routes qui existent, reciproques.
  for (const code of [...LANGS, "x-default"]) {
    const href = page.alternates.get(code);
    if (!href) {
      fail(at, `hreflang ${code} manquant`);
      continue;
    }
    const target = toPath(href);
    if (!target || !pages.has(target)) fail(at, `hreflang ${code} ne designe aucune page generee : ${href}`);
    else if (code !== "x-default" && langOfPath(target) !== code) fail(at, `hreflang ${code} designe une page d'une autre langue : ${href}`);
    else if (!pages.get(target).alternates.get(page.lang)?.endsWith(at)) fail(at, `hreflang ${code} non reciproque : ${target} ne renvoie pas vers cette page`);
  }
  if (page.alternates.get(page.lang) !== page.canonical) fail(at, "le hreflang de la page elle-meme differe de sa canonical");
  if (page.alternates.get("x-default") !== page.alternates.get(DEFAULT_LANG)) fail(at, "x-default doit pointer vers la langue par defaut");

  // Open Graph.
  for (const key of ["og:title", "og:description", "og:url", "og:type", "og:image"]) if (!page.meta(key)?.trim()) fail(at, `${key} manquant`);
  for (const key of ["og:image:alt", "og:locale", "og:site_name"]) if (!page.meta(key)?.trim()) warn(at, `${key} manquant`);
  if (page.meta("og:url") !== page.canonical) fail(at, "og:url differente de la canonical");
  const ogImage = page.meta("og:image") ?? "";
  if (ogImage) {
    if (!ogImage.startsWith(ORIGIN)) fail(at, `og:image doit etre absolue et sur le domaine : ${ogImage}`);
    else if (!exists(ogImage.slice(ORIGIN.length))) fail(at, `og:image introuvable dans dist/ : ${ogImage}`);
    else if (/\.svg$/i.test(ogImage)) warn(at, "og:image est un SVG : les reseaux sociaux ne l'affichent pas, utiliser une image matricielle");
  }
  if (page.meta("og:locale") && page.meta("og:locale").slice(0, 2) !== page.lang) fail(at, `og:locale ${page.meta("og:locale")} ne correspond pas a la langue ${page.lang}`);
  const alternatesOg = page.metas.filter((m) => m.property === "og:locale:alternate").length;
  if (alternatesOg !== LANGS.length - 1) warn(at, `${alternatesOg} og:locale:alternate au lieu de ${LANGS.length - 1}`);

  // JSON-LD : valide, URLs absolues, coherent avec la page.
  const nodes = [];
  for (const block of page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(block[1]);
      nodes.push(...(Array.isArray(data) ? data : [data]));
    } catch (error) {
      fail(at, `JSON-LD invalide : ${error.message}`);
    }
    if (/undefined|\[object Object\]|localhost|":null/.test(block[1])) fail(at, "valeur invalide dans le JSON-LD");
  }
  const types = nodes.map((n) => n["@type"]);
  for (const node of nodes) {
    if (node["@context"] !== "https://schema.org") fail(at, `JSON-LD ${node["@type"]} sans @context schema.org`);
    for (const key of ["url", "mainEntityOfPage"]) if (typeof node[key] === "string" && node[key] !== page.canonical) fail(at, `JSON-LD ${node["@type"]}.${key} differe de la canonical`);
    for (const key of ["image", "logo"]) if (typeof node[key] === "string" && !/^https?:\/\//.test(node[key])) fail(at, `JSON-LD ${node["@type"]}.${key} n'est pas absolue`);
    for (const url of node.sameAs ?? []) if (!/^https?:\/\//.test(url)) fail(at, `JSON-LD sameAs non absolue : ${url}`);
    if (node.inLanguage && node.inLanguage !== page.lang) fail(at, `JSON-LD inLanguage ${node.inLanguage} differente de ${page.lang}`);
    if (node["@type"] === "BlogPosting") {
      for (const key of ["headline", "description", "datePublished", "inLanguage", "mainEntityOfPage"]) if (!node[key]) fail(at, `BlogPosting sans ${key}`);
      if (Number.isNaN(Date.parse(node.datePublished))) fail(at, "BlogPosting.datePublished n'est pas une date");
    }
  }
  const isHome = at === "/" || LANGS.some((code) => at === `/${code}/`);
  if (page.meta("og:type") === "article" && !types.includes("BlogPosting")) fail(at, "article sans JSON-LD BlogPosting");
  if (isHome && !(types.includes("WebSite") && types.includes("Organization"))) fail(at, "accueil sans WebSite et Organization");
  if (!isHome && page.meta("og:type") !== "article" && !types.includes("WebPage")) warn(at, "page sans JSON-LD WebPage");

  // Fil d'ariane : le HTML visible et le JSON-LD viennent de la meme liste, ils doivent concorder.
  const visible = /<nav\b[^>]*data-slot="breadcrumb"[^>]*>([\s\S]*?)<\/nav>/.exec(page.html);
  const crumbs = nodes.find((n) => n["@type"] === "BreadcrumbList");
  if (visible && !crumbs) fail(at, "fil d'ariane visible sans BreadcrumbList");
  else if (!visible && crumbs) fail(at, "BreadcrumbList sans fil d'ariane visible");
  else if (visible && crumbs) {
    const names = [...visible[1].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map((m) => strip(m[1]));
    const ld = crumbs.itemListElement.map((item) => item.name);
    if (JSON.stringify(names) !== JSON.stringify(ld)) fail(at, `fil d'ariane (${names.join(" > ")}) different du BreadcrumbList (${ld.join(" > ")})`);
    for (const item of crumbs.itemListElement) {
      const target = toPath(item.item ?? "");
      if (target === null || !exists(target)) fail(at, `BreadcrumbList : ${item.item} ne designe aucune page`);
    }
    if (crumbs.itemListElement.at(-1)?.item !== page.canonical) fail(at, "le dernier maillon du BreadcrumbList doit etre la page elle-meme");
  } else if (!isHome) warn(at, "page interieure sans fil d'ariane");
}

/* ------------------------------------------------------------------ */
/* Liens et ressources internes                                        */
/* ------------------------------------------------------------------ */

for (const page of pages.values()) {
  const at = page.path;
  const refs = [...page.html.matchAll(/<(a|link|img|script|source)\b[^>]*>/g)].flatMap((tag) => {
    const a = attrs(tag[0]);
    const out = [];
    if (a.href) out.push({ tag: tag[1], ref: a.href });
    if (a.src) out.push({ tag: tag[1], ref: a.src });
    if (a.srcset) for (const part of a.srcset.split(",")) out.push({ tag: tag[1], ref: part.trim().split(/\s+/)[0] });
    return out;
  });
  for (const { tag, ref } of refs) {
    // Les adresses absolues sont externes (Instagram, Facebook, WhatsApp...) : canonical et hreflang sont controles plus haut.
    if (!ref || /^(https?:|\/\/|mailto:|tel:|data:|#|javascript:)/.test(ref)) continue;
    if (!ref.startsWith("/")) {
      fail(at, `lien relatif ${ref}`);
      continue;
    }
    const clean = ref.split("#")[0].split("?")[0];
    if (!exists(clean)) fail(at, `lien casse ${ref}`);
    else if (tag === "a" && /\/index\.html$/.test(clean)) fail(at, `lien vers /index.html, forme dupliquee : ${ref}`);
    else if (tag === "a" && !clean.endsWith("/") && !/\.[a-z0-9]+$/i.test(clean)) fail(at, `lien sans slash final : ${ref}`);
  }
}

/* ------------------------------------------------------------------ */
/* Sitemap                                                             */
/* ------------------------------------------------------------------ */

const sitemapUrls = [];
const sitemapIndex = "/sitemap-index.xml";
if (!exists(sitemapIndex)) fail("sitemap", `${sitemapIndex} absent de dist/`);
else {
  const queue = [sitemapIndex];
  const seen = new Set();
  while (queue.length > 0) {
    const file = queue.shift();
    if (seen.has(file)) continue;
    seen.add(file);
    const xml = readFileSync(join(DIST, file), "utf8");
    const isIndex = /<sitemapindex[\s>]/.test(xml);
    if (!/^<\?xml/.test(xml) || !(isIndex || /<urlset[\s>]/.test(xml))) fail(`sitemap ${file}`, "XML invalide : declaration ou racine absente");
    const open = [...xml.matchAll(/<(url|sitemap)>/g)].length;
    const close = [...xml.matchAll(/<\/(url|sitemap)>/g)].length;
    if (open !== close) fail(`sitemap ${file}`, "balises <url> non equilibrees");
    for (const loc of [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => decode(m[1].trim()))) {
      if (!loc.startsWith(`${ORIGIN}/`)) fail(`sitemap ${file}`, `URL hors du domaine de production : ${loc}`);
      else if (isIndex) queue.push(loc.slice(ORIGIN.length));
      else sitemapUrls.push(loc);
    }
    if (isIndex) for (const next of queue) if (!exists(next)) fail("sitemap", `${next} reference mais absent de dist/`);
  }
}

const listed = new Set(sitemapUrls.map((url) => toPath(url)));
for (const url of sitemapUrls) {
  const path = toPath(url);
  const page = path && pages.get(path);
  if (!page) fail("sitemap", `${url} ne correspond a aucune page generee`);
  else if (page.noindex || page.is404) fail("sitemap", `${url} est noindex ou une page 404`);
  const bad = REMOVED.find((segment) => path?.split("/").includes(segment));
  if (bad) fail("sitemap", `${url} : ancienne route Reef supprimee (${bad})`);
}
for (const page of indexable) if (!listed.has(page.path)) fail("sitemap", `${ORIGIN}${page.path} (indexable) est absente du sitemap`);
for (const code of LANGS) {
  const home = code === DEFAULT_LANG ? "/" : `/${code}/`;
  if (!listed.has(home)) fail("sitemap", `accueil ${code} absent`);
}
// Les brouillons ne sont jamais construits, donc jamais listes : on le verifie sur leur slug.
const newsDir = join(ROOT, "src/data/news");
if (existsSync(newsDir)) {
  for (const file of readdirSync(newsDir, { recursive: true }).map(String).filter((f) => f.endsWith(".md"))) {
    if (!/^draft:\s*true\s*$/m.test(readFileSync(join(newsDir, file), "utf8"))) continue;
    const slug = file.split(/[\\/]/).pop().replace(/\.md$/, "");
    if ([...listed].some((path) => path?.endsWith(`/${slug}/`)) || [...pages.keys()].some((path) => path.endsWith(`/${slug}/`))) fail("sitemap", `le brouillon "${slug}" est construit ou liste`);
  }
}
for (const path of pages.keys()) {
  const bad = REMOVED.find((segment) => path.split("/").includes(segment));
  if (bad) fail(path, `ancienne route Reef supprimee (${bad}) presente dans dist/`);
}

/* ------------------------------------------------------------------ */
/* robots.txt                                                          */
/* ------------------------------------------------------------------ */

if (!exists("/robots.txt")) fail("robots.txt", "absent de dist/");
else {
  const robots = readFileSync(join(DIST, "robots.txt"), "utf8");
  if (/^Disallow:\s*\/\s*$/m.test(robots)) fail("robots.txt", "Disallow: / bloque tout le site");
  if (!/^User-agent:/im.test(robots)) fail("robots.txt", "aucun User-agent");
  const declared = [...robots.matchAll(/^Sitemap:\s*(\S+)\s*$/gim)].map((m) => m[1]);
  if (declared.length === 0) fail("robots.txt", "aucune ligne Sitemap");
  for (const url of declared) {
    if (!url.startsWith(`${ORIGIN}/`)) fail("robots.txt", `Sitemap hors du domaine de production : ${url}`);
    else if (!exists(url.slice(ORIGIN.length))) fail("robots.txt", `Sitemap ${url} absent de dist/`);
  }
  if (!declared.includes(`${ORIGIN}${sitemapIndex}`)) fail("robots.txt", `devrait referencer ${ORIGIN}${sitemapIndex}`);
}

/* ------------------------------------------------------------------ */
/* Rapport                                                             */
/* ------------------------------------------------------------------ */

for (const line of warnings) console.warn(`WARN  ${line}`);
for (const line of errors) console.error(`FAIL  ${line}`);
const summary = `${pages.size} page(s) (${indexable.length} indexables), ${sitemapUrls.length} URL(s) de sitemap : ${errors.length} erreur(s), ${warnings.length} avertissement(s).`;
if (errors.length > 0) {
  console.error(`\nFAIL ${summary}`);
  process.exit(1);
}
console.log(`PASS ${summary}`);
