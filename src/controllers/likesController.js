import { getLikesQuery, giveLikesQuery } from "../repositories/likesRepository.js"

export async function getLikes(req,res) {
  const { postId } = req.params 
  try {
    const usersWhoLike = await getLikesQuery(postId)
    res.status(200).send(usersWhoLike)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export async function giveLikes(req,res) {
/* 
  const { user } = res.locals
  const { postId } = req.body 
  try {
    const result = giveLikesQuery(user.id,postId)
    res.status(200).send(result)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
   */
} 