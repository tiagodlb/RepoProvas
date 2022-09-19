import { faker } from "@faker-js/faker";

export default async function disciplineFactory() {
  return {
    name: faker.random.words(),
    termId: parseInt(faker.random.numeric())
  };
}
