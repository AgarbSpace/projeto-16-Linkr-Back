import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import signUpFormSchema from "../schemas/signUpFormSchema.js";

const signUpRouter = Router();

userRouter.post('/signUp', validateSchemaMiddleware(signUpFormSchema), signUp);

export default signUpRouter;