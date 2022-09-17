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
