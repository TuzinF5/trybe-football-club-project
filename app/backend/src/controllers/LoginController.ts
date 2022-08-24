import { Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import JwtService from '../utils/JwtService';
import { ILoginService } from '../interfaces/ILoginInterfaces';
import HandleTheError from '../utils/HandleTheError';
import { IPayloadJwt } from '../interfaces/IPayloadJwt';

export default class LoginController {
  private _jwtSecret: Secret = process.env.JWT_SECRET as Secret;
  private _token: string;

  constructor(private _loginService: ILoginService) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    this._token = await this._loginService.login({ email, password });

    return res.status(200).json({ token: this._token });
  }

  public getRole(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new HandleTheError(400, 'Token does not exist!');
    }

    const {
      payload: { role },
    } = JwtService.verify(authorization, this._jwtSecret) as IPayloadJwt;

    return res.status(200).json({ role });
  }
}
