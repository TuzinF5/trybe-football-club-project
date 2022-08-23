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

      if (homeTeam === awayTeam) {
        return res.status(401)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }

      const result = await this._matcheService.findAndCountAll([homeTeam, awayTeam]);

      if (result !== 2) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }

      const matcheCreated = await
      this._matcheService.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });

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

  async updateResult(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;

      await this._matcheService.updateResult(Number(id), homeTeamGoals, awayTeamGoals);

      return res.status(200).json({ message: 'Updated' });
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  }

  async homeTeamRankings(_req: Request, res: Response) {
    try {
      const matches = await this._matcheService.homeTeamRankings();

      return res.status(200).json(matches);
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
}
