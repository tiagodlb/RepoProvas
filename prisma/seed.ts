import userFactory from "../factories/userFactory";
import { prisma } from "../src/database";

async function main() {
  const user = await userFactory();

  await prisma.users.upsert({
    where: { email: user.email },
    update: {},
    create: user,
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
