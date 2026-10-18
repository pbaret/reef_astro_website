// scripts/placeholders.mjs - fabrique les images de demonstration : des SVG abstraits (palette Reef) dans src/assets/placeholders, plus la carte de partage et les icones dans public/.
//
// Aucun service distant : tout est dessine ici, de facon deterministe (meme
// resultat a chaque execution). Les fichiers produits sont versionnes, ce
// script ne tourne donc PAS pendant le build. Pour remplacer une image par une
// photographie, gardez le meme nom de fichier, ou changez l'import dans
// src/data/. Relancer `pnpm placeholders` ecrase les SVG de demonstration.
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const OUT = new URL("../src/assets/placeholders/", import.meta.url);
const PUBLIC = new URL("../public/", import.meta.url);
mkdirSync(OUT, { recursive: true });
mkdirSync(PUBLIC, { recursive: true });

// La palette de tokens.css, recopiee ici : un SVG ne lit pas les variables CSS du site.
const C = {
  ink950: "#0a0f17",
  ink900: "#141b27",
  ink800: "#1f2939",
  ink700: "#2e3b50",
  reef300: "#7fd8f0",
  reef400: "#3fc0e0",
  reef500: "#1a9fc4",
  reef600: "#147ea0",
  coral300: "#ffb29d",
  coral400: "#ff7a59",
  coral500: "#f95c36",
  paper100: "#f2f5fa",
  paper200: "#e4eaf3",
};

// Generateur pseudo-aleatoire a graine : memes images a chaque execution.
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (v) => Math.round(v * 10) / 10;

/** Une vague pleine : une sinusoide fermee par le bas du cadre. */
function wave(w, h, y, amp, cycles, phase, fill, opacity = 1) {
  const steps = 48;
  const pts = [];
  for (let i = 0; i <= steps; i += 1) {
    const x = (w * i) / steps;
    pts.push(`${n(x)} ${n(y + Math.sin((i / steps) * cycles * Math.PI * 2 + phase) * amp)}`);
  }
  return `<path d="M${pts.join(" L")} L${w} ${h} L0 ${h} Z" fill="${fill}" fill-opacity="${opacity}"/>`;
}

function circle(cx, cy, r, fill, opacity = 1) {
  return `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${fill}" fill-opacity="${opacity}"/>`;
}

/** Un demi-disque pose sur la ligne d'horizon. */
function halfCircle(cx, cy, r, fill) {
  return `<path d="M${n(cx - r)} ${n(cy)} A${n(r)} ${n(r)} 0 0 1 ${n(cx + r)} ${n(cy)} Z" fill="${fill}"/>`;
}

function rect(x, y, w, h, fill, opacity = 1, rx = 0) {
  return `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${rx}" fill="${fill}" fill-opacity="${opacity}"/>`;
}

function arc(cx, cy, r, stroke, width, opacity = 1) {
  return `<path d="M${n(cx - r)} ${n(cy)} A${n(r)} ${n(r)} 0 0 1 ${n(cx + r)} ${n(cy)}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-opacity="${opacity}" stroke-linecap="round"/>`;
}

function background(w, h, from, to, id = "bg") {
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#${id})"/>`;
}

// Chaque motif dessine un cadre de w x h et rend le corps du SVG.
const motifs = {
  waves(w, h, r) {
    const layers = [C.reef600, C.reef500, C.reef400, C.reef300];
    return (
      background(w, h, C.ink900, C.ink950) +
      layers.map((fill, i) => wave(w, h, h * (0.42 + i * 0.13), h * 0.05, 1.5 + i * 0.4, r() * 6, fill, 0.35 + i * 0.14)).join("")
    );
  },
  circles(w, h, r) {
    const s = Math.min(w, h);
    return (
      background(w, h, C.paper100, C.paper200) +
      circle(w * 0.36, h * 0.5, s * 0.34, C.coral400, 0.9) +
      circle(w * 0.58, h * 0.46, s * 0.3, C.reef500, 0.75) +
      circle(w * 0.5, h * 0.62, s * 0.22, C.ink800, 0.85) +
      circle(w * 0.76, h * 0.3, s * 0.1, C.coral300, 0.9) +
      circle(w * 0.2 + r() * 20, h * 0.2, s * 0.06, C.reef300, 0.9)
    );
  },
  horizon(w, h) {
    return (
      background(w, h, C.ink800, C.ink950) +
      rect(0, h * 0.58, w, h * 0.42, C.ink900) +
      rect(0, h * 0.58, w, 3, C.reef300, 0.9) +
      [0.66, 0.74, 0.83, 0.93].map((y, i) => rect(w * (0.1 + i * 0.04), h * y, w * (0.8 - i * 0.08), 3, C.reef400, 0.5 - i * 0.1)).join("") +
      halfCircle(w * 0.5, h * 0.58, Math.min(w, h) * 0.16, C.coral400)
    );
  },
  tiles(w, h, r) {
    const cols = 6;
    const rows = 4;
    const cw = w / cols;
    const ch = h / rows;
    const fills = [C.ink800, C.ink700, C.reef600, C.reef500, C.reef400, C.coral400];
    const out = [background(w, h, C.ink900, C.ink950)];
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const f = fills[Math.floor(r() * fills.length)];
        out.push(rect(x * cw + 6, y * ch + 6, cw - 12, ch - 12, f, 0.45 + r() * 0.5, 10));
      }
    }
    return out.join("");
  },
  sun(w, h) {
    return (
      background(w, h, C.ink800, C.ink950) +
      circle(w * 0.5, h * 0.62, Math.min(w, h) * 0.3, C.coral400, 0.95) +
      wave(w, h, h * 0.62, h * 0.03, 2, 0.5, C.reef600, 0.95) +
      wave(w, h, h * 0.74, h * 0.035, 2.5, 2, C.reef500, 0.9) +
      wave(w, h, h * 0.86, h * 0.03, 3, 4, C.ink900, 0.95)
    );
  },
  bands(w, h) {
    const fills = [C.reef300, C.reef400, C.reef500, C.reef600, C.ink700];
    const bands = fills
      .map((f, i) => `<polygon points="${n(w * (0.1 + i * 0.18))},0 ${n(w * (0.3 + i * 0.18))},0 ${n(w * (-0.1 + i * 0.18))},${h} ${n(w * (-0.3 + i * 0.18))},${h}" fill="${f}" fill-opacity="${0.55 + i * 0.08}"/>`)
      .join("");
    return background(w, h, C.ink900, C.ink950) + `<g transform="translate(${n(w * 0.25)} 0)">${bands}</g>`;
  },
  panorama(w, h, r) {
    const fills = [C.ink800, C.reef600, C.reef500, C.reef400, C.coral400];
    return (
      background(w, h, C.ink900, C.ink950) +
      fills.map((f, i) => wave(w, h, h * (0.2 + i * 0.16), h * 0.08, 2.5 + i * 0.5, r() * 6, f, i === 4 ? 0.8 : 0.55)).join("")
    );
  },
  dots(w, h, r) {
    const out = [background(w, h, C.ink800, C.ink950)];
    const fills = [C.reef300, C.reef400, C.paper200, C.coral300];
    for (let i = 0; i < 70; i += 1) {
      out.push(circle(r() * w, r() * h, Math.min(w, h) * (0.008 + r() * 0.03), fills[Math.floor(r() * fills.length)], 0.3 + r() * 0.6));
    }
    return out.join("");
  },
  arcs(w, h) {
    const radii = [0.46, 0.38, 0.3, 0.22, 0.14];
    const strokes = [C.reef600, C.reef500, C.reef400, C.coral400, C.coral300];
    const s = Math.min(w, h);
    return (
      background(w, h, C.paper100, C.paper200) +
      radii.map((rad, i) => arc(w * 0.5, h * 0.72, s * rad * 1.15, strokes[i], s * 0.05, 0.95)).join("")
    );
  },
  calm(w, h, r) {
    const out = [background(w, h, C.reef500, C.reef600)];
    for (let i = 0; i < 9; i += 1) {
      out.push(wave(w, h, h * (0.1 + i * 0.1), h * 0.012, 5 + r() * 2, r() * 6, i % 2 ? C.reef400 : C.reef300, 0.16));
    }
    out.push(wave(w, h, h * 0.9, h * 0.015, 3, 1, C.ink900, 0.55));
    return out.join("");
  },
  layers(w, h) {
    const fills = [C.ink700, C.ink800, C.ink900, C.ink950];
    const out = [background(w, h, C.reef600, C.ink800)];
    fills.forEach((f, i) => out.push(wave(w, h, h * (0.3 + i * 0.18), h * 0.06, 1.2 + i * 0.3, i * 1.7, f, 0.92)));
    out.push(circle(w * 0.78, h * 0.22, Math.min(w, h) * 0.07, C.coral400, 0.9));
    return out.join("");
  },
};

/** Ecrit un SVG : aucun texte dessine dedans, l'alternative vit dans le dictionnaire. */
function write(name, motif, w, h, seed) {
  const body = motifs[motif](w, h, rng(seed));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">${body}</svg>\n`;
  writeFileSync(new URL(`${name}.svg`, OUT), svg);
  return svg;
}

const hero = write("hero", "waves", 2400, 1500, 1);
write("about", "circles", 1200, 900, 2);

write("activity-1", "waves", 1200, 800, 11);
write("activity-2", "circles", 1200, 800, 12);
write("activity-3", "tiles", 1200, 800, 13);

write("news-1", "sun", 1200, 675, 21);
write("news-2", "bands", 1200, 675, 22);
write("news-3", "horizon", 1200, 675, 23);

// Les onze images de la galerie, dans l'ordre de src/data/gallery.ts.
const gallery = [
  ["waves", 1600, 1200],
  ["circles", 1200, 900],
  ["horizon", 1200, 900],
  ["tiles", 1200, 900],
  ["sun", 1200, 900],
  ["bands", 1200, 900],
  ["panorama", 1600, 600],
  ["dots", 1200, 900],
  ["arcs", 1200, 900],
  ["calm", 1200, 900],
  ["layers", 1200, 900],
];
gallery.forEach(([motif, w, h], i) => write(`gallery-${String(i + 1).padStart(2, "0")}`, motif, w, h, 100 + i));

// La carte de partage : les reseaux sociaux ne lisent pas le SVG, il faut une image matricielle.
await sharp(Buffer.from(hero)).resize(1200, 630, { fit: "cover" }).png().toFile(fileURLToPath(new URL("og-default.png", PUBLIC)));

// Le favicon : la vague de la maison, en SVG (public/favicon.svg) et en PNG pour iOS.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><rect width="64" height="64" rx="14" fill="${C.ink950}"/><path d="M8 38c6-10 12-10 18 0s12 10 18 0 8-8 12-4" fill="none" stroke="${C.reef400}" stroke-width="6" stroke-linecap="round"/><path d="M8 50c6-10 12-10 18 0s12 10 18 0 8-8 12-4" fill="none" stroke="${C.coral400}" stroke-width="6" stroke-linecap="round" stroke-opacity="0.9"/></svg>\n`;
writeFileSync(new URL("favicon.svg", PUBLIC), favicon);
await sharp(Buffer.from(favicon), { density: 300 }).resize(180, 180).png().toFile(fileURLToPath(new URL("apple-touch-icon.png", PUBLIC)));

console.log("placeholders ecrits dans src/assets/placeholders et public/");
