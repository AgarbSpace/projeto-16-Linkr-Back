import connection from "../database.js"

async function findUser(email){
    return connection.query('SELECT * FROM users WHERE email=$1', [user.email])
}

async function insertUser (email, passwordHash, username, url){
    return connection.query(`
    INSERT INTO 
      users(email, password, username, picture) 
    VALUES ($1, $2, $3, $4)
  `, [email, passwordHash, username, url])
}

export const signUpRepository = {
    findUser,
    insertUser
}