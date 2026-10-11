import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/** Fichiers envoyés depuis le BO : PDF des publications, visuels des réalisations. */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Fichier', plural: 'Bibliothèque' },
  admin: {
    useAsTitle: 'filename',
    group: 'Fichiers',
    defaultColumns: ['filename', 'mimeType', 'filesize', 'createdAt'],
    description:
      "PDF et images utilisés par les publications et les réalisations. Un fichier y est ajouté automatiquement quand vous l'envoyez depuis une fiche.",
  },
  access: {
    // Un fichier se lit par son adresse (/api/media/file/<nom>) ou sa fiche
    // par son identifiant — nécessaire au site public. En revanche, lister
    // toute la bibliothèque par l'API reste réservé aux comptes du BO.
    // `routeParams.filename` : le stockage S3 de Payload refait, pour servir
    // un fichier, une recherche par nom soumise à ce contrôle d'accès.
    read: ({ req, id, isReadingStaticFile }) =>
      req.payloadAPI === 'local' ||
      Boolean(isReadingStaticFile) ||
      typeof req.routeParams?.filename === 'string' ||
      Boolean(id) ||
      Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    // En local : <projet>/media (ignoré par git). Avec le stockage S3
    // (production), rien n'est écrit sur disque, mais Payload y cherche
    // quand même les doublons de nom : on pointe alors vers un dossier
    // inexistant.
    staticDir: path.resolve(dirname, process.env.S3_BUCKET ? '../../.media-s3' : '../../media'),
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [{ name: 'alt', type: 'text', label: 'Texte alternatif (images)' }],
}
