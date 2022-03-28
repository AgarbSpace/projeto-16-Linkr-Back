import { Router } from "express";
import { getTimeline, getTimelineByUserId } from "../controllers/timelineController.js"
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const timelineRouter = Router();

timelineRouter.get("/timeline", getTimeline);
timelineRouter.get('/user/:id', getTimelineByUserId);

export default timelineRouter;