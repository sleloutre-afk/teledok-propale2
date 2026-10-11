import { NextResponse, type NextRequest } from 'next/server'
import { sendFormNotification } from './email'
import { normalize, validators, type FormKind, type Values } from './forms'
import { ROUTES } from './site'

const NO_STORE = { 'Cache-Control': 'no-store' }
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: NO_STORE })

// Limite simple par adresse IP, en mémoire : 5 envois par tranche de 10 minutes.
const WINDOW = 10 * 60 * 1000
const LIMIT = 5
const hits = new Map<string, number[]>()

function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW)
  if (recent.length >= LIMIT) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW)) hits.delete(key)
  return false
}

const escape = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!)

/** Réponse minimale lorsque le formulaire est envoyé sans JavaScript. */
function page(title: string, lines: string[], back: string, status: number) {
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${escape(title)} | TeleDok</title></head><body style="font-family:system-ui,sans-serif;color:#3C3C3C;max-width:640px;margin:15vh auto;padding:0 24px;line-height:1.6"><h1 style="color:#0D628F;font-size:28px">${escape(title)}</h1>${lines.map((l) => `<p>${escape(l)}</p>`).join('')}<p><a href="${back}" style="color:#0D628F">Revenir au site</a></p></body></html>`
  return new NextResponse(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', ...NO_STORE } })
}

/**
 * Réception d'un formulaire du site (candidature médecin ou contact) :
 * champ piège, limite d'envois, validation — mêmes règles que dans le
 * navigateur, voir forms.ts — puis notification interne par e-mail.
 */
export async function handleForm(kind: FormKind, request: NextRequest) {
  const isJson = (request.headers.get('content-type') ?? '').includes('application/json')
  const back = kind === 'candidature' ? `${ROUTES.medecins}#candidature` : ROUTES.contact
  const reply = (status: number, body: Record<string, unknown>, title: string, lines: string[]) =>
    isJson ? json(body, status) : page(title, lines, back, status)

  let raw: Record<string, unknown>
  try {
    raw = isJson ? await request.json() : Object.fromEntries(await request.formData())
  } catch {
    return reply(400, { ok: false, error: 'invalid' }, 'Requête invalide', ['Le formulaire n’a pas pu être lu.'])
  }
  if (!raw || typeof raw !== 'object') return json({ ok: false, error: 'invalid' }, 400)

  const done = () =>
    reply(200, { ok: true }, kind === 'candidature' ? 'Votre candidature a bien été transmise.' : 'Votre message a bien été transmis.', [])

  // Champ piège : rempli uniquement par les robots. On répond comme si l'envoi avait abouti.
  if (typeof raw.site === 'string' && raw.site.trim() !== '') return done()

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'inconnue'
  if (limited(ip)) {
    return reply(429, { ok: false, error: 'rate' }, 'Trop de demandes', ['Veuillez patienter quelques minutes avant un nouvel envoi.'])
  }

  const values: Values = {}
  for (const [key, value] of Object.entries(raw)) if (typeof value === 'string' || typeof value === 'boolean') values[key] = value
  // Envoi sans JavaScript : la case cochée arrive sous la forme rgpd=on.
  if (values.rgpd === 'on') values.rgpd = true

  const errors = validators[kind](values)
  if (Object.keys(errors).length) {
    return reply(422, { ok: false, errors }, 'Le formulaire comporte des champs à corriger', Object.values(errors))
  }

  const result = await sendFormNotification(kind, normalize(kind, values))
  if (!result.ok) {
    console.error(`[api/${kind}] échec envoi email:`, result.error)
    return reply(502, { ok: false, error: 'send' }, 'L’envoi n’a pas abouti', ['Veuillez réessayer ultérieurement.'])
  }
  return done()
}
