import { Router } from "express";
import { signIn } from "../controllers/signInController.js";

const signInRouter = Router();

signInRouter.post('/signin', signIn);

export default signInRouter;