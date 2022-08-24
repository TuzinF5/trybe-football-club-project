import { Request, Response } from 'express';
import JwtService from '../utils/JwtService';
import { ILoginService } from '../interfaces/ILoginInterfaces';
import { IUserPayloadJwt } from '../interfaces/IUser';

export default class LoginController {
  private _token: string;

  constructor(private _loginService: ILoginService) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    this._token = await this._loginService.login({ email, password });

    return res.status(200).json({ token: this._token });
  }

  static loginValidate(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return res.status(401).json({ message: 'Token does not exist' });
      }

      const { role } = JwtService.decode(authorization) as IUserPayloadJwt;

      return res.status(200).json({ role });
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
}
