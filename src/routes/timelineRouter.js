import { Router } from "express";
import { getTimeline, getTimelineByUserId } from "../controllers/timelineController.js"
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const timelineRouter = Router();

timelineRouter.get("/timeline", validateTokenMiddleware, getTimeline);
timelineRouter.get('/user/:id', validateTokenMiddleware, getTimelineByUserId);

export default timelineRouter;
