import { prisma } from "../database.js";

export async function findById(id: number) {
  return prisma.terms.findUnique({
    where: { id },
  });
}

export async function findByNumber(number: number) {
  return prisma.terms.findUnique({
    where: {
      number,
    },
  });
}

export async function findEverything() {
  return prisma.terms.findMany({
    select: {
      number: true,
      disciplines: {
        select: {
          name: true,
          teacherDisciplines: {
            select: {
              teachers: {
                select: {
                  name: true,
                },
              },
              tests: {
                select: {
                  name: true,
                  categories: {
                    select: { name: true },
                  },
                },
                orderBy: { categoryId: "asc" },
              },
            },
            where: {
              tests: { some: { id: { not: undefined } } },
            },
          },
        },
      },
    },
    orderBy: { number: "asc" },
  });
}
