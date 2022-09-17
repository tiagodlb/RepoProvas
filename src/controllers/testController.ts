import { Request, Response } from "express";
import testsService from "../services/testService";


export async function postTest(req: Request, res: Response) {
  const test = req.body;
  await testsService.createTest(test);
  res.sendStatus(201);
}
