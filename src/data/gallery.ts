// src/data/gallery.ts - les images de la galerie et leur place dans la grille ; legendes et alternatives sont dans src/i18n/ui/<langue>/gallery.ts.
//
// L'ordre de ce tableau est celui des legendes du dictionnaire : la meme
// position designe la meme image dans les trois langues. Pour ajouter une
// image, ajoutez une ligne ici ET une entree dans chaque dictionnaire
// (src/i18n/i18n.selfcheck.ts verifie que les longueurs concordent).
import type { ImageMetadata } from "astro";
import g01 from "../assets/placeholders/gallery-01.svg";
import g02 from "../assets/placeholders/gallery-02.svg";
import g03 from "../assets/placeholders/gallery-03.svg";
import g04 from "../assets/placeholders/gallery-04.svg";
import g05 from "../assets/placeholders/gallery-05.svg";
import g06 from "../assets/placeholders/gallery-06.svg";
import g07 from "../assets/placeholders/gallery-07.svg";
import g08 from "../assets/placeholders/gallery-08.svg";
import g09 from "../assets/placeholders/gallery-09.svg";
import g10 from "../assets/placeholders/gallery-10.svg";
import g11 from "../assets/placeholders/gallery-11.svg";

/** La forme d'une vignette : "feature" occupe deux colonnes (et deux rangees des md), "wide" deux colonnes des md. */
export type GalleryShape = "standard" | "feature" | "wide";

export interface GalleryImage {
  src: ImageMetadata;
  shape: GalleryShape;
}

export const galleryImages: readonly GalleryImage[] = [
  { src: g01, shape: "feature" },
  { src: g02, shape: "standard" },
  { src: g03, shape: "standard" },
  { src: g04, shape: "standard" },
  { src: g05, shape: "standard" },
  { src: g06, shape: "standard" },
  { src: g07, shape: "wide" },
  { src: g08, shape: "standard" },
  { src: g09, shape: "standard" },
  { src: g10, shape: "standard" },
  { src: g11, shape: "standard" },
];
