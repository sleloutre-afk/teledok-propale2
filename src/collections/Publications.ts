import type { CollectionConfig } from 'payload'
import { PUBLICATION_TYPES, THEMES } from '../data/themes'
import { publishedAccess, revalidateHooks } from './access'

/** Travaux de la page « Recherche & publications » (thèses, rapports, études). */
export const Publications: CollectionConfig = {
  slug: 'publications',
  labels: { singular: 'Publication', plural: 'Recherche & publications' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'theme', 'date', '_status'],
    group: 'Contenus',
    listSearchableFields: ['title', 'authors'],
    description:
      'Travaux affichés sur la page « Recherche & publications », dans l’ordre de cette liste (glisser-déposer pour réordonner).',
  },
  // Ordre d'affichage choisi à la main depuis la liste du BO.
  orderable: true,
  versions: { drafts: true },
  access: publishedAccess,
  fields: [
    { name: 'title', type: 'text', label: 'Titre', required: true },
    {
      name: 'type',
      type: 'select',
      label: 'Type de document',
      options: PUBLICATION_TYPES.map((type) => ({ label: type, value: type })),
      admin: { description: 'Affiché en pastille sur la carte. Tant qu’il est vide, le site affiche « [Type] ».' },
    },
    {
      name: 'theme',
      type: 'select',
      label: 'Thème',
      required: true,
      options: Object.entries(THEMES).map(([value, theme]) => ({ label: theme.label, value })),
      admin: { description: 'Détermine la couleur et le picto de la carte, ainsi que le filtre correspondant.' },
    },
    {
      name: 'date',
      type: 'date',
      label: 'Date de publication',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'monthOnly', displayFormat: 'MM/yyyy' },
        description: 'Mois et année affichés sur le site.',
      },
    },
    { name: 'authors', type: 'text', label: 'Auteurs', admin: { description: 'Ex. « Dr A. Martin, B. Durand ».' } },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'Document (PDF)',
      filterOptions: { mimeType: { equals: 'application/pdf' } },
      admin: { description: 'Fichier ouvert par « Télécharger le PDF ». Sans fichier, la carte indique « [PDF à fournir] ».' },
    },
    {
      type: 'collapsible',
      label: 'Mise en avant',
      fields: [
        {
          name: 'showOnHome',
          type: 'checkbox',
          label: 'Afficher sur l’accueil (« Contribution à la recherche »)',
          defaultValue: false,
          admin: { description: 'L’accueil affiche les trois premières publications cochées.' },
        },
        {
          name: 'showOnMedecins',
          type: 'checkbox',
          label: 'Afficher sur la page Médecins (« Travaux menés auprès des médecins »)',
          defaultValue: false,
          admin: { description: 'La page Médecins affiche les deux premières publications cochées.' },
        },
      ],
    },
  ],
  hooks: revalidateHooks,
}
