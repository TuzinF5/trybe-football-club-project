import { NextFunction, Request, Response } from 'express';
import { IStatusMessage } from '../interfaces/IStatusMessage';

export default class ErrorMiddleware {
  static handleErrors(
    err: IStatusMessage,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    console.log(err.message);

    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({ message: err.message });
  }
}
