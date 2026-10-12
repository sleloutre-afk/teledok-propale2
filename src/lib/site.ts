/** Adresses des pages du site. */
export const ROUTES = {
  accueil: '/',
  teledok: '/teledok',
  methode: '/notre-methode',
  recherche: '/recherche',
  realisations: '/realisations',
  medecins: '/medecins',
  partenaires: '/partenaires',
  contact: '/contact',
  mentions: '/mentions-legales',
  confidentialite: '/politique-de-confidentialite',
} as const

export type RouteKey = keyof typeof ROUTES

/** Navigation principale (en-tête). */
export const NAV: { key: RouteKey; label: string }[] = [
  { key: 'teledok', label: 'TeleDok' },
  { key: 'methode', label: 'Notre méthode' },
  { key: 'recherche', label: 'Recherche' },
  { key: 'realisations', label: 'Réalisations' },
  { key: 'medecins', label: 'Médecins' },
  { key: 'partenaires', label: 'Partenaires' },
]

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3085'

/**
 * Vidéo d'arrière-plan de l'accueil : boucle muette, sans texte incrusté.
 * Les fichiers de public/videos sont la version web (H.264 720p allégé,
 * 1,8 Mo) et la première image de la source ../../hero.mp4. Le fichier
 * gardant son nom, « ?v= » est à incrémenter à chaque remplacement pour
 * que les navigateurs ne resservent pas l'ancienne vidéo depuis leur cache.
 * Sans vidéo (src vide), l'accueil affiche l'emplacement réservé.
 */
export const HERO_VIDEO: { src: string; poster?: string } = { src: '/videos/hero.mp4?v=2', poster: '/videos/hero.jpg?v=2' }
