import { Users } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import * as userRepository from "../repositories/userRepository";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils";
import { CreateUserData } from "../types/userTypes";

async function createUser(user: CreateUserData) {
  const existingUser = await userRepository.findUserByEmail(user.email);

  if (existingUser) {
    throw conflictError();
  }

  const SALT = 10;
  const hashedPassword = bcrypt.hashSync(user.password, SALT);
  await userRepository.insertUser({ ...user, password: hashedPassword });
}

async function login(login: CreateUserData) {
  const user = await getUserOrFail(login);
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return token;
}

async function getUserOrFail(login: CreateUserData) {
  const user = await userRepository.findUserByEmail(login.email);
  if (!user) throw unauthorizedError("Invalid credentials");

  const isPasswordValid = bcrypt.compareSync(login.password, user.password);
  if (!isPasswordValid) throw unauthorizedError("Invalid credentials");

  return user;
}

async function findUserById(id: number) {
  const user = await userRepository.findById(id);
  if (!user) throw notFoundError("User not found");

  return user;
}

const authService = {
  createUser,
  login,
  findUserById,
};

export default authService;
