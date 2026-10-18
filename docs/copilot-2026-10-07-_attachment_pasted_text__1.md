---
date: 2026-10-07
title: "#attachment:Pasted text #1"
tags: [copilot, chat-export]
workspace: "astro-website-prompted"
---

# #attachment:Pasted text #1

**User**
#attachment:Pasted text #1 

**Copilot**


> **[manage_todo_list]** Updated todo list
Je vais auditer les fichiers qui sont la source réelle du contenu, puis croiser cela avec les templates et scripts de vérification. Je ne modifierai aucun fichier : le livrable sera un manuel en français fondé uniquement sur ce dépôt.

> **[copilot_memory]** Used tool
Je commence par relever l’arborescence réelle des données, les scripts disponibles et les points d’entrée des pages. Cela permettra de distinguer les sources éditoriales des composants qui ne font que les afficher.

> **[copilot_listDirectory]** Read [](file:///d%3A/Dev/astro-website-prompted/src/pages)


> **[copilot_listDirectory]** Read [](file:///d%3A/Dev/astro-website-prompted/src/data)


> **[copilot_listDirectory]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui)


> **[copilot_listDirectory]** Read [](file:///d%3A/Dev/astro-website-prompted/public)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/package.json)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/config/siteData.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/content.config.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/astro.config.mjs)
L’architecture confirme déjà un point important : les coordonnées et réseaux sociaux ont une source unique dans , tandis que les libellés visibles sont traduits ailleurs. Je poursuis en inspectant les dictionnaires, les données d’activités/galerie et les articles pour identifier chaque champ éditorial et ses liens entre langues.

> **[copilot_listDirectory]** Read [](file:///d%3A/Dev/astro-website-prompted/src/data/news/en)


> **[copilot_listDirectory]** Read [](file:///d%3A/Dev/astro-website-prompted/src/data/news/fr)


> **[copilot_listDirectory]** Read [](file:///d%3A/Dev/astro-website-prompted/src/data/news/es)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/data/gallery.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/data/activities.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/config.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/routes.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/js/pages.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/js/news.ts)
Les activités sont actuellement un assemblage de deux sources : textes dans les dictionnaires trilingues et médias/identifiants de routes dans les fichiers de données et i18n. La galerie a une liste ordonnée unique, mais légendes et textes alternatifs sont traduits par position; j’examine maintenant les clés exactes et les articles modèles pour documenter ces manipulations sans demander de modifications redondantes.

> **[copilot_listDirectory]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/en)


> **[copilot_listDirectory]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/fr)


> **[copilot_listDirectory]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/es)


> **[copilot_listDirectory]** Read [](file:///d%3A/Dev/astro-website-prompted/src/assets/placeholders)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/data/news/fr/actualite-exemple-un.md)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/data/news/en/placeholder-news-one.md)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/data/news/es/noticia-ejemplo-uno.md)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/layouts/BaseHead.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/layouts/BaseLayout.astro)
Les articles sont bien des fichiers Markdown dans `src/data/news/<langue>/`;  relie les trois éditions, et une traduction publiée manquante fait échouer le chargement/build. Je vérifie maintenant le contenu éditorial exact de chaque dictionnaire, les données de Contact/Footer et les ratios/formats imposés par les composants d’affichage.

> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/fr/activities.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/fr/pages.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/fr/gallery.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/en/activities.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/fr/chrome.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/es/activities.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/en/gallery.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/es/gallery.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/fr/index.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/en/chrome.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/es/pages.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/en/pages.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/es/chrome.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Sections/Global/Footer.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Pages/HomePage.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Pages/ContactPage.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Sections/Home/Hero.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Sections/Home/ActivitiesSection.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Sections/Home/LatestNews.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/en/chrome.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/es/pages.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/en/pages.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/es/chrome.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Sections/Global/Footer.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Pages/HomePage.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Pages/ContactPage.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Sections/Home/Hero.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Sections/Home/ActivitiesSection.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Sections/Home/LatestNews.astro)
Pour les images, le projet importe les visuels depuis  et les passe aux composants Astro pour l’optimisation;  ne contient que les icônes et la carte Open Graph par défaut. J’ai aussi repéré que l’accueil affiche exactement trois activités par identifiants codés dans i18n, et les trois dernières actualités publiées sont sélectionnées automatiquement par date. Je vérifie les détails de routage, SEO éditorial et mise en page avant de rédiger les procédures.

> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Pages/ActivityPage.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Cards/ActivityCard.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Pages/GalleryPage.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Pages/ArticlePage.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/pages/%5B...path%5D.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/js/schema.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/ui/types.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/index.ts)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Sections/Global/CallToAction.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/i18n/i18n.selfcheck.ts)
Le SEO éditorial est simple dans ce dépôt : les pages standard prennent leurs métadonnées des dictionnaires, les activités utilisent leur nom/résumé traduits, et chaque actualité ses champs /. Les données techniques (canonical, hreflang, sitemap et JSON-LD) sont calculées; je termine en recensant les textes de remplacement, le comportement des brouillons et les commandes réelles, puis je vous livre le guide complet ici sans créer de fichier.

> **[copilot_findTextInFiles]** Searched for regex `Lorem ipsum|replacement|placeholder|relleno|remplacement` (`**/src/**`), 239 results


> **[copilot_findTextInFiles]** Searched for regex `updatedDate|draft:|translationKey:|imageAlt:|publishDate:` (`**/src/data/news/**/*.md`), 36 results


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Sections/Global/SocialLinks.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Pages/NewsPage.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Cards/NewsCard.astro)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/scripts/placeholders.mjs)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/data/news/fr/actualite-exemple-deux.md)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/data/news/en/placeholder-news-two.md)


> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/data/news/es/noticia-ejemplo-dos.md)
Le dernier contrôle confirme aussi que les visuels actuels sont générés localement par ; cette commande écraserait les SVG de démonstration si elle était relancée. Je fais une ultime vérification de la liste de pages d’activités pour ne pas vous demander d’ajouter une entrée manuelle là où le code parcourt déjà les identifiants.

> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/components/Pages/ActivitiesPage.astro)
J’ai confirmé l’ajout d’une activité : la liste d’accueil, la page Activités et les routes statiques parcourent toutes , donc aucune carte ni entrée de page ne se duplique à la main. Je contrôle juste la source de `robots.txt`, puis je vous donne le tutoriel avec les exceptions où un petit changement de référence d’image ou d’identifiant est réellement inévitable.

> **[copilot_readFile]** Read [](file:///d%3A/Dev/astro-website-prompted/src/pages/robots.txt.ts)
# Manuel d'édition du contenu

Le site n’a pas de dossier `src/content/` : les actualités sont dans , et le reste du contenu éditorial se trouve principalement dans les dictionnaires i18n et les fichiers de données. Les composants affichent ces sources; vous n’avez normalement pas à les modifier.

## Carte du contenu

```text
SITE
├── Informations générales, coordonnées, réseaux : src/config/siteData.ts
├── Domaine : astro.config.mjs
├── Homepage : src/i18n/ui/{en,fr,es}/pages.ts
├── Activités : src/i18n/ui/{en,fr,es}/activities.ts
│   ├── identifiants et slugs : src/i18n/routes.ts
│   └── images principales et vignettes : src/data/activities.ts
├── Galerie : src/data/gallery.ts + src/i18n/ui/{en,fr,es}/gallery.ts
├── Actualités : src/data/news/{en,fr,es}/*.md
├── About / Contact : pages.ts et chrome.ts dans les trois dictionnaires
├── SEO éditorial : chrome.ts et frontmatter des actualités
└── Images : src/assets/placeholders/ ; carte OG par défaut : public/og-default.png
```

## 1. Les fichiers importants

**À modifier pour le contenu**

- Les dictionnaires français, anglais et espagnol :
  , , 
  , , 
  , , 
  , , 
- Les fichiers d’articles dans `src/data/news/{en,fr,es}/`.
- Les données médias  et .
- Les coordonnées et réseaux dans , le domaine dans , et les images dans .

**À ne normalement pas modifier**

Les composants de , les layouts , les helpers , le schéma de collection , les scripts de build, le sitemap et les styles. Exceptions ponctuelles : ajouter un identifiant d’activité dans , ou modifier l’import d’une image si son chemin ou son extension change.

Les textes de remplacement viennent des dictionnaires, des fichiers Markdown et des images générées par . Ne relancez pas `pnpm placeholders` après avoir remplacé les illustrations : le script les écraserait.

## 2. Modifier les informations générales

Dans les trois fichiers , la structure des informations du site est :

```ts
site: {
  name: "...",
  tagline: "...",
  description: "...",
}
```

Modifiez ces propriétés dans chaque langue.  est le nom affiché;  est le slogan, notamment repris dans le footer;  est la description générale, également utilisée pour les données du site.

Les coordonnées communes sont centralisées dans  :

```ts
email: "hello@example.com",
phone: "+00 0 00 00 00 00",
phoneHref: "+000000000000",
socials: [
  { key: "instagram", href: "...", placeholder: true },
  { key: "facebook", href: "...", placeholder: true },
  { key: "whatsapp", href: "...", placeholder: true },
],
```

Remplacez , le numéro affiché  et sa version cliquable . Pour Instagram et Facebook, remplacez  par l’adresse publique du profil. Pour WhatsApp, remplacez l’adresse `wa.me` en utilisant le numéro international sans `+`, espace ni ponctuation. Supprimez `placeholder: true` sur chaque profil réel : ce marqueur empêche actuellement son ajout aux données sociales JSON-LD; il ne masque pas le lien dans le footer.

L’adresse et les horaires ne sont pas dans  : ils se trouvent dans  et  de chaque . Traduisez-les. Gardez le même nombre de lignes d’horaires dans chaque langue, car le test i18n vérifie la forme des dictionnaires.

Le domaine est la constante  de , actuellement `https://example.com`. Remplacez-la par le domaine public. Canonical, Open Graph, sitemap et robots.txt s’appuient sur cette valeur; ne modifiez pas ces sorties générées manuellement.

## 3. Modifier la homepage

Pour chaque langue, ouvrez le fichier  correspondant et modifiez les propriétés de  :

- , , , , , ,  : accroche, titre, introduction, boutons et texte alternatif du hero.
- , , ,  : titre et introduction de la section Activités. Les noms et résumés des cartes viennent de .
- , , ,  : titre et introduction de la section Dernières actualités. Les cartes sont alimentées automatiquement par les articles.
- , ,  : appel à l’action en bas de page. Son bouton utilise le libellé commun  et mène à Contact.

Le texte de l’image hero est dans , mais l’image elle-même est importée directement dans  depuis . Changer cette image pour un fichier raster ou un autre chemin implique de modifier cet import.

Le footer reprend le nom et le slogan (, ), le texte d’avertissement , le téléphone, l’e-mail et les réseaux. Le détail des champs est en section 11.

## 4. Modifier les activités

Il n’y a pas un fichier Markdown par activité. Les textes sont dans la propriété  des trois fichiers , sous les identifiants `activity-1`, `activity-2` et `activity-3`.

Pour chaque activité, modifiez , , , ,  et  dans les trois langues. Les sections sont des objets  et  (paragraphes); les bénéfices sont une liste. Gardez les mêmes clés, ainsi que le même nombre d’éléments dans les tableaux de chaque langue.

Les slugs ne sont pas dans ces dictionnaires. Ils sont dans  de , par exemple :

```ts
"activity-1": { en: "activity-1", fr: "activite-1", es: "actividad-1" },
```

Pour changer un slug, remplacez-le dans la langue concernée. Les liens internes suivent automatiquement.

Les images principales sont importées dans ;  associe une image à chaque identifiant et à trois images de galerie. Les images secondaires viennent de , avec leurs légendes et alt dans les dictionnaires . Modifiez les textes alternatifs dans  pour l’image principale, et dans les trois  pour les vignettes.

Il n’existe pas de champ SEO dédié aux activités. Le nom devient le titre SEO et le résumé devient sa description. L’image principale de l’activité n’est pas actuellement utilisée comme image Open Graph : les pages d’activité utilisent la carte OG par défaut.

## 5. Ajouter une activité

Ajouter une activité demande quelques changements structurels; la génération des pages, elle, est automatique.

1. Choisissez un identifiant stable, par exemple `activity-4`.
2. Dans , ajoutez-le à , puis renseignez ses trois slugs dans .
3. Dans , importez l’image principale et ajoutez son entrée , avec trois indices de galerie.
4. Ajoutez l’entrée `activity-4` avec les mêmes champs dans les trois fichiers  des dictionnaires.
5. Traduisez nom, résumé, intro, sections, bénéfices et alt; gardez la même structure dans les trois langues.
6. Ajoutez l’image sous  et indiquez ses trois vignettes avec des indices de galerie commençant à zéro.
7. Vérifiez que les slugs ne sont pas déjà utilisés.

L’accueil et la page Activités parcourent ; les routes statiques sont construites à partir de cette même liste. Pas d’entrée manuelle à ajouter dans les composants,  ou le menu. Les clés SEO dédiées, le CTA par activité et l’image OG par activité n’existent pas actuellement.

## 6. Gérer les images

Le projet importe ses visuels éditoriaux depuis  et les traite avec Astro.  sert aux fichiers adressés directement par URL; il contient ici notamment les favicons et `og-default.png`. Pour les nouvelles photos, restez dans .

Les photos WebP sont un bon choix; JPEG/PNG conviennent également. Utilisez des noms simples en minuscules, avec tirets et sans accents, par exemple `atelier-equipe.webp`. Quand l’extension change, il faut mettre à jour l’import; ne renommez pas seulement un fichier `.svg` en `.webp` sans toucher à la référence.

Les ratios d’affichage actuels sont :
- Hero : source de démonstration 2400 × 1500, image recadrée en couverture.
- Activité : source 1200 × 800; carte en 3:2, grande image en 16:9 puis 2:1.
- About : 1200 × 900, affiché en 4:3.
- Actualité : 1200 × 675, affiché en 16:9.
- Galerie : surtout 4:3; la première vignette occupe un format 16:9 dans la grille.
- Carte Open Graph par défaut : , 1200 × 630.

`object-cover` recadre certaines images pour remplir leur cadre; il ne déforme pas la photo. Prévoyez un sujet visible au centre de l’image.

Pour remplacer l’image principale de l’activité 1 : ajoutez par exemple `src/assets/placeholders/atelier.webp`, puis modifiez l’import  et l’entrée correspondante dans . Mettez à jour  pour cette activité dans les trois dictionnaires. Une seule référence d’image est à modifier pour ses affichages en carte et en page détaillée.

Cas particuliers : l’image hero et l’image About sont importées directement par leurs composants respectifs; les actualités référencent leur image dans le frontmatter; la galerie utilise les imports de .

L’alt text est localisé ainsi : hero dans , About dans , activité dans `activities[id].imageAlt`, galerie dans `gallery[index].alt`, actualité dans son champ . Pour l’Open Graph par défaut, modifiez aussi  dans les trois .

## 7. Modifier la galerie

La liste ordonnée des images est dans . Les légendes et textes alternatifs correspondants sont les tableaux de ,  et [src/i18n/ui/es/gallery.ts). L’image à l’indice zéro correspond au premier élément de chacun de ces tableaux.

Pour ajouter la 13e photo, le dépôt actuel en compte 11 : ajoutez donc deux images, par exemple `gallery-12.webp` et `gallery-13.webp`, sous . Importez-les dans , puis ajoutez deux entrées à  avec `shape: "standard"`. Ajoutez ensuite deux légendes et deux textes  à la fin de chacun des trois tableaux de traduction, dans le même ordre. Pour supprimer une photo, retirez son import et son entrée, puis retirez l’entrée au même indice dans les trois dictionnaires. Pour réordonner, déplacez ensemble l’entrée image et les trois entrées de traduction.

Les formats standards sont en 4:3; `feature` et `wide` contrôlent la grille. Les tests exigent que le nombre d’images et le nombre d’entrées de traduction concordent.

## 8. Créer une actualité

La collection est déclarée dans . Elle lit uniquement des fichiers `.md` sous ; le slug vient du nom du fichier, pas d’un champ . Le modèle existant est .

Champs du frontmatter :
-  et  : obligatoires; titre et résumé affichés et utilisés par le SEO.
-  : obligatoire; date de publication, sert au tri.
-  et  : obligatoires; chemin d’image relatif au fichier Markdown et texte alternatif dans sa langue.
-  : obligatoire, doit correspondre au dossier (,  ou ).
-  : obligatoire; même identifiant pour les trois versions.
-  : facultatif, défaut `false`; `true` exclut l’article du site publié.
-  : facultatif; absent des articles actuels. Ajoutez-le seulement après une vraie mise à jour.

Pour créer un article français, copiez le modèle dans , donnez au fichier un slug unique en minuscules avec tirets, remplacez tous les champs et le corps Markdown. Par exemple, pour une image dans , son chemin depuis le dossier de langue commence par `../../../assets/placeholders/`.

Créez ensuite les fichiers anglais et espagnol dans leurs dossiers respectifs. Traduisez title, description, alt et le contenu; renseignez  selon le dossier et gardez exactement le même . Chaque langue peut avoir son propre nom de fichier et donc son propre slug.

Le chargement de production exige les trois traductions publiées pour une clé donnée. De plus, `pnpm test` vérifie les groupes de traduction même pour les brouillons : créez donc les trois fichiers avec `draft: true` pour préparer un article, puis passez les trois à `false` pour le publier. Une date plus récente place l’article avant les autres; Latest News affiche automatiquement les trois plus récents par langue.

## 9. Traduire du contenu

Pour chaque élément, rédigez d’abord le français, puis modifiez l’équivalent anglais et espagnol dans les mêmes fichiers i18n. Les articles ont des fichiers distincts dans ,  et .

Pour une activité, les mêmes identifiants (`activity-1`, etc.) doivent exister dans les trois dictionnaires; les slugs, eux, peuvent être différents et se règlent dans . Pour un article, utilisez la même  dans les trois frontmatters. Le sélecteur de langue d’une page d’activité suit l’identifiant; celui d’un article suit sa .

Les clés manquantes ou une structure de dictionnaire différente sont signalées par le typage et `pnpm test`. Après traduction, ouvrez les trois URL dans le site de développement et vérifiez le sélecteur de langue.

## 10. Modifier Contact / About

Dans chacun des trois , modifiez  : , , , , ,  et . Les valeurs sont une liste de trois objets /; gardez le même nombre d’entrées par langue. L’image About est importée directement dans .

Dans chacun des trois , modifiez ,  et leurs libellés si nécessaire. Téléphone et e-mail utilisent les valeurs communes de . Instagram, Facebook et WhatsApp proviennent également de cette source. La page actuelle n’a pas de formulaire serveur ni de formulaire de contact.

## 11. Modifier le footer

Le footer affiche , ,  et  depuis les trois . Remplacez notamment , qui annonce encore que le contenu est fictif.

Le téléphone, l’e-mail et les réseaux viennent de ; leurs libellés sont dans . La navigation est générée depuis les sections déclarées, avec les libellés . Il n’y a pas de duplication à corriger dans le composant.

Le footer affiche téléphone et e-mail, mais pas l’adresse ni les horaires. Ces deux derniers apparaissent sur la page Contact seulement. L’année du copyright est calculée automatiquement lors du build : ne la modifiez pas manuellement.

## 12. SEO : ce que je dois renseigner

Pour les pages standard, renseignez les titres et descriptions dans ,, , ,  et  de chaque . Le titre visible de la homepage () est distinct du titre SEO ().

Pour une activité, le SEO dérive automatiquement de `activities[id].name` et . Pour un article, , , ,  et  sont éditoriaux; la date de modification  est facultative. Le slug est le nom du fichier Markdown. Pour les activités, le slug est dans .

Le canonical, hreflang, Open Graph, JSON-LD, sitemap et robots.txt sont générés. Le domaine se modifie une fois dans . L’Open Graph utilise  par défaut; un article avec image raster utilise une version recadrée de sa propre image, tandis qu’un SVG retombe sur la carte par défaut. Les activités n’ont pas d’image OG dédiée. Vous n’avez pas à reconstruire manuellement le sitemap : il est produit au build.

## 13. Vérifier mes modifications

Les scripts réellement disponibles dans  :

1. `pnpm dev` : prévisualiser le site et ses traductions localement.
2. `pnpm check` : vérification Astro et TypeScript.
3. `pnpm test` : tests de cohérence i18n, galerie et actualités.
4. `pnpm lint:house` : règles mécaniques du dépôt.
5. `pnpm build:check` : build puis audit SEO du HTML produit. C’est le contrôle final recommandé.
6. `pnpm check:seo` : audit SEO seul, à lancer après `pnpm build`.

Après une modification éditoriale, faites `pnpm dev`, puis `pnpm check`, `pnpm test`, `pnpm lint:house` et enfin `pnpm build:check`. Ne lancez pas `pnpm placeholders` pour vérifier : il réécrit les images de démonstration.

## 14. Dépannage

- **Image introuvable** : chemin relatif incorrect dans `src/data/news/<langue>/*.md`, ou import absent/mal orthographié dans  ou .
- **Collection invalide** : frontmatter manquant ou mauvais type dans le fichier `.md`; vérifiez les champs et  dans le dossier correspondant.
- **Une traduction manque ou le sélecteur pointe mal** : vérifiez les trois dictionnaires d’activité, ou les trois fichiers d’actualité et leur .
- **Le build échoue sur ** : une langue manque ou la clé est dupliquée pour une langue; vérifiez les fichiers dans `src/data/news/{en,fr,es}/`.
- **Une activité n’a pas de lien ou de page** : vérifiez l’identifiant dans , sa traduction dans les trois dictionnaires et son média dans .
- **Slug dupliqué ou URL incorrecte** : vérifiez  dans , ou le nom du fichier Markdown pour un article.
- **Article absent de la liste ou de l’accueil** : vérifiez `draft: false`, la langue, et ; l’accueil ne montre que les trois plus récents.
- **Tests i18n en échec sur les images de galerie** : les trois tableaux  doivent avoir autant d’entrées que  dans .

## 15. Checklist avant commit

**Nouvelle activité**

- [ ] Textes FR / EN / ES et alt traduits
- [ ] Identifiant et trois slugs déclarés
- [ ] Image principale et trois références de galerie définies
- [ ] Vérifications et build passés

**Nouvelle actualité**

- [ ] Trois fichiers `.md`, un dans chaque langue
- [ ]  identique,  exact, slugs uniques
- [ ] Titre, description, date, image, alt et contenu renseignés
- [ ]  réglé comme prévu; tests et build passés

**Nouvelle photo de galerie**

- [ ] Image importée et ajoutée à 
- [ ] Légende et alt ajoutés dans les trois langues au même indice
- [ ] Vérifications passées

# Mémo

-  : coordonnées communes et liens sociaux.
-  : domaine public.
- , ,  : textes des pages, homepage et About.
- , ,  : textes et alt des activités.
-  : slugs d’activités et de sections.
-  : images et vignettes des activités.
-  : liste et ordre des images de galerie.
- `src/data/news/{en,fr,es}/` : articles Markdown trilingues.
- `src/i18n/ui/{en,fr,es}/chrome.ts` : nom, description, SEO, coordonnées localisées et textes de footer.
-  : images éditoriales actuellement importées.

> **[manage_todo_list]** Created 4 todos


