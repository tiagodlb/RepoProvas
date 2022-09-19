import { Router } from "express";
import { signIn, signUp } from "../controllers/authController";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { signInSchema, signUpSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post("/signup", validateSchemaMiddleware(signUpSchema), signUp);
authRouter.post("/signin", validateSchemaMiddleware(signInSchema), signIn);

export default authRouter;
