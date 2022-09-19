import { faker } from "@faker-js/faker";

export default async function termFactory() {
  return {
    number: parseInt(faker.random.numeric())
  };
}
