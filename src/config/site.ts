/**
 * Configuration centrale du site : identité, liens de contact, photo.
 * C'est ICI qu'il faut modifier les liens (LinkedIn, GitHub, WhatsApp, e-mail).
 * Une valeur vide ("") désactive proprement le bouton correspondant : aucun faux lien n'est affiché.
 */
export const siteConfig = {
  name: "James Mvuye",
  brand: "LEARNMORE-DATA",
  // NEXT_PUBLIC_SITE_URL en priorité ; sinon l'URL de production fournie automatiquement par Vercel ; sinon local.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),

  /** Liens de contact. Format attendu : URL complète, sauf email (adresse) et whatsapp (numéro international sans + ni espaces, ex. "243XXXXXXXXX"). */
  links: {
    linkedin: "", // ex. "https://www.linkedin.com/in/votre-profil"
    github: "", // ex. "https://github.com/votre-compte"
    whatsapp: "", // ex. "243XXXXXXXXX"
    email: "", // ex. "contact@votre-domaine.com"
  } as Record<"linkedin" | "github" | "whatsapp" | "email", string>,

  /** Page de vente de la formation QGIS (page existante, vérifiée). */
  trainingUrl: "https://www.learnmore-data.com/24c1004c",

  /** Photo professionnelle : déposer le fichier dans public/images/ avec l'un de ces noms. */
  photo: {
    basename: "james-mvuye",
    extensions: ["jpg", "jpeg", "png", "webp"] as const,
  },

  /**
   * Éléments de profil à fournir par James (rien n'est inventé).
   * Tant que les listes sont vides, la page À propos affiche un encart « à compléter ».
   */
  profile: {
    languages: [] as { code: string; level?: string }[],
    education: [] as { title: string; org: string; year?: string }[],
    certifications: [] as { title: string; org: string; year?: string; url?: string }[],
  },
} as const;

