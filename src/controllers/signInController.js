import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import {signInRepository} from '../repositories/signInRepository.js';

export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await signInRepository.findUser(email);

    if (!user.rows[0]) {
      res.sendStatus(401);
    }
    
    if (bcrypt.compareSync(password, user.rows[0].passwordHash)){
        const token = uuid();
        const data = {token: token, userId: user.rows[0].id}
        await signInRepository.insertToken(token, user.rows[0].id)
        res.send(data)
    }
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
  res.sendStatus(401);
}