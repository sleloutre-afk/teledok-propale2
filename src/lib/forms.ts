// Règles de validation des formulaires, partagées entre le navigateur et le serveur.

export type FormKind = 'candidature' | 'contact'
export type Values = Record<string, string | boolean>
export type Errors = Record<string, string>

export const structures = {
  mutuelle: 'Mutuelle',
  groupe: 'Grand groupe',
  ps: 'Professionnel de santé',
  collectivite: 'Collectivité',
  autre: 'Autre',
} as const

/** Champs de chaque formulaire, dans l’ordre d’affichage. */
export const fields: Record<FormKind, string[]> = {
  candidature: ['nom', 'prenom', 'email', 'tel', 'rpps', 'rgpd'],
  contact: ['org', 'type', 'nom', 'fonction', 'email', 'tel', 'msg', 'rgpd'],
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const TEL = /^(\+\d{8,14}|0\d{9})$/
const MAX = 200
const MAX_MSG = 5000

const str = (v: Values, k: string) => (typeof v[k] === 'string' ? (v[k] as string).trim() : '')

function common(v: Values, e: Errors, telExemple: string) {
  const email = str(v, 'email')
  if (!email) e.email = 'Veuillez indiquer votre adresse e-mail.'
  else if (!EMAIL.test(email)) e.email = 'Format attendu : nom@domaine.fr'

  const tel = str(v, 'tel').replace(/[\s.\-()]/g, '')
  if (!tel) e.tel = 'Veuillez indiquer votre numéro de téléphone.'
  else if (!TEL.test(tel)) e.tel = `Format attendu : ${telExemple}.`
}

function tooLong(v: Values, e: Errors, keys: string[]) {
  for (const k of keys) {
    const max = k === 'msg' ? MAX_MSG : MAX
    if (!e[k] && str(v, k).length > max) e[k] = `Ce champ est limité à ${max} caractères.`
  }
}

export function validateCandidature(v: Values): Errors {
  const e: Errors = {}
  if (!str(v, 'nom')) e.nom = 'Veuillez indiquer votre nom.'
  if (!str(v, 'prenom')) e.prenom = 'Veuillez indiquer votre prénom.'
  common(v, e, '06 12 34 56 78 ou +33 6 12 34 56 78')
  const rpps = str(v, 'rpps').replace(/\s/g, '')
  if (!rpps) e.rpps = 'Veuillez indiquer votre numéro RPPS.'
  else if (!/^\d{11}$/.test(rpps)) e.rpps = 'Le numéro RPPS doit comporter exactement 11 chiffres.'
  if (v.rgpd !== true) e.rgpd = 'Votre accord est nécessaire pour traiter votre candidature.'
  tooLong(v, e, ['nom', 'prenom', 'email'])
  return e
}

export function validateContact(v: Values): Errors {
  const e: Errors = {}
  if (!str(v, 'org')) e.org = 'Veuillez indiquer votre organisation.'
  if (!Object.hasOwn(structures, str(v, 'type'))) e.type = 'Veuillez sélectionner un type de structure.'
  if (!str(v, 'nom')) e.nom = 'Veuillez indiquer votre nom.'
  if (!str(v, 'fonction')) e.fonction = 'Veuillez indiquer votre fonction.'
  common(v, e, '01 23 45 67 89 ou +33 1 23 45 67 89')
  if (!str(v, 'msg')) e.msg = 'Veuillez rédiger votre message.'
  if (v.rgpd !== true) e.rgpd = 'Votre accord est nécessaire pour traiter votre demande.'
  tooLong(v, e, ['org', 'nom', 'fonction', 'email', 'msg'])
  return e
}

export const validators: Record<FormKind, (v: Values) => Errors> = {
  candidature: validateCandidature,
  contact: validateContact,
}

/** Valeurs nettoyées, telles qu’elles sont transmises par e-mail. */
export function normalize(kind: FormKind, v: Values): Record<string, string> {
  const out: Record<string, string> = {}
  for (const k of fields[kind]) {
    if (k === 'rgpd') continue
    // Hors message, les champs tiennent sur une ligne.
    out[k] = k === 'msg' ? str(v, k) : str(v, k).replace(/\s+/g, ' ')
  }
  if (out.rpps) out.rpps = out.rpps.replace(/\s/g, '')
  return out
}
