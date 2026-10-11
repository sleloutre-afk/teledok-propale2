'use client'

import { useState } from 'react'
import { THEMES, type ThemeId } from '@/data/themes'
import type { PublicationView } from '@/lib/content'
import { formatMonth } from '@/lib/dates'
import { cx } from '@/lib/cx'
import { Icon } from './Icon'

const FILTERS: { id: ThemeId | 'all'; label: string }[] = [
  { id: 'all', label: 'Tous les travaux' },
  ...(Object.keys(THEMES) as ThemeId[]).map((id) => ({ id, label: THEMES[id].label })),
]

/** Bibliothèque des travaux de recherche, filtrable par thème. */
export function Travaux({ publications }: { publications: PublicationView[] }) {
  const [theme, setTheme] = useState<ThemeId | 'all'>('all')
  const count = publications.filter((p) => theme === 'all' || p.theme === theme).length

  return (
    <section id="travaux" className="bg-cream travaux" aria-labelledby="trav-t">
      <div className="wrap travaux-in">
        <div className="rv travaux-head">
          <div>
            <p className="pill t-coral" style={{ marginBottom: 18 }}>
              Bibliothèque
            </p>
            <h2 id="trav-t" className="h2">
              Travaux
            </h2>
          </div>
          <p className="muted" style={{ fontSize: 15 }} aria-live="polite">
            {count} {count > 1 ? 'travaux' : 'travail'}
          </p>
        </div>
        <div className="rv chips" style={{ marginBottom: 40 }} role="group" aria-label="Filtrer par thème">
          <span className="label muted" style={{ marginRight: 8 }}>
            Filtres
          </span>
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={cx('chip', { 'chip-on': filter.id === theme })}
              aria-pressed={filter.id === theme}
              onClick={() => setTheme(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <ul className="ncards">
          {publications.map((p) => {
            const th = THEMES[p.theme]
            const body = (
              <>
                <span className="ncard-v" aria-hidden="true">
                  <span className="ncard-dot" style={{ background: th.dot }} />
                  <span className="ncard-dot2" style={{ borderColor: th.dot }} />
                  <Icon className="ncard-ic" name={th.icon} size={72} width={1.5} stroke="var(--fg)" />
                </span>
                <span className="ncard-b">
                  <span className="ncard-meta">
                    <span className="pill ncard-type">{p.type ?? '[Type]'}</span>
                    <span className="muted" style={{ fontSize: 14 }}>
                      {p.date ? formatMonth(p.date) : '[Date]'}
                    </span>
                  </span>
                  <span className="ncard-t">{p.title}</span>
                  <span className="muted" style={{ fontSize: 15 }}>
                    {th.label} · {p.authors ?? '[Auteurs]'}
                  </span>
                  {p.pdf ? (
                    <span className="ncard-cta">
                      Télécharger le PDF <Icon name="fleche" size={18} />
                    </span>
                  ) : (
                    <span className="ncard-cta ncard-cta--todo">
                      <span className="todo">[PDF à fournir]</span>
                    </span>
                  )}
                </span>
              </>
            )
            return (
              <li key={p.id} hidden={theme !== 'all' && p.theme !== theme}>
                {p.pdf ? (
                  <a className={`ncard t-${th.tone}`} href={p.pdf} download>
                    {body}
                  </a>
                ) : (
                  <div className={`ncard t-${th.tone}`}>{body}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
