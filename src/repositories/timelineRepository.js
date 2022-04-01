import connection from "../database.js";

async function getPosts(offset) {

  let offsetQuery = "";

  if (offset && typeof (parseInt(offset)) === 'number') {
    offsetQuery = `OFFSET ${offset}`
  }

  const result = await connection.query(`
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

async function getPostsByUserId(userId) {
  const posts = await connection.query(`
    SELECT posts.*, posts.id AS "id", users.id AS "userId", users.name AS "userName",
    users.picture AS picture
    FROM posts
    JOIN users ON users.id = posts."userId"
    WHERE "userId" = $1
   `, [userId]);

  const userInfo = await connection.query(`
     SELECT * FROM users WHERE id = $1
   `, [userId]);

  return { username: userInfo.rows[0].name, userPosts: posts.rows };
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

async function improvedGetPosts(offset, userId) {

  let offsetQuery = "";

  if (offset && typeof (parseInt(offset)) === 'number') {
    offsetQuery = `OFFSET ${parseInt(offset)}`
  }

  const array = await connection.query(`
  SELECT posts.*, u.name as "reposterName", u.name as "userName", u.picture as picture, u.id as "reposterId" FROM posts
  JOIN users u ON u.id=posts."userId" 
  LEFT JOIN followers f ON f."userId"=$1
  WHERE posts."userId" = f."followerId" OR posts."userId"=$1
  UNION
  SELECT p.id, p.text , p.link, r.date, owners.id as "userId",  u.name as "reposterName",
  owners.name as "userName", owners.picture as picture, r."userId" as "reposterId"
  FROM reposts r
  JOIN posts p ON r."postId" = p.id
  JOIN users u ON r."userId" = u.id
  JOIN followers f ON f."followerId" = u.id
  JOIN users owners 
  ON owners.id = p."userId"
  WHERE f."userId" = $1
  ORDER BY date DESC
  LIMIT 10 
  ${offsetQuery}
  `, [parseInt(userId)])

  return array.rows
}

export const timelineRepository = {
  getPosts,
  getPostsByUserId,
  getRePosts,
  improvedGetPosts
}