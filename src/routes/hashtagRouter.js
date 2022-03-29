import { Router } from "express";
import { hashtagRanking } from "../controllers/hashtagController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { hashtagFilter } from "../controllers/hashtagFilterController.js";

const hashtagRouter = Router();

hashtagRouter.get('/hashtagranking', validateTokenMiddleware, hashtagRanking);
hashtagRouter.get('/hashtag', validateTokenMiddleware, hashtagFilter);


export default hashtagRouter;