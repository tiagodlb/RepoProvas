import { Terms } from "@prisma/client";

export type TermsData = Omit<Terms, "id">
