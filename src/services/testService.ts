import { CreateTestData } from "../types/testTypes.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import * as testsRepository from "../repositories/testsRepository.js";
import * as categoryRepository from "../repositories/categoriesRepository.js";
import * as disciplineRepository from "../repositories/disciplinesRepository.js";
import * as teacherRepository from "../repositories/teacherRepository.js";
import * as teacherDisciplinesRepository from "../repositories/teacherDisciplinesRepository.js";
import * as termsRepository from "../repositories/termRepository.js";
import { notFoundError } from "../utils/errorUtils.js";
import {
  IDisciplineTeacher,
  IMappedTest,
  ITest,
  ITestIdentifier,
} from "../types/testByDisciplineType.js";

export async function createTest(test: CreateTestData) {
  const existingCategory = await categoryRepository.findById(test.categoryId);
  if (!existingCategory) {
    throw notFoundError("Category doesn't exist");
  }
  const existingTeacherDiscipline = await teacherDisciplinesRepository.findById(
    test.teacherDisciplineId
  );
  if (!existingTeacherDiscipline) {
    throw notFoundError("Teacher or discipline inexistent");
  }

  await testsRepository.insertTest(test);
}

export async function findTestById(id: number) {
  const test = await testsRepository.findById(id);
  if (!test) {
    throw notFoundError("Test doesn't exist");
  }
  const existingTeacherDiscipline = await teacherDisciplinesRepository.findById(
    test.teacherDisciplineId
  );
  if (!existingTeacherDiscipline) {
    throw notFoundError("Teacher or discipline inexistent");
  }
  const existingCategory = await categoryRepository.findById(test.categoryId);
  if (!existingCategory) {
    throw notFoundError("Category doesn't exist");
  }
  const discipline = await disciplineRepository.findById(
    existingTeacherDiscipline.disciplineId
  );
  const teacher = await teacherRepository.findById(
    existingTeacherDiscipline.teacherId
  );
  const data = {
    name: test.name,
    pdfUrl: test.pdfUrl,
    category: existingCategory.name,
    discipline: discipline.name,
    teacher: teacher.name,
  };

  return data;
}

export async function getAllTestsByDisciplines() {
  const terms = await termsRepository.findEverything();
  const data = {
    terms: terms.map( (term) => {
      const { number, disciplines } = term;
      const discipline =  mapCategoriesToDiscipline(disciplines);
      return {
        number,
        discipline,
      };
    }),
  };
  console.log("!!")
  return data;
}

export function mapCategoriesToDiscipline(
  Disciplines: IDisciplineTeacher[]
) {
  const disciplines = Disciplines.map((discipline) => {
    const { name, teacherDisciplines: teachersInDiscipline } = discipline;

    const categories = teachersInDiscipline.map((teacher) => {
      const { tests, teachers } = teacher;

      return mapTestsToCategories(tests, { teacher: teachers.name });
    });
    return {
      name,
      categories,
    };
  });
  return disciplines;
}

export function mapTestsToCategories(
  tests: ITest[],
  testIdentifier: ITestIdentifier
) {
  const categoriesMap = new Map<string, IMappedTest[]>();

  tests.forEach((test) => {
    const { name, categories } = test;

    if (categoriesMap.has(categories.name)) {
      categoriesMap.get(categories.name)?.push({ name, ...testIdentifier });
    } else {
      categoriesMap.set(categories.name, [{ name, ...testIdentifier }]);
    }
  });

  let testsByCategory: Array<{ name: string; tests: IMappedTest[] }> = [];

  categoriesMap.forEach((tests, category) =>
    testsByCategory.push({ name: category, tests })
  );

  return testsByCategory;
}

const testsService = {
  createTest,
  findTestById,
};

export default testsService;
