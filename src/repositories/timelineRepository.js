import connection from "../database.js";

async function getPosts(){
    return connection.query(`
    SELECT posts.*, posts.id AS "id", users.id AS "userId", users.name AS "userName",
    users.picture AS picture
    FROM posts
    JOIN users ON users.id = posts."userId"
    `);
}

export const timelineRepository = {
    getPosts
}