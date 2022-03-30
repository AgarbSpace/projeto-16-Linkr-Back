import { Router } from "express";
import {followOrUnfollow, follow, unfollow, allFollows} from '../controllers/followController.js'

const followRouter = Router();

followRouter.post('/followorunfollow/:userId', followOrUnfollow)
followRouter.post('/follow/:userId', follow)
followRouter.post('/unfollow/:userId', unfollow)
followRouter.get('/allfollows/:userId', allFollows)

export default followRouter;