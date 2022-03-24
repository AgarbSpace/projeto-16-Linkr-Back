import { Router } from "express";
import { getHeaderData } from "../controllers/headerController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const headerRouter = Router();

headerRouter.get('/header',validateTokenMiddleware, getHeaderData);

export default headerRouter;