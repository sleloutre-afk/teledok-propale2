import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { pageMetadata } from '@/lib/seo'

// Régénérée au plus toutes les 60 s (une partie des contenus vient du BO).
export const revalidate = 60

export const metadata: Metadata = pageMetadata(
  '/politique-de-confidentialite',
  'Politique de confidentialité | TeleDok',
  'Politique de confidentialité du site TeleDok : données collectées via les formulaires, finalités, durées de conservation et exercice de vos droits.',
)

const sommaire = [
  { id: 'responsable', label: 'Responsable du traitement' },
  { id: 'donnees', label: 'Données collectées' },
  { id: 'finalites', label: 'Finalités et bases légales' },
  { id: 'destinataires', label: 'Destinataires' },
  { id: 'conservation', label: 'Durées de conservation' },
  { id: 'hebergement', label: 'Hébergement et sécurité' },
  { id: 'droits', label: 'Vos droits' },
  { id: 'cookies', label: 'Cookies et traceurs' },
]

export default function Page() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      sommaire={sommaire}
      notice="Cette page reprend la structure des informations à fournir au titre du RGPD. Les éléments entre crochets sont à fournir par TeleDok, et l’ensemble est à faire valider par un juriste ou un DPO avant publication."
    >
      <h2 id="responsable">Responsable du traitement</h2>
      <ul>
        <li>
          Responsable du traitement : <span className="todo">[dénomination, adresse]</span>
        </li>
        <li>
          Délégué à la protection des données (le cas échéant) : <span className="todo">[coordonnées]</span>
        </li>
      </ul>

      <h2 id="donnees">Données collectées</h2>
      <p>Les données sont collectées uniquement via les formulaires du site.</p>
      <div className="collecte">
        <div className="t-blue">
          <p className="collecte-t">Candidature médecin</p>
          <p>Nom, prénom, e-mail, téléphone, numéro RPPS.</p>
        </div>
        <div className="t-teal">
          <p className="collecte-t">Contact partenaire / général</p>
          <p>Organisation, type de structure, nom, fonction, e-mail, téléphone, message.</p>
        </div>
      </div>

      <h2 id="finalites">Finalités et bases légales</h2>
      <ul>
        <li>
          Traitement des candidatures de médecins, base légale : <span className="todo">[à déterminer]</span>
        </li>
        <li>
          Réponse aux demandes de contact, base légale : <span className="todo">[à déterminer]</span>
        </li>
      </ul>

      <h2 id="destinataires">Destinataires</h2>
      <p>
        <span className="todo">[Services internes et éventuels sous-traitants destinataires des données]</span>
      </p>

      <h2 id="conservation">Durées de conservation</h2>
      <ul>
        <li>
          Candidatures : <span className="todo">[durée]</span>
        </li>
        <li>
          Demandes de contact : <span className="todo">[durée]</span>
        </li>
      </ul>

      <h2 id="hebergement">Hébergement et sécurité</h2>
      <p>
        Hébergement des données : <span className="todo">[prestataire et localisation des serveurs, à confirmer]</span>
      </p>
      <p>
        Transferts hors de l’Union européenne : <span className="todo">[aucun / à préciser]</span>
      </p>

      <h2 id="droits">Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation du traitement, d’opposition et
        de portabilité de vos données.
      </p>
      <p>
        Pour exercer ces droits : <span className="todo">[adresse e-mail ou postale dédiée]</span>
      </p>
      <p>
        Vous pouvez également introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr/">cnil.fr</a>).
      </p>

      <h2 id="cookies">Cookies et traceurs</h2>
      <p>
        <span className="todo">
          [Liste des cookies et traceurs utilisés et modalités de consentement, à établir selon les outils retenus (mesure d’audience,
          vidéo…)]
        </span>
      </p>
    </LegalPage>
  )
}
