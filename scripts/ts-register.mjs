// scripts/ts-register.mjs - apprend a Node a resoudre les imports sans extension (./config, ./ui/en/index) et l'alias @i18n ; charge par `node --import` pour les selfchecks de src/.
//
// Le code de src/ est ecrit pour Vite et TypeScript, qui acceptent un import
// sans extension ; Node, lui, exige "./config.ts". Plutot que d'ajouter une
// extension a chaque import du site, ce hook retente la resolution avec .ts et
// /index.ts. Rien d'autre : un selfcheck ne doit importer que de la logique
// pure, jamais un composant ni une image.
import { existsSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath } from "node:url";

const SRC = new URL("../src/", import.meta.url);
const ALIASES = { "@i18n": "i18n/index.ts" };

registerHooks({
  resolve(specifier, context, nextResolve) {
    const alias = ALIASES[specifier];
    if (alias) return nextResolve(new URL(alias, SRC).href, context);

    if (specifier.startsWith(".") && context.parentURL?.startsWith("file:")) {
      for (const candidate of [`${specifier}.ts`, `${specifier}/index.ts`]) {
        const url = new URL(candidate, context.parentURL);
        if (existsSync(fileURLToPath(url))) return nextResolve(url.href, context);
      }
    }
    return nextResolve(specifier, context);
  },
});
