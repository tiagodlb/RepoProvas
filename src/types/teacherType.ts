import { Teachers } from "@prisma/client";

export type TeacherData = Omit<Teachers, "id">
