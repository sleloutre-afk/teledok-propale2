import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/LegalPage'
import { pageMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

// Régénérée au plus toutes les 60 s (une partie des contenus vient du BO).
export const revalidate = 60

export const metadata: Metadata = pageMetadata(
  '/mentions-legales',
  'Mentions légales | TeleDok',
  'Mentions légales du site TeleDok : éditeur, directeur de la publication, hébergeur, propriété intellectuelle.',
)

const sommaire = [
  { id: 'editeur', label: 'Éditeur du site' },
  { id: 'publication', label: 'Directeur de la publication' },
  { id: 'hebergeur', label: 'Hébergeur' },
  { id: 'sante', label: 'Activité de santé' },
  { id: 'pi', label: 'Propriété intellectuelle' },
  { id: 'donnees', label: 'Données personnelles' },
  { id: 'credits', label: 'Crédits' },
]

export default function Page() {
  return (
    <LegalPage
      title="Mentions légales"
      sommaire={sommaire}
      notice="Les éléments entre crochets sont à fournir par TeleDok, et l’ensemble du texte est à faire valider par un juriste avant publication."
    >
      <h2 id="editeur">Éditeur du site</h2>
      <ul>
        <li>
          Dénomination sociale : <span className="todo">[à compléter]</span>
        </li>
        <li>
          Forme juridique et capital social : <span className="todo">[à compléter]</span>
        </li>
        <li>
          Siège social : <span className="todo">[adresse]</span>
        </li>
        <li>
          Immatriculation (RCS / SIREN) : <span className="todo">[à compléter]</span>
        </li>
        <li>
          N° de TVA intracommunautaire : <span className="todo">[à compléter]</span>
        </li>
        <li>
          Téléphone : <span className="todo">[à compléter]</span> ; e-mail : <span className="todo">[à compléter]</span>
        </li>
      </ul>

      <h2 id="publication">Directeur de la publication</h2>
      <p>
        <span className="todo">[Nom et qualité]</span>
      </p>

      <h2 id="hebergeur">Hébergeur</h2>
      <ul>
        <li>
          Dénomination : <span className="todo">[à compléter]</span>
        </li>
        <li>
          Adresse : <span className="todo">[à compléter]</span>
        </li>
        <li>
          Téléphone : <span className="todo">[à compléter]</span>
        </li>
        <li>
          Localisation des serveurs : <span className="todo">[à confirmer]</span>
        </li>
      </ul>

      <h2 id="sante">Activité de santé</h2>
      <p>Les informations publiées sur ce site ont une vocation informative.</p>
      <p>
        <span className="todo">
          [Mentions relatives à l’exercice d’une activité de santé et à la communication des professionnels de santé, à préciser et faire
          valider]
        </span>
      </p>

      <h2 id="pi">Propriété intellectuelle</h2>
      <p>
        <span className="todo">
          [Clause relative aux droits sur les textes, visuels, logos et documents publiés, à rédiger et faire valider]
        </span>
      </p>

      <h2 id="donnees">Données personnelles</h2>
      <p>
        Le traitement des données collectées via les formulaires du site est décrit dans la{' '}
        <Link href={ROUTES.confidentialite}>politique de confidentialité</Link>.
      </p>

      <h2 id="credits">Crédits</h2>
      <ul>
        <li>
          Photographies et vidéos : <span className="todo">[à compléter]</span>
        </li>
        <li>
          Conception et réalisation : <span className="todo">[à compléter]</span>
        </li>
      </ul>
    </LegalPage>
  )
}
