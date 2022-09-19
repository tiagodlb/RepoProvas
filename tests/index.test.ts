import { testSignUp } from "./signup";
import { prisma } from "../src/database"
import { testSignIn } from "./signin";
import { testTests } from "./tests";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users"`
  await prisma.$executeRaw`TRUNCATE TABLE "tests"`

});

testSignUp();
testSignIn();
testTests();

afterAll(async () => {
    await prisma.$disconnect();
  });