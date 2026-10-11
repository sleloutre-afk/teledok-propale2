import Image from 'next/image'
import Link from 'next/link'
import logoBlanc from '@/assets/logo-teledok-blanc.png'
import { getCoordonnees } from '@/lib/content'
import { ROUTES } from '@/lib/site'

const LOGO_HEIGHT = 30
const LOGO_WIDTH = Math.round((LOGO_HEIGHT * logoBlanc.width) / logoBlanc.height)

/** Pied de page. La dernière colonne s'adresse aux médecins, ou aux organisations sur la page Médecins. */
export async function Footer({ cta = 'medecins' }: { cta?: 'medecins' | 'partenaires' }) {
  const coordonnees = await getCoordonnees()

  return (
    <footer className="ftr on-blue">
      <div className="wrap ftr-in">
        <div className="ftr-cols">
          <div>
            <Image className="ftr-logo" src={logoBlanc} alt="TeleDok" width={LOGO_WIDTH} height={LOGO_HEIGHT} style={{ height: LOGO_HEIGHT, width: 'auto' }} />
            <p>Regroupement de médecins généralistes et spécialistes, associés à des professionnels paramédicaux.</p>
          </div>
          <nav aria-label="Plan du site">
            <p className="label ftr-t">Le site</p>
            <ul>
              <li>
                <Link href={ROUTES.teledok}>TeleDok</Link>
              </li>
              <li>
                <Link href={ROUTES.methode}>Notre méthode</Link>
              </li>
              <li>
                <Link href={ROUTES.recherche}>Recherche &amp; publications</Link>
              </li>
              <li>
                <Link href={ROUTES.realisations}>Réalisations</Link>
              </li>
              <li>
                <Link href={ROUTES.partenaires}>Partenaires</Link>
              </li>
            </ul>
          </nav>
          <div>
            <p className="label ftr-t">Contact</p>
            <p className="ftr-adr">
              {coordonnees.adresse ?? '[Adresse postale]'}
              <br />
              {coordonnees.email ? <a href={`mailto:${coordonnees.email}`}>{coordonnees.email}</a> : '[E-mail de contact]'}
            </p>
            <Link className="ftr-contact" href={ROUTES.contact}>
              Nous contacter
            </Link>
          </div>
          {cta === 'medecins' ? (
            <div>
              <p className="label ftr-t">Médecins</p>
              <p className="ftr-cta">Candidature réservée aux professionnels de santé inscrits au RPPS.</p>
              <Link className="btn btn-amber" href={ROUTES.medecins}>
                Rejoindre TeleDok
              </Link>
            </div>
          ) : (
            <div>
              <p className="label ftr-t">Organisations</p>
              <p className="ftr-cta">Mutuelles, entreprises, professionnels de santé, collectivités.</p>
              <Link className="btn btn-amber" href={ROUTES.partenaires}>
                Devenir partenaire
              </Link>
            </div>
          )}
        </div>
        <div className="ftr-bottom">
          <p>© {new Date().getFullYear()} TeleDok</p>
          <p className="ftr-legal">
            <Link href={ROUTES.mentions}>Mentions légales</Link>
            <Link href={ROUTES.confidentialite}>Politique de confidentialité</Link>
            <Link href={ROUTES.contact}>Contact</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
