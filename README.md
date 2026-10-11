# TeleDok — site internet (proposition 2)

Site multi-pages développé à partir des maquettes de `../maquettes`, en Next.js 15 / React 19, avec un
back-office Payload CMS pour les publications, les réalisations, les textes des valeurs et les
coordonnées (même socle que les sites Capitello et Doxamed). Site en français uniquement.

## Lancer le site

```bash
cp .env.example .env   # renseigner PAYLOAD_SECRET (openssl rand -hex 32)
npm install
npm run seed           # première fois : crée la base locale et les contenus repris des maquettes
npm run dev
```

Le site tourne sur **http://localhost:3085**, le back-office sur **http://localhost:3085/BO** (le premier
compte créé sur l'écran d'accueil du BO est super administrateur).

`npm run build && npm start` sert la version de production ; la base doit exister (`npm run seed`) avant
la compilation, les pages étant pré-rendues avec les contenus du BO.

## Organisation

| Dossier | Contenu |
| --- | --- |
| `src/app/(site)` | Les 10 pages et la page 404. Chaque page pose son habillage avec `PageShell`. |
| `src/components` | En-tête, pied de page, icônes, formulaires (`SiteForm`, `CandidatureForm`, `ContactForm`), filtre des travaux (`Travaux`). |
| `src/components/SiteBehaviors.tsx` | Le JavaScript du site : en-tête au défilement, menu des écrans étroits, apparition au défilement, compteurs, étapes de la méthode, araignée des valeurs, vidéo d'ouverture. |
| `src/styles/site.css` | Palette (variables CSS), composants, puis styles de chaque page sous sa classe `.pg-…`. |
| `src/data` | Icônes, pictos des valeurs, thèmes des publications, titres des six valeurs. |
| `src/collections`, `src/globals`, `src/payload.config.ts` | Le back-office. |
| `src/lib/content.ts` | Lecture des contenus du BO par les pages. |
| `src/lib/forms.ts`, `src/lib/formEndpoint.ts`, `src/lib/email.ts` | Formulaires : règles de validation (communes au navigateur et au serveur), réception, notification par e-mail. |
| `src/app/api/candidature`, `src/app/api/contact` | Points d'entrée des deux formulaires. |
| `src/middleware.ts` | Adresse officielle, captcha devant le BO, règle de mot de passe. |
| `src/migrations` | Schéma PostgreSQL de production. |
| `scripts/seed.ts` | Contenus de départ (8 publications, 2 réalisations). Idempotent. |

## Back-office

- **Recherche & publications** : titre, type, thème, date, auteurs, PDF. Le thème fixe la couleur, le
  picto et le filtre de la carte. Deux cases mettent une publication en avant sur l'accueil et sur la
  page Médecins. L'ordre d'affichage est celui de la liste (glisser-déposer).
- **Réalisations** : une fiche par étude de cas (rubrique, couleur, étiquettes, contexte, rôle de
  TeleDok, résultat, photographie).
- **Textes des valeurs** : une à deux lignes pour chacune des six valeurs.
- **Coordonnées** : adresse, téléphone, e-mail (pied de page et page Contact).
- Tant qu'un contenu est vide, le site affiche la mention entre crochets correspondante.
- Brouillon ou publication immédiate ; une fiche publiée apparaît sur le site dès l'enregistrement.
- **Accès, comptes, mots de passe, e-mails** : mêmes règles que sur le site Capitello (captcha
  Turnstile devant `/BO` si les deux clés sont renseignées, invitation par e-mail, mot de passe de
  10 caractères avec majuscule, chiffre et caractère spécial, verrouillage après 10 échecs).

## Formulaires

Candidature médecin (Nom, Prénom, E-mail, Téléphone, RPPS à 11 chiffres) et contact (Organisation, Type
de structure, Nom, Fonction, E-mail, Téléphone, Message). Validation dans le navigateur et sur le
serveur, case RGPD, champ piège anti-spam, 5 envois au plus par adresse IP et par tranche de
10 minutes, message de confirmation. Chaque demande est transmise par e-mail via Resend
(`RESEND_API_KEY`, `EMAIL_FROM`) à `CANDIDATURES_EMAIL` ou `CONTACT_EMAIL` ; elle n'est pas conservée
par le site. Sans clé ou sans destinataire : en local, le message s'affiche dans la console du serveur ;
en production, le formulaire signale un échec d'envoi.

## Vidéo d'ouverture

L'accueil lit en boucle `public/videos/hero.mp4`, avec `hero.jpg` comme image d'attente (chemins dans
`HERO_VIDEO`, `src/lib/site.ts`). Ce sont des dérivés de la source `../assets/videos/hero.mp4` (14,5 Mo) :
H.264 720p allégé à 2 Mo, sans son, lisible dès le début du téléchargement. Pour remplacer la vidéo :

```bash
ffmpeg -i ../assets/videos/hero.mp4 -an -c:v libx264 -preset slow -crf 25 -pix_fmt yuv420p -movflags +faststart public/videos/hero.mp4
ffmpeg -i public/videos/hero.mp4 -frames:v 1 -q:v 5 public/videos/hero.jpg
```

La lecture est lancée par le script du site (pas d'`autoplay`) : elle n'a pas lieu si le visiteur a demandé
moins d'animations, et un bouton lecture / pause reste disponible. Le voile bleu est renforcé derrière les
textes et la navigation ; le contraste a été vérifié sur toute la durée de la vidéo.

## Contenus à fournir

Tout ce qui apparaît entre crochets `[…]` sur le site est en attente de TeleDok (voir `../CLAUDE.md`,
« Points ouverts »). Hors back-office, restent à renseigner dans le code :

- photographies des pages : remplacer les composants `<Ph>` par des images ;
- direction (second co-fondateur) : `src/app/(site)/teledok/page.tsx` ;
- pages légales, mentions RGPD des formulaires, délais de recontact ;
- icône du site (favicon) ; adresses e-mail destinataires des formulaires ; nom de domaine.

## Démonstration sur Vercel

Le dépôt se déploie tel quel (racine du projet = racine du dépôt), à condition de fournir une base
PostgreSQL : les pages sont pré-rendues avec les contenus du back-office, la compilation échoue sans elle.

1. Créer une base PostgreSQL (Neon ou Supabase, depuis l'onglet Storage de Vercel par exemple).
2. Variables d'environnement du projet Vercel : `DATABASE_URI` (chaîne de connexion `postgres://…`),
   `PAYLOAD_SECRET` (`openssl rand -hex 32`) et `NEXT_PUBLIC_SITE_URL` (adresse de la démonstration,
   sans « / » final). Les autres sont facultatives (voir `.env.example`).
3. Commande de build : `npx payload migrate && npm run build` (crée les tables, puis compile).
4. Contenus de départ, une fois, depuis ce poste : `DATABASE_URI="postgres://…" npm run seed`, puis
   relancer un déploiement pour que les pages les reprennent.

Sous une adresse `*.vercel.app`, le site interdit son indexation. Sans `RESEND_API_KEY`, les formulaires
signalent un échec d'envoi ; sans stockage S3, les fichiers déposés dans le back-office ne sont pas conservés.

## Hébergement (Clever Cloud)

Même dispositif que les sites Capitello et Doxamed : application Node, add-on PostgreSQL, add-on Cellar
(bucket S3 pour les fichiers du BO). L'application reste à créer et à lier (`clever link` génère
`.clever.json`) ; les variables d'environnement sont décrites dans `.env.example`.

- **Déploiement** : `CC_POST_BUILD_HOOK` applique les migrations puis compile le site
  (`npx payload migrate && npm run build`).
- **Schéma de la base** : toute modification des collections demande une migration —
  `npx payload migrate:create <nom>` avec `DATABASE_URI` pointant sur une base PostgreSQL, puis
  versionner `src/migrations`. La migration initiale a été vérifiée sur une base PostgreSQL locale
  (création des tables, contenus de départ, compilation).
- **Contenus de départ** : `npm run seed` avec les variables de production.
- **Adresses** : l'adresse officielle est celle de `NEXT_PUBLIC_SITE_URL`. Les autres domaines déclarés
  sur l'application y sont redirigés ; sous l'adresse technique `*.cleverapps.io`, le site reste
  consultable mais interdit son indexation (`robots.txt` et en-tête `X-Robots-Tag`).
