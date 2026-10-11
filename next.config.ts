import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  // Retire l'en-tête « X-Powered-By: Next.js ».
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Fichiers de la bibliothèque du BO (PDF, visuels), servis par
        // l'application depuis le stockage S3 : mis en cache par le navigateur.
        source: '/api/media/file/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
      {
        // Vidéo d'ouverture et son image d'attente (public/videos) : cache modéré,
        // le fichier pouvant être remplacé sous le même nom.
        source: '/videos/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
      {
        // En-têtes de sécurité, valables partout (site, /BO, /api).
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
      {
        // Le back-office, son contrôle anti-robots et l'API ne doivent jamais être indexés.
        source: '/:path(BO|bo-verify|api)/:rest*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/:path(BO|bo-verify|api)',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        // Politique de sécurité du contenu, sur le site public uniquement (le
        // BO de Payload demande des règles plus permissives). Seul tiers
        // autorisé : le captcha Cloudflare Turnstile de /bo-verify.
        source: '/((?!BO|api).*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // 'unsafe-eval' en développement seulement : le rechargement à chaud de Next en a besoin.
              `script-src 'self' 'unsafe-inline' ${process.env.NODE_ENV === 'development' ? "'unsafe-eval' " : ''}https://challenges.cloudflare.com`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "media-src 'self' https:",
              "frame-src 'self' https://challenges.cloudflare.com",
              "connect-src 'self' https://challenges.cloudflare.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig)
