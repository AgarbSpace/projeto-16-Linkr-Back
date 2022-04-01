import connection from "../database.js"

async function searchBarFindUsers(query) {
  return connection.query(`

    SELECT id, name, picture FROM users
      WHERE name ILIKE $1
  `, [`%${query}%`])
}

async function getUserInfo(id) {
  const users = await connection.query(`SELECT * FROM users WHERE id=$1`, [id]);

  const user = users.rows[0];

  delete user.passwordHash

  return user

}

export const userRepository = {

  searchBarFindUsers,
  getUserInfo
}