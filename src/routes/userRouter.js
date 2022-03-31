import { Router } from "express";
import { searchUsers, getUserById } from "../controllers/userController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const userRouter = Router();

userRouter.get('/searchusers', validateTokenMiddleware, searchUsers);
userRouter.get("/users/:id", validateTokenMiddleware, getUserById)

export default userRouter;