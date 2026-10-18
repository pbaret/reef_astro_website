// src/i18n/ui/fr/index.ts - le dictionnaire francais assemble ; le type Dictionary exige exactement les memes cles que l'anglais.
import type { Dictionary } from "../types";
import { activities } from "./activities";
import { chrome } from "./chrome";
import { gallery } from "./gallery";
import { pages } from "./pages";

export const fr: Dictionary = { ...chrome, ...pages, activities, gallery };
