import { postFollowOrUnfollowQuery, postFollowQuery, postUnfollowQuery, getAllFollowsQuery } from "../repositories/followReposirtory.js"

export async function followOrUnfollow(req,res) {
    const { userId } = req.params
    const {followerId} = req.body
    try {
      const verification = await postFollowOrUnfollowQuery(userId, followerId)
      res.send(verification)
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  }

export async function follow(req,res) {
    const { userId } = req.params
    const {followerId} = req.body
    try {
      await postFollowQuery(userId, followerId)
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
}

export async function unfollow(req,res) {
    const { userId } = req.params
    const {followerId} = req.body
    try {
      await postUnfollowQuery(userId, followerId)
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  }

export async function allFollows(req,res) {
    const { userId } = req.params
    try {
      const allFollows = await getAllFollowsQuery(userId)
      res.send(allFollows)
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  }