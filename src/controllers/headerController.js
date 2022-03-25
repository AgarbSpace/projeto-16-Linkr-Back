import { getProfilePicture } from "../repositories/headerRepository.js"

export async function getHeaderData(req, res) {
  const { user } = res.locals
  try {
    const picture = await getProfilePicture(parseInt(user.id))
    
    res.status(200).send(picture)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}