import connection from "../database.js";

export async function postFollowOrUnfollowQuery(userId,followerId) {
    try {
      const verification = await connection.query(`
        SELECT * FROM followers
        WHERE "userId" = $1 AND "followerId" = $2
      `, [userId, followerId]);
      return verification.rows
    } catch (error) {
      console.log(error);
    }
}

export async function postFollowQuery(userId,followerId) {
    try {
      await connection.query(`
        INSERT INTO followers ("userId", "followerId")
        VALUES ($1, $2)
      `, [userId, followerId]);
    } catch (error) {
      console.log(error);
    }
}

export async function postUnfollowQuery(userId,followerId) {
    try {
      await connection.query(`
        DELETE FROM followers
        WHERE "userId" = $1 AND "followerId" = $2
      `, [userId, followerId]);
    } catch (error) {
      console.log(error);
    }
}

export async function getAllFollowsQuery(userId) {
  try {
    const verification = await connection.query(`
      SELECT * FROM followers
      WHERE "userId" = $1
    `, [userId]);
    return verification.rows
  } catch (error) {
    console.log(error);
  }
}


export async function verifyFollowByIdsQuery(followerId, userId) {
  try {
    const verification = await connection.query(`
      SELECT * FROM followers
      WHERE "followerId" = $1 AND "userId" = $2
    `, [followerId, userId]);
    return verification.rows
  } catch (error) {
    console.log(error);
  }
}

export async function verifyIfUserFollowsAnyone(userId) {
  try {
    const verification = await connection.query(`
      SELECT * FROM followers WHERE "userId" = $1
    `, [userId]);
    return verification.rows;
  } catch (err) {
    console.log(err);
  }
}