import Team from '../database/models/Team';
import Matche from '../database/models/Matche';
import { IMatche } from '../interfaces/IMatche';

export default class MatcheService {
  private _matches: Promise<Matche[]>;
  private _matcheCreated: Matche;
  private _result: number;

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
    [this._result] = await Matche.update({ inProgress: true }, { where: { id } });

    return this._result;
  }
}
