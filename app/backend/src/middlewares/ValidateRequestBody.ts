import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import JwtService from '../services/JwtService';
import { IStatusMessage } from '../interfaces/IStatusMessage';

export default class ValidateRequestBody {
  private static _jwtSecret: Secret = process.env.JWT_SECRET as Secret;
  private static _emailValidate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/im;

  static validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return res.status(401).json({ message: 'Token does not exist' });
      }

      JwtService.verify(authorization, ValidateRequestBody._jwtSecret);

      return next();
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  static validateEmail(email: string): IStatusMessage | boolean {
    if (!email) {
      return { status: 400, message: 'All fields must be filled' };
    }
    if (!ValidateRequestBody._emailValidate.test(email)) {
      return { status: 400, message: 'The email is not in the correct format!' };
    }
    return true;
  }

  static validatePassword(password: string): IStatusMessage | boolean {
    if (!password) {
      return { status: 400, message: 'All fields must be filled' };
    }
    if (password.length < 6) {
      return {
        status: 400,
        message: 'Password must be longer than 6 characters!',
      };
    }
    return true;
  }

  static loginRequestBody(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedEmailResult = ValidateRequestBody.validateEmail(req.body.email);
      const validatedPasswordResult = ValidateRequestBody.validatePassword(req.body.password);

      if (typeof validatedEmailResult === 'object') {
        return res.status(validatedEmailResult.status)
          .json({ message: validatedEmailResult.message });
      }

      if (typeof validatedPasswordResult === 'object') {
        return res.status(validatedPasswordResult.status)
          .json({ message: validatedPasswordResult.message });
      }

      return next();
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
}
