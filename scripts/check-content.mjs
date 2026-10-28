/**
 * Vérifie la cohérence du contenu :
 *  - mêmes clés de traduction dans les 4 langues (messages/*.json) ;
 *  - aucune valeur vide ;
 *  - fichiers référencés par les projets présents dans public/ ;
 *  - traductions de projets présentes pour chaque langue.
 * Usage : npm run check
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const locales = ["fr", "en", "es", "de"];
let errors = 0;
const fail = (msg) => {
  errors++;
  console.error("✗", msg);
};

function flatten(obj, prefix = "", out = {}) {
  if (Array.isArray(obj)) {
    out[prefix + "[len]"] = obj.length;
    obj.forEach((v, i) => (typeof v === "object" && v ? flatten(v, `${prefix}[${i}]`, out) : (out[`${prefix}[${i}]`] = v)));
  } else if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  } else out[prefix] = obj;
  return out;
}

const msgs = Object.fromEntries(locales.map((l) => [l, flatten(JSON.parse(readFileSync(join(root, "messages", `${l}.json`), "utf8")))]));
const ref = msgs.fr;
for (const l of locales.slice(1)) {
  for (const k of Object.keys(ref)) {
    if (!(k in msgs[l])) fail(`messages/${l}.json : clé manquante ${k}`);
    else if (k.endsWith("[len]") && msgs[l][k] !== ref[k]) fail(`messages/${l}.json : longueur de liste différente pour ${k}`);
  }
  for (const k of Object.keys(msgs[l])) if (!(k in ref)) fail(`messages/${l}.json : clé en trop ${k}`);
}
for (const l of locales) for (const [k, v] of Object.entries(msgs[l])) if (typeof v === "string" && v.trim() === "") fail(`messages/${l}.json : valeur vide ${k}`);
console.log(`Traductions : ${Object.keys(ref).length} clés comparées sur ${locales.length} langues.`);

// Projets : lecture textuelle des fichiers (évite de compiler le TypeScript)
const dir = join(root, "src", "content", "projects");
for (const f of readdirSync(dir).filter((f) => f.endsWith(".ts") && f !== "index.ts")) {
  const src = readFileSync(join(dir, f), "utf8");
  const slug = /slug:\s*"([^"]+)"/.exec(src)?.[1];
  for (const l of locales) if (!new RegExp(`\\n\\s+"?${l}"?: \\{`).test(src)) fail(`${f} : traduction ${l} absente`);
  const base = /const base = "([^"]+)"/.exec(src)?.[1];
  for (const m of src.matchAll(/path: `\$\{base\}([^`]+)`/g)) {
    const p = join(root, "public", base, m[1]);
    if (!existsSync(p)) fail(`${f} : fichier référencé introuvable ${base}${m[1]}`);
  }
  if (!slug || f !== `${slug}.ts`) fail(`${f} : le nom du fichier doit être égal au slug (${slug})`);
}
console.log("Projets : traductions et fichiers vérifiés.");

if (errors) {
  console.error(`\n${errors} problème(s).`);
  process.exit(1);
}
console.log("OK : contenu cohérent.");
