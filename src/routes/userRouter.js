import { Router } from "express";
import { searchUsers } from "../controllers/userController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const userRouter = Router();

userRouter.get('/searchusers', validateTokenMiddleware, searchUsers);

export default userRouter;