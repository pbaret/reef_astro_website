// src/i18n/ui/fr/chrome.ts - le cadre du site en francais : identite, SEO, navigation, boutons, libelles d'accessibilite, pied de page.
import type { Dictionary } from "../types";

export const chrome = {
  site: {
    name: "Organisation Exemple",
    tagline: "Un court slogan de remplacement qui présente votre activité professionnelle en une phrase.",
    description:
      "Description de remplacement d'une organisation professionnelle, de ses activités, de sa galerie et de ses actualités. Remplacez ce texte par le vôtre.",
    separator: " | ",
    ogImageAlt: "Illustration abstraite de remplacement faite de vagues superposées",
  },
  seo: {
    home: {
      title: "Organisation Exemple | Activités professionnelles",
      description: "Page d'accueil de remplacement : trois activités, les dernières actualités et un moyen de nous contacter.",
    },
    activities: {
      title: "Activités",
      description: "Aperçu de remplacement des trois activités proposées par l'organisation.",
    },
    gallery: {
      title: "Galerie",
      description: "Galerie photo de remplacement : une grille responsive d'images de démonstration locales.",
    },
    news: {
      title: "Actualités",
      description: "Actualités de remplacement : les derniers articles publiés par l'organisation.",
    },
    contact: {
      title: "À propos et contact",
      description: "Présentation de remplacement de l'organisation, de ses valeurs et de ses coordonnées.",
    },
    notFound: {
      title: "Page introuvable",
      description: "La page que vous cherchez n'existe pas.",
    },
  },
  nav: {
    mainLabel: "Navigation principale",
    mobileLabel: "Navigation mobile",
    brandHome: "Organisation Exemple, accueil",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    menuTitle: "Menu",
    switchLanguage: "Langue",
    home: "Accueil",
    activities: "Activités",
    gallery: "Galerie",
    news: "Actualités",
    contact: "Contact",
  },
  common: {
    skipToContent: "Aller au contenu principal",
    close: "Fermer",
    home: "Accueil",
    breadcrumbLabel: "Fil d'Ariane",
    learnMore: "En savoir plus",
    contactUs: "Nous contacter",
    allNews: "Toutes les actualités",
    backToNews: "Retour aux actualités",
    backToTop: "Retour en haut",
    publishedOn: "Publié le",
    alsoAvailable: "Aussi disponible en",
    notFoundTitle: "Cette page est introuvable",
    notFoundLede: "L'adresse est peut-être erronée, ou la page a changé de place. Retournez à l'accueil.",
    notFoundCta: "Retour à l'accueil",
  },
  footer: {
    navigationTitle: "Navigation",
    contactTitle: "Contact",
    followTitle: "Suivez-nous",
    rights: "Tous droits réservés.",
    demoNotice: "Contenu de remplacement : les noms, adresses, numéros de téléphone et e-mails de ce site sont fictifs.",
    social: {
      instagram: { label: "Instagram", aria: "Suivez-nous sur Instagram" },
      facebook: { label: "Facebook", aria: "Suivez-nous sur Facebook" },
      whatsapp: { label: "WhatsApp", aria: "Écrivez-nous sur WhatsApp" },
    },
  },
  contactInfo: {
    addressLabel: "Adresse",
    address: "123 rue de l'Exemple, 00000 Ville-Exemple",
    phoneLabel: "Téléphone",
    emailLabel: "E-mail",
    hoursLabel: "Horaires d'ouverture",
    hours: ["Du lundi au vendredi : 9 h à 17 h", "Samedi : 10 h à 12 h", "Dimanche : fermé"],
    socialLabel: "Réseaux sociaux",
  },
} satisfies Pick<Dictionary, "site" | "seo" | "nav" | "common" | "footer" | "contactInfo">;
