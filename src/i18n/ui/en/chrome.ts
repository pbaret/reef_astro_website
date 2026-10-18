// src/i18n/ui/en/chrome.ts - le cadre du site en anglais : identite, SEO, navigation, boutons, libelles d'accessibilite, pied de page.
//
// Tout texte affiche vit dans le dictionnaire, jamais dans un composant. Les
// textes sont des PLACEHOLDERS : a remplacer par ceux de l'organisation.
export const chrome = {
  site: {
    name: "Placeholder Organization",
    tagline: "A short placeholder tagline presenting your professional activity in one sentence.",
    description:
      "Placeholder description of a professional organization, its activities, its gallery and its news. Replace this text with your own.",
    separator: " | ",
    ogImageAlt: "Abstract placeholder illustration made of layered waves",
  },
  seo: {
    home: {
      title: "Placeholder Organization | Professional activities",
      description: "Placeholder home page: three activities, latest news and a way to get in touch.",
    },
    activities: {
      title: "Activities",
      description: "Placeholder overview of the three activities offered by the organization.",
    },
    gallery: {
      title: "Gallery",
      description: "Placeholder photo gallery: a responsive grid of local demonstration images.",
    },
    news: {
      title: "News",
      description: "Placeholder news: the latest articles published by the organization.",
    },
    contact: {
      title: "About and contact",
      description: "Placeholder presentation of the organization, its values and its contact details.",
    },
    notFound: {
      title: "Page not found",
      description: "The page you are looking for does not exist.",
    },
  },
  nav: {
    mainLabel: "Main navigation",
    mobileLabel: "Mobile navigation",
    brandHome: "Placeholder Organization, home",
    openMenu: "Open the menu",
    closeMenu: "Close the menu",
    menuTitle: "Menu",
    switchLanguage: "Language",
    home: "Home",
    activities: "Activities",
    gallery: "Gallery",
    news: "News",
    contact: "Contact",
  },
  common: {
    skipToContent: "Skip to main content",
    close: "Close",
    home: "Home",
    breadcrumbLabel: "Breadcrumb",
    learnMore: "Learn more",
    contactUs: "Contact us",
    allNews: "All news",
    backToNews: "Back to the news",
    backToTop: "Back to top",
    publishedOn: "Published on",
    alsoAvailable: "Also available in",
    notFoundTitle: "This page could not be found",
    notFoundLede: "The address may be wrong, or the page may have moved. Head back to the home page.",
    notFoundCta: "Back to the home page",
  },
  footer: {
    navigationTitle: "Navigation",
    contactTitle: "Contact",
    followTitle: "Follow us",
    rights: "All rights reserved.",
    demoNotice: "Placeholder content: every name, address, phone number and e-mail on this site is fictional.",
    social: {
      instagram: { label: "Instagram", aria: "Follow us on Instagram" },
      facebook: { label: "Facebook", aria: "Follow us on Facebook" },
      whatsapp: { label: "WhatsApp", aria: "Message us on WhatsApp" },
    },
  },
  contactInfo: {
    addressLabel: "Address",
    address: "123 Placeholder Street, 00000 Sample City",
    phoneLabel: "Phone",
    emailLabel: "E-mail",
    hoursLabel: "Opening hours",
    hours: ["Monday to Friday: 9:00 to 17:00", "Saturday: 10:00 to 12:00", "Sunday: closed"],
    socialLabel: "Social networks",
  },
} as const;
