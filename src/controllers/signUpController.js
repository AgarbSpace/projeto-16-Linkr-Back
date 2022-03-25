import bcrypt from 'bcrypt';
import { signUpRepository } from '../repositories/signUpRepository.js';

export async function signUp(request, response) {
  const user = request.body;
  try {
    const existingUsers = await signUpRepository.findUser(user.email);
    if (existingUsers.rowCount > 0) {
      return response.sendStatus(409);

    }

    const passwordHash = bcrypt.hashSync(user.password, 10);

    await signUpRepository.insertUser(user.email, passwordHash, user.name, user.url);

    response.sendStatus(201);
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
}