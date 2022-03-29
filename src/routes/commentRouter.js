import { Router } from "express";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { commentsList } from "../controllers/commentController.js";

const commentRouter = Router();

commentRouter.get('/comments/:id', validateTokenMiddleware, commentsList);


export default commentRouter;