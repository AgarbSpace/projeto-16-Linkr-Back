import connection from "../database.js"

async function getComments(userId, postId) {

  const comments = await connection.query(`
  SELECT c.*, f."userId" as "followingId", u.name, u.picture  FROM comments c
  JOIN users u ON u.id=c."userId" 
  LEFT JOIN followers f ON f."followerId"=$1
  WHERE c."postId" = $2 ;
    `, [parseInt(userId), parseInt(postId)])

  return comments.rows
}

export const commentRepository = {
  getComments,
}