import { testSignUp } from "./signup";
import { prisma } from "../src/database"
import { testSignIn } from "./signin";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users" CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "categories" CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "tests" CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "teachers" CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "terms" CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "disciplines" CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "teacherDisciplines" CASCADE`
});

testSignUp();
testSignIn();

afterAll(async () => {
    await prisma.$disconnect();
  });