import connection from "../database.js";

async function getPosts(offset){
  
    let offsetQuery = "";

    if(offset && typeof(parseInt(offset)) === 'number'){
      offsetQuery = `OFFSET ${offset}`
    }

    return connection.query(`
    SELECT posts.*, posts.id AS "id", users.id AS "userId", users.name AS "userName",
    users.picture AS picture
    FROM posts
    JOIN users ON users.id = posts."userId"
    ORDER BY id DESC
    LIMIT 10 ${offsetQuery}
    `);
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

export const timelineRepository = {
    getPosts,
    getPostsByUserId
}