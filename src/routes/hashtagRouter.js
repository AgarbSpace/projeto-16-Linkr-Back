import { Router } from "express";
import { hashtagRanking } from "../controllers/hashtagController.js";
import { hashtagFilter } from "../controllers/hashtagFilterController.js";

const hashtagRouter = Router();

hashtagRouter.get('/hashtagranking', hashtagRanking);
hashtagRouter.get('/hashtag', hashtagFilter);


export default hashtagRouter;