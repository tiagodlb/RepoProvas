import { faker } from "@faker-js/faker";

export default async function teacherFactory() {
  return {
    name: faker.name.fullName()
  };
}
