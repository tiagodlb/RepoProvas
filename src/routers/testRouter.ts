import { Router } from "express";
import {
  getTest,
  getTestByDisciplines,
  getTestByTeachers,
  postTest,
} from "../controllers/testController";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { testSchema } from "../schemas/testSchema";
const testRouter = Router();

testRouter.use(ensureAuthenticatedMiddleware);
testRouter.post("/tests", validateSchemaMiddleware(testSchema), postTest);
testRouter.get("/tests/:id", getTest);
testRouter.get("/testsDisciplines", getTestByDisciplines);
testRouter.get("/testsTeachers", getTestByTeachers);

export default testRouter;
