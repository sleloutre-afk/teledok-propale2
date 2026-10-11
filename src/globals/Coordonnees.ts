import type { GlobalConfig } from 'payload'
import { revalidateSite } from '../lib/revalidate'

/** Coordonnées affichées dans le pied de page et sur la page « Contact ». */
export const Coordonnees: GlobalConfig = {
  slug: 'coordonnees',
  label: 'Coordonnées',
  admin: {
    group: 'Contenus',
    description: 'Affichées dans le pied de page et sur la page « Contact ». Un champ vide reste signalé « à fournir » sur le site.',
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'adresse', type: 'textarea', label: 'Adresse postale' },
    { name: 'telephone', type: 'text', label: 'Téléphone' },
    { name: 'email', type: 'email', label: 'E-mail de contact' },
  ],
  hooks: { afterChange: [() => revalidateSite()] },
}
