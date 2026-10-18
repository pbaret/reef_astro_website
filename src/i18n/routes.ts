// src/i18n/routes.ts - la table des adresses : chaque page a un segment par langue, et c'est ici qu'on les change.
//
// Les segments sont TRADUITS (/fr/actualites/, /es/noticias/) et ne sont ecrits
// qu'une fois. Toute adresse interne du site passe par les fonctions de ce
// fichier : aucun composant n'assemble une URL a la main, donc aucun lien ne
// peut pointer vers un segment qui n'existe pas.
//
// Les adresses de l'enonce sont reprises telles quelles, y compris /galery/ et
// /fr/gallerie/ : pour les corriger (gallery, galerie), il suffit de changer
// les deux lignes de `sectionSlugs`, tout le reste suit.
import { defaultLocale, locales, type Locale } from "./config";

/** Les pages de premier niveau du site. */
export type SectionKey = "home" | "activities" | "gallery" | "news" | "contact";

export const sectionKeys: readonly SectionKey[] = ["home", "activities", "gallery", "news", "contact"];

/** Le segment de chaque section, par langue. Vide pour l'accueil. */
export const sectionSlugs: Record<SectionKey, Record<Locale, string>> = {
  home: { en: "", fr: "", es: "" },
  activities: { en: "activities", fr: "activites", es: "actividades" },
  gallery: { en: "galery", fr: "gallerie", es: "galeria" },
  news: { en: "news", fr: "actualites", es: "noticias" },
  contact: { en: "contact", fr: "contact", es: "contacto" },
};

/** Les trois activites de demonstration : l'identifiant est la cle de traduction. */
export const activityIds = ["activity-1", "activity-2", "activity-3"] as const;

export type ActivityId = (typeof activityIds)[number];

export const activitySlugs: Record<ActivityId, Record<Locale, string>> = {
  "activity-1": { en: "activity-1", fr: "activite-1", es: "actividad-1" },
  "activity-2": { en: "activity-2", fr: "activite-2", es: "actividad-2" },
  "activity-3": { en: "activity-3", fr: "activite-3", es: "actividad-3" },
};

/** Le prefixe d'URL d'une langue. Vide pour la langue par defaut, servie a la racine. */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/** L'adresse d'une page de premier niveau : "/", "/fr/actualites/", "/es/contacto/". */
export function sectionPath(key: SectionKey, locale: Locale): string {
  const slug = sectionSlugs[key][locale];
  return slug === "" ? `${localePrefix(locale)}/` : `${localePrefix(locale)}/${slug}/`;
}

/** L'adresse d'une activite : "/activities/activity-1/", "/fr/activites/activite-1/". */
export function activityPath(id: ActivityId, locale: Locale): string {
  return `${sectionPath("activities", locale)}${activitySlugs[id][locale]}/`;
}

/** L'adresse d'un article a partir de son slug dans cette langue. */
export function articlePath(slug: string, locale: Locale): string {
  return `${sectionPath("news", locale)}${slug}/`;
}

/** La meme page dans chaque langue : sert au selecteur de langue ET aux balises hreflang. */
export type Translations = Record<Locale, string>;

/** Construit la table des equivalents d'une page a partir d'une fonction d'adresse. */
export function translationsOf(pathFor: (locale: Locale) => string): Translations {
  return Object.fromEntries(locales.map((locale) => [locale, pathFor(locale)])) as Translations;
}
