// src/js/pages.ts - la liste de toutes les pages du site : une description par page ET par langue, avec son adresse et ses traductions.
//
// C'est la seule source des routes statiques : src/pages/[...path].astro la lit
// dans getStaticPaths. Ajouter une langue, une activite ou un article ne
// demande donc de toucher aucune page.
import {
  activityIds,
  activityPath,
  locales,
  sectionKeys,
  sectionPath,
  translationsOf,
  type ActivityId,
  type Locale,
  type SectionKey,
  type Translations,
} from "@i18n";
import { getNews, getNewsTranslations, newsHref, type NewsEntry } from "./news";

interface PageBase {
  locale: Locale;
  /** L'adresse de la page, avec ses slashs : "/fr/actualites/". */
  path: string;
  /** La meme page dans chaque langue (selecteur de langue et hreflang). */
  translations: Translations;
}

export type PageDescriptor =
  | (PageBase & { kind: SectionKey })
  | (PageBase & { kind: "activity"; id: ActivityId })
  | (PageBase & { kind: "article"; entry: NewsEntry });

/** Le parametre de route d'Astro : sans slash de debut ni de fin, et absent pour la racine. */
export function routeParam(path: string): string | undefined {
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  return trimmed === "" ? undefined : trimmed;
}

export async function listPages(): Promise<PageDescriptor[]> {
  const pages: PageDescriptor[] = [];

  for (const locale of locales) {
    for (const key of sectionKeys) {
      pages.push({
        kind: key,
        locale,
        path: sectionPath(key, locale),
        translations: translationsOf((code) => sectionPath(key, code)),
      });
    }
    for (const id of activityIds) {
      pages.push({
        kind: "activity",
        id,
        locale,
        path: activityPath(id, locale),
        translations: translationsOf((code) => activityPath(id, code)),
      });
    }
    for (const entry of await getNews(locale)) {
      pages.push({
        kind: "article",
        entry,
        locale,
        path: newsHref(entry),
        translations: await getNewsTranslations(entry),
      });
    }
  }

  return pages;
}
