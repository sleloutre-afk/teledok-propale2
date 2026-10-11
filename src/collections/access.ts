import type { CollectionConfig } from 'payload'
import { revalidateSite } from '../lib/revalidate'

/** Visible de tous une fois publié ; brouillons réservés aux comptes du BO. */
export const publishedAccess: CollectionConfig['access'] = {
  read: ({ req }) => {
    if (req.user) return true
    return { _status: { equals: 'published' } }
  },
  create: ({ req }) => Boolean(req.user),
  update: ({ req }) => Boolean(req.user),
  delete: ({ req }) => Boolean(req.user),
}

/** Une fiche modifiée ou supprimée apparaît sur le site dès l'enregistrement. */
export const revalidateHooks: CollectionConfig['hooks'] = {
  afterChange: [() => revalidateSite()],
  afterDelete: [() => revalidateSite()],
}
