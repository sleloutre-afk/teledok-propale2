import { notFound } from 'next/navigation'

/** Toute adresse sans page : la page 404 du site (not-found.tsx), avec son en-tête et son pied de page. */
export default function CatchAll() {
  notFound()
}
