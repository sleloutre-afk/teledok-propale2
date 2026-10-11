import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/PageShell'
import { ContactForm } from '@/components/ContactForm'
import { Crumb } from '@/components/Crumb'
import { Icon } from '@/components/Icon'
import { getCoordonnees } from '@/lib/content'
import { pageMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

// Régénérée au plus toutes les 60 s (une partie des contenus vient du BO).
export const revalidate = 60

export const metadata: Metadata = pageMetadata(
  '/contact',
  'Contact | TeleDok',
  'Contacter TeleDok : coordonnées et formulaire de contact pour les organisations et les demandes générales.',
)

export default async function Page() {
  const coordonnees = await getCoordonnees()

  return (
    <PageShell page="pg-contact">
      <section className="bg-cream clip" aria-labelledby="hero-t">
        <div
          className="blob"
          aria-hidden="true"
          style={{ right: -140, top: -140, width: 380, height: 380, background: 'var(--peach)' }}
        ></div>
        <div className="wrap phero rel" style={{ paddingBottom: 'clamp(64px, 8vw, 96px)' }}>
          <Crumb label="Contact" />
          <p className="hero-in pill t-coral">
            <span className="pill__dot" aria-hidden="true"></span>Contact
          </p>
          <h1 id="hero-t" className="hero-in2 h1">
            Nous contacter
          </h1>
        </div>
      </section>

      <section className="wrap contact" aria-labelledby="cf-t">
        <aside className="rv side">
          <div className="clip on-blue side-med">
            <div
              className="blob"
              aria-hidden="true"
              style={{ right: -50, bottom: -50, width: 150, height: 150, background: 'var(--amber)' }}
            ></div>
            <h2 className="rel">Vous êtes médecin ?</h2>
            <p className="rel">La candidature se fait depuis la page dédiée, avec votre numéro RPPS.</p>
            <Link className="btn btn-amber rel" href={ROUTES.medecins}>
              Rejoindre TeleDok
            </Link>
          </div>
          <div className="side-coord">
            <h2>Coordonnées</h2>
            <ul>
              <li>
                <Icon name="adresse" size={22} width={1.7} stroke="var(--teal-text)" />
                <span style={{ whiteSpace: 'pre-line' }}>{coordonnees.adresse ?? <span className="todo">[Adresse postale]</span>}</span>
              </li>
              <li>
                <Icon name="telephone" size={22} width={1.7} stroke="var(--teal-text)" />
                <span>{coordonnees.telephone ?? <span className="todo">[Téléphone]</span>}</span>
              </li>
              <li>
                <Icon name="courriel" size={22} width={1.7} stroke="var(--teal-text)" />
                <span>
                  {coordonnees.email ? (
                    <a href={`mailto:${coordonnees.email}`}>{coordonnees.email}</a>
                  ) : (
                    <span className="todo">[E-mail de contact]</span>
                  )}
                </span>
              </li>
            </ul>
          </div>
        </aside>

        <div className="rv form-card form">
          <h2 id="cf-t" className="h2 h2--sm" style={{ marginBottom: 8 }}>
            Formulaire de contact
          </h2>
          <p className="muted" style={{ marginBottom: 28, fontSize: 16 }}>
            Les champs marqués d’un astérisque sont obligatoires.
          </p>
          <ContactForm prefix="c" labelledBy="cf-t" />
        </div>
      </section>
    </PageShell>
  )
}
