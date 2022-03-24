import { Router } from "express";
import signUpRouter from "./signUpRouter.js";
import signInRouter from './SignInRouter.js';
import publicationRouter from "./publicationRouter.js";
import headerRouter from "./headerRouter.js";

const router = Router();
router.use(signUpRouter);
router.use(signInRouter);
router.use(publicationRouter)
router.use(headerRouter)

export default router;