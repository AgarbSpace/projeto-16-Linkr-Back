import { Router } from "express";
import { deleteRepost, getCountReposts, repost } from "../controllers/rePostsController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
const rePostRouter = Router()

rePostRouter.get("/re-post/:postId",validateTokenMiddleware, getCountReposts)
rePostRouter.post("/re-post/:postId",validateTokenMiddleware, repost)
rePostRouter.delete("/re-post/:postId",validateTokenMiddleware, deleteRepost)

export default rePostRouter