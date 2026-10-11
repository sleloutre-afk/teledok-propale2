'use client'

import { structures } from '@/lib/forms'
import { SiteForm } from './SiteForm'

/** Contact partenaire / général (pages « Partenaires » et « Contact »). */
export function ContactForm({ prefix, labelledBy }: { prefix: string; labelledBy: string }) {
  return (
    <SiteForm
      kind="contact"
      prefix={prefix}
      labelledBy={labelledBy}
      star
      consent="J’accepte que les informations saisies soient utilisées par TeleDok pour répondre à ma demande."
      submitLabel="Envoyer le message"
      doneTitle="Votre message a bien été transmis."
      doneText={() => '[Délai et modalités de réponse à préciser par TeleDok.]'}
      resetLabel="Envoyer un autre message"
    >
      {(Field) => (
        <>
          <div className="fields">
            {Field({ name: 'org', label: 'Organisation', autoComplete: 'organization', maxLength: 200 })}
            {Field({
              name: 'type',
              label: 'Type de structure',
              as: 'select',
              children: (
                <>
                  <option value="">Sélectionner…</option>
                  {Object.entries(structures).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </>
              ),
            })}
            {Field({ name: 'nom', label: 'Nom', autoComplete: 'name', maxLength: 200 })}
            {Field({ name: 'fonction', label: 'Fonction', autoComplete: 'organization-title', maxLength: 200 })}
            {Field({ name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email', maxLength: 200 })}
            {Field({ name: 'tel', label: 'Téléphone', type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
          </div>
          {Field({ className: 'field--full', name: 'msg', label: 'Message', as: 'textarea', maxLength: 5000 })}
        </>
      )}
    </SiteForm>
  )
}
