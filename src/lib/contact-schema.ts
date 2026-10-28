import { z } from "zod";

export const requestTypes = ["service", "quote", "collab", "other"] as const;
export const serviceChoices = ["analysis", "dashboards", "stats", "research", "health", "gis", "training"] as const;

/** Les messages d'erreur sont des CLÉS de traduction (contact.errors.*), pas du texte. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "name" }).max(100, { message: "name" }),
  email: z.string().trim().max(200, { message: "email" }).email({ message: "email" }),
  organization: z.string().trim().max(150).optional().default(""),
  type: z.enum(requestTypes, { message: "type" }),
  service: z.union([z.enum(serviceChoices), z.literal("")]).optional().default(""),
  message: z.string().trim().min(20, { message: "message" }).max(4000, { message: "message" }),
  consent: z.literal(true, { message: "consent" }),
  /** Champ piège (honeypot) : invisible pour les humains, doit rester vide. */
  website: z.string().max(200).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
