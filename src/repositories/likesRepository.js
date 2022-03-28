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

export async function postExistQuery(postId){
  return connection.query(`
      SELECT * FROM posts
      WHERE id = $1
    `, [postId]);
}

export async function giveOrRemoveLikesQuery(userId,postId) {
  try {
    
    const liked = await connection.query(`
      SELECT * FROM likes
      WHERE "userId" = $1 AND "postId" = $2
    `, [userId, postId]);

    if(liked.rows.length > 0){
      await connection.query(`
        DELETE FROM likes
        WHERE "userId"=$1 AND "postId"=$2
      `,[userId, postId]);
      return;
    }

    await connection.query(`
        INSERT INTO 
        likes ("userId","postId")
        VALUES
        ($1, $2)
        `,[userId, postId]);

  } catch (error) {
    console.log(error);
  }
}