import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/PageShell'
import { ROUTES } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Page introuvable | TeleDok',
  description: 'La page demandée n’existe pas ou a été déplacée.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <PageShell>
      <section className="bg-cream">
        <div className="wrap sec" style={{ maxWidth: 760, textAlign: 'center' }}>
          <p className="pill t-coral eyebrow">Erreur 404</p>
          <h1 className="h1" style={{ marginBottom: 20 }}>
            Page introuvable
          </h1>
          <p style={{ marginBottom: 36 }}>La page demandée n’existe pas ou a été déplacée.</p>
          <Link className="btn btn-primary" href={ROUTES.accueil}>
            Retour à l’accueil
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
