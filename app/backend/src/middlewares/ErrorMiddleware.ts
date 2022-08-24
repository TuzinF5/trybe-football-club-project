import { NextFunction, Request, Response } from 'express';
import { IStatusMessage } from '../interfaces/IStatusMessage';

export default class ErrorMiddleware {
  static handleErrors(
    err: IStatusMessage,
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
