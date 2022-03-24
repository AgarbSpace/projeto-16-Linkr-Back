import { userRepository } from "../repositories/userRepository.js";

export async function searchUsers(req, res) {
  try {
    const { name } = req.query

    const userList = await userRepository.searchBarFindUsers(name)

    res.send(userList.rows)

  } catch (error) {
    console.log(error)
    res.send(500)
  }
}