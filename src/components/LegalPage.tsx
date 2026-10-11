import type { ReactNode } from 'react'
import { Crumb } from './Crumb'
import { PageShell } from './PageShell'

type Props = {
  title: string
  sommaire: { id: string; label: string }[]
  /** Avertissement « Modèle à compléter », en tête de page. */
  notice: ReactNode
  children: ReactNode
}

/** Gabarit des pages légales : sommaire à gauche, texte à droite. */
export function LegalPage({ title, sommaire, notice, children }: Props) {
  return (
    <PageShell page="pg-legal">
      <section className="bg-cream" aria-labelledby="hero-t">
        <div className="wrap phero" style={{ paddingBottom: 'clamp(56px, 7vw, 80px)' }}>
          <Crumb label={title} />
          <h1 id="hero-t" className="hero-in2 h1" style={{ marginBottom: 16, fontSize: 'clamp(34px, 4vw, 48px)', letterSpacing: 0 }}>
            {title}
          </h1>
          <p className="muted" style={{ fontSize: 15 }}>
            Dernière mise à jour : <span className="todo">[date]</span>
          </p>
        </div>
      </section>

      <section className="wrap body">
        <nav className="toc" aria-label="Sommaire">
          <p className="toc-t">Sommaire</p>
          {sommaire.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <article className="legal">
          <div className="notice">
            <p>
              <strong>Modèle à compléter.</strong> {notice}
            </p>
          </div>
          {children}
        </article>
      </section>
    </PageShell>
  )
}
