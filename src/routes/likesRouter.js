import { Router } from "express";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { getLikes, giveOrRemoveLikes } from "../controllers/likesController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import likePostSchema from "../schemas/likePostSchema.js";

const likesRouter = Router();

likesRouter.get('/likes/:postId',validateTokenMiddleware, getLikes);
likesRouter.patch('/likes/:postId', validateTokenMiddleware, validateSchemaMiddleware(likePostSchema), giveOrRemoveLikes)

export default likesRouter;