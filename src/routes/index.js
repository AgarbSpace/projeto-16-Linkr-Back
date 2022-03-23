import { Router } from "express";
import signUpRouter from "./signUpRouter.js";
import timelineRouter from "./timelineRouter.js";


const router = Router();
router.use(signUpRouter);
router.use(timelineRouter);
export default router;