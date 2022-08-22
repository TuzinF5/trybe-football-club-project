import { Request, Response } from 'express';
import { IMatcheService } from '../interfaces/IMatche';

export default class MatcheController {
  constructor(private _matcheService: IMatcheService) {}

  async findAll(req: Request, res: Response) {
    try {
      let matches;
      const { inProgress } = req.query;

      if (!inProgress) {
        matches = await this._matcheService.findAll();
      } else {
        const inPgs = inProgress === 'true';
        matches = await this._matcheService.searchByTerm(inPgs);
      }

      return res.status(200).json(matches);
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

      const matcheCreated = await this._matcheService.create({
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
      });

      return res.status(201).json(matcheCreated);
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this._matcheService.update(Number(id));

      return res.status(200).json({ message: 'Finished' });
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
}
