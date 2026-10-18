// src/i18n/config.ts - la liste des langues du site. Ajouter une langue commence ici, et seulement ici.
//
// Trois langues : l'anglais (defaut, servi a la racine), le francais (/fr/) et
// l'espagnol (/es/). Pour en ajouter une quatrieme :
//   1. ajouter le code dans `locales` et sa fiche dans `localeMeta` ;
//   2. ajouter ses segments d'URL dans src/i18n/routes.ts ;
//   3. creer src/i18n/ui/<code>/ en copiant src/i18n/ui/en/ (TypeScript refuse
//      de compiler tant qu'une seule cle manque : c'est le filet de securite) ;
//   4. ajouter un dossier src/data/news/<code>/ avec les memes translationKey.

/** Les langues servies par le site. */
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

/** La langue servie a la racine du domaine, sans prefixe d'URL. */
export const defaultLocale: Locale = "en";

export interface LocaleMeta {
  /** Le nom de la langue ECRIT DANS CETTE LANGUE, jamais traduit. */
  label: string;
  /** Code BCP-47 pour <html lang> et les balises hreflang. */
  htmlLang: string;
  /** Sens d'ecriture, prevu pour qu'une langue RTL ne rouvre aucun layout. */
  dir: "ltr" | "rtl";
  /** Locale de formatage des dates (Intl). */
  intl: string;
  /** Deux lettres : un drapeau designe un pays, pas une langue. */
  short: string;
}

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { label: "English", htmlLang: "en", dir: "ltr", intl: "en-US", short: "EN" },
  fr: { label: "Français", htmlLang: "fr", dir: "ltr", intl: "fr-FR", short: "FR" },
  es: { label: "Español", htmlLang: "es", dir: "ltr", intl: "es-ES", short: "ES" },
};

/** Vrai si la valeur est une langue du site : on ne fait jamais confiance a un segment d'URL. */
export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
