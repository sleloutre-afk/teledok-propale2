import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { PageShell } from '@/components/PageShell'
import { Crumb } from '@/components/Crumb'
import { Icon } from '@/components/Icon'
import { More } from '@/components/More'
import { Ph } from '@/components/Ph'
import { Uline } from '@/components/Uline'
import { cx } from '@/lib/cx'
import { pageMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

// Régénérée au plus toutes les 60 s (une partie des contenus vient du BO).
export const revalidate = 60

export const metadata: Metadata = pageMetadata(
  '/notre-methode',
  'Notre méthode | TeleDok',
  'De la conception à l’évaluation, chaque parcours est documenté, mesuré et amélioré : conception sur-mesure, mise en œuvre, évaluation systématique, amélioration itérative.',
)

const CHIPS = ['Conception', 'Mise en œuvre', 'Évaluation', 'Amélioration']

export default function Page() {
  return (
    <PageShell page="pg-methode" current="methode">
      <section className="bg-cream clip" aria-labelledby="hero-t">
        <div
          className="blob"
          aria-hidden="true"
          style={{ left: -150, bottom: -170, width: 400, height: 400, background: 'var(--mint)' }}
        ></div>
        <div className="wrap phero rel">
          <Crumb label="Notre méthode" />
          <div className="split">
            <div style={{ flex: '1 1 520px' }}>
              <p className="hero-in pill t-teal">
                <span className="pill__dot" aria-hidden="true"></span>Notre méthode
              </p>
              <h1 id="hero-t" className="hero-in2 h1">
                De la conception à l’évaluation, chaque parcours est documenté, <Uline>mesuré et amélioré.</Uline>
              </h1>
            </div>
            <div className="hero-in3 ph-w" style={{ flex: '1 1 420px' }}>
              <div
                className="blob floaty"
                aria-hidden="true"
                style={{ right: -30, top: -30, width: 150, height: 150, background: 'var(--amber)' }}
              ></div>
              <Ph
                tag="Vidéo réelle attendue"
                text="Déroulé d’un parcours sur le terrain ; sous-titrée, lecture à la demande."
                ratio="16 / 10"
              >
                <svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="#8A5A2B" strokeWidth="1.6" aria-hidden="true">
                  <circle cx="32" cy="32" r="30" />
                  <path d="M26 21 L45 32 L26 43 Z" strokeLinejoin="round" />
                </svg>
              </Ph>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 'clamp(80px, 10vw, 120px)' }} aria-labelledby="dir-t">
        <div className="clip on-blue rv direction">
          <div
            className="blob"
            aria-hidden="true"
            style={{ right: -60, top: -60, width: 200, height: 200, border: '2px solid rgba(245,179,53,0.7)' }}
          ></div>
          <span className="direction-ic">
            <Icon name="bouclier-valide" size={42} stroke="var(--blue)" trace />
          </span>
          <div className="rel" style={{ flex: '1 1 520px', minWidth: '0' }}>
            <h2 id="dir-t">Une direction médicale et éthique indépendante</h2>
            <p>Elle encadre chacune des quatre étapes et garantit la sécurité du parcours, pour les médecins comme pour les patients.</p>
          </div>
        </div>
      </section>

      <section id="etapes" className="wrap etapes" aria-labelledby="et-t" data-steps>
        <div className="rv etapes-head">
          <div>
            <p className="pill t-amber eyebrow">Quatre étapes</p>
            <h2 id="et-t" className="h2">
              Le parcours, étape par étape
            </h2>
          </div>
          <div className="chips" role="group" aria-label="Choisir une étape">
            {CHIPS.map((c, i) => (
              <button
                key={i}
                type="button"
                className={cx('chip', { 'chip-on': i === 0 })}
                aria-pressed={i === 0 ? 'true' : 'false'}
                data-step-chip
              >
                {i + 1} · {c}
              </button>
            ))}
          </div>
        </div>
        <div className="track" aria-hidden="true">
          <div className="track-fill" style={{ width: '25%' }}></div>
        </div>
        <ol className="steps etapes-list">
          <li className="step step--1 rv on">
            <span className="step-n">1</span>
            <h3>Conception sur-mesure du parcours</h3>
            <ul className="blist">
              <li>Analyse initiale du contexte et des enjeux du client</li>
              <li>Rédaction des protocoles et procédures</li>
              <li>Formation des praticiens à chaque parcours et aux technologies spécifiques</li>
            </ul>
            <div className="agnostic">
              <p className="agnostic-t">Agnosticisme technologique</p>
              <p className="agnostic-p">TeleDok adopte la technologie du client.</p>
            </div>
          </li>
          <li className="step t-teal rv">
            <span className="step-n">2</span>
            <h3>Mise en œuvre &amp; ressources humaines</h3>
            <ul className="blist">
              <li>Fourniture des médecins et paramédicaux nécessaires</li>
              <li>Un premier pool d’environ 50 médecins collaborant quotidiennement avec TeleDok</li>
            </ul>
            <p className="pool">
              <span className="pool-n">≈ 50</span>
              <span>médecins dans le premier pool</span>
            </p>
          </li>
          <li className="step step--3 t-amber rv">
            <span className="step-n">3</span>
            <h3>Évaluation systématique</h3>
            <ul className="blist">
              <li>Évaluation à la fois médicale et économique (apport pour la collectivité)</li>
            </ul>
            <ol className="moments" aria-label="Moments de l’évaluation">
              <li>
                <span className="moment-dot moment-dot--1" aria-hidden="true"></span>Dès la conception
              </li>
              <li>
                <span className="moment-dot moment-dot--2" aria-hidden="true"></span>Pendant le parcours
              </li>
              <li>
                <span className="moment-dot moment-dot--3" aria-hidden="true"></span>À la fin du parcours
              </li>
            </ol>
          </li>
          <li className="step t-coral rv">
            <span className="step-n">4</span>
            <h3>Amélioration itérative &amp; recherche</h3>
            <ul className="blist">
              <li>Les enseignements de chaque opération nourrissent l’amélioration des parcours futurs</li>
              <li>… et alimentent la recherche scientifique</li>
            </ul>
            <More href={ROUTES.recherche} fg className="etapes-more">
              Recherche &amp; publications
            </More>
          </li>
        </ol>
        <p className="cycle-note rv" style={{ marginTop: 40 }}>
          <Icon name="cycle" size={34} stroke="var(--coral)" trace />
          Chaque cycle d’évaluation alimente la conception des parcours suivants.
        </p>
      </section>

      <section className="bg-cream" aria-label="Orientation">
        <div className="wrap sec">
          <div className="grid" style={{ '--min': '320px', gap: 24 } as CSSProperties}>
            <div className="cta rv">
              <div
                className="blob"
                aria-hidden="true"
                style={{ right: -60, top: -60, width: 190, height: 190, background: 'var(--mint)' }}
              ></div>
              <h2 className="h2 h2--sm">Voir la méthode appliquée</h2>
              <p>Parcours de bilan de prévention, téléconsultation de soins primaires assistée.</p>
              <Link className="btn btn-secondary" href={ROUTES.realisations}>
                Nos réalisations
              </Link>
            </div>
            <div className="cta t-amber rv">
              <div
                className="blob"
                aria-hidden="true"
                style={{ right: -60, top: -60, width: 190, height: 190, background: 'var(--peach)' }}
              ></div>
              <h2 className="h2 h2--sm">Vous êtes une organisation ?</h2>
              <p>Déployer des parcours de téléconsultation rigoureux et évalués, au service de vos publics.</p>
              <Link className="btn btn-primary" href={ROUTES.partenaires}>
                Devenir partenaire
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
