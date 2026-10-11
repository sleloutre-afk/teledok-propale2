import type { GlobalConfig } from 'payload'
import { VALEURS } from '../data/themes'
import { revalidateSite } from '../lib/revalidate'

/** Texte explicatif de chacune des six valeurs (accueil et page « TeleDok »). */
export const Valeurs: GlobalConfig = {
  slug: 'valeurs',
  label: 'Textes des valeurs',
  admin: {
    group: 'Contenus',
    description:
      'Une à deux lignes par valeur, affichées sous son titre. Les titres et les pictos sont fixes. Tant qu’un texte est vide, le site affiche la mention « à rédiger ».',
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: VALEURS.map((valeur) => ({
    name: valeur.key,
    type: 'textarea' as const,
    label: valeur.titre,
    maxLength: 280,
  })),
  hooks: { afterChange: [() => revalidateSite()] },
}
