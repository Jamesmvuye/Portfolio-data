import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Toutes les routes sauf API, fichiers internes Next et ressources statiques (avec extension).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
