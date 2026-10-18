// src/i18n/ui/en/index.ts - le dictionnaire anglais assemble ; sa forme est le contrat des autres langues (voir ../types.ts).
import { activities } from "./activities";
import { chrome } from "./chrome";
import { gallery } from "./gallery";
import { pages } from "./pages";

export const en = { ...chrome, ...pages, activities, gallery } as const;
