import { prisma } from "../database.js";

export async function findById(id: number) {
  return prisma.teacherDisciplines.findUnique({
    where: { id },
  });
}
