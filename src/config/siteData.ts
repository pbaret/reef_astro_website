// src/config/siteData.ts - les donnees du site qui ne se traduisent pas : e-mail, telephone, reseaux sociaux, carte de partage, view transitions.
//
// Toutes les valeurs sont FICTIVES. Remplacez-les par les vraies, ici et
// seulement ici : le pied de page, la page contact, le JSON-LD et les balises
// SEO suivent. Les noms, adresses et horaires, eux, sont des textes : voir
// src/i18n/ui/. Le domaine du site, lui, vit dans astro.config.mjs (`site`).
export const siteData = {
  email: "hello@example.com",
  phone: "+00 0 00 00 00 00",
  // Le lien tel: ne porte que des chiffres et le plus initial.
  phoneHref: "+000000000000",
  // Les trois seuls reseaux prevus : de simples liens, aucun SDK ni script tiers.
  // `placeholder: true` : adresse factice, affichee mais jamais declaree dans le
  // JSON-LD (sameAs). Remplacer l'adresse ET retirer `placeholder` pour la publier.
  // Les libelles sont dans le dictionnaire (footer.social).
  socials: [
    { key: "instagram", href: "https://www.instagram.com/your-account/", placeholder: true },
    { key: "facebook", href: "https://www.facebook.com/your-page/", placeholder: true },
    // Lien wa.me standard : https://wa.me/<numero international, chiffres seulement>.
    { key: "whatsapp", href: "https://wa.me/00000000000", placeholder: true },
  ],
  // Une image matricielle : les reseaux sociaux ne lisent pas le SVG. Generee par `pnpm placeholders`.
  ogImage: "/og-default.png",
  // Les transitions entre pages (ClientRouter d'Astro). Les mettre a false retire ce JavaScript.
  useViewTransitions: true,
} as const;
