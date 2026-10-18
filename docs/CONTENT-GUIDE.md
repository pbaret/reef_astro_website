<!-- docs/CONTENT-GUIDE.md - manuel pratique pour remplacer les contenus placeholders du site. -->

# Manuel d’édition du contenu

Audit réalisé sur le repository actuel. Aucun fichier du site n’a été modifié. Les chemins ci-dessous correspondent aux fichiers et dossiers présents.

## 1. Les fichiers importants

```text
SITE
├── Informations générales : src/i18n/ui/{en,fr,es}/chrome.ts
├── Homepage : src/i18n/ui/{en,fr,es}/pages.ts
├── Activités : src/i18n/ui/{en,fr,es}/activities.ts
│   ├── Images et vignettes : src/data/activities.ts
│   └── Slugs : src/i18n/routes.ts
├── Galerie
│   ├── Images et ordre : src/data/gallery.ts
│   └── Légendes et alt : src/i18n/ui/{en,fr,es}/gallery.ts
├── Actualités : src/data/news/{en,fr,es}/*.md
├── About / Contact : pages.ts, chrome.ts et src/assets/placeholders/about.svg
├── Réseaux sociaux, e-mail, téléphone : src/config/siteData.ts
├── Domaine : astro.config.mjs
└── Images : src/assets/ et public/
```

**À modifier pour gérer le contenu :**

- Les dictionnaires par langue dans `src/i18n/ui/en`, `src/i18n/ui/fr` et `src/i18n/ui/es`.
- Les actualités Markdown dans `src/data/news`.
- Les données d’association des images dans `src/data`.
- Les coordonnées et réseaux dans `src/config/siteData.ts`.
- Les images dans `src/assets/` et `public/`.

**À ne normalement pas modifier :**

- Les pages Astro et leurs composants dans `src/pages` et `src/components`.
- Les layouts `src/layouts/BaseHead.astro` et `src/layouts/BaseLayout.astro`.
- Le schéma de collection `src/content.config.ts`, les helpers dans `src/js` et les vérifications dans `scripts`.
- Les routes, sauf pour ajouter une activité ou changer son slug : `src/i18n/routes.ts`.
- La configuration technique, sauf pour remplacer le domaine : `astro.config.mjs`.

Il n’existe pas de dossier `src/content/`. Les actualités sont chargées depuis `src/data/news/`. Leur schéma est défini dans `src/content.config.ts`.

## 2. Modifier les informations générales

Les valeurs ci-dessous sont des placeholders. Le nom, la baseline et les textes généraux sont traduits : modifiez la même clé dans les trois langues.

- **Nom du site** : `site.name` dans `src/i18n/ui/en/chrome.ts`, `src/i18n/ui/fr/chrome.ts` et `src/i18n/ui/es/chrome.ts`. Il alimente notamment le titre du site, le footer, Open Graph et les données structurées. Mettez aussi à jour `nav.brandHome`, le libellé accessible de la marque.
- **Baseline** : `site.tagline`, affichée dans le footer.
- **Description générale** : `site.description`, utilisée notamment par les données structurées du site et comme valeur de secours. La meta description de l’accueil est `seo.home.description`, à modifier séparément dans chaque dictionnaire.
- **Domaine** : la constante `SITE` dans `astro.config.mjs`, actuellement `https://example.com`. Elle sert aux URLs absolues, aux canonicals, au sitemap et à `robots.txt`. Ne modifiez pas ces éléments individuellement ailleurs.
- **Adresse et horaires** : `contactInfo.address` et `contactInfo.hours` dans chacun des trois `chrome.ts`. L’adresse est également affichée dans le footer. Les horaires ne sont affichés que sur Contact.
- **E-mail et téléphone** : `email`, `phone` et `phoneHref` dans `src/config/siteData.ts`. `phone` est le texte affiché; `phoneHref` est la valeur du lien `tel:`, au format international adapté.
- **Instagram, Facebook et WhatsApp** : les trois objets de `socials` dans `src/config/siteData.ts`. Remplacez `href` par le lien réel et retirez `placeholder: true` pour que le profil soit aussi déclaré dans `sameAs` des données structurées. Pour WhatsApp, `wa.me` attend un numéro international sans espaces ni signe `+`.

Extrait de la structure générale :

```ts
site: {
  name: "...",
  tagline: "...",
  description: "...",
},
contactInfo: {
  address: "...",
  hours: ["...", "..."],
}
```

Le français, l’anglais et l’espagnol doivent garder la même structure de clés.

## 3. Modifier la homepage

La copie de la homepage se trouve dans `pages.home` des fichiers `pages.ts`, pas dans le composant qui l’affiche. Modifiez les mêmes clés dans :

- `src/i18n/ui/fr/pages.ts`
- `src/i18n/ui/en/pages.ts`
- `src/i18n/ui/es/pages.ts`

Clés principales de `home` :

- Hero : `eyebrow`, `title`, `titleAccent`, `lede`, `primary`, `secondary`, `imageAlt`.
- Section activités : `activitiesEyebrow`, `activitiesTitle`, `activitiesAccent`, `activitiesLede`.
- Dernières actualités : `newsEyebrow`, `newsTitle`, `newsAccent`, `newsLede`.
- Appel à l’action contact : `ctaTitle`, `ctaAccent`, `ctaLede`.

`titleAccent` et `ctaAccent` doivent correspondre exactement à un morceau du titre, dans la langue concernée.

Le titre et la description SEO de l’accueil sont dans `chrome.ts`, sous `seo.home.title` et `seo.home.description`. Le hero est une image séparée : il est importé depuis `src/assets/placeholders/hero.svg` dans `src/components/Sections/Home/Hero.astro`. Son texte alternatif est `home.imageAlt` dans les dictionnaires. Pour utiliser une photo raster au lieu de ce SVG, remplacez l’import dans le composant par le chemin de la nouvelle image.

Les cartes de la homepage lisent leurs titres et résumés dans `activities.ts`. La section Latest News affiche automatiquement les trois articles les plus récents dans la langue de la page. Son bouton de contact mène automatiquement à la page Contact.

Le footer utilise `site.tagline`, `footer.demoNotice`, `contactInfo.address`, les coordonnées de `siteData.ts` et les clés de navigation. Remplacez aussi le texte de démonstration `footer.demoNotice` dans les trois langues.

## 4. Modifier les activités

Les trois activités sont définies par leurs textes dans `activities.ts`, dans chaque langue. Elles ne sont pas des fichiers Markdown. Pour chacune, modifiez les clés sous `"activity-1"`, `"activity-2"` ou `"activity-3"` :

- `name` : titre de l’activité.
- `summary` : résumé visible sur les cartes. Il sert aussi de description SEO de la page activité.
- `intro` : introduction de la page détail.
- `sections` : sections détaillées, chacune avec `title` et `body` (un tableau de paragraphes).
- `benefits` : liste des services ou bénéfices.
- `imageAlt` : texte alternatif de l’image principale.

Exemple de chemin : `src/i18n/ui/fr/activities.ts`, avec les équivalents anglais et espagnol.

Les slugs par langue sont dans `activitySlugs` de `src/i18n/routes.ts`. Les images principales et les trois images secondaires de chaque page activité sont dans `src/data/activities.ts`. Chaque activité attend exactement trois indices de vignette vers la galerie.

Il n’existe pas de champ CTA ou de description SEO séparés par activité : le titre SEO vient de `name`, la description de `summary`, et le CTA de page activité est partagé dans `activitiesPage` des fichiers `pages.ts`.

## 5. Ajouter une activité

Une quatrième activité n’est pas un simple ajout de texte : plusieurs tables TypeScript sont typées par la liste d’identifiants. La procédure exacte est :

1. Dans `src/i18n/routes.ts`, ajouter `"activity-4"` à `activityIds`.
2. Dans le même fichier, ajouter ses slugs anglais, français et espagnol dans `activitySlugs`. Choisissez un slug unique dans chaque langue.
3. Dans les trois fichiers `activities.ts`, ajouter une entrée `"activity-4"` avec la même structure que les autres : nom, résumé, intro, alt, sections et bénéfices.
4. Dans `src/data/activities.ts`, importer son image principale et ajouter son entrée `activityMedia`. Choisissez aussi trois indices d’images déjà présentes dans la galerie.
5. Ajouter l’image à `src/assets/` et renseigner son alt traduit dans les trois dictionnaires.
6. Vérifier que les textes et slugs sont traduits dans les trois langues.

La liste des cartes de homepage, la liste d’activités, les liens vers les autres activités et les pages statiques sont ensuite générés à partir de `activityIds`. Il ne faut pas modifier `src/pages/[...path].astro` ni `src/js/pages.ts`. Il n’y a pas de navigation individuelle vers chaque activité dans le menu.

## 6. Gérer les images

Le projet utilise principalement les images locales de `src/assets/`, importées par Astro. Les images de `public/` sont des fichiers statiques référencés par une URL; ce dossier sert actuellement notamment aux icônes et à l’image de partage par défaut. Pour les photos éditoriales, restez cohérent avec les imports et placez-les dans `src/assets/`.

Noms de fichiers conseillés : minuscules, mots séparés par des tirets, sans accents, par exemple `atelier-cuisine.webp`. Le code accepte des images locales transformées par Astro. WebP ou JPEG conviennent aux photos; pour les cartes de partage, utilisez une image matricielle, pas un SVG.

Pour retrouver les références actuelles :

- Hero : import `hero.svg` dans `src/components/Sections/Home/Hero.astro`; alt dans `pages.home.imageAlt`.
- About : import `about.svg` dans `src/components/Pages/ContactPage.astro`; alt dans `pages.contactPage.imageAlt`.
- Activités : imports et associations dans `src/data/activities.ts`; alt dans chaque entrée de `activities.ts`.
- Galerie : imports et ordre dans `src/data/gallery.ts`; alt et légendes dans `gallery.ts` des trois langues.
- Actualités : chemin `image` dans le frontmatter de chaque Markdown; alt dans `imageAlt`.

Exemple pour une image d’activité : remplacez l’import de `activity-1.svg` dans `src/data/activities.ts` par l’import de votre fichier, par exemple `../assets/atelier-cuisine.webp`, et mettez à jour `imageAlt` pour les trois langues. Les cartes et la page détail utilisent toutes cette même image; il n’est pas nécessaire de changer plusieurs références.

Pour les proportions affichées, le code recadre avec `object-cover` : galerie standard et About environ 4:3, cartes d’actualité 16:9, cartes d’activité 3:2, image principale d’actualité 16:9 et image d’activité 16:9 à 2:1 selon la largeur. Le hero remplit l’écran et est fortement recadré; prévoyez un sujet qui supporte ce cadrage. Les sources d’images larges sont utiles, car Astro génère notamment des variantes jusqu’à 1920 px pour les grandes images.

L’image Open Graph par défaut est `public/og-default.png`, référencée par `ogImage` dans `src/config/siteData.ts`. Le fichier est prévu en 1200 × 630. Vous pouvez remplacer son contenu en conservant le nom et les dimensions. Les articles avec une image raster génèrent leur propre aperçu recadré en 1200 × 630; une image SVG d’article retombe sur l’image par défaut.

## 7. Modifier la galerie

La galerie actuelle a **11 images**. La liste et l’ordre sont dans `src/data/gallery.ts`. Chaque entrée importe une image, puis précise sa forme : `standard`, `feature` ou `wide`. Les légendes et textes alternatifs sont des tableaux de même longueur dans `gallery.ts` des trois langues.

Pour ajouter une photo :

1. Placez-la dans `src/assets/` et importez-la dans `src/data/gallery.ts`.
2. Ajoutez son entrée à la fin du tableau `galleryImages`, avec sa forme.
3. Ajoutez à la fin du tableau `gallery` de chaque langue une `caption` et un `alt` traduits.
4. Lancez `pnpm test`, puis vérifiez la galerie dans `pnpm dev`.

Pour ajouter une 13e photo, le dépôt actuel étant à 11, effectuez cette procédure pour les 12e et 13e photos. La 13e entrée aura l’indice zéro-based `12` si elle est ajoutée à la fin.

Pour supprimer une entrée, retirez aussi sa légende et son alt dans les trois langues. **Attention :** les pages activités pointent vers des images de galerie par leur position. Réordonner ou supprimer une image au milieu peut modifier les vignettes d’activité; vérifiez et ajustez alors les indices `gallery` dans `src/data/activities.ts`.

La grille standard a un ratio d’affichage 4:3. Les entrées `feature` et `wide` ont un cadrage distinct défini par leur `shape`.

## 8. Créer une actualité

Les actualités sont des fichiers Markdown `.md`, un par langue. Le modèle français est `src/data/news/fr/actualite-exemple-un.md`, l’anglais `src/data/news/en/placeholder-news-one.md` et l’espagnol `src/data/news/es/noticia-ejemplo-uno.md`. Le slug est le nom du fichier sans `.md`; il n’y a pas de champ `slug` dans le frontmatter.

Champs réellement reconnus par `src/content.config.ts` :

- `title` : titre, requis.
- `description` : résumé, requis; affiché sur les cartes et utilisé en SEO.
- `publishDate` : date requise au format `YYYY-MM-DD`.
- `updatedDate` : facultatif; renseignez-le uniquement après une vraie modification de l’article.
- `image` : chemin d’une image locale requise, relatif au fichier Markdown.
- `imageAlt` : texte alternatif requis, à traduire.
- `locale` : requis, `fr`, `en` ou `es`; doit correspondre au dossier.
- `translationKey` : identifiant commun aux trois traductions.
- `draft` : booléen facultatif, faux par défaut.

Exemple de frontmatter :

```yaml
---
title: "Titre de l’article"
description: "Résumé de l’article."
publishDate: 2026-10-12
image: ../../../assets/mon-article.webp
imageAlt: "Description de l’image"
locale: fr
translationKey: atelier-octobre-2026
draft: true
---
```

Le contenu qui suit est du Markdown. L’URL de cet exemple français sera déterminée par le nom du fichier, par exemple `atelier-octobre.md`.

**Créer un article français :**

1. Copiez le modèle français sous un nouveau nom `.md` dans `src/data/news/fr/`.
2. Renseignez tous les champs requis et le texte Markdown.
3. Choisissez un `translationKey` stable et unique, identique pour ses trois versions.
4. Pour le garder en brouillon, laissez `draft: true`.

**Ajouter sa version anglaise puis espagnole :**

1. Copiez le modèle correspondant dans `src/data/news/en/` ou `src/data/news/es/`.
2. Traduisez le titre, résumé, alt et le corps. Le nom de fichier peut être traduit et définit le slug dans cette langue.
3. Conservez le même `translationKey`; adaptez `locale` au dossier.
4. Utilisez la date de publication de l’article original dans les trois fichiers.
5. Quand les trois versions sont prêtes à publier, passez `draft` à `false` dans les trois fichiers.

Les versions publiées d’un même `translationKey` doivent exister en FR, EN et ES. Si une version est publiée alors qu’une autre manque ou reste en brouillon, le contrôle des traductions échoue. Gardez donc les trois fichiers en brouillon ensemble jusqu’à leur publication.

Les articles sont triés du plus récent au plus ancien par `publishDate`. Latest News prend les trois premiers de la langue affichée. Le sitemap est généré au build et n’inclut pas les brouillons.

## 9. Traduire du contenu

L’anglais est servi à la racine; le français sous `/fr/` et l’espagnol sous `/es/`. Les fichiers de dictionnaire ont une structure identique : TypeScript signale une clé manquante ou une forme différente.

Méthode recommandée :

1. Rédigez d’abord la version française dans le fichier concerné.
2. Reportez la même clé et la même structure dans le fichier anglais.
3. Faites de même dans le fichier espagnol.
4. Pour un article, vérifiez que les trois `translationKey` sont identiques et que chaque `locale` correspond à son dossier.
5. Vérifiez les pages et leur sélecteur de langue avec `pnpm dev`.

Pour une nouvelle activité, les slugs localisés sont dans `activitySlugs` de `src/i18n/routes.ts`. Pour les pages de section, les slugs sont dans `sectionSlugs` du même fichier. Ne modifiez pas les helpers i18n pour traduire du contenu.

## 10. Modifier Contact / About

Le contenu éditorial est dans `pages.contactPage` des `pages.ts` des trois langues :

- Présentation : `eyebrow`, `title`, `accent`, `lede`.
- About : `aboutTitle`, `aboutBody`, `imageAlt`.
- Valeurs et engagements : `valuesTitle`, `values`, chaque valeur avec `title` et `body`.
- Titre du bloc de coordonnées : `infoTitle`.

Les données pratiques sont dans `contactInfo` de chaque `chrome.ts` : adresse, horaires et libellés. E-mail, téléphone et liens sociaux sont dans `src/config/siteData.ts`. Ces coordonnées sont partagées avec le footer; ne les dupliquez pas dans `pages.ts`.

Il n’y a pas de formulaire serveur. Le contact se fait par adresse, `tel:`, `mailto:` et réseaux sociaux.

L’image About vient de `src/assets/placeholders/about.svg`, importée dans `src/components/Pages/ContactPage.astro`. Pour une photo raster, mettez à jour cet import et les textes `imageAlt` dans les trois langues.

## 11. Modifier le footer

Le footer lit ses informations depuis ces sources :

- Nom et texte court : `site.name` et `site.tagline` dans les dictionnaires.
- Texte de démonstration actuellement affiché : `footer.demoNotice` dans les trois langues; remplacez-le par le texte réel.
- Adresse : `contactInfo.address`; e-mail et téléphone : `src/config/siteData.ts`.
- Réseaux : `siteData.socials`; libellés et textes accessibles : `footer.social` dans les dictionnaires.
- Navigation : générée depuis `sectionKeys` et les libellés `nav`; ne modifiez pas une deuxième liste de liens.
- Copyright : le texte est `footer.rights`. L’année est calculée au moment du build; ne la modifiez pas manuellement.
- Les horaires ne sont pas affichés dans le footer.

## 12. SEO : ce que je dois renseigner

**À renseigner :**

- Pages de section : `seo.home`, `seo.activities`, `seo.gallery`, `seo.news` et `seo.contact` dans les trois `chrome.ts`. Chacune contient `title` et `description`.
- Activités : `name` et `summary` dans les trois `activities.ts`. Ils fournissent automatiquement le titre et la description SEO.
- Actualités : `title`, `description`, `publishDate`, `image` et `imageAlt` dans chaque Markdown.
- Images : alt traduits pour hero, About, activités et galerie.
- Domaine : constante `SITE` dans `astro.config.mjs` avant mise en ligne.
- Carte de partage par défaut : `public/og-default.png`; son texte alternatif est `site.ogImageAlt` dans chaque dictionnaire.

Le titre complet ajoute automatiquement le nom du site si le titre ne le contient pas déjà. Le slug des actualités vient du nom de fichier; celui des activités de `activitySlugs`.

**Ne modifiez pas manuellement** canonical, hreflang, sitemap, JSON-LD, Open Graph généré ni `robots.txt`. Ils sont produits à partir des données et routes actuelles. Le sitemap et le fichier robots sont générés au build. `pnpm check:seo` les vérifie mais ne les génère pas.

## 13. Vérifier mes modifications

Les commandes réellement présentes dans `package.json` :

1. `pnpm dev` : lancer le site local et vérifier visuellement les pages et les trois langues.
2. `pnpm check` : vérification Astro et TypeScript.
3. `pnpm test` : exécuter les selfchecks, notamment cohérence des traductions, slugs et longueurs de galerie.
4. `pnpm lint:house` : contrôles des conventions du dépôt.
5. `pnpm build:check` : produire le site, puis auditer le SEO, les liens, les images, le sitemap et robots.

`pnpm check:seo` seul lit `dist/`; utilisez-le après un build déjà réussi. `pnpm preview` sert le contenu construit. `pnpm build` construit sans lancer le contrôle SEO.

## 14. Dépannage

| Symptôme | Cause probable | Où vérifier |
|---|---|---|
| Image absente ou build en erreur | Mauvais chemin d’import ou chemin Markdown relatif | `src/data/activities.ts`, `src/data/gallery.ts` ou le champ `image` du Markdown |
| Erreur de schéma d’actualité | Champ requis absent, mauvaise date, locale incorrecte ou image non résolue | `src/content.config.ts` et frontmatter du Markdown |
| Article absent des listes | `draft: true`, ou fichier placé dans le mauvais dossier | Fichier Markdown sous `src/data/news/{en,fr,es}` |
| Erreur de traduction d’article | Une langue publiée manque ou les `translationKey` diffèrent | Les trois fichiers de l’article et `src/js/news.ts` |
| Sélecteur d’article mène au mauvais article | Mauvais `translationKey` ou slug/nom de fichier inattendu | Fichiers Markdown des trois langues |
| URL d’activité erronée ou dupliquée | Slug oublié ou dupliqué dans une langue | `src/i18n/routes.ts` |
| Galerie mal légendée ou vignettes activité modifiées | Ordre/longueur des tableaux non concordants, ou indices déplacés | `src/data/gallery.ts`, trois `gallery.ts`, `src/data/activities.ts` |
| Build ou liens internes cassés | Import, route ou traduction incohérente | Première erreur de `pnpm check`, `pnpm test` ou `pnpm build:check` |

## 15. Checklist avant commit

**Nouvelle activité**

- [ ] Textes FR, EN et ES
- [ ] Image principale et alt traduits
- [ ] Trois vignettes définies
- [ ] ID et trois slugs ajoutés si nouvelle activité
- [ ] `pnpm check`, `pnpm test`, `pnpm build:check`

**Nouvelle actualité**

- [ ] Fichier Markdown dans chacun des trois dossiers
- [ ] Champs requis renseignés et `locale` correct
- [ ] Même `translationKey` dans les trois versions
- [ ] Image et alt traduits
- [ ] `draft` cohérent dans les trois langues
- [ ] `pnpm test` et `pnpm build:check`

**Nouvelle photo de galerie**

- [ ] Image importée et entrée ajoutée à la liste
- [ ] Légende et alt ajoutés dans les trois langues
- [ ] Indices de vignettes activité vérifiés si ordre modifié
- [ ] `pnpm test` et vérification visuelle

# Mémo

- `src/i18n/ui/fr/pages.ts` : textes des pages, homepage et About.
- `src/i18n/ui/en/pages.ts` : mêmes textes côté anglais.
- `src/i18n/ui/es/pages.ts` : mêmes textes côté espagnol.
- `src/i18n/ui/fr/activities.ts` : textes détaillés des activités en français.
- `src/i18n/ui/fr/chrome.ts` : identité, SEO, adresse et horaires en français.
- `src/data/activities.ts` : images et vignettes des activités.
- `src/data/gallery.ts` : images et ordre de la galerie.
- `src/data/news` : articles Markdown par langue.
- `src/config/siteData.ts` : e-mail, téléphone et liens sociaux.