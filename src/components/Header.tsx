import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/logo-teledok.png'
import logoBlanc from '@/assets/logo-teledok-blanc.png'
import { cx } from '@/lib/cx'
import { NAV, ROUTES, type RouteKey } from '@/lib/site'

type Props = {
  /** Rubrique active dans la navigation principale. */
  current?: RouteKey
  /** En-tête transparent posé sur le visuel d'ouverture (accueil). */
  overlay?: boolean
  /** Cible du bouton « Rejoindre TeleDok ». */
  joinHref?: string
}

const LOGO_HEIGHT = 34
const LOGO_WIDTH = Math.round((LOGO_HEIGHT * logo.width) / logo.height)
// Hauteur fixe, largeur déduite des proportions du fichier.
const LOGO_STYLE = { height: LOGO_HEIGHT, width: 'auto' }

/**
 * En-tête du site. L'état au défilement (accueil) et le menu des écrans
 * étroits sont pilotés par SiteBehaviors.
 */
export function Header({ current, overlay = false, joinHref = ROUTES.medecins }: Props) {
  return (
    <header className={cx('site-hdr', { 'site-hdr--overlay': overlay })} data-header>
      <div className="hdr">
        <div className="hdr-in">
          <Link className="hdr-logo" href={ROUTES.accueil} aria-label="TeleDok, retour à l’accueil">
            <Image className="logo logo--c" src={logo} alt="TeleDok" width={LOGO_WIDTH} height={LOGO_HEIGHT} style={LOGO_STYLE} priority />
            {overlay && <Image className="logo logo--w" src={logoBlanc} alt="" width={LOGO_WIDTH} height={LOGO_HEIGHT} style={LOGO_STYLE} priority />}
          </Link>
          <button className="burger" type="button" aria-expanded="false" aria-controls="nav-principale" data-burger>
            <span className="sr-only" data-burger-label>
              Ouvrir le menu
            </span>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path className="b1" d="M4 8h18" />
              <path className="b2" d="M4 13h18" />
              <path className="b3" d="M4 18h18" />
            </svg>
          </button>
          <nav id="nav-principale" className="hdr-nav" aria-label="Navigation principale">
            {NAV.map((item) => (
              <Link
                key={item.key}
                className={cx('nav', { 'nav-on': item.key === current })}
                href={ROUTES[item.key]}
                aria-current={item.key === current ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link className="btn btn-amber hdr-join" href={joinHref}>
              Rejoindre TeleDok
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
