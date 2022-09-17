import { faker } from "@faker-js/faker";

export default async function userFactory() {
  return {
    name: faker.lorem.words(2),
    pdfUrl: faker.internet.url(),
    categoryId: parseInt(faker.random.numeric()),
    teacherDisciplineId: parseInt(faker.random.numeric())
  };
}
