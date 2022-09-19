import { prisma } from "../database.js";

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
