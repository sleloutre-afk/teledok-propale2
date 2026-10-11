import { getPayload } from 'payload'
import config from '@payload-config'
import { THEMES, VALEURS, type ThemeId, type Tone } from '@/data/themes'

/** Contenus saisis dans le BO, tels que les pages du site les affichent. */

type UploadDoc = { url?: string | null; alt?: string | null; width?: number | null; height?: number | null }
const asUpload = (value: unknown): UploadDoc | null => (value && typeof value === 'object' ? (value as UploadDoc) : null)

export type PublicationView = {
  id: string | number
  title: string
  type: string | null
  theme: ThemeId
  /** Date ISO de publication, si elle est renseignée. */
  date: string | null
  authors: string | null
  /** Adresse du PDF, s'il a été déposé. */
  pdf: string | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toPublication = (doc: any): PublicationView => ({
  id: doc.id,
  title: doc.title,
  type: doc.type || null,
  theme: doc.theme in THEMES ? doc.theme : 'prev',
  date: doc.date || null,
  authors: doc.authors || null,
  pdf: asUpload(doc.file)?.url || null,
})

/** Publications publiées, dans l'ordre choisi dans le BO. */
export async function getPublications(filter?: 'showOnHome' | 'showOnMedecins', limit?: number): Promise<PublicationView[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'publications',
    where: { and: [{ _status: { equals: 'published' } }, ...(filter ? [{ [filter]: { equals: true } }] : [])] },
    sort: '_order',
    depth: 1,
    ...(limit ? { limit } : { pagination: false }),
  })
  return docs.map(toPublication)
}

export type RealisationView = {
  id: string | number
  title: string
  theme: string
  tone: Tone
  tagsLabel: string
  tags: string[]
  contexte: string | null
  role: string | null
  resultat: string | null
  image: { src: string; alt: string; width?: number | null; height?: number | null } | null
  imageBrief: string | null
  linkToRecherche: boolean
}

/** Études de cas publiées, dans l'ordre choisi dans le BO. */
export async function getRealisations(): Promise<RealisationView[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'realisations',
    where: { _status: { equals: 'published' } },
    sort: '_order',
    depth: 1,
    pagination: false,
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return docs.map((doc: any) => {
    const image = asUpload(doc.image)
    return {
      id: doc.id,
      title: doc.title,
      theme: doc.theme,
      tone: doc.tone,
      tagsLabel: doc.tagsLabel || 'Références',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tags: (doc.tags || []).map((tag: any) => tag.label).filter(Boolean),
      contexte: doc.contexte || null,
      role: doc.role || null,
      resultat: doc.resultat || null,
      image: image?.url ? { src: image.url, alt: image.alt || '', width: image.width, height: image.height } : null,
      imageBrief: doc.imageBrief || null,
      linkToRecherche: Boolean(doc.linkToRecherche),
    }
  })
}

export type ValeurView = { titre: string; tone: Tone; texte: string | null }

/** Les six valeurs, avec leur texte explicatif s'il a été rédigé dans le BO. */
export async function getValeurs(): Promise<ValeurView[]> {
  const payload = await getPayload({ config })
  const textes = (await payload.findGlobal({ slug: 'valeurs' })) as unknown as Record<string, string | null | undefined>
  return VALEURS.map((valeur) => ({ titre: valeur.titre, tone: valeur.tone, texte: textes[valeur.key]?.trim() || null }))
}

export type CoordonneesView = { adresse: string | null; telephone: string | null; email: string | null }

export async function getCoordonnees(): Promise<CoordonneesView> {
  const payload = await getPayload({ config })
  const doc = await payload.findGlobal({ slug: 'coordonnees' })
  return { adresse: doc.adresse?.trim() || null, telephone: doc.telephone?.trim() || null, email: doc.email?.trim() || null }
}
