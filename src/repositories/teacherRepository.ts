import { prisma } from "../database";
import { TeacherData } from "../types/teacherType";

export async function findById(id: number) {
  return prisma.teachers.findUnique({
    where: { id },
  });
}

export async function findByName(name: string) {
  return prisma.teachers.findUnique({
    where: {
      name,
    },
  });
}

export async function findEverything() {
  return prisma.teachers.findMany({
    select: {
      name: true,
      teacherDisciplines: {
        select: {
          disciplines: { select: { name: true } },
          tests: {
            select: {
              name: true,
              categories: { select: { name: true } },
            },
          },
        },
        where: { tests: { some: { id: { not: undefined } } } },
      },
    },
  });
}

export async function insertTeacher(teacher: TeacherData) {
  return prisma.teachers.create({
    data: teacher,
  });
}
