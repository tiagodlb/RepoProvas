import { prisma } from "../database.js";

export async function findById(id: number) {
  return prisma.categories.findUnique({
    where: { id },
  });
}

export async function findCategoryByName(name: string) {
  return prisma.categories.findUnique({
    where: {
      name,
    },
  });
}
