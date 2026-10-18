// src/i18n/ui/es/pages.ts - les textes des pages en espagnol : accueil, listes, activites, actualites, a propos et contact.
import type { Dictionary } from "../types";

export const pages = {
  home: {
    eyebrow: "Organización de relleno",
    title: "Un titular de relleno claro para su actividad",
    titleAccent: "relleno",
    lede: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Un breve párrafo de relleno que presenta la organización y lo que hace.",
    primary: "Descubra nuestras actividades",
    secondary: "Contáctenos",
    imageAlt: "Ilustración abstracta de relleno: olas turquesa superpuestas sobre un fondo oscuro",
    activitiesEyebrow: "Lo que hacemos",
    activitiesTitle: "Tres actividades de relleno",
    activitiesAccent: "actividades",
    activitiesLede: "Cada tarjeta lleva a una página dedicada. Los nombres y resúmenes siguientes son contenido de demostración.",
    newsEyebrow: "Últimas noticias",
    newsTitle: "Noticias de relleno recientes",
    newsAccent: "noticias",
    newsLede: "Los tres artículos más recientes, con un enlace a la lista completa.",
    ctaTitle: "¿Listo para iniciar una conversación?",
    ctaAccent: "conversación",
    ctaLede: "Lorem ipsum dolor sit amet. Escríbanos, llámenos o visítenos: esta es una invitación de relleno.",
  },
  activitiesPage: {
    eyebrow: "Actividades",
    title: "Nuestras actividades de relleno",
    accent: "actividades",
    lede: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tres actividades de demostración, cada una con su propia página.",
    benefitsTitle: "Lo que obtiene",
    galleryTitle: "En imágenes",
    otherTitle: "Otras actividades",
    ctaTitle: "¿Le interesa esta actividad?",
    ctaAccent: "actividad",
    ctaLede: "Invitación de relleno para escribirnos y hablar de sus necesidades.",
    ctaButton: "Contáctenos",
  },
  galleryPage: {
    eyebrow: "Galería",
    title: "Una galería de fotos de relleno",
    accent: "galería",
    lede: "Imágenes de demostración locales en una cuadrícula adaptable y estable. Sustitúyalas por sus fotografías y mantenga los pies de foto al día.",
  },
  newsPage: {
    eyebrow: "Noticias",
    title: "Últimas noticias de relleno",
    accent: "noticias",
    lede: "Una pequeña sección editorial: tres artículos de demostración disponibles en tres idiomas.",
  },
  contactPage: {
    eyebrow: "Acerca de y contacto",
    title: "Quiénes somos y cómo contactarnos",
    accent: "contactarnos",
    lede: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Presentación de relleno de la organización y de sus datos de contacto.",
    aboutTitle: "Quiénes somos",
    aboutBody: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Este párrafo es un texto de relleno. Describa su organización, su historia y su misión en pocas frases.",
    ],
    imageAlt: "Ilustración abstracta de relleno para la sección acerca de: formas suaves turquesa y coral",
    valuesTitle: "Nuestros compromisos",
    values: [
      {
        title: "Primer valor de relleno",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Describa aquí un primer compromiso.",
      },
      {
        title: "Segundo valor de relleno",
        body: "Ut enim ad minim veniam, quis nostrud exercitation. Describa aquí un segundo compromiso.",
      },
      {
        title: "Tercer valor de relleno",
        body: "Duis aute irure dolor in reprehenderit. Describa aquí un tercer compromiso.",
      },
    ],
    infoTitle: "Datos de contacto",
  },
  newsList: {
    empty: "Todavía no hay ningún artículo publicado.",
  },
} satisfies Pick<Dictionary, "home" | "activitiesPage" | "galleryPage" | "newsPage" | "contactPage" | "newsList">;
