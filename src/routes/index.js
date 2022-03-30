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
<<<<<<< HEAD
import followRouter from "./followRouter.js";
=======
import commentRouter from "./commentRouter.js";
>>>>>>> main

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
<<<<<<< HEAD
router.use(followRouter)
=======
router.use(commentRouter)
>>>>>>> main

export default router;