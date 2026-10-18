// src/i18n/ui/types.ts - le contrat que toute traduction doit honorer.
//
// `en` est ecrit en `as const` : TypeScript en deduit des types litteraux
// ("Home" et pas string). `Widen` les elargit vers leurs types de base en
// gardant la FORME intacte : oublier une cle en francais ou en espagnol casse
// le build, mais traduire un mot ne casse rien.
import type { en } from "./en/index";

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : { -readonly [K in keyof T]: Widen<T[K]> };

/** La forme exacte qu'un dictionnaire doit avoir, quelle que soit la langue. */
export type Dictionary = Widen<typeof en>;
