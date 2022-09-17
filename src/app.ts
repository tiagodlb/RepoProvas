import cors from "cors";
import express, { json } from "express";
import "express-async-errors"
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import authRouter from "./routers/authRouter.js";

const app = express();
app.use(json());
app.use(cors());
app.use(errorHandlerMiddleware);
app.use(authRouter)
export default app;
