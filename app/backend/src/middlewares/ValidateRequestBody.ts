import { NextFunction, Request, Response } from 'express';
import { IStatusMessage } from '../interfaces/IStatusMessage';

export default class ValidateRequestBody {
  static validateEmail(email: string): IStatusMessage | boolean {
    const emailValidate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;

    if (!email) {
      return { status: 400, message: 'All fields must be filled' };
    }
    if (!emailValidate.test(email)) {
      return { status: 401, message: 'Email is not in the correct format' };
    }
    return true;
  }

  static validatePassword(password: string): IStatusMessage | boolean {
    if (!password) {
      return { status: 400, message: 'All fields must be filled' };
    }
    if (password.length < 6) {
      return {
        status: 401,
        message: 'Password must be at least 6 characters long',
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
