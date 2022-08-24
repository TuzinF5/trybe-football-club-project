import { NextFunction, Request, Response } from 'express';
import HandleTheError from '../utils/HandleTheError';

export default class ErrorMiddleware {
  static handleErrors(
    err: HandleTheError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }

    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}
