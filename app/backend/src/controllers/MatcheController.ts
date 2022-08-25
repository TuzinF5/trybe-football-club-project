import { Request, Response } from 'express';
import HandleTheError from '../utils/HandleTheError';
import { IMatcheService } from '../interfaces/IMatche';

export default class MatcheController {
  constructor(private _matcheService: IMatcheService) {}

  async findAll(req: Request, res: Response) {
    let matches;
    const { inProgress } = req.query;

    if (!inProgress) {
      matches = await this._matcheService.findAll();
    } else {
      const inPgs = inProgress === 'true';
      matches = await this._matcheService.searchByTerm(inPgs);
    }

    return res.status(200).json(matches);
  }

  async create(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    if (homeTeam === awayTeam) {
      throw new HandleTheError(401, 'It is not possible to create a match with two equal teams');
    }

    const result = await this._matcheService.findAndCountAll([homeTeam, awayTeam]);

    if (result !== 2) {
      throw new HandleTheError(404, 'There is no team with such id!');
    }

    const matcheCreated = await
    this._matcheService.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });

    return res.status(201).json(matcheCreated);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    await this._matcheService.update(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }

  async updateResult(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await this._matcheService.updateResult(Number(id), homeTeamGoals, awayTeamGoals);

    return res.status(200).json({ message: 'Updated' });
  }

  async homeTeamRankings(_req: Request, res: Response) {
    const matches = await this._matcheService.homeTeamRankings();

    return res.status(200).json(matches);
  }

  async awayTeamRankings(_req: Request, res: Response) {
    const matches = await this._matcheService.awayTeamRankings();

    return res.status(200).json(matches);
  }
}
