import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import {signInRepository} from '../repositories/signInRepository.js';

export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await signInRepository.findUser(email);
    // console.log(user.rows[0].email)
    if (!user.rows[0]) {
        console.log("asasdasdadsa")
      res.sendStatus(401);
    }
    
    if (bcrypt.compareSync(password, user.rows[0].passwordHash)){
        const token = uuid();
        await signInRepository.insertToken(token, user.rows[0].id)
        res.send(token)
    }
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
  res.sendStatus(401);
}