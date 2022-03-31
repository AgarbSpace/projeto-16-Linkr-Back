import { getRepostCountQuery, rePostQuery } from "../repositories/rePostsRepository.js"

export async function getCountReposts(req, res) {
  const { postId } = req.params
  try {
    const count = await getRepostCountQuery(parseInt(postId))
    res.status(200).send(count)
  } catch (error) {
    console.log("controllerError:", error)
    res.sendStatus(500)
  }
}
export async function repost(req, res) {
  const { postId } = req.params
  const { user } = res.locals
  const userId = parseInt(user.id)
  try {
    await rePostQuery(userId, postId)
    res.sendStatus(201)
  } catch (error) {
    console.log("controllerError:", error)
    res.sendStatus(500)
  }
}