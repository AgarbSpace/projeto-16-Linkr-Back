import connection from "../database.js";

async function getPosts(offset){
  
    let offsetQuery = "";

    if(offset && typeof(parseInt(offset)) === 'number'){
      offsetQuery = `OFFSET ${offset}`
    }

    const result =  await connection.query(`
      SELECT 
        posts.*, 
        posts.id AS "id", 
        users.id AS "userId", 
        users.name AS "userName",
        users.picture AS picture

      FROM posts
      JOIN users ON users.id = posts."userId"

      ORDER BY date DESC
      LIMIT 10 ${offsetQuery}
      `);

    return result.rows
}

async function getPostsByUserId (userId) {
  const posts =  await connection.query(`
    SELECT posts.*, posts.id AS "id", users.id AS "userId", users.name AS "userName",
    users.picture AS picture
    FROM posts
    JOIN users ON users.id = posts."userId"
    WHERE "userId" = $1
   `, [userId]);

   const userInfo = await connection.query(`
     SELECT * FROM users WHERE id = $1
   `, [userId]);

   return {username: userInfo.rows[0].name, userPosts: posts.rows};
}
async function getRePosts() {
  const reposts = await connection.query(`
  SELECT 
    posts.id AS id,
    posts.text,
    posts.link,
    reposts.date AS date,
    owners.id AS "userId",
    owners.name AS "userName",
    owners.picture AS picture,
    reposter.id AS "reposterId",
    reposter.name AS "reposterName"
  FROM reposts

  JOIN posts 
    ON posts.id=reposts."postId"
  JOIN users reposter 
    ON reposter.id = reposts."userId"
  JOIN users owners 
    ON owners.id = posts."userId"
  `)
  return reposts.rows
}
export const timelineRepository = {
    getPosts,
    getPostsByUserId,
    getRePosts
}