import { prisma } from "../database";
import { GetCategoryData } from "../types/categoryType";

export async function findById(id: number) {
  return prisma.categories.findUnique({
    where: { id },
  });
}

export async function findEverything() {
  return prisma.categories.findMany();
}

export async function findCategoryByName(name: string) {
  return prisma.categories.findUnique({
    where: {
      name,
    },
  });
}

export async function insertCategory(category: GetCategoryData) {
  return prisma.categories.create({
    data: category,
  });
}
