import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Signika } from 'next/font/google'
import { SITE_URL } from '@/lib/site'
import '@/styles/site.css'

// Police unique de la charte TeleDok (300 à 700). Téléchargée à la
// compilation et servie par le site lui-même : aucun appel à Google côté visiteur.
// Seul le jeu de caractères latin est préchargé ; le latin étendu reste chargé à la demande.
const signika = Signika({ subsets: ['latin'], display: 'swap', variable: '--font-signika' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'TeleDok : téléconsultation médicale et parcours de soins',
}

export const viewport: Viewport = { themeColor: '#0D628F' }

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    // La classe « js » est posée avant l'hydratation (script ci-dessous) : React doit l'ignorer.
    <html lang="fr" className={signika.variable} suppressHydrationWarning>
      <head>
        {/* Les états qui dépendent de JavaScript (contenus masqués avant apparition,
            menu replié, en-tête transparent) ne s'appliquent que si le script s'exécute. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {/* Lien d'évitement, visible au clavier seulement. Il vit ici et non dans la page : après une
            navigation, Next donne le focus au premier élément de la page, ce qui le faisait apparaître. */}
        <a className="skip" href="#contenu">
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  )
}
