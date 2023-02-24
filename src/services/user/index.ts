import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { models } from '../../models'

export abstract class UserService {
  static async insert({username, password}) {
    const hashedPassword = await this.hashPassword(password)
    const user = await models.User.create({
      username,
      password: hashedPassword
    })
    return user;
  }

  static async login({username, password}): Promise<string> {
    const user = await models.User.findOne({where: {username: username}})
    if (!user) {
      console.error('User not found');
      throw 'Login error'
    }
    const validPassword = await this.validatePassword(password, user.password);
    if (!validPassword) throw 'Login error'
    const accessToken = jwt.sign({ username: user.username, userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "30m"
    });
    return accessToken;
  }

  private static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  private static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
