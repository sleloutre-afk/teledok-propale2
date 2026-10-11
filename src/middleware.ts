import { NextResponse, type NextRequest } from 'next/server'
import { BO_GATE_COOKIE, isValidBoGateCookie } from './lib/boGate'
import { isTurnstileConfigured } from './lib/turnstile'
import { passwordStrengthError } from './lib/validation'

/**
 * Contrôle anti-robots devant tout le back-office : sans le cookie
 * `bo_gate` (src/lib/boGate.ts), on passe d'abord par le captcha de
 * /bo-verify avant de voir la page de connexion ou quoi que ce soit sous
 * /BO. C'est une couche de plus devant la connexion de Payload (et son
 * verrouillage après 10 échecs, voir Users.ts), pas un remplacement.
 */
async function checkBoGate(request: NextRequest): Promise<Response | null> {
  // Sans clés Turnstile (développement local), le BO reste accessible directement.
  if (!isTurnstileConfigured()) return null
  const cookie = request.cookies.get(BO_GATE_COOKIE)?.value
  if (await isValidBoGateCookie(cookie)) return null

  const url = request.nextUrl.clone()
  url.pathname = '/bo-verify'
  url.search = ''
  url.searchParams.set('redirect', request.nextUrl.pathname)
  return NextResponse.redirect(url)
}

/** Hôte officiel du site, tiré de NEXT_PUBLIC_SITE_URL. */
const CANONICAL = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3085')

/**
 * Vrai pour un nom de domaine secondaire à rediriger vers l'adresse
 * officielle. Ne sont pas redirigés : l'adresse officielle elle-même,
 * les adresses techniques *.cleverapps.io et *.vercel.app (préproduction, démonstration) et, tant que le site
 * n'a pas de domaine officiel (développement local), aucune adresse.
 */
/** Adresses techniques des hébergeurs (préproduction, démonstration) : jamais redirigées, jamais indexées. */
const TECHNICAL_HOSTS = ['.cleverapps.io', '.vercel.app']

function isAliasHost(host: string | null): boolean {
  if (!host || CANONICAL.hostname === 'localhost') return false
  return host !== CANONICAL.host && !TECHNICAL_HOSTS.some((suffix) => host.endsWith(suffix))
}

/**
 * Toute autre adresse servant le site (l'adresse technique *.cleverapps.io
 * de Clever Cloud, par exemple) ne doit pas être indexée : elle ferait
 * doublon avec le site officiel dans les moteurs de recherche.
 */
function withHostPolicy(request: NextRequest, response: NextResponse): NextResponse {
  if (request.headers.get('host') !== CANONICAL.host) response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return response
}

/** Requêtes par lesquelles un mot de passe de compte BO est défini ou changé. */
function setsPassword(request: NextRequest): boolean {
  const { pathname } = request.nextUrl
  const method = (request.headers.get('x-payload-http-method-override') || request.method).toUpperCase()
  // Lien d'invitation / mot de passe oublié, et création du tout premier compte.
  if (request.method === 'POST' && ['/api/users/reset-password', '/api/users/first-register'].includes(pathname)) {
    return true
  }
  // Changement de mot de passe depuis la fiche d'un compte.
  return method === 'PATCH' && /^\/api\/users\/[^/]+$/.test(pathname)
}

/**
 * Applique la règle de mot de passe (src/lib/validation.ts) avant que la
 * requête n'atteigne Payload, qui hache le mot de passe sans le valider.
 * Le formulaire du BO envoie du `multipart/form-data` dont les données
 * sont une chaîne JSON sous le champ `_payload` ; l'API accepte aussi du
 * JSON direct. La requête est clonée : Payload reçoit l'original intact.
 */
async function checkPasswordStrength(request: NextRequest): Promise<Response | null> {
  let data: unknown
  try {
    const formData = await request.clone().formData()
    const payloadField = formData.get('_payload')
    data = typeof payloadField === 'string' ? JSON.parse(payloadField) : null
  } catch {
    try {
      data = await request.clone().json()
    } catch {
      return null // Corps illisible : Payload produira lui-même la bonne erreur.
    }
  }
  const password = (data as { password?: unknown } | null)?.password
  if (typeof password !== 'string') return null

  const error = passwordStrengthError(password)
  if (!error) return null

  // `message` au premier niveau : sans lui, la notification « Soumission… »
  // du formulaire Payload ne se referme jamais. L'entrée `data.errors`
  // affiche l'infobulle rouge sous le champ.
  return NextResponse.json(
    { errors: [{ message: error, data: { errors: [{ path: 'password', message: error }] } }] },
    { status: 400 },
  )
}

/**
 * - Adresse officielle : les autres noms de domaine déclarés y sont
 *   redirigés, et aucune indexation sous une autre adresse que celle de
 *   NEXT_PUBLIC_SITE_URL.
 * - Back-office : captcha devant /BO et règle de mot de passe.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Une seule adresse officielle par page : les autres noms de domaine
  // déclarés sur l'application Clever Cloud sont redirigés vers elle, chemin conservé.
  if (isAliasHost(request.headers.get('host'))) {
    return NextResponse.redirect(new URL(pathname + request.nextUrl.search, CANONICAL.origin), 301)
  }

  if (pathname.startsWith('/api/')) {
    if (setsPassword(request)) return (await checkPasswordStrength(request)) ?? NextResponse.next()
    return NextResponse.next()
  }

  // Page du captcha elle-même.
  if (pathname === '/bo-verify') return NextResponse.next()

  // /BO/reset/<jeton> (lien de l'e-mail d'invitation ou de mot de passe
  // oublié) est dispensé de captcha : le jeton, à usage unique et valable
  // 1 heure, est déjà un secret aussi fort.
  if (pathname.startsWith('/BO/reset/')) return NextResponse.next()

  if (pathname === '/BO' || pathname.startsWith('/BO/')) {
    return (await checkBoGate(request)) ?? NextResponse.next()
  }

  return withHostPolicy(request, NextResponse.next())
}

export const config = {
  matcher: [
    // Tout sauf l'API, les fichiers internes de Next et les fichiers statiques.
    '/((?!api|_next|media|.*\\.[a-zA-Z0-9]+$).*)',
    // Exception : les requêtes de comptes, pour la règle de mot de passe.
    '/api/users/:path*',
  ],
}
