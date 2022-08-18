import { Request, Response } from 'express';
import { IStatusMessage } from '../interfaces/IStatusMessage';
import { ILoginService } from '../interfaces/loginInterfaces';

export default class LoginController {
  constructor(public loginService: ILoginService) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const token = await this.loginService.login({ email, password });

      if (typeof token === 'object') {
        const { status, message } = token as IStatusMessage;
        return res.status(status).json({ message });
      }

      return res.status(200).json({ token });
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
}
