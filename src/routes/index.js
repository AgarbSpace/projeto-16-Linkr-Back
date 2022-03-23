import { Router } from "express";
import signUpRouter from "./signUpRouter.js";
import signInRouter from './SignInRouter.js';
import publicationRouter from "./publicationRouter.js";

const router = Router();
router.use(signUpRouter);
router.use(signInRouter);
router.use(publicationRouter)

export default router;