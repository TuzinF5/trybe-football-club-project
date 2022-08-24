import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import HandleTheError from '../utils/HandleTheError';
import JwtService from '../services/JwtService';

export default class ValidateRequestBody {
  private static _jwtSecret: Secret = process.env.JWT_SECRET as Secret;
  private static _emailValidate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/im;

  public static validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        throw new HandleTheError(400, 'Token does not exist!');
      }

      JwtService.verify(authorization, ValidateRequestBody._jwtSecret);

      return next();
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  public static validateEmail(email: string): void {
    if (!email) {
      throw new HandleTheError(400, 'All fields must be filled');
    }
    if (!ValidateRequestBody._emailValidate.test(email)) {
      throw new HandleTheError(400, 'The email is not in the correct format!');
    }
  }

  public static validatePassword(password: string): void {
    if (!password) {
      throw new HandleTheError(400, 'All fields must be filled');
    }
    if (password.length < 6) {
      throw new HandleTheError(400, 'Password must be longer than 6 characters!');
    }
  }

  public static validateLogin(req: Request, _res: Response, next: NextFunction): void {
    ValidateRequestBody.validateEmail(req.body.email);
    ValidateRequestBody.validatePassword(req.body.password);

    return next();
  }
}
