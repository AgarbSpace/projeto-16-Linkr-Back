import connection from "../database.js"

async function postPublication(text, url, userId) {

  const postId = await connection.query(`
    INSERT INTO 
    posts (text, link, "userId") 
    VALUES ($1, $2, $3)
    RETURNING id
    `, [text, url, parseInt(userId)])

  return postId.rows[0].id
}

async function returnHashtagIdArray(array) {
  let hashtagIdArray = []
  for (let i = 0; i < array.length;) {
    const hashtagId = await connection.query(`
      SELECT * 
      FROM hashtags 
      WHERE LOWER(name) = LOWER($1)
      `, [array[i]])

    if (hashtagId.rows.length === 0) {
      await connection.query(`
        INSERT INTO 
        hashtags (name) 
        VALUES ($1)`, [array[i]])
    }
    else {
      hashtagIdArray.push(parseInt(hashtagId.rows[0].id))
      i++
    }
  }
  return hashtagIdArray
}

async function getPublicationId(url, userId) {

  const postId = await connection.query(`
    SELECT * FROM posts
    WHERE link = $1 AND "userId" = $2
  `, [url, parseInt(userId)])

  return postId.rows[0].id

}

function createHashtagPostQuery(array) {
  let queryPost = `
    INSERT INTO 
      "hashtagPost" ("postId", "hashtagId") 
    VALUES 
`
  let queryArray = []
  for (let i = 0; i < array.length; i++) {
    queryArray.push(`($1, $${2 + parseInt(i)})`)
  }
  queryPost += `${queryArray.join(`,`)};`
  return queryPost
}

async function insertIntoHashtagPost(hashtagIdArray, postId) {
  await connection.query(createHashtagPostQuery(hashtagIdArray), [postId, ...hashtagIdArray])
}

async function verifyHashtags () {
  const hashtags = await connection.query(`SELECT * FROM hashtags`);
  for (let i = 0; i < hashtags.rowCount; i++) {
    const verifyCitation = await connection.query(`
      SELECT * FROM "hashtagPost" WHERE "hashtagId" = $1
    `, [hashtags.rows[i]].id);

    if (!verifyCitation) {
      await connection.query(`
        DELETE FROM hashtags WHERE id = $1
      `, [hashtags.rows[i].id]);
    }
  }
}

async function deletePublication(postId) {
  await connection.query(`DELETE FROM "hashtagPost" WHERE "postId" = $1`, [postId]);
  verifyHashtags();
  await connection.query(`DELETE FROM "likes" WHERE "postId" = $1`, [postId]);
  await connection.query(`DELETE FROM posts WHERE id = $1`, [postId]);
}

export const publicationRepository = {
  postPublication,
  returnHashtagIdArray,
  getPublicationId,
  insertIntoHashtagPost,
  verifyHashtags,
  deletePublication,
}