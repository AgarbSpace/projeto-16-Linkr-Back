import { getLikesQuery, giveOrRemoveLikesQuery, postExistQuery } from "../repositories/likesRepository.js"

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

export async function giveOrRemoveLikes(request,response) {
  try {
    const { user } = response.locals
    const { postId } = request.params

    const postExist = await postExistQuery(postId);
    if(postExist.rows.length === 0){
      return response.sendStatus(404)
    }

    const result = await giveOrRemoveLikesQuery(user.id,postId);
    response.status(200).send(result)
  } catch (error) {
    console.log(error)
    response.sendStatus(500)
  }
  
} 