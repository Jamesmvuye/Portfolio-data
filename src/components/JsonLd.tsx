/** Données structurées schema.org. Le contenu est entièrement maîtrisé (pas d'entrée utilisateur) ; "<" est échappé par précaution. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
