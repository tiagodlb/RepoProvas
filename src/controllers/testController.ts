import { Request, Response } from "express";
import testsService from "../services/testService.js";

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
