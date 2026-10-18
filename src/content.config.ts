// src/content.config.ts - la collection d'actualites : un fichier Markdown par article ET par langue, relies par translationKey.
//
// Le contenu est range par langue : src/data/news/en/..., fr/..., es/... Le loader
// glob fabrique des id prefixes ("fr/mon-article") : le prefixe est la langue,
// le reste est le slug de l'article dans cette langue (voir src/js/news.ts).
// Les trois versions d'un meme article partagent la meme translationKey, ce qui
// permet au selecteur de langue de pointer vers la traduction exacte.
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";
import { locales } from "./i18n/config";

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/news" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      // A renseigner seulement apres une vraie modification : jamais generee au build.
      updatedDate: z.coerce.date().optional(),
      // image() donne a Astro de quoi optimiser et connaitre les dimensions :
      // pas de decalage de mise en page au chargement.
      image: image(),
      imageAlt: z.string(),
      locale: z.enum(locales),
      translationKey: z.string(),
      // Un brouillon n'est ni liste ni construit.
      draft: z.boolean().default(false),
    }),
});

export const collections = { news };
