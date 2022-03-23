import { Router } from "express";
import { getTimeline } from "../controllers/timelineController.js"

const timelineRouter = Router();
timelineRouter.get("/timeline", getTimeline);
export default timelineRouter