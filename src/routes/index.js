import { Router } from "express";
import signUpRouter from "./signUpRouter.js";
import signInRouter from './SignInRouter.js';
import publicationRouter from "./publicationRouter.js";
import hashtagRouter from "./hashtagRouter.js";
import headerRouter from "./headerRouter.js";
import userRouter from "./userRouter.js";
import timelineRouter from "./timelineRouter.js";
import likesRouter from "./likesRouter.js";
import notificationRouter from "./notificationRouter.js";
import commentRouter from "./commentRouter.js";

const router = Router();
router.use(signUpRouter);
router.use(signInRouter);;
router.use(publicationRouter)
router.use(headerRouter);
router.use(timelineRouter);
router.use(hashtagRouter)
router.use(headerRouter)
router.use(userRouter)
router.use(likesRouter)
router.use(notificationRouter)
router.use(commentRouter)

export default router;