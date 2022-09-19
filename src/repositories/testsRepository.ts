import { prisma } from "../database.js";
import { CreateTestData } from "../types/testTypes.js";

export async function findById(id: number) {
  return prisma.tests.findUnique({
    where: { id },
  });
}

export async function findTestsByName(name: string) {
  return prisma.tests.findMany({
    where: {
      name,
    },
  });
}

export async function insertTest(test: CreateTestData) {
  return prisma.tests.create({
    data: test,
  });
}

export async function findEverything() {
  return prisma.tests.findMany();
}
