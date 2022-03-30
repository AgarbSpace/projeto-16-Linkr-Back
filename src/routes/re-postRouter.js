import { Router } from "express";
import { getCountReposts, repost } from "../controllers/rePostsController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
const rePostRouter = Router()

rePostRouter.get("/re-post/:postId",validateTokenMiddleware, getCountReposts)
rePostRouter.post("/re-post/:postId",validateTokenMiddleware, repost)

export default rePostRouter