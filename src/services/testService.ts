import { CreateTestData } from "../types/testTypes.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import * as testsRepository from "../repositories/testsRepository.js";
import * as categoryRepository from "../repositories/categoriesRepository.js";
import * as disciplineRepository from "../repositories/disciplinesRepository.js";
import * as teacherRepository from "../repositories/teacherRepository.js";
import * as teacherDisciplinesRepository from "../repositories/teacherDisciplinesRepository.js";
import {
  notFoundError,
} from "../utils/errorUtils.js";

async function createTest(test: CreateTestData) {
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

async function findTestById(id: number) {
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

const testsService = {
  createTest,
  findTestById,
};

export default testsService;
