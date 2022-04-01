import connection from "../database.js";

export async function getRepostCountQuery(postId) {
  const { rows: result } = await connection.query(`
  SELECT COUNT("postId") 
  FROM reposts
  WHERE  "postId"=$1
  `,[postId])
  const [ count ] = result
  return count.count
}
export async function rePostQuery(userId, postId) {
  await connection.query(`
    INSERT INTO reposts
      ("userId","postId") 
    VALUES ($1, $2)
  `,[userId, postId])
}
export async function deleteRepostQuery(userId, postId) {
  await connection.query(`
    DELETE FROM reposts
    WHERE "userId"=$1 AND "postId"=$2
  `,[userId, postId])
}