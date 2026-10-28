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
    linkedin: "https://www.linkedin.com/in/jamesmvuye1",
    github: "https://github.com/Jamesmvuye",
    whatsapp: "243990519095", // numéro international sans + ni espaces
    email: "jamesmvuye@gmail.com",
  } as Record<"linkedin" | "github" | "whatsapp" | "email", string>,

  /**
   * Page de vente de la formation QGIS. Vide = bouton masqué.
   * L'ancienne adresse (https://www.learnmore-data.com/24c1004c) renvoyait une erreur 404 le 2026-10-28 :
   * renseigner ici la bonne URL pour réactiver les boutons « Découvrir la formation » / « Voir la formation QGIS ».
   */
  trainingUrl: "",

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
    // Codes ISO ; le nom de la langue est affiché dans la langue du visiteur. Niveau (facultatif) : level: "..."
    languages: [{ code: "fr" }, { code: "en" }, { code: "es" }, { code: "de" }] as { code: string; level?: string }[],
    education: [] as { title: string; org: string; year?: string }[],
    certifications: [] as { title: string; org: string; year?: string; url?: string }[],
  },
} as const;

