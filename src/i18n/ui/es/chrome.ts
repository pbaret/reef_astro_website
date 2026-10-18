// src/i18n/ui/es/chrome.ts - le cadre du site en espagnol : identite, SEO, navigation, boutons, libelles d'accessibilite, pied de page.
import type { Dictionary } from "../types";

export const chrome = {
  site: {
    name: "Organización Ejemplo",
    tagline: "Un breve eslogan de relleno que presenta su actividad profesional en una frase.",
    description:
      "Descripción de relleno de una organización profesional, sus actividades, su galería y sus noticias. Sustituya este texto por el suyo.",
    separator: " | ",
    ogImageAlt: "Ilustración abstracta de relleno hecha de olas superpuestas",
  },
  seo: {
    home: {
      title: "Organización Ejemplo | Actividades profesionales",
      description: "Página de inicio de relleno: tres actividades, las últimas noticias y una forma de contactarnos.",
    },
    activities: {
      title: "Actividades",
      description: "Resumen de relleno de las tres actividades que ofrece la organización.",
    },
    gallery: {
      title: "Galería",
      description: "Galería de fotos de relleno: una cuadrícula adaptable de imágenes de demostración locales.",
    },
    news: {
      title: "Noticias",
      description: "Noticias de relleno: los últimos artículos publicados por la organización.",
    },
    contact: {
      title: "Acerca de y contacto",
      description: "Presentación de relleno de la organización, sus valores y sus datos de contacto.",
    },
    notFound: {
      title: "Página no encontrada",
      description: "La página que busca no existe.",
    },
  },
  nav: {
    mainLabel: "Navegación principal",
    mobileLabel: "Navegación móvil",
    brandHome: "Organización Ejemplo, inicio",
    openMenu: "Abrir el menú",
    closeMenu: "Cerrar el menú",
    menuTitle: "Menú",
    switchLanguage: "Idioma",
    home: "Inicio",
    activities: "Actividades",
    gallery: "Galería",
    news: "Noticias",
    contact: "Contacto",
  },
  common: {
    skipToContent: "Saltar al contenido principal",
    close: "Cerrar",
    home: "Inicio",
    breadcrumbLabel: "Migas de pan",
    learnMore: "Saber más",
    contactUs: "Contáctenos",
    allNews: "Todas las noticias",
    backToNews: "Volver a las noticias",
    backToTop: "Volver arriba",
    publishedOn: "Publicado el",
    alsoAvailable: "También disponible en",
    notFoundTitle: "No se encontró esta página",
    notFoundLede: "Puede que la dirección sea incorrecta o que la página haya cambiado de lugar. Vuelva al inicio.",
    notFoundCta: "Volver al inicio",
  },
  footer: {
    navigationTitle: "Navegación",
    contactTitle: "Contacto",
    followTitle: "Síganos",
    rights: "Todos los derechos reservados.",
    demoNotice: "Contenido de relleno: todos los nombres, direcciones, teléfonos y correos de este sitio son ficticios.",
    social: {
      instagram: { label: "Instagram", aria: "Síganos en Instagram" },
      facebook: { label: "Facebook", aria: "Síganos en Facebook" },
      whatsapp: { label: "WhatsApp", aria: "Escríbanos por WhatsApp" },
    },
  },
  contactInfo: {
    addressLabel: "Dirección",
    address: "Calle Ejemplo 123, 00000 Ciudad Ejemplo",
    phoneLabel: "Teléfono",
    emailLabel: "Correo electrónico",
    hoursLabel: "Horario de apertura",
    hours: ["De lunes a viernes: 9:00 a 17:00", "Sábado: 10:00 a 12:00", "Domingo: cerrado"],
    socialLabel: "Redes sociales",
  },
} satisfies Pick<Dictionary, "site" | "seo" | "nav" | "common" | "footer" | "contactInfo">;
