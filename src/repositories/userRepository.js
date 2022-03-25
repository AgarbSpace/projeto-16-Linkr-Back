import connection from "../database.js"

async function searchBarFindUsers(query) {
  return connection.query(`

    SELECT id, name, picture FROM users
      WHERE name ILIKE $1
  `, [`%${query}%`])
}

export const userRepository = {

  searchBarFindUsers
}