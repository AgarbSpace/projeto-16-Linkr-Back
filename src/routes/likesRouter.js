import { Router } from "express";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { getLikes } from "../controllers/likesController.js";

const likesRouter = Router();

likesRouter.get('/likes/:postId',validateTokenMiddleware, getLikes);

export default likesRouter;