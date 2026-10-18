// src/i18n/index.ts - tout ce qu'un composant a besoin de savoir sur la langue.
//
//   const locale = getLocale(Astro);      // quelle langue rend-on ?
//   const t = useTranslations(locale);    // la copie de cette langue
//   <h1>{t.home.heroTitle}</h1>
//
// `t` est l'objet du dictionnaire, pas une fonction a cle textuelle : la cle est
// autocompletee, verifiee au build et renommee par le refactoring de l'editeur.
import { defaultLocale, isLocale, localeMeta, locales, type Locale } from "./config";
import { en } from "./ui/en/index";
import { es } from "./ui/es/index";
import { fr } from "./ui/fr/index";
import type { Dictionary } from "./ui/types";

export { defaultLocale, isLocale, localeMeta, locales };
export type { Dictionary, Locale };
export * from "./routes";

const dictionaries: Record<Locale, Dictionary> = { en, fr, es };

/** La copie d'une langue. Jamais de secours silencieux : une cle manquante casse le build. */
export function useTranslations(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** La langue de la page en cours, deduite de l'URL par Astro puis validee. */
export function getLocale(ctx: { currentLocale?: string | undefined }): Locale {
  return isLocale(ctx.currentLocale) ? ctx.currentLocale : defaultLocale;
}

/** Remplace les jetons {nom} d'une chaine traduite. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) => (key in vars ? String(vars[key]) : whole));
}

/** Une date ecrite dans les usages de la langue, pas dans ceux du serveur. */
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(localeMeta[locale].intl, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}
