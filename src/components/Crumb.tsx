import Link from 'next/link'
import { ROUTES } from '@/lib/site'

export function Crumb({ label }: { label: string }) {
  return (
    <nav className="crumb" aria-label="Fil d’Ariane">
      <Link href={ROUTES.accueil}>Accueil</Link> <span aria-hidden="true">›</span> <span aria-current="page">{label}</span>
    </nav>
  )
}
