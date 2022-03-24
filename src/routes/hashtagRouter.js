import { Router } from "express";

const hashtagRouter = Router();

hashtagRouter.get('/hashtagranking', (req, res) => res.send("oi"));


export default hashtagRouter;