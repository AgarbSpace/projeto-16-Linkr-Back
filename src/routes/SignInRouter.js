import { Router } from "express";
import { signIn } from "../controllers/signInController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import signInFormSchema from "../schemas/signInFormSchema.js";

const signInRouter = Router();

signInRouter.post('/signin', validateSchemaMiddleware(signInFormSchema), signIn);

export default signInRouter;