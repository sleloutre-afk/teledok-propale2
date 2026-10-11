import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { PageShell } from '@/components/PageShell'
import { ContactForm } from '@/components/ContactForm'
import { Crumb } from '@/components/Crumb'
import { Icon } from '@/components/Icon'
import { Uline } from '@/components/Uline'
import { pageMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

// Régénérée au plus toutes les 60 s (une partie des contenus vient du BO).
export const revalidate = 60

export const metadata: Metadata = pageMetadata(
  '/partenaires',
  'Partenaires | TeleDok',
  'Déployer des parcours de téléconsultation rigoureux et évalués, au service de vos publics : mutuelles, grands groupes, professionnels de santé, collectivités et institutionnels.',
)

const ETAPES = [
  { titre: 'Conception sur-mesure du parcours', bg: '#fff', fg: 'var(--blue)' },
  { titre: 'Mise en œuvre & ressources humaines', bg: 'var(--teal-text)', fg: '#fff' },
  { titre: 'Évaluation systématique', bg: 'var(--amber)', fg: 'var(--ink)' },
  { titre: 'Amélioration itérative & recherche', bg: 'var(--coral-text)', fg: '#fff' },
]

export default function Page() {
  return (
    <PageShell page="pg-partenaires" current="partenaires">
      <section className="bg-cream clip" aria-labelledby="hero-t">
        <div
          className="blob"
          aria-hidden="true"
          style={{ right: -150, top: -130, width: 400, height: 400, background: 'var(--mint)' }}
        ></div>
        <div
          className="blob blob--dot"
          aria-hidden="true"
          style={{ right: 320, bottom: 100, width: 20, height: 20, background: 'var(--coral)' }}
        ></div>
        <div className="wrap phero rel">
          <Crumb label="Partenaires" />
          <p className="hero-in pill t-blue">
            <span className="pill__dot" aria-hidden="true"></span>Partenaires
          </p>
          <h1 id="hero-t" className="hero-in2 h1" style={{ maxWidth: 920, marginBottom: 40 }}>
            Déployer des parcours de téléconsultation rigoureux et évalués, <Uline>au service de vos publics.</Uline>
          </h1>
          <div className="hero-in3 btns">
            <a className="btn btn-primary" href="#contact-part">
              Nous contacter
            </a>
            <Link className="btn btn-secondary" href={ROUTES.methode}>
              Notre méthode
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBlock: 'clamp(80px, 10vw, 120px)' }} aria-labelledby="pub-t">
        <div className="rv" style={{ marginBottom: 44 }}>
          <p className="pill t-amber eyebrow">Pour qui</p>
          <h2 id="pub-t" className="h2">
            Les organisations que nous accompagnons
          </h2>
        </div>
        <div className="grid cibles" style={{ '--min': '480px' } as CSSProperties}>
          <article className="card rv t-blue">
            <div className="ic">
              <Icon name="bouclier-coeur" stroke="var(--blue)" trace />
            </div>
            <h3>Mutuelles</h3>
            <p>Proposer des bilans de prévention santé (BPS) aux entreprises clientes.</p>
          </article>
          <article className="card rv t-amber">
            <div className="ic">
              <Icon name="immeubles" stroke="var(--amber-line)" trace />
            </div>
            <h3>Grands groupes</h3>
            <ul className="blist">
              <li>
                <span>
                  <strong>Groupes hôteliers</strong> : téléconsultations pour leurs clients francophones à l’international
                </span>
              </li>
              <li>
                <span>
                  <strong>Entreprises</strong> : prévention santé pour leurs salariés
                </span>
              </li>
            </ul>
          </article>
          <article className="card rv t-teal">
            <div className="ic">
              <Icon name="stethoscope" stroke="var(--teal-text)" trace />
            </div>
            <h3>Professionnels de santé</h3>
            <p>CPTS, MSP, groupes médicaux.</p>
          </article>
          <article className="card rv t-coral">
            <div className="ic">
              <Icon name="institution" stroke="var(--coral-text)" trace />
            </div>
            <h3>Collectivités &amp; institutionnels</h3>
            <p>Mairies, communautés de communes, établissements pénitentiaires, etc.</p>
          </article>
        </div>
      </section>

      <section className="clip on-blue methode" aria-labelledby="app-t">
        <div
          className="blob"
          aria-hidden="true"
          style={{ left: -120, bottom: -140, width: 340, height: 340, border: '2px solid rgba(245,179,53,0.6)' }}
        ></div>
        <div className="wrap rel" style={{ paddingBlock: 'clamp(72px, 9vw, 110px)' }}>
          <div className="rv methode-head">
            <div style={{ maxWidth: 680 }}>
              <h2 id="app-t" className="h2" style={{ marginBottom: 14 }}>
                Une méthode en quatre étapes
              </h2>
              <p style={{ fontSize: 19, lineHeight: '1.6' }}>
                De la conception à l’évaluation, chaque parcours est documenté, mesuré et amélioré.
              </p>
            </div>
            <Link className="btn btn-amber" href={ROUTES.methode}>
              Détail de la méthode
            </Link>
          </div>
          <ol className="rv grid" style={{ '--min': '220px', gap: 16 } as CSSProperties}>
            {ETAPES.map((e, i) => (
              <li key={i} className="etape">
                <span className="etape-n" style={{ background: e.bg, color: e.fg }}>
                  {i + 1}
                </span>
                <p>{e.titre}</p>
              </li>
            ))}
          </ol>
          <p className="rv agnostic">Agnosticisme technologique : TeleDok adopte la technologie du client.</p>
        </div>
      </section>

      <section id="contact-part" className="bg-cream clip" aria-labelledby="cf-t">
        <div
          className="blob"
          aria-hidden="true"
          style={{ right: -160, bottom: -160, width: 420, height: 420, background: 'var(--amber-soft)' }}
        ></div>
        <div className="wrap sec rel contact">
          <div className="rv" style={{ flex: '1 1 320px', minWidth: '0' }}>
            <p className="pill t-coral eyebrow">Contact</p>
            <h2 id="cf-t" className="h2" style={{ marginBottom: 20 }}>
              Échanger sur votre projet
            </h2>
            <p style={{ lineHeight: '1.65' }}>Les champs marqués d’un astérisque sont obligatoires.</p>
          </div>
          <div className="rv form-card" style={{ flex: '1.5 1 560px', minWidth: '0' }}>
            <ContactForm prefix="p" labelledBy="cf-t" />
          </div>
        </div>
      </section>
    </PageShell>
  )
}
