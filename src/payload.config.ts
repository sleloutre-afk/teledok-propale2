import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fr } from '@payloadcms/translations/languages/fr'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Publications } from './collections/Publications'
import { Realisations } from './collections/Realisations'
import { Valeurs } from './globals/Valeurs'
import { Coordonnees } from './globals/Coordonnees'
import { resendEmailAdapter } from './lib/payloadEmailAdapter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseURI = process.env.DATABASE_URI || ''
// Production : Postgres. Local : SQLite (voir .env.example).
const usePostgres = databaseURI.startsWith('postgres')

export default buildConfig({
  // Back-office : https://<domaine>/BO — doit correspondre au dossier
  // src/app/(payload)/BO.
  routes: { admin: '/BO' },
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— TeleDok BO',
    },
    components: {
      graphics: {
        Icon: '/src/components/admin/AdminIcon#AdminIcon',
        Logo: '/src/components/admin/AdminLogo#AdminLogo',
      },
      beforeNavLinks: [
        // Lien de retour au tableau de bord, en haut de la nav latérale.
        '/src/components/admin/DashboardLink#DashboardLink',
        // Barre latérale ouverte par défaut (Payload la referme sinon sur tout écran ≤ 1440px).
        '/src/components/admin/DefaultOpenNav#DefaultOpenNav',
      ],
    },
  },
  i18n: {
    supportedLanguages: { fr },
    fallbackLanguage: 'fr',
    // La même page sert à la première connexion d'un compte invité et au
    // mot de passe oublié : le titre par défaut ne convenait qu'au second cas.
    translations: {
      fr: { authentication: { resetPassword: 'Créez ou réinitialisez votre mot de passe' } },
    },
  },
  // Ordre = ordre des entrées dans la nav latérale. Le site est en français
  // uniquement : pas de champs traduits.
  collections: [Publications, Realisations, Media, Users],
  globals: [Valeurs, Coordonnees],
  editor: lexicalEditor(),
  // E-mails du BO (invitation, mot de passe oublié) envoyés via Resend.
  email: resendEmailAdapter,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: usePostgres
    ? postgresAdapter({
        // DATABASE_POOL_MAX : à réduire sur une base limitée en connexions (offre « dev » de Clever Cloud).
        pool: { connectionString: databaseURI, max: Number(process.env.DATABASE_POOL_MAX) || 3 },
        // Les changements de schéma passent par des migrations versionnées
        // (src/migrations), jamais par le « push » interactif de Payload.
        push: false,
        migrationDir: path.resolve(dirname, 'migrations'),
      })
    : sqliteAdapter({ client: { url: databaseURI } }),
  sharp,
  cors: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3085'].filter(Boolean),
  plugins: [
    // En production, les fichiers uploadés partent sur un bucket S3 ;
    // sans configuration S3 (local), ils restent dans ./media.
    s3Storage({
      enabled: Boolean(process.env.S3_BUCKET),
      collections: { media: true },
      bucket: process.env.S3_BUCKET || '',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true,
      },
    }),
  ],
})
