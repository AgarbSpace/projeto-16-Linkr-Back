import { Router } from "express";
import { signUp } from "../controllers/signUpController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import signUpFormSchema from "../schemas/signUpFormSchema.js";

const signUpRouter = Router();

signUpRouter.post('/signUp', validateSchemaMiddleware(signUpFormSchema), signUp);

export default signUpRouter;