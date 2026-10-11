import type { ReactNode } from 'react'

/** Fin de titre soulignée d'un trait ambre tracé à la main. */
export function Uline({ children }: { children: ReactNode }) {
  return (
    <span className="uline-w uline-w--nowrap">
      {children}
      <svg className="uline" aria-hidden="true" viewBox="0 0 300 14" preserveAspectRatio="none">
        <path pathLength="1" d="M3 9 C 80 2, 180 2, 297 7" fill="none" stroke="#F5B335" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </span>
  )
}
