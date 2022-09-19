import { Router } from "express";
import { getTest, getTestByDisciplines, postTest } from "../controllers/testController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";
const testRouter = Router();

testRouter.use(ensureAuthenticatedMiddleware);
testRouter.post("/tests", validateSchemaMiddleware(testSchema), postTest);
testRouter.get("/tests/:id", getTest);
testRouter.get("/testsDisciplines", getTestByDisciplines)

export default testRouter;
