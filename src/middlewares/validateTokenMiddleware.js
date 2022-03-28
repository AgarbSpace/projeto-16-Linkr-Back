import connection from "../database.js";

export async function validateTokenMiddleware(req, res, next) {

  const authorization = req.headers.authorization;

  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);

  try {

    const sessions = await connection.query(`SELECT * FROM sessions WHERE token=$1`, [token]);

    const session = sessions.rows[0]

    if (!session) return res.sendStatus(401);

    const users = await connection.query(`SELECT * FROM users WHERE id=$1`, [session.userId]);
    const user = users.rows[0];
    if (!user) return res.sendStatus(401);

    res.locals.user = user;

    next();

  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }

}