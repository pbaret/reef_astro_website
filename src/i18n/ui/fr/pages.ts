// src/i18n/ui/fr/pages.ts - les textes des pages en francais : accueil, listes, activites, actualites, a propos et contact.
import type { Dictionary } from "../types";

export const pages = {
  home: {
    eyebrow: "Organisation de remplacement",
    title: "Un titre de remplacement clair pour votre activité",
    titleAccent: "remplacement",
    lede: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Un court paragraphe de remplacement qui présente l'organisation et ce qu'elle fait.",
    primary: "Découvrir nos activités",
    secondary: "Nous contacter",
    imageAlt: "Illustration abstraite de remplacement : des vagues turquoise superposées sur un fond sombre",
    activitiesEyebrow: "Ce que nous faisons",
    activitiesTitle: "Trois activités de remplacement",
    activitiesAccent: "activités",
    activitiesLede: "Chaque carte mène à une page dédiée. Les noms et résumés ci-dessous sont du contenu de démonstration.",
    newsEyebrow: "Dernières actualités",
    newsTitle: "Actualités de remplacement récentes",
    newsAccent: "actualités",
    newsLede: "Les trois articles les plus récents, avec un lien vers la liste complète.",
    ctaTitle: "Prêt à engager la conversation ?",
    ctaAccent: "conversation",
    ctaLede: "Lorem ipsum dolor sit amet. Écrivez-nous, appelez-nous ou rendez-nous visite : ceci est une invitation de remplacement.",
  },
  activitiesPage: {
    eyebrow: "Activités",
    title: "Nos activités de remplacement",
    accent: "activités",
    lede: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Trois activités de démonstration, chacune avec sa propre page.",
    benefitsTitle: "Ce que vous obtenez",
    galleryTitle: "En images",
    otherTitle: "Autres activités",
    ctaTitle: "Cette activité vous intéresse ?",
    ctaAccent: "activité",
    ctaLede: "Invitation de remplacement à nous écrire pour discuter de vos besoins.",
    ctaButton: "Nous contacter",
  },
  galleryPage: {
    eyebrow: "Galerie",
    title: "Une galerie photo de remplacement",
    accent: "galerie",
    lede: "Des images de démonstration locales dans une grille responsive stable. Remplacez-les par vos photographies et tenez les légendes à jour.",
  },
  newsPage: {
    eyebrow: "Actualités",
    title: "Dernières actualités de remplacement",
    accent: "actualités",
    lede: "Une petite section éditoriale : trois articles de démonstration disponibles en trois langues.",
  },
  contactPage: {
    eyebrow: "À propos et contact",
    title: "Qui nous sommes et comment nous joindre",
    accent: "nous joindre",
    lede: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Présentation de remplacement de l'organisation et de ses coordonnées.",
    aboutTitle: "Qui nous sommes",
    aboutBody: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ce paragraphe est un texte de remplacement. Décrivez votre organisation, son histoire et sa mission en quelques phrases.",
    ],
    imageAlt: "Illustration abstraite de remplacement pour la section à propos : formes douces turquoise et corail",
    valuesTitle: "Nos engagements",
    values: [
      {
        title: "Première valeur de remplacement",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Décrivez ici un premier engagement.",
      },
      {
        title: "Deuxième valeur de remplacement",
        body: "Ut enim ad minim veniam, quis nostrud exercitation. Décrivez ici un deuxième engagement.",
      },
      {
        title: "Troisième valeur de remplacement",
        body: "Duis aute irure dolor in reprehenderit. Décrivez ici un troisième engagement.",
      },
    ],
    infoTitle: "Coordonnées",
  },
  newsList: {
    empty: "Aucun article n'est publié pour le moment.",
  },
} satisfies Pick<Dictionary, "home" | "activitiesPage" | "galleryPage" | "newsPage" | "contactPage" | "newsList">;
