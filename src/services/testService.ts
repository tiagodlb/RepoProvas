import { Users } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import * as testsRepository from "../repositories/testsRepository.js";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";
import { CreateTestData } from "../types/testTypes.js";

async function createTest(test: CreateTestData) {
  //const existingUser = await userRepository.findUserByEmail();
  await testsRepository.insertTest(test);
}

async function getTests(tests: CreateTestData) {
  const testsArray = await testsRepository.findTestsByName(tests.name);
  return testsArray;
}

async function findTestById(id: number) {
  const test = await testsRepository.findById(id);
  if (!test) throw notFoundError("Test not found");

  return test;
}

const testsService = {
  createTest,
  findTestById,
};

export default testsService;
