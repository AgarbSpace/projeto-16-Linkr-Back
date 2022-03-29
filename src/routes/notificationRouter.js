import { Router } from "express";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { getTimelineNotification } from "../controllers/notificationController.js";

const notificationRouter = Router();

notificationRouter.get('/notification/timeline', validateTokenMiddleware, getTimelineNotification);


export default notificationRouter;