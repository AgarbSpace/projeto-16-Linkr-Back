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

async function getPublicationById (postId) {
  const publication = await connection.query(`
    SELECT * FROM posts
    WHERE id = $1
  `, [postId])

  return publication.rows[0];
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
    `, [hashtags.rows[i].id]);
    if (verifyCitation.rowCount === 0) {
      await connection.query(`
        DELETE FROM hashtags WHERE id = $1
      `, [hashtags.rows[i].id]);
    }
  }
}

async function deletePublication (postId) {
  await connection.query(`DELETE FROM "hashtagPost" WHERE "postId" = $1`, [postId]);
  verifyHashtags();
  await connection.query(`DELETE FROM "likes" WHERE "postId" = $1`, [postId]);
  await connection.query(`DELETE FROM posts WHERE id = $1`, [postId]);
}

async function updatePublication (text, postId) {
  await connection.query(`
    UPDATE posts SET text = $2 WHERE id = $1
  `, [postId, text]);
}

async function updateHashtags (now, previous, postId) {
  const finalNow = [];
  for (let i = 0; i < now.length; i++) {
    let isEqual = false;
    for (let j = 0; j < previous.length; j++) {
      if (now[i] === previous[j]) isEqual = true;
    }
    if (!isEqual) {
      finalNow.push(i);
    }
  }

  for (let i = 0; i < finalNow.length; i++) {
    let verifyHashtag = await connection.query(`
      SELECT * FROM hashtags WHERE LOWER(name) = LOWER($1)
    `, [now[finalNow[i]]]);
    if (verifyHashtag.rowCount === 0) {
      verifyHashtag = await connection.query(`
        INSERT INTO hashtags (name) VALUES ($1) RETURNING*
      `, [now[finalNow[i]]]);
    }
    await connection.query(`
      INSERT INTO "hashtagPost" ("postId", "hashtagId") VALUES ($1, $2)
    `, [postId, verifyHashtag.rows[0].id]);
  }
  verifyHashtags();
}

export const publicationRepository = {
  postPublication,
  returnHashtagIdArray,
  getPublicationId,
  getPublicationById,
  insertIntoHashtagPost,
  verifyHashtags,
  deletePublication,
  updatePublication,
  updateHashtags,
}