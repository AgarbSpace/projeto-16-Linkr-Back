import connection from "../database.js"

async function findUser(email) {
  return connection.query('SELECT * FROM users WHERE email=$1', [email])
}

async function insertUser(email, passwordHash, name, url) {
  return connection.query(`

    INSERT INTO 
      users(email, "passwordHash", name, picture) 
    VALUES ($1, $2, $3, $4)
  `, [email, passwordHash, name, url])
}

export const signUpRepository = {
  findUser,
  insertUser
}