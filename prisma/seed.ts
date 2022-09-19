import userFactory from "../factories/userFactory";
import * as userRepository from "../src/repositories/userRepository";
import { prisma } from "../src/database";
import { TermsData } from "../src/types/termTypte";
import { DisciplineData } from "../src/types/disciplineType";
import { GetTeacherDisciplinesData } from "../src/types/teacherDisciplineType";
import { TeacherData } from "../src/types/teacherType";
import { GetCategoryData } from "../src/types/categoryType";

async function main() {
  const user = await userFactory();
  const terms: { number: number }[] = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
    { number: 6 },
  ];
  const teachers = [{ name: "Diego Pinho1" }, { name: "Bruna Hamori1" }];
  const categories = [
    { name: "Projeto" },
    { name: "Prática" },
    { name: "Recuperação" },
  ];
  const teacherDisciplines = [
    { teacherId: 1, disciplineId: 1 },
    { teacherId: 1, disciplineId: 2 },
    { teacherId: 1, disciplineId: 3 },
    { teacherId: 2, disciplineId: 4 },
    { teacherId: 2, disciplineId: 5 },
    { teacherId: 2, disciplineId: 6 },
  ];
  const disciplines = [
    { name: "HTML e CSS", termId: 1 },
    { name: "Javascript", termId: 2 },
    { name: "React", termId: 3 },
    { name: "Humildade", termId: 1 },
    { name: "Planejamento", termId: 2 },
    { name: "Autoconfiança", termId: 3 },
  ];

  await populateUser(user);
  terms.forEach(async (term) => {
    await populateTerms(term).catch(errorUtil);
  });
  disciplines.forEach(async (discipline) => {
    await populateDisciplines(discipline).catch(errorUtil);
  });
  teacherDisciplines.forEach(async (data) => {
    await populateTeacherDisciplines(data).catch(errorUtil);
  });
  teachers.forEach(async (teacher) => {
    await populateTeachers(teacher).catch(errorUtil);
  });
  categories.forEach(async (category) => {
    await populateCategories(category).catch(errorUtil);
  });
}

async function populateUser(user: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  await userRepository.insertUser({
    email: user.email,
    password: user.password,
  });
}
async function populateTerms(term: TermsData) {
  await prisma.terms.create({
    data: term,
  });
}

async function populateCategories(categories: GetCategoryData) {
  await prisma.categories.create({
    data: categories,
  });
}

async function populateTeachers(teacher: TeacherData) {
  prisma.teachers.create({
    data: teacher,
  });
}

async function populateTeacherDisciplines(data: GetTeacherDisciplinesData) {
  await prisma.teacherDisciplines.create({
    data: data,
  });
}

async function populateDisciplines(discipline: DisciplineData) {
  await prisma.disciplines.create({
    data: discipline,
  });
}

function errorUtil() {
  console.dir("You probably already have the seed data!");
  return;
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
