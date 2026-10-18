// src/data/activities.ts - ce qui n'est pas du texte dans les activites : l'image principale et les trois vignettes de leur galerie.
//
// Les textes (nom, resume, sections, benefices) sont dans le dictionnaire. Les
// vignettes sont des positions dans src/data/gallery.ts : la legende et
// l'alternative viennent donc du dictionnaire de la galerie.
import type { ImageMetadata } from "astro";
import type { ActivityId } from "@i18n";
import a1 from "../assets/placeholders/activity-1.svg";
import a2 from "../assets/placeholders/activity-2.svg";
import a3 from "../assets/placeholders/activity-3.svg";

export interface ActivityMedia {
  image: ImageMetadata;
  /** Trois positions dans galleryImages. */
  gallery: readonly [number, number, number];
}

export const activityMedia: Record<ActivityId, ActivityMedia> = {
  "activity-1": { image: a1, gallery: [1, 2, 3] },
  "activity-2": { image: a2, gallery: [4, 5, 7] },
  "activity-3": { image: a3, gallery: [8, 9, 10] },
};
