import { Router } from "express";
import { getTimeline, getTimelineByUserId, userFollowsAnyone, improvedGetTimeline } from "../controllers/timelineController.js"
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const timelineRouter = Router();

timelineRouter.get("/timeline", validateTokenMiddleware, improvedGetTimeline);
timelineRouter.get('/user/:id', validateTokenMiddleware, getTimelineByUserId);
timelineRouter.get('/hasFollows', validateTokenMiddleware, userFollowsAnyone);

export default timelineRouter;
