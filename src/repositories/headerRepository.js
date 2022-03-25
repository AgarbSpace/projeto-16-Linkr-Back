import connection from "../database.js"

export async function getProfilePicture(userId) {
  const pictureResult = await connection.query(`
    SELECT users.picture
    FROM users
    WHERE id=$1
  `,[userId])

  const [picture] = pictureResult.rows
  return  picture.picture
}