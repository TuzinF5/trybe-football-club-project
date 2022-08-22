import { Request, Response } from 'express';
import { IMatcheService } from '../interfaces/IMatche';

export default class MatcheController {
  constructor(private _matcheService: IMatcheService) {}

  async findAll(_req: Request, res: Response) {
    try {
      const matches = await this._matcheService.findAll();

      return res.status(200).json(matches);
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
}
