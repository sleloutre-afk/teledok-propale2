import { THEMES, type Tone } from '@/data/themes'
import type { PublicationView } from '@/lib/content'
import { Icon } from './Icon'

type Props = {
  pub: PublicationView
  tone?: Tone
  /** Affiche la ligne « Type · Année » au-dessus du titre. */
  meta?: boolean
}

/** Une publication en ligne, avec sa pastille de téléchargement (accueil, page Médecins). */
export function Pub({ pub, tone = THEMES[pub.theme].tone, meta = false }: Props) {
  return (
    <li className={`pub t-${tone}`}>
      <div>
        {meta && (
          <p className="label pub-meta">
            {pub.type ?? '[Type]'} · {pub.date ? new Date(pub.date).getUTCFullYear() : '[Année]'}
          </p>
        )}
        <p className="pub-t">{pub.title}</p>
      </div>
      {pub.pdf ? (
        <a className="pdf" href={pub.pdf} download aria-label={`Télécharger le PDF : ${pub.title}`}>
          <Icon name="telecharger" size={20} width={1.7} />
        </a>
      ) : (
        <span className="pdf pdf--todo" role="img" aria-label="PDF à fournir" title="PDF à fournir">
          <Icon name="telecharger" size={20} width={1.7} />
        </span>
      )}
    </li>
  )
}
