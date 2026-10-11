// Icônes linéaires du site (voir src/components/Icon.tsx). Chaque tracé porte pathLength="1"
// pour l’animation de dessin (.trace).
const p = (d: string) => `<path pathLength="1" d="${d}"/>`

const bouclier = 'M24 5l16 6v12c0 10-7 17-16 21C15 40 8 33 8 23V11z'
const stethoscope =
  p('M14 6v12a8 8 0 0 0 16 0V6') + p('M22 26v6a8 8 0 0 0 16 0v-4') + '<circle pathLength="1" cx="38" cy="24" r="4"/>' + p('M11 6h6M27 6h6')

export const icons = {
  stethoscope: { vb: 48, body: stethoscope },
  organisation: { vb: 48, body: p('M6 42h36') + p('M10 42V18l14-10 14 10v24') + p('M18 42V30h12v12') + p('M17 20h4M27 20h4') },
  'aucune-vente': { vb: 48, body: p('M12 16h24l-2 24H14z') + p('M18 16v-3a6 6 0 0 1 12 0v3') + p('M7 7l34 34') },
  honoraires: {
    vb: 48,
    body:
      '<ellipse pathLength="1" cx="24" cy="12" rx="13" ry="5"/>' +
      p('M11 12v8c0 2.8 5.8 5 13 5s13-2.2 13-5v-8') +
      p('M11 20v8c0 2.8 5.8 5 13 5s13-2.2 13-5v-8') +
      p('M11 28v8c0 2.8 5.8 5 13 5s13-2.2 13-5v-8'),
  },
  chrono: {
    vb: 48,
    body: '<circle pathLength="1" cx="24" cy="27" r="15"/>' + p('M24 27V18') + p('M24 27l6 4') + p('M20 6h8M24 6v6') + p('M36 14l3-3'),
  },
  agenda: {
    vb: 48,
    body: '<rect pathLength="1" x="7" y="10" width="34" height="31" rx="2"/>' + p('M7 18h34') + p('M16 6v8M32 6v8') + p('M17 29l5 5 9-10'),
  },
  'bouclier-pouls': { vb: 48, body: p('M24 6l14 5v11c0 9-6 15-14 20C16 37 10 31 10 22V11z') + p('M15 25h5l3-6 4 10 3-4h4') },
  ecran: {
    vb: 48,
    body:
      '<rect pathLength="1" x="6" y="8" width="36" height="24" rx="2"/><circle pathLength="1" cx="24" cy="17" r="4"/>' +
      p('M17 28c1-4 4-5 7-5s6 1 7 5') +
      p('M18 40h12M24 32v8'),
  },
  parcours: {
    vb: 48,
    body:
      '<circle pathLength="1" cx="10" cy="10" r="4"/><circle pathLength="1" cx="38" cy="38" r="4"/>' +
      p('M14 10h16a6 6 0 0 1 0 12H18a6 6 0 0 0 0 12h16'),
  },
  'bouclier-valide': { vb: 48, body: p(bouclier) + p('M17 24l5 5 9-10') },
  'bouclier-coeur': { vb: 48, body: p(bouclier) + p('M24 33s-8-5-8-10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5-8 10-8 10z') },
  courbe: { vb: 48, body: p('M8 40V8') + p('M8 40h32') + p('M14 32l8-10 7 6 11-14') },
  document: { vb: 48, body: p('M12 6h18l8 8v28H12z') + p('M30 6v8h8') + p('M18 24h14M18 30h14M18 36h9') },
  these: { vb: 48, body: p('M4 18l20-10 20 10-20 10z') + p('M12 22v10c0 3 5 6 12 6s12-3 12-6V22') + p('M44 18v12') },
  immeubles: {
    vb: 48,
    body:
      '<rect pathLength="1" x="8" y="10" width="20" height="32" rx="1"/>' +
      p('M28 20h12v22H28') +
      p('M14 17h2M20 17h2M14 24h2M20 24h2M14 31h2M20 31h2M33 27h2M33 34h2') +
      p('M4 42h40'),
  },
  institution: { vb: 48, body: p('M6 18l18-10 18 10') + p('M10 18v20M18 18v20M30 18v20M38 18v20') + p('M4 42h40M6 38h36') },
  medicobus: {
    vb: 48,
    body:
      p('M5 12h28l9 10v12H5z') +
      p('M5 22h37') +
      '<circle pathLength="1" cx="12" cy="36" r="4"/><circle pathLength="1" cx="34" cy="36" r="4"/>' +
      p('M17 14v6M14 17h6'),
  },
  globe: {
    vb: 48,
    body: '<circle pathLength="1" cx="24" cy="24" r="18"/>' + p('M6 24h36') + p('M24 6c-6 6-6 30 0 36') + p('M24 6c6 6 6 30 0 36'),
  },
  valide: { vb: 48, body: p('M13 25l7 7 15-16') },
  cycle: { vb: 32, body: p('M26 12a11 11 0 0 0-19.5-2.5') + p('M6 4v6h6') + p('M6 20a11 11 0 0 0 19.5 2.5') + p('M26 28v-6h-6') },
  'carte-cps': {
    vb: 32,
    body:
      '<rect pathLength="1" x="3" y="7" width="26" height="18" rx="2"/><circle pathLength="1" cx="11" cy="15" r="3"/>' +
      p('M7 21c.8-2 2.2-3 4-3s3.2 1 4 3M19 13h6M19 17h4'),
  },
  adresse: { vb: 24, body: p('M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z') + '<circle pathLength="1" cx="12" cy="10" r="2.5"/>' },
  telephone: { vb: 24, body: p('M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2') },
  courriel: { vb: 24, body: '<rect pathLength="1" x="3" y="5" width="18" height="14" rx="2"/>' + p('M3 7l9 6 9-6') },
  fleche: { vb: 20, body: p('M4 10h12M11 5l5 5-5 5') },
  telecharger: { vb: 18, body: p('M9 2v10M5 8l4 4 4-4M3 16h12') },
  chevron: { vb: 22, body: p('M5 8l6 6 6-6') },
} as const

export type IconName = keyof typeof icons
