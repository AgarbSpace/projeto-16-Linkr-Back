import connection from '../database.js';

export async function verifyPostMiddleware (req, res, next) {
  try {
    const verifyPost = await connection.query(`
      SELECT * FROM posts WHERE id = $1
    `, [req.params.id]);

    if (!verifyPost) return res.sendStatus(404);

    if (verifyPost.rows[0].userId !== res.locals.user.id) return res.sendStatus(401);

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}