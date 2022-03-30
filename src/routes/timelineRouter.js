import { Router } from "express";
import { getTimeline, getTimelineByUserId, userFollowsAnyone } from "../controllers/timelineController.js"
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const timelineRouter = Router();

timelineRouter.get("/timeline", validateTokenMiddleware, getTimeline);
timelineRouter.get('/user/:id', validateTokenMiddleware, getTimelineByUserId);
timelineRouter.get('/hasFollows', validateTokenMiddleware, userFollowsAnyone);

export default timelineRouter;
