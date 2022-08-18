import * as bcrypt from 'bcryptjs';
import { Secret } from 'jsonwebtoken';
import {
  ILoginRequestBody,
  ILoginService,
} from '../interfaces/loginInterfaces';
import User from '../database/models/User';
import { IStatusMessage } from '../interfaces/IStatusMessage';
import JwtService from './JwtService';

export default class LoginService implements ILoginService {
  private _jwtSecret: Secret = process.env.JWT_SECRET as Secret;

  async login({
    email,
    password,
  }: ILoginRequestBody): Promise<string | IStatusMessage> {
    const user: User | null = await User.findOne({ where: { email } });

    if (!user) return { status: 401, message: 'Incorrect email or password' };

    const result = bcrypt.compareSync(password, user.password);

    if (!result) return { status: 401, message: 'Incorrect email or password' };

    const payload = {
      id: user.id,
      role: user.role,
      email: user.email,
    };

    const token = JwtService.sign(payload, this._jwtSecret);

    return token;
  }
}
