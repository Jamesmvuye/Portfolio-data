# Portfolio de James Mvuye — LEARNMORE-DATA

Portfolio professionnel de Data Analyst / Data Instructor / consultant en recherche : projets documentés, tableaux de bord réalisés, services et contact, en **4 langues** (français par défaut, anglais, espagnol, allemand).

> Le site ne présente que des réalisations réelles de James Mvuye (captures d'écran et fichiers). Aucun diplôme, certification, client, témoignage, tarif ou résultat n'est inventé. Les traductions EN/ES/DE sont des traductions de travail, **non certifiées**.

## Technologies

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · next-intl 4 (i18n) · Zod (validation) · next-themes (mode sombre) · lucide-react.
Pas de base de données ni d'authentification : le contenu est dans le dépôt (`src/content`, `messages`, `public`).

## Prérequis

Node.js ≥ 20.9 (testé avec 24) et npm.

## Installation et commandes

```bash
npm install
npm run dev          # développement : http://localhost:3000 (redirige vers /fr)
npm run build        # build de production
npm run start        # sert le build
npm run lint         # ESLint
npm run typecheck    # TypeScript
npm run check        # cohérence du contenu : clés de traduction identiques dans les 4 langues, fichiers de projets présents
```

Copier `.env.example` vers `.env.local` pour les variables d'environnement (jamais committé).

## Structure

```
messages/{fr,en,es,de}.json     Tous les textes de l'interface (une clé = 4 traductions)
src/config/site.ts              Identité, liens de contact, photo, profil (langues, formations, certifications)
src/content/projects/*.ts       Un fichier par projet (métadonnées + textes dans chaque langue)
src/content/projects/index.ts   Registre central des projets
src/app/[locale]/…              Pages : accueil, projects, projects/[slug], dashboards, about, services, contact
src/app/api/contact/route.ts    Envoi du formulaire (Resend)
src/components/                 Composants (Hero, ProjectCard, FileList…)
public/projects/<slug>/…        Fichiers téléchargeables de chaque projet (data/, code/)
public/images/                  Photo professionnelle
scripts/                        check-content.mjs
```

Routes : `/fr`, `/en`, `/es`, `/de` puis `/projects`, `/projects/[slug]`, `/dashboards`, `/about`, `/services`, `/contact`. Le sélecteur de langue conserve la page courante.

## Remplacer la photo

Déposer votre photo dans **`public/images/james-mvuye.jpg`** (ou `.jpeg`, `.png`, `.webp`), idéalement un portrait 4:5 d'au moins 800 × 1000 px. Elle apparaît dans le hero (à droite sur ordinateur, sous le texte sur mobile) et sur la page À propos. Tant que le fichier est absent, un emplacement neutre s'affiche (aucun faux portrait).

## Modifier les liens de contact

Dans `src/config/site.ts` : `links.linkedin`, `links.github`, `links.whatsapp` (numéro international sans `+`) et `links.email` sont renseignés. Un lien vide s'afficherait comme « Lien à venir » désactivé : aucun faux lien.
`profile.languages` (français, anglais, espagnol, allemand) est renseigné, sans niveau (ajouter `level` si souhaité). Compléter `profile.education` et `profile.certifications` avec des éléments **vérifiés** (la page À propos affiche sinon un encart « à compléter »).

## Formulaire de contact

La route `POST /api/contact` valide les champs (Zod), rejette les origines étrangères, applique un champ piège anti-spam et une limite de 5 envois / 10 min / IP (en mémoire, au mieux en serverless), puis envoie un e-mail en **texte brut** via [Resend](https://resend.com).
Variables requises (Vercel → Settings → Environment Variables, ou `.env.local`) :

```
RESEND_API_KEY=…            # clé API Resend (secret)
CONTACT_TO_EMAIL=…          # adresse qui reçoit les messages (ex. jamesmvuye@gmail.com)
CONTACT_FROM_EMAIL=…        # expéditeur vérifié dans Resend
```

Tant qu'elles ne sont pas toutes définies, le formulaire répond « non configuré » (HTTP 503) et invite à utiliser les autres liens : il ne simule jamais un envoi réussi.

## Ajouter un projet

1. Copier un fichier de `src/content/projects/` (ex. `powerbi-kinmarche-ventes.ts`) et le renommer avec le **slug** du projet (le nom de fichier doit être égal au slug).
2. Remplir les métadonnées : `domain` (`health | business | stats | gis | other`), `tools`, `date` (`AAAA-MM`), `github` (URL du dépôt ; vide = bouton désactivé), `sources`, `related`, `cover` (image optionnelle, sinon un visuel est généré).
3. Rédiger les textes dans `translations` : `fr`, `en`, `es`, `de`. Si une langue manque, la page s'affiche dans la langue par défaut avec un avis clair, sans erreur (canonical et hreflang adaptés).
4. Déposer les fichiers dans `public/projects/<slug>/data/` (CSV, XLSX, PDF…) et `public/projects/<slug>/code/` (`.py`, `.R`, `.sql`), puis les déclarer dans `files` (`downloadable: false` pour un fichier consultable seulement). Un fichier absent s'affiche « indisponible », jamais comme un lien actif.
5. Importer le projet dans `src/content/projects/index.ts` (liste `projects`).
6. Lancer `npm run check` puis `npm run build`.

**Fichiers Office / Power BI :** déposer le `.xlsx` ou `.pbix` dans `public/projects/<slug>/data/` (noms sans espaces) et déclarer `kind: "xlsx"` ou `"pbix"`. Un `.pbix` contient **toutes** les données chargées : ne le publier que si ces données sont publiables. Les fichiers à ne pas publier vont dans `private-files/` (ignoré par Git, hors de `public/`).

⚠ Ne publiez jamais de données personnelles identifiantes, de données médicales confidentielles ou de fichiers dont vous ne détenez pas les droits.

## Gérer les traductions

- Textes d'interface : `messages/<langue>.json`. Toute clé ajoutée doit exister dans les 4 fichiers : `npm run check` le vérifie.
- Contenu des projets : bloc `translations` de chaque projet.
- Ajouter une langue : `src/i18n/routing.ts` (`locales`, `localeLabels`), un fichier `messages/<code>.json`, et les traductions des projets.


## Déploiement (GitHub + Vercel)

Le dossier est un dépôt Git **indépendant** (initialisé dans ce dossier). Aucun dépôt distant n'est configuré.

1. Créer un dépôt GitHub vide sous le bon compte, puis :
   ```bash
   git remote add origin https://github.com/<compte>/<depot>.git
   git push -u origin main
   ```
2. Sur [vercel.com](https://vercel.com) : *Add New → Project*, importer le dépôt (preset Next.js détecté automatiquement).
3. Définir les variables d'environnement (voir `.env.example`) : `NEXT_PUBLIC_SITE_URL` (URL finale, ex. `https://nom.vercel.app`, utilisée par sitemap, Open Graph et canonical ; à défaut l'URL de production Vercel est utilisée) et les 3 variables du formulaire.
4. Déployer. L'URL publique sera de la forme `https://<nom-du-projet>.vercel.app` selon la disponibilité du nom.

## Sécurité

En-têtes HTTP (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy, nosniff) dans `next.config.ts` ; aucune clé dans le code (`.env*` ignorés par Git) ; formulaire validé côté serveur ; liens externes en `rel="noopener noreferrer"`. La CSP autorise `'unsafe-inline'` pour les scripts car Next.js injecte des scripts d'hydratation sans nonce.
