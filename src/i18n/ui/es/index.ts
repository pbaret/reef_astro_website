// src/i18n/ui/es/index.ts - le dictionnaire espagnol assemble ; le type Dictionary exige exactement les memes cles que l'anglais.
import type { Dictionary } from "../types";
import { activities } from "./activities";
import { chrome } from "./chrome";
import { gallery } from "./gallery";
import { pages } from "./pages";

export const es: Dictionary = { ...chrome, ...pages, activities, gallery };
