import { Router } from "express";
import { getTest, postTest } from "../controllers/testController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";
const testRouter = Router();

testRouter.use(ensureAuthenticatedMiddleware);
testRouter.post("/tests", validateSchemaMiddleware(testSchema), postTest);
testRouter.get("/tests/:id", getTest);

export default testRouter;
