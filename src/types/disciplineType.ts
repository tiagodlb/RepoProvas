import { Disciplines } from "@prisma/client";

export type DisciplineData = Omit<Disciplines, "id">
