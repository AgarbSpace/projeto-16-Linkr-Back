import connection from "../database.js";

export async function getLikesQuery(postId) {
  const result = await connection.query(`
    SELECT
      u.id AS "userId",
      u.name
    FROM likes l
    JOIN users u ON l."userId"=u.id
    WHERE l."postId"=$1
  `,[postId])

  return result.rows
}

export async function giveLikesQuery(userId,postId) {
/* 
  const verification = getLikesQuery(postId)
  console.log(verification)
  const result = await connection.query(`
    INSERT INTO 
      likes l
    ("userId","postId")
    VALUES
    ($1, $2)
  `,[userId, postId])

  const teste = result.rows
  return teste
   */
}