import { prisma } from "./../src/database.js";
import { testSignIn } from "./signin.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "items"`
});

testSignIn();

afterAll(async () => {
    await prisma.$disconnect();
  });