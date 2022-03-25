import { Router } from "express";
import { hashtagRanking } from "../controllers/hashtagController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const hashtagRouter = Router();

hashtagRouter.get('/hashtagranking', validateTokenMiddleware, hashtagRanking);


export default hashtagRouter;