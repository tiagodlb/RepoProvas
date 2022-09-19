import { TeacherDisciplines } from "@prisma/client";
import { prisma } from "../database";

export async function findById(id: number) {
  return prisma.teacherDisciplines.findUnique({
    where: { id },
  });
}

export async function findEverything() {
  return prisma.teacherDisciplines.findMany();
}

export async function insertTeacherDiscipline(
  teacherDiscipline: TeacherDisciplines
) {
  return prisma.teacherDisciplines.create({
    data: teacherDiscipline,
  });
}
