'use client'

import { useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { fields, validators, type Errors, type FormKind, type Values } from '@/lib/forms'
import { ROUTES } from '@/lib/site'
import { Icon } from './Icon'

const SEND_ERROR = 'L’envoi n’a pas abouti. Veuillez réessayer ultérieurement.'
const RATE_ERROR = 'Trop de demandes ont été envoyées. Veuillez patienter quelques minutes avant un nouvel envoi.'
const countError = (n: number) => (n > 1 ? `Le formulaire comporte ${n} champs à corriger.` : 'Le formulaire comporte 1 champ à corriger.')

type FieldProps = {
  name: string
  label: string
  type?: 'text' | 'email' | 'tel'
  as?: 'input' | 'textarea' | 'select'
  autoComplete?: string
  inputMode?: 'tel' | 'numeric'
  maxLength?: number
  hint?: string
  className?: string
  children?: ReactNode
}

export type SiteFormProps = {
  kind: FormKind
  /** Préfixe d'identifiant des champs (plusieurs formulaires peuvent coexister). */
  prefix: string
  labelledBy: string
  /** Affiche l'astérisque des champs obligatoires. */
  star?: boolean
  consent: string
  submitLabel: string
  doneTitle: string
  /** Message de confirmation ; reçoit le nom saisi. */
  doneText: (nom: string) => ReactNode
  resetLabel: string
  /** Mention affichée à côté du bouton d'envoi. */
  aside?: ReactNode
  /** Champs du formulaire, rendus avec le composant Field reçu en argument. */
  children: (Field: (props: FieldProps) => ReactNode) => ReactNode
}

/**
 * Formulaire du site : validation dans le navigateur (mêmes règles que le
 * serveur, src/lib/forms.ts), champ piège anti-spam, envoi à /api/<kind> et
 * message de confirmation. Sans JavaScript, le formulaire est envoyé tel
 * quel au même point d'entrée, qui répond par une page simple.
 */
export function SiteForm({
  kind,
  prefix,
  labelledBy,
  star = false,
  consent,
  submitLabel,
  doneTitle,
  doneText,
  resetLabel,
  aside,
  children,
}: SiteFormProps) {
  const keys = fields[kind]
  const validate = validators[kind]
  const blank = (): Values => Object.fromEntries(keys.map((k) => [k, k === 'rgpd' ? false : '']))

  const [values, setValues] = useState<Values>(blank)
  const [errors, setErrors] = useState<Errors>({})
  // Après une première tentative, les erreurs se mettent à jour au fil de la saisie.
  const [tried, setTried] = useState(false)
  const [sending, setSending] = useState(false)
  const [failure, setFailure] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)
  const alertRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)

  const focusField = (key: string | undefined) => {
    if (key) setTimeout(() => (formRef.current?.elements.namedItem(key) as HTMLElement | null)?.focus(), 30)
  }

  const setField = (key: string, value: string | boolean) => {
    const next = { ...values, [key]: value }
    setValues(next)
    if (tried) setErrors(validate(next))
    setFailure(null)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTried(true)
    setFailure(null)
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return focusField(keys.find((k) => found[k]))

    const fail = (message: string) => {
      setFailure(message)
      setTimeout(() => alertRef.current?.focus(), 30)
    }
    setSending(true)
    try {
      const site = (formRef.current?.elements.namedItem('site') as HTMLInputElement | null)?.value ?? ''
      const res = await fetch(`/api/${kind}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, site }),
      })
      const body = await res.json().catch(() => null)
      if (res.ok && body?.ok) {
        setSent(true)
        setTimeout(() => doneRef.current?.focus(), 30)
      } else if (res.status === 422 && body?.errors) {
        setErrors(body.errors)
        focusField(keys.find((k) => body.errors[k]) ?? keys[0])
      } else {
        fail(res.status === 429 ? RATE_ERROR : SEND_ERROR)
      }
    } catch {
      fail(SEND_ERROR)
    } finally {
      setSending(false)
    }
  }

  function reset() {
    setValues(blank())
    setErrors({})
    setTried(false)
    setFailure(null)
    setSent(false)
    focusField(keys[0])
  }

  const errorCount = keys.filter((k) => errors[k]).length
  const alert = failure ?? (errorCount ? countError(errorCount) : null)

  const Field = ({
    name,
    label,
    type = 'text',
    as = 'input',
    autoComplete,
    inputMode,
    maxLength,
    hint,
    className,
    children: options,
  }: FieldProps) => {
    const id = `${prefix}-${name}`
    const errId = `${prefix}e-${name}`
    const hintId = hint ? `${prefix}h-${name}` : undefined
    const common = {
      className: 'fld',
      id,
      name,
      required: true,
      value: String(values[name] ?? ''),
      'aria-invalid': Boolean(errors[name]),
      'aria-describedby': [hintId, errors[name] ? errId : undefined].filter(Boolean).join(' ') || undefined,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setField(name, e.target.value),
    }
    return (
      <div className={className}>
        <label className="lbl" htmlFor={id}>
          {label}
          {star && ' *'}
        </label>
        {as === 'textarea' && <textarea {...common} maxLength={maxLength} />}
        {as === 'select' && <select {...common}>{options}</select>}
        {as === 'input' && <input {...common} type={type} autoComplete={autoComplete} inputMode={inputMode} maxLength={maxLength} />}
        {hint && (
          <p className="hint" id={hintId}>
            {hint}
          </p>
        )}
        {errors[name] && (
          <p className="err" id={errId}>
            {errors[name]}
          </p>
        )}
      </div>
    )
  }

  if (sent) {
    return (
      <div className="form-done" role="status">
        <span className="form-done-ic">
          <Icon name="valide" size={40} width={2} />
        </span>
        <h3 tabIndex={-1} ref={doneRef}>
          {doneTitle}
        </h3>
        <p>{doneText(String(values.nom ?? '').trim())}</p>
        <button type="button" className="btn btn-secondary" onClick={reset}>
          {resetLabel}
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} action={`/api/${kind}`} method="post" noValidate aria-labelledby={labelledBy} onSubmit={handleSubmit}>
      <div className="form-alert" role="alert" tabIndex={-1} ref={alertRef} hidden={!alert}>
        {alert}
      </div>
      {children(Field)}
      {/* Champ piège anti-spam : hors écran, ignoré par les utilisateurs. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${prefix}-site`}>Site web</label>
        <input id={`${prefix}-site`} name="site" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="consent">
        <div className="consent-row">
          <input
            className="chk"
            id={`${prefix}-rgpd`}
            name="rgpd"
            type="checkbox"
            required
            checked={values.rgpd === true}
            onChange={(e) => setField('rgpd', e.target.checked)}
            aria-invalid={Boolean(errors.rgpd)}
            aria-describedby={errors.rgpd ? `${prefix}e-rgpd` : undefined}
          />
          <label htmlFor={`${prefix}-rgpd`}>
            {consent} [Durée de conservation et responsable de traitement à préciser.] Pour en savoir plus et exercer vos droits, consultez
            notre <Link href={ROUTES.confidentialite}>politique de confidentialité</Link>.
          </label>
        </div>
        {errors.rgpd && (
          <p className="err" id={`${prefix}e-rgpd`}>
            {errors.rgpd}
          </p>
        )}
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary btn--lg" disabled={sending}>
          {submitLabel}
        </button>
        {aside}
      </div>
    </form>
  )
}
