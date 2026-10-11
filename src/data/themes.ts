import type { IconName } from './icons'

export type Tone = 'blue' | 'coral' | 'teal' | 'amber'

/** Thèmes des travaux de recherche : filtres de la page « Recherche & publications ». */
export const THEMES = {
  prev: { label: 'Prévention', tone: 'blue', dot: 'var(--blue)', icon: 'bouclier-pouls' },
  sp: { label: 'Soins primaires & télérequérant', tone: 'teal', dot: 'var(--teal)', icon: 'stethoscope' },
  dmc: { label: 'Dispositifs connectés', tone: 'amber', dot: 'var(--amber)', icon: 'ecran' },
  mob: { label: 'Unités mobiles', tone: 'coral', dot: 'var(--coral)', icon: 'medicobus' },
  crise: { label: 'Situations sanitaires exceptionnelles', tone: 'blue', dot: 'var(--amber)', icon: 'globe' },
  th: { label: 'Thèses', tone: 'coral', dot: 'var(--teal)', icon: 'these' },
} as const satisfies Record<string, { label: string; tone: Tone; dot: string; icon: IconName }>

export type ThemeId = keyof typeof THEMES

/** Types de document proposés dans le BO. */
export const PUBLICATION_TYPES = ['Thèse', 'Rapport', 'Publication scientifique', 'Étude qualitative'] as const

/** Couleurs des cartes « Réalisations ». */
export const TONES: { value: Tone; label: string }[] = [
  { value: 'blue', label: 'Bleu' },
  { value: 'teal', label: 'Turquoise' },
  { value: 'amber', label: 'Ambre' },
  { value: 'coral', label: 'Corail' },
]

/** Les six valeurs de TeleDok, dans l'ordre de la planche d'origine (picto n° = rang). */
export const VALEURS: { key: string; titre: string; tone: Tone }[] = [
  { key: 'parcours', titre: 'Amélioration du parcours de soins coordonné', tone: 'blue' },
  { key: 'plateforme', titre: 'Plateforme territoriale d’appui', tone: 'coral' },
  { key: 'conditions', titre: 'Amélioration des conditions de l’activité médicale', tone: 'teal' },
  { key: 'independance', titre: 'Indépendance médicale, en dehors d’une société commerciale', tone: 'amber' },
  { key: 'evaluation', titre: 'Évaluation systématique et recherche en télémédecine', tone: 'blue' },
  { key: 'teleconsultation', titre: 'Téléconsultation avec objet connecté et télérequérant formé', tone: 'coral' },
]
