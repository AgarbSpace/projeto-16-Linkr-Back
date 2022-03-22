import bcrypt from 'bcrypt';

export async function signUp(request, response) {
    const user = request.body;
  
    try {
      const existingUsers = await connection.query('SELECT * FROM users WHERE email=$1', [user.email]);
      if (existingUsers.rowCount > 0) {
        return response.sendStatus(409);
      }
  
      const passwordHash = bcrypt.hashSync(user.password, 10);
  
      await connection.query(`
        INSERT INTO 
          users(email, password, username, picture) 
        VALUES ($1, $2, $3, $4)
      `, [user.email, passwordHash, user.username, user.url])
  
      response.sendStatus(201);
    } catch (error) {
      console.log(error);
      return response.sendStatus(500);
    }
  }