import type { CollectionConfig } from 'payload'
import { TONES } from '../data/themes'
import { publishedAccess, revalidateHooks } from './access'

/** Études de cas de la page « Réalisations » : un gabarit commun, une fiche par opération. */
export const Realisations: CollectionConfig = {
  slug: 'realisations',
  labels: { singular: 'Réalisation', plural: 'Réalisations' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'theme', '_status'],
    group: 'Contenus',
    description: 'Études de cas affichées sur la page « Réalisations », dans l’ordre de cette liste (glisser-déposer pour réordonner).',
  },
  orderable: true,
  versions: { drafts: true },
  access: publishedAccess,
  fields: [
    { name: 'title', type: 'text', label: 'Titre', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'theme',
          type: 'text',
          label: 'Rubrique',
          required: true,
          admin: { description: 'Pastille au-dessus du titre (ex. « Prévention »).', width: '50%' },
        },
        {
          name: 'tone',
          type: 'select',
          label: 'Couleur de la carte',
          required: true,
          defaultValue: 'blue',
          options: TONES,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'tagsLabel',
      type: 'text',
      label: 'Intitulé de la liste d’étiquettes',
      defaultValue: 'Références',
      admin: { description: 'Lu par les lecteurs d’écran (ex. « Références », « Lieux de déploiement »).' },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Étiquettes',
      labels: { singular: 'Étiquette', plural: 'Étiquettes' },
      fields: [{ name: 'label', type: 'text', label: 'Libellé', required: true }],
    },
    {
      name: 'contexte',
      type: 'textarea',
      label: 'Contexte',
      admin: { description: 'Tant que ce texte est vide, le site affiche « [À rédiger avec TeleDok] ».' },
    },
    { name: 'role', type: 'textarea', label: 'Rôle de TeleDok' },
    { name: 'resultat', type: 'textarea', label: 'Résultat et évaluation' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Photographie',
      filterOptions: { mimeType: { contains: 'image' } },
      admin: {
        description: 'Photographie réelle de l’opération. Sans image, le site affiche l’emplacement réservé et la consigne ci-dessous.',
      },
    },
    { name: 'imageBrief', type: 'text', label: 'Consigne pour la photographie attendue' },
    {
      name: 'linkToRecherche',
      type: 'checkbox',
      label: 'Afficher le lien « Travaux de recherche associés »',
      defaultValue: false,
    },
  ],
  hooks: revalidateHooks,
}
