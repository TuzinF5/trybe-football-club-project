import { Op } from 'sequelize';
import Team from '../database/models/Team';
import Matche from '../database/models/Matche';
import { IMatche } from '../interfaces/IMatche';

interface IReturnFindAndCountAllTeam {
  rows: Team[];
  count: number;
}

export default class MatcheService {
  private _matches: Promise<Matche[]>;
  private _matcheCreated: Matche;
  private _result: number;
  private _teams: IReturnFindAndCountAllTeam;

  public async findAll() {
    this._matches = Matche.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return this._matches;
  }

  public async searchByTerm(inProgress: boolean) {
    this._matches = Matche.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress },
    });

    return this._matches;
  }

  public async create({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
  }: IMatche) {
    this._matcheCreated = await Matche.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return this._matcheCreated as Matche;
  }

  public async update(id: number) {
    [this._result] = await Matche.update(
      { inProgress: false },
      { where: { id } },
    );

    return this._result;
  }

  public async findAndCountAll(teams: number[]) {
    this._teams = await Team.findAndCountAll({
      where: {
        id: {
          [Op.or]: [teams],
        },
      },
    });

    return this._teams.count;
  }
}
