import { TeacherDisciplines } from "@prisma/client";

export type GetTeacherDisciplinesData = Omit<TeacherDisciplines, "id">
