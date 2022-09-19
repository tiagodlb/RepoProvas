import { Request, Response } from "express";
import {
  getAllTestsByDisciplines,
  createTest,
  findTestById
} from "../services/testService.js";

export async function postTest(req: Request, res: Response) {
  const test = req.body;
  await createTest(test);
  res.sendStatus(201);
}

export async function getTest(req: Request, res: Response) {
  const id = +req.params.id;
  const test = await findTestById(id);
  res.send(test);
}

export async function getTestByDisciplines(req: Request, res: Response) {
  const test = await getAllTestsByDisciplines();
  console.log(test)
  res.send(test);
}
