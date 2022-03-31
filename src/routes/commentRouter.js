import { Router } from "express";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { commentsList, postComment } from "../controllers/commentController.js";
import newCommentSchemma from "../schemas/newCommentSchemma.js";

const commentRouter = Router();

commentRouter.get('/comments/:id', validateTokenMiddleware, commentsList);
commentRouter.post('/comments/:id', validateTokenMiddleware, validateSchemaMiddleware(newCommentSchemma), postComment);

export default commentRouter;