// src/js/news.ts - lecture de la collection d'actualites : liste par langue, slug, adresse et traductions d'un article.
import { articlePath, locales, translationsOf, type Locale, type Translations } from "@i18n";
import { getImage } from "astro:assets";
import { getCollection, type CollectionEntry } from "astro:content";

export type NewsEntry = CollectionEntry<"news">;

/** Le slug d'un article : l'id sans le dossier de langue ("fr/mon-article" devient "mon-article"). */
export function newsSlug(entry: NewsEntry): string {
  return entry.id.split("/").slice(1).join("/");
}

/** L'adresse d'un article dans sa propre langue. */
export function newsHref(entry: NewsEntry): string {
  return articlePath(newsSlug(entry), entry.data.locale);
}

/**
 * L'image de partage d'un article : la sienne, recadree en 1200x630 JPEG, quand
 * c'est une image matricielle. Les reseaux sociaux ne lisent pas le SVG : un
 * article a image SVG (les placeholders) retombe sur la carte par defaut.
 */
export async function newsShareImage(entry: NewsEntry): Promise<string | undefined> {
  if (entry.data.image.format === "svg") return undefined;
  const card = await getImage({ src: entry.data.image, width: 1200, height: 630, fit: "cover", format: "jpg" });
  return card.src;
}

/**
 * Tous les articles publies, du plus recent au plus ancien, apres verification :
 * le dossier doit porter la langue du frontmatter, et chaque translationKey doit
 * exister dans les trois langues. Un oubli casse le build au lieu de produire
 * une page sans traduction.
 */
async function loadNews(): Promise<NewsEntry[]> {
  const entries = (await getCollection("news")).filter((entry) => entry.data.draft !== true);
  const byKey = new Map<string, Set<Locale>>();
  for (const entry of entries) {
    const folder = entry.id.split("/")[0];
    if (folder !== entry.data.locale) {
      throw new Error(`news: "${entry.id}" est range dans "${folder}" mais declare locale "${entry.data.locale}"`);
    }
    const seen = byKey.get(entry.data.translationKey) ?? new Set<Locale>();
    if (seen.has(entry.data.locale)) {
      throw new Error(`news: translationKey "${entry.data.translationKey}" est en double pour la langue ${entry.data.locale}`);
    }
    seen.add(entry.data.locale);
    byKey.set(entry.data.translationKey, seen);
  }
  for (const [key, seen] of byKey) {
    const missing = locales.filter((locale) => !seen.has(locale));
    if (missing.length > 0) throw new Error(`news: translationKey "${key}" n'a pas de version ${missing.join(", ")}`);
  }
  return entries.sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

/** Les articles d'une langue, du plus recent au plus ancien. */
export async function getNews(locale: Locale): Promise<NewsEntry[]> {
  return (await loadNews()).filter((entry) => entry.data.locale === locale);
}

/** L'adresse d'un article dans chaque langue : le selecteur de langue et hreflang la lisent. */
export async function getNewsTranslations(entry: NewsEntry): Promise<Translations> {
  const siblings = (await loadNews()).filter((other) => other.data.translationKey === entry.data.translationKey);
  const byLocale = new Map(siblings.map((other) => [other.data.locale, other]));
  return translationsOf((locale) => {
    const sibling = byLocale.get(locale);
    if (!sibling) throw new Error(`news: pas de version ${locale} pour "${entry.data.translationKey}"`);
    return newsHref(sibling);
  });
}
