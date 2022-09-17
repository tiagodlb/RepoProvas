import { prisma } from "../database.js";

export async function findById(id: number) {
  return prisma.disciplines.findUnique({
    where: { id },
  });
}

export async function findByName(name: string) {
  return prisma.disciplines.findUnique({
    where: { name },
  });
}
