import { Request, Response } from "express";

import authService from "../services/authService";

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = { email, password };
  await authService.createUser(user);
  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const user = req.body;
  const token = await authService.login(user);
  res.send({ token });
}
