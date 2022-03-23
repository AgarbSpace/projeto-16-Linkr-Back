import { Router } from "express";
import signUpRouter from "./signUpRouter.js";
import publicationRouter from "./publicationRouter.js";

const router = Router();
router.use(signUpRouter);
router.use(publicationRouter)
export default router;