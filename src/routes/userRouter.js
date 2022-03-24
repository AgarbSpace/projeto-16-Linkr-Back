import { Router } from "express";
import { searchUsers } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get('/searchusers', searchUsers);

export default userRouter;