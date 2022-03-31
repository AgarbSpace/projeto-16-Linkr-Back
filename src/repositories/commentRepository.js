import connection from "../database.js"

async function getComments(userId, postId) {

  const comments = await connection.query(`
  SELECT c.*, f."followerId" as "followingId", u.name, u.picture  FROM comments c
  JOIN users u ON u.id=c."userId" 
  LEFT JOIN followers f ON f."userId"=$1 AND c."userId"=f."followerId"
  WHERE c."postId" = $2 ;
    `, [parseInt(userId), parseInt(postId)])

  return comments.rows
}

async function insertComment (postId, userId, comment) {
  try {
    await connection.query(`
      INSERT INTO comments ("postId", "userId", comment) VALUES ($1, $2, $3)
    `, [postId, userId, comment]);
  } catch (err) {
    console.log(err);
  }
}
export const commentRepository = {
  getComments,
  insertComment,
}