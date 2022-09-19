import { Request, Response } from "express";
import testsService from "../services/testService";

export async function postTest(req: Request, res: Response) {
  const test = req.body;
  await testsService.createTest(test);
  res.sendStatus(201);
}

export async function getTest(req: Request, res: Response) {
  const id = +req.params.id;
  const test = await testsService.findTestById(id);
  res.send(test);
}

export async function getTestByDisciplines(req: Request, res: Response) {
  const test = await testsService.getAllTestsByDisciplines();
  res.send(test);
}

export async function getTestByTeachers(req: Request, res: Response) {
  const teachers = await testsService.getAllTestsByTeacher();
  res.send(teachers);
}
