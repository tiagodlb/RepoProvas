import { faker } from "@faker-js/faker";

export default async function categoryFactory() {
  return {
    name: faker.random.word(),
  };
}
