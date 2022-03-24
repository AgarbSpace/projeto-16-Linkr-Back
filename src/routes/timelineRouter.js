import { Router } from "express";
import { getTimeline } from "../controllers/timelineController.js"
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const timelineRouter = Router();

timelineRouter.get("/timeline",getTimeline);

export default timelineRouter;