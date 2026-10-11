import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { PageShell } from '@/components/PageShell'
import { Crumb } from '@/components/Crumb'
import { Orientation } from '@/components/Orientation'
import { Ph } from '@/components/Ph'
import { Uline } from '@/components/Uline'
import { pictos } from '@/data/pictos'
import { getValeurs } from '@/lib/content'
import { cx } from '@/lib/cx'
import { pageMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

// Régénérée au plus toutes les 60 s (une partie des contenus vient du BO).
export const revalidate = 60

export const metadata: Metadata = pageMetadata(
  '/teledok',
  'Qui sommes-nous | TeleDok',
  'TeleDok est un regroupement de médecins généralistes et spécialistes, associés à des professionnels paramédicaux, au service de parcours de soins innovants.',
)

const DIRECTION: { nom: string; role: string; pending?: boolean }[] = [
  { nom: 'Dr Stéphane Illouz', role: 'Co-fondateur' },
  { nom: 'Matthieu Guillotin', role: 'Directeur général' },
  // Second co-fondateur : à confirmer par TeleDok.
  { nom: '[Nom à préciser]', role: '[Second co-fondateur, à confirmer]', pending: true },
]

export default async function Page() {
  const valeurs = await getValeurs()

  return (
    <PageShell page="pg-teledok" current="teledok">
      <section className="bg-cream clip" aria-labelledby="hero-t">
        <div
          className="blob"
          aria-hidden="true"
          style={{ right: -160, top: -120, width: 420, height: 420, background: 'var(--amber-soft)' }}
        ></div>
        <div
          className="blob blob--dot"
          aria-hidden="true"
          style={{ right: 260, bottom: 90, width: 22, height: 22, background: 'var(--coral)' }}
        ></div>
        <div className="wrap phero rel" style={{ paddingBottom: 'clamp(80px, 9vw, 130px)' }}>
          <Crumb label="TeleDok" />
          <p className="hero-in pill t-coral">
            <span className="pill__dot" aria-hidden="true"></span>Qui sommes-nous
          </p>
          <h1 id="hero-t" className="hero-in2 h1 hero-h1">
            TeleDok est né d’une conviction : la télémédecine n’a de valeur que si elle préserve la qualité du soin et{' '}
            <Uline>l’indépendance de ceux qui l’exercent.</Uline>
          </h1>
        </div>
      </section>

      <section className="wrap sec split" style={{ gap: 72 }} aria-labelledby="qui-t">
        <div className="rv" style={{ flex: '1 1 460px' }}>
          <h2 id="qui-t" className="h2" style={{ marginBottom: 24 }}>
            Un regroupement de praticiens
          </h2>
          <p style={{ marginBottom: 32, fontSize: 20, lineHeight: '1.7' }}>
            TeleDok est un regroupement de médecins généralistes et spécialistes, associés à des professionnels paramédicaux, au service de
            parcours de soins innovants. Son modèle repose sur l’indépendance médicale et l’exigence de qualité.
          </p>
          <ul className="pills">
            <li className="pill pill--light t-blue">Médecins généralistes</li>
            <li className="pill pill--light t-teal">Médecins spécialistes</li>
            <li className="pill pill--light t-coral">Infirmier·e·s et paramédicaux</li>
          </ul>
        </div>
        <div className="rv ph-w" style={{ flex: '1 1 420px' }}>
          <div
            className="blob floaty"
            aria-hidden="true"
            style={{ left: -34, top: -34, width: 170, height: 170, background: 'var(--amber)' }}
          ></div>
          <div
            className="blob floaty"
            aria-hidden="true"
            style={{ right: -24, bottom: -26, width: 110, height: 110, background: 'var(--teal)', opacity: 0.85 }}
          ></div>
          <Ph
            tag="Photographie réelle attendue"
            text="Équipe médicale et paramédicale de TeleDok : portrait de groupe en situation."
            ratio="5 / 4"
          />
        </div>
      </section>

      <section id="valeurs" className="bg-cream" aria-labelledby="val-t">
        <div className="wrap sec">
          <div className="rv" style={{ textAlign: 'center', marginBottom: 56 }}>
            <p className="pill t-teal eyebrow">Ce qui nous engage</p>
            <h2 id="val-t" className="h2">
              Nos valeurs
            </h2>
          </div>
          <ul className="grid">
            {valeurs.map((v, i) => (
              <li key={i} className={cx('card rv valeur', `t-${v.tone}`)}>
                <div className="ic">
                  <svg
                    viewBox="0 0 120 120"
                    width="70"
                    height="70"
                    fill="none"
                    stroke="#0D628F"
                    strokeWidth={pictos[i].strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: pictos[i].body }}
                  />
                </div>
                <h3>{v.titre}</h3>
                <p>{v.texte ?? <span className="todo">[1 à 2 lignes à rédiger avec TeleDok]</span>}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap sec" aria-labelledby="ind-t">
        <div className="clip on-blue rv indep">
          <div
            className="blob"
            aria-hidden="true"
            style={{ right: -90, bottom: -90, width: 300, height: 300, background: 'var(--amber)' }}
          ></div>
          <div
            className="blob blob--dot"
            aria-hidden="true"
            style={{ right: 230, bottom: 170, width: 22, height: 22, background: 'var(--coral)' }}
          ></div>
          <div className="rel" style={{ maxWidth: 780 }}>
            <p className="pill indep-pill">Argument clé</p>
            <h2 id="ind-t" className="h2" style={{ marginBottom: 24 }}>
              Un modèle indépendant
            </h2>
            <p className="indep-txt">
              TeleDok ne vend rien aux médecins et ne prélève aucune part sur leurs consultations. Son indépendance médicale et éthique est
              la condition de la confiance.
            </p>
            <Link className="btn btn-amber" href={ROUTES.medecins}>
              Conditions d’exercice des médecins
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream" aria-labelledby="gov-t">
        <div className="wrap sec">
          <div className="rv" style={{ marginBottom: 48 }}>
            <p className="pill t-blue eyebrow">Gouvernance</p>
            <h2 id="gov-t" className="h2">
              Direction
            </h2>
          </div>
          <ul className="grid" style={{ '--min': '280px', gap: 24 } as CSSProperties}>
            {DIRECTION.map((d, i) => (
              <li key={i} className={cx('card rv portrait', { 'portrait--pending': d.pending })}>
                <Ph tag="Portrait réel" ratio="1 / 1" className="portrait-ph" />
                <h3>{d.nom}</h3>
                <p>{d.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap sec" aria-label="Orientation">
        <div className="grid" style={{ '--min': '320px', gap: 24 } as CSSProperties}>
          <Orientation />
        </div>
      </section>
    </PageShell>
  )
}
