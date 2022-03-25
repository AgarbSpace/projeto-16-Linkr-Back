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

export const publicationRepository = {
  postPublication,
  returnHashtagIdArray,
  getPublicationId,
  insertIntoHashtagPost,
}