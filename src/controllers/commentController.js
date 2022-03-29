import { commentRepository } from "../repositories/commentRepository.js"

export async function commentsList(req, res) {

  const userId = res.locals.user

  const postId = req.params.id;

  try {

    const commentsList = await commentRepository.getComments(userId.id, postId)

    res.send(commentsList)

  } catch (error) {

    console.log(error)

    res.sendStatus(500)
  }

}