import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PageShell } from '@/components/PageShell'
import { Crumb } from '@/components/Crumb'
import { More } from '@/components/More'
import { Ph } from '@/components/Ph'
import { getRealisations } from '@/lib/content'
import { cx } from '@/lib/cx'
import { pageMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

// Régénérée au plus toutes les 60 s (une partie des contenus vient du BO).
export const revalidate = 60

export const metadata: Metadata = pageMetadata(
  '/realisations',
  'Réalisations | TeleDok',
  'Parcours de bilan de prévention, téléconsultation de soins primaires assistée : pour chaque opération, le contexte, le rôle de TeleDok et les résultats de l’évaluation.',
)

export default async function Page() {
  const realisations = await getRealisations()

  return (
    <PageShell page="pg-realisations" current="realisations">
      <section className="bg-cream clip" aria-labelledby="hero-t">
        <div
          className="blob"
          aria-hidden="true"
          style={{ left: -140, top: -140, width: 380, height: 380, background: 'var(--peach)' }}
        ></div>
        <div
          className="blob blob--dot"
          aria-hidden="true"
          style={{ right: 220, bottom: 80, width: 22, height: 22, background: 'var(--teal)' }}
        ></div>
        <div className="wrap phero rel">
          <Crumb label="Réalisations" />
          <p className="hero-in pill t-teal">
            <span className="pill__dot" aria-hidden="true"></span>Réalisations
          </p>
          <h1 id="hero-t" className="hero-in2 h1">
            Des parcours conçus, déployés et évalués
          </h1>
          <p className="hero-in3 phero-lead" style={{ marginTop: 24, maxWidth: 760, fontSize: 'clamp(19px, 1.8vw, 22px)' }}>
            Pour chaque opération : le contexte, le rôle de TeleDok et les résultats de l’évaluation.
          </p>
        </div>
      </section>

      <div className="wrap cas-list">
        {realisations.map((cas, i) => (
          <section key={cas.id} aria-labelledby={`cas-${cas.id}-t`}>
            <article className={cx('cas rv', `t-${cas.tone}`, { 'cas--rev': i % 2 === 1 })}>
              {cas.image ? (
                <Image
                  className="cas-ph cas-img"
                  src={cas.image.src}
                  alt={cas.image.alt}
                  width={cas.image.width ?? 1200}
                  height={cas.image.height ?? 900}
                  sizes="(min-width: 1000px) 560px, 100vw"
                />
              ) : (
                <Ph className="cas-ph" tag="Photographie ou vidéo réelle attendue" text={cas.imageBrief} />
              )}
              <div className="cas-b">
                <p className="pill cas-theme">{cas.theme}</p>
                <h2 id={`cas-${cas.id}-t`} className="h2 cas-t">
                  {cas.title}
                </h2>
                {cas.tags.length > 0 && (
                  <ul className="pills cas-tags" aria-label={cas.tagsLabel}>
                    {cas.tags.map((tag, i) => (
                      <li key={i} className="pill pill--light">
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
                <dl>
                  {(
                    [
                      ['Contexte', cas.contexte],
                      ['Rôle de TeleDok', cas.role],
                      ['Résultat et évaluation', cas.resultat],
                    ] as const
                  ).map(([label, texte], i) => (
                    <div key={i}>
                      <dt>{label}</dt>
                      <dd>{texte ?? <span className="todo">[À rédiger avec TeleDok]</span>}</dd>
                    </div>
                  ))}
                </dl>
                {cas.linkToRecherche && (
                  <More href={ROUTES.recherche} fg className="cas-more">
                    Travaux de recherche associés
                  </More>
                )}
              </div>
            </article>
          </section>
        ))}
      </div>

      <section className="wrap" style={{ paddingBlock: 'clamp(80px, 10vw, 120px)' }} aria-label="Orientation">
        <div className="cta cta--row t-amber rv">
          <div
            className="blob"
            aria-hidden="true"
            style={{ right: -60, top: -80, width: 220, height: 220, background: 'var(--peach)' }}
          ></div>
          <div>
            <h2 className="h2 h2--sm">Vous êtes une organisation ?</h2>
            <p>Déployer des parcours de téléconsultation rigoureux et évalués, au service de vos publics.</p>
          </div>
          <Link className="btn btn-primary" href={ROUTES.partenaires}>
            Devenir partenaire
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
