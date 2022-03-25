import connection from "../database.js"

async function findUser(email) {
  return connection.query('SELECT * FROM users WHERE email=$1', [email])
}

async function insertToken(token, userId) {
  return connection.query(`
    INSERT INTO 
      sessions(token, "userId") 
    VALUES ($1, $2)
  `, [token, userId])
}

export const signInRepository = {
  findUser,
  insertToken
}