import type { Metadata } from 'next'

/** Titre, description, adresse canonique et balises de partage d'une page. */
export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: 'TeleDok', locale: 'fr_FR', title, description, url: path },
  }
}
