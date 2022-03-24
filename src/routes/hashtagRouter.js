import { Router } from "express";
import { hashtagRanking } from "../controllers/hashtagController.js";

const hashtagRouter = Router();

hashtagRouter.get('/hashtagranking', hashtagRanking);


export default hashtagRouter;