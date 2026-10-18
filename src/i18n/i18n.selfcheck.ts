// src/i18n/i18n.selfcheck.ts - verifie l'i18n sans navigateur : dictionnaires de meme forme, adresses uniques, articles relies par translationKey dans les trois langues.
//
// Lance par `pnpm test` (scripts/checks.mjs). TypeScript impose deja les memes
// cles dans les trois dictionnaires ; ce fichier couvre ce que le type ne voit
// pas : la longueur des tableaux, les chaines vides, la coherence des adresses
// et des fichiers de contenu.
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { locales, type Locale } from "./config";
import { activityIds, activityPath, articlePath, sectionKeys, sectionPath, useTranslations } from "./index";

const failures: string[] = [];
const check = (name: string, run: () => void): void => {
  try {
    run();
  } catch (error) {
    failures.push(`${name} : ${error instanceof Error ? error.message : String(error)}`);
  }
};

/** Compare la forme de deux valeurs : memes cles, memes longueurs de tableaux, chaines non vides. */
function sameShape(reference: unknown, other: unknown, path: string): void {
  if (typeof reference === "string") {
    assert.equal(typeof other, "string", `${path} doit etre une chaine`);
    assert.ok((other as string).trim().length > 0, `${path} est vide`);
  } else if (Array.isArray(reference)) {
    assert.ok(Array.isArray(other), `${path} doit etre un tableau`);
    assert.equal((other as unknown[]).length, reference.length, `${path} : longueur differente`);
    reference.forEach((item, index) => sameShape(item, (other as unknown[])[index], `${path}[${index}]`));
  } else if (reference && typeof reference === "object") {
    assert.ok(other && typeof other === "object", `${path} doit etre un objet`);
    assert.deepEqual(Object.keys(other as object).sort(), Object.keys(reference).sort(), `${path} : cles differentes`);
    for (const key of Object.keys(reference)) {
      sameShape((reference as Record<string, unknown>)[key], (other as Record<string, unknown>)[key], `${path}.${key}`);
    }
  }
}

for (const locale of locales) {
  check(`dictionnaire ${locale}`, () => sameShape(useTranslations("en"), useTranslations(locale), locale));
}

// Les adresses de l'enonce, mot pour mot.
check("adresses attendues", () => {
  assert.equal(sectionPath("home", "en"), "/");
  assert.equal(sectionPath("home", "fr"), "/fr/");
  assert.equal(sectionPath("home", "es"), "/es/");
  assert.equal(sectionPath("gallery", "en"), "/galery/");
  assert.equal(sectionPath("news", "en"), "/news/");
  assert.equal(sectionPath("contact", "en"), "/contact/");
  assert.equal(activityPath("activity-1", "en"), "/activities/activity-1/");
  assert.equal(activityPath("activity-1", "fr"), "/fr/activites/activite-1/");
  assert.equal(activityPath("activity-1", "es"), "/es/actividades/actividad-1/");
  assert.equal(sectionPath("gallery", "fr"), "/fr/gallerie/");
  assert.equal(sectionPath("news", "fr"), "/fr/actualites/");
  assert.equal(sectionPath("contact", "fr"), "/fr/contact/");
  assert.equal(sectionPath("gallery", "es"), "/es/galeria/");
  assert.equal(sectionPath("news", "es"), "/es/noticias/");
  assert.equal(sectionPath("contact", "es"), "/es/contacto/");
});

// Aucune adresse ne doit apparaitre deux fois, dans aucune langue.
check("adresses uniques", () => {
  const seen = new Map<string, string>();
  const claim = (path: string, who: string): void => {
    assert.match(path, /^\/(.*\/)?$/, `${who} : l'adresse doit commencer et finir par un slash`);
    assert.ok(!seen.has(path), `${path} est prise par ${seen.get(path)} et ${who}`);
    seen.set(path, who);
  };
  for (const locale of locales) {
    for (const key of sectionKeys) claim(sectionPath(key, locale), `${key}/${locale}`);
    for (const id of activityIds) claim(activityPath(id, locale), `${id}/${locale}`);
  }
});

// Les legendes de la galerie doivent suivre les images de src/data/gallery.ts (11 aujourd'hui).
check("galerie", () => {
  const source = readFileSync(new URL("../data/gallery.ts", import.meta.url), "utf8");
  const images = [...source.matchAll(/\{ src: g\d+, shape: "/g)].length;
  assert.ok(images >= 9, `la galerie doit contenir au moins 9 images, ${images} trouvee(s)`);
  for (const locale of locales) assert.equal(useTranslations(locale).gallery.length, images, `${locale} : ${images} legendes attendues`);
});

// Chaque article existe dans les trois langues sous la meme translationKey.
check("actualites", () => {
  const base = new URL("../data/news/", import.meta.url);
  const byKey = new Map<string, Map<string, string>>();
  for (const locale of locales) {
    for (const file of readdirSync(new URL(`${locale}/`, base)).filter((name) => name.endsWith(".md"))) {
      const text = readFileSync(new URL(`${locale}/${file}`, base), "utf8");
      const field = (name: string): string => {
        const match = new RegExp(`^${name}:\\s*"?([^"\\r\\n]+)"?\\s*$`, "m").exec(text);
        assert.ok(match, `${locale}/${file} : champ ${name} manquant`);
        return match[1]!.trim();
      };
      assert.equal(field("locale"), locale, `${locale}/${file} : locale du frontmatter differente du dossier`);
      const versions = byKey.get(field("translationKey")) ?? new Map<string, string>();
      assert.ok(!versions.has(locale), `${locale}/${file} : translationKey en double`);
      versions.set(locale, file);
      byKey.set(field("translationKey"), versions);
      claimArticle(file.replace(/\.md$/, ""), locale as Locale);
    }
  }
  assert.ok(byKey.size >= 3, `au moins 3 articles attendus, ${byKey.size} trouve(s)`);
  for (const [key, versions] of byKey) {
    for (const locale of locales) assert.ok(versions.has(locale), `translationKey "${key}" : version ${locale} manquante`);
  }
});

function claimArticle(slug: string, locale: Locale): void {
  assert.match(articlePath(slug, locale), /^\/(fr\/|es\/)?(news|actualites|noticias)\/[a-z0-9-]+\/$/, `slug invalide : ${slug}`);
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("i18n : dictionnaires, adresses et articles coherents.");
