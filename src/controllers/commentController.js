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

export async function postComment (req, res) {
  try {
    const user = res.locals.user;

    const postId = req.params.id;

    const { comment } = req.body;

    await commentRepository.insertComment(postId, user.id, comment);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}