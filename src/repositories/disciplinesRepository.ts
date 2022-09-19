import { prisma } from "../database";
import { DisciplineData } from "../types/disciplineType";

export async function findById(id: number) {
  return prisma.disciplines.findUnique({
    where: { id },
  });
}

export async function findEverything() {
  return prisma.disciplines.findMany();
}

export async function findByName(name: string) {
  return prisma.disciplines.findUnique({
    where: { name },
  });
}

export async function insertDiscipline(discipline: DisciplineData) {
  return prisma.disciplines.create({
    data: discipline,
  });
}
