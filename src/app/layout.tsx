import type { ReactNode } from "react";

// Le layout racine est volontairement minimal : <html> et <body> sont rendus
// dans src/app/[locale]/layout.tsx afin de fixer l'attribut lang selon la langue.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
