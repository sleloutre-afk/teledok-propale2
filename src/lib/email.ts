import { Resend } from 'resend'
import { structures, type FormKind } from './forms'

/** Expéditeur des notifications ; le domaine doit être vérifié dans le compte Resend. */
const FROM = process.env.EMAIL_FROM || 'TeleDok <noreply@teledok.fr>'

const LABELS: Record<string, string> = {
  org: 'Organisation',
  type: 'Type de structure',
  nom: 'Nom',
  prenom: 'Prénom',
  fonction: 'Fonction',
  email: 'E-mail',
  tel: 'Téléphone',
  rpps: 'Numéro RPPS',
  msg: 'Message',
}

type SendResult = { ok: true } | { ok: false; error: string }

const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').slice(0, 120)

/**
 * Notification interne envoyée à TeleDok à chaque formulaire reçu
 * (candidature médecin ou demande de contact), via Resend. Les demandes ne
 * sont pas conservées par le site : l'e-mail en est la seule trace.
 *
 * Sans RESEND_API_KEY ou sans destinataire, rien n'est envoyé : en
 * développement, le message est écrit dans la console ; en production,
 * l'échec est renvoyé au formulaire pour qu'aucune demande ne soit perdue en
 * silence.
 */
export async function sendFormNotification(kind: FormKind, data: Record<string, string>): Promise<SendResult> {
  const subject =
    kind === 'candidature'
      ? `[TeleDok] Candidature médecin — ${oneLine(`${data.nom} ${data.prenom}`)}`
      : `[TeleDok] Demande de contact — ${oneLine(data.org)}`

  const lines = Object.entries(data).map(([key, raw]) => {
    const value = key === 'type' ? (structures[raw as keyof typeof structures] ?? raw) : raw
    return key === 'msg' ? `\n${LABELS[key]} :\n${value}` : `${LABELS[key] ?? key} : ${value}`
  })
  const text = [
    kind === 'candidature' ? 'Nouvelle candidature reçue depuis le site.' : 'Nouvelle demande de contact reçue depuis le site.',
    '',
    ...lines,
    '',
    'Consentement RGPD recueilli via la case à cocher du formulaire.',
  ].join('\n')

  const to = kind === 'candidature' ? process.env.CANDIDATURES_EMAIL : process.env.CONTACT_EMAIL

  if (!process.env.RESEND_API_KEY || !to) {
    if (process.env.NODE_ENV !== 'production') {
      console.info(`[email] (dev) Notification non envoyée — RESEND_API_KEY ou destinataire manquant.\nObjet : ${subject}\n${text}`)
      return { ok: true }
    }
    return { ok: false, error: 'RESEND_API_KEY ou destinataire (CANDIDATURES_EMAIL / CONTACT_EMAIL) manquant' }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({ from: FROM, to, replyTo: data.email, subject, text })
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Erreur inconnue' }
  }
}
