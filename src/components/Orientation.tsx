import Link from 'next/link'
import { ROUTES } from '@/lib/site'

/** Double appel à l'action de bas de page : médecins / organisations. */
export function Orientation() {
  return (
    <>
      <div className="cta cta--blue on-blue rv">
        <div
          className="blob"
          aria-hidden="true"
          style={{ right: -70, bottom: -70, width: 220, height: 220, background: 'var(--amber)', opacity: 0.9 }}
        />
        <h2 className="h2 h2--sm">Vous êtes médecin ?</h2>
        <p>Exercer la télémédecine sans renoncer à la qualité du soin ni à votre indépendance.</p>
        <Link className="btn btn-amber" href={ROUTES.medecins}>
          Rejoindre TeleDok
        </Link>
      </div>
      <div className="cta t-amber rv">
        <div className="blob" aria-hidden="true" style={{ right: -60, top: -60, width: 190, height: 190, background: 'var(--peach)' }} />
        <h2 className="h2 h2--sm">Vous êtes une organisation ?</h2>
        <p>Déployer des parcours de téléconsultation rigoureux et évalués, au service de vos publics.</p>
        <Link className="btn btn-primary" href={ROUTES.partenaires}>
          Devenir partenaire
        </Link>
      </div>
    </>
  )
}
