import connection from "../database.js"

async function getComments(userId) {

  const comments = await connection.query(`
  SELECT comments.*, f."userId"  FROM comments
  LEFT JOIN followers f ON f."followerId"=$1;
    `, [parseInt(userId)])

  return comments.rows
}

export const commentRepository = {
  getComments,
}