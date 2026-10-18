// src/js/schema.ts - constructeurs JSON-LD purs : des objets prets pour JSON.stringify, zero paquet SEO.
//
// Toutes les adresses sont ABSOLUES (le site vient d'`Astro.site`, l'appelant les
// construit) et rien n'est invente : pas d'avis, de note, de prix ni d'adresse.

/** Un noeud JSON-LD racine, pret a etre serialise dans un <script type="application/ld+json">. */
export interface JsonLdNode {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: unknown;
}

const CONTEXT = "https://schema.org" as const;

/** Retire les cles restees a undefined : l'objet rendu est propre a serialiser. */
function compact<T extends Record<string, unknown>>(node: T): T {
  return Object.fromEntries(Object.entries(node).filter(([, value]) => value !== undefined)) as T;
}

/** Serialise un noeud pour un <script> : "<" est echappe, un texte contenant "</script>" ne peut pas casser la page. */
export function jsonLd(node: JsonLdNode): string {
  return JSON.stringify(node).replace(/</g, "\\u003c");
}

export interface OrganizationInput {
  name: string;
  url: string;
  logo?: string;
  /** Profils sociaux REELS seulement ; une liste vide n'ecrit rien. */
  sameAs?: string[];
}

/** Le noeud Organization du site : a poser une fois par langue, sur la page d'accueil. */
export function organization(input: OrganizationInput): JsonLdNode {
  return compact({
    "@context": CONTEXT,
    "@type": "Organization",
    name: input.name,
    url: input.url,
    logo: input.logo,
    sameAs: input.sameAs?.length ? input.sameAs : undefined,
  });
}

export interface WebsiteInput {
  name: string;
  url: string;
  description?: string;
  inLanguage: string;
}

/** Le noeud WebSite : identite du site pour les moteurs, complementaire d'Organization. */
export function website(input: WebsiteInput): JsonLdNode {
  return compact({
    "@context": CONTEXT,
    "@type": "WebSite",
    name: input.name,
    url: input.url,
    description: input.description,
    inLanguage: input.inLanguage,
  });
}

export interface WebPageInput {
  name: string;
  description: string;
  url: string;
  inLanguage: string;
  /** L'adresse absolue du site, pour `isPartOf`. */
  siteUrl: string;
}

/** Le noeud WebPage des pages standard (activites, galerie, actualites, contact). */
export function webPage(input: WebPageInput): JsonLdNode {
  return {
    "@context": CONTEXT,
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: input.inLanguage,
    isPartOf: { "@type": "WebSite", url: input.siteUrl },
  };
}

export interface BlogPostingInput {
  headline: string;
  description: string;
  url: string;
  inLanguage: string;
  datePublished: Date;
  /** Seulement s'il existe une vraie date de modification. */
  dateModified?: Date | undefined;
  /** URL absolue d'une image raster, sinon rien. */
  image?: string | undefined;
  /** L'organisation du site : aucune identite de personne n'est inventee. */
  organizationName: string;
}

/** Le noeud BlogPosting d'un article d'actualite. */
export function blogPosting(input: BlogPostingInput): JsonLdNode {
  const organizationNode = { "@type": "Organization", name: input.organizationName };
  return compact({
    "@context": CONTEXT,
    "@type": "BlogPosting",
    headline: input.headline,
    description: input.description,
    url: input.url,
    mainEntityOfPage: input.url,
    inLanguage: input.inLanguage,
    datePublished: input.datePublished.toISOString(),
    dateModified: input.dateModified?.toISOString(),
    image: input.image,
    author: organizationNode,
    publisher: organizationNode,
  });
}

export interface BreadcrumbEntry {
  name: string;
  /** Adresse ABSOLUE. */
  url: string;
}

/** Le noeud BreadcrumbList : positions 1-based, dans l'ordre recu (racine d'abord). */
export function breadcrumbList(entries: BreadcrumbEntry[]): JsonLdNode {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.url,
    })),
  };
}
