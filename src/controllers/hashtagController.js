import { hashtagRepository } from "../repositories/hashtagRepository.js";

export async function hashtagRanking(req, res) {

  try {

    const hashtagRanking = await hashtagRepository.getHashtagRanking(10)

    res.send(hashtagRanking)

  } catch (error) {

    console.log(error)

    res.sendStatus(500)
  }

}