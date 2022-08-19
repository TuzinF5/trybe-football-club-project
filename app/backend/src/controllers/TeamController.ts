import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  static async findAll(_req: Request, res: Response) {
    const teams = await TeamService.findAll();

    return res.status(200).json(teams);
  }

  static async findByPk(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamService.findByPk(Number(id));

    return res.status(200).json(team);
  }
}
