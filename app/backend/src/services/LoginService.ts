import { Secret } from 'jsonwebtoken';
import HandleTheError from '../utils/HandleTheError';
import BcryptService from '../utils/BcryptService';
import JwtService from '../utils/JwtService';
import { IUserPayloadJwt } from '../interfaces/IUser';
import User from '../database/models/User';
import { ILoginRequestBody, ILoginService } from '../interfaces/ILoginInterfaces';

export default class LoginService implements ILoginService {
  private _jwtSecret: Secret = process.env.JWT_SECRET as Secret;
  private _user: User | null;
  private _passwordIsValid: boolean;
  private _token: string;
  private _payloadJwt: IUserPayloadJwt;

  public async login({ email, password }: ILoginRequestBody): Promise<string> {
    this._user = await User.findOne({ where: { email } });

    if (!this._user) {
      throw new HandleTheError(401, 'Incorrect email or password');
    }

    this._passwordIsValid = await BcryptService.compare(password, this._user.password);

    if (!this._passwordIsValid) {
      throw new HandleTheError(401, 'Incorrect email or password');
    }

    this._payloadJwt = {
      role: this._user.role,
      email: this._user.email,
    };

    this._token = JwtService.sign(this._payloadJwt, this._jwtSecret);

    return this._token;
  }
}
