import type { ReactNode } from 'react'
import Link from 'next/link'
import { cx } from '@/lib/cx'
import { Icon } from './Icon'

type Props = {
  href: string
  /** Reprend la couleur de texte du ton courant (--fg). */
  fg?: boolean
  className?: string
  children: ReactNode
}

/** Lien « en savoir plus », suivi d'une flèche. */
export function More({ href, fg = false, className, children }: Props) {
  return (
    <Link className={cx('more', className, { 'more--fg': fg })} href={href}>
      {children} <Icon name="fleche" size={20} />
    </Link>
  )
}
