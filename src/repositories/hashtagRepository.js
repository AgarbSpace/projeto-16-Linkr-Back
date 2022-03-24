import connection from "../database.js"

async function getHashtagRanking(limit) {

  const hashtagList = await connection.query(`
  SELECT "hashtagId" , COUNT("hashtagId") as count, hashtags.name
  FROM "hashtagPost"
  JOIN hashtags ON hashtags.id = "hashtagPost"."hashtagId"
  GROUP BY "hashtagId", hashtags.name
  ORDER BY count DESC
  LIMIT $1
    `, [limit])

  return hashtagList.rows
}

export const hashtagRepository = {
  getHashtagRanking,
}