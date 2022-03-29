import { commentRepository } from "../repositories/commentRepository"

export async function commentaryList(req, res) {

  const userId = res.locals.user

  try {

    const commentsList = await commentRepository.getComments(userId.id)

    res.send(commentsList)

  } catch (error) {

    console.log(error)

    res.sendStatus(500)
  }

}