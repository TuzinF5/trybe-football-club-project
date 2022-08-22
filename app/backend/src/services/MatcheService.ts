import Team from '../database/models/Team';
import Matche from '../database/models/Matche';

export default class MatcheService {
  private _matches: Promise<Matche[]>;

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
}
