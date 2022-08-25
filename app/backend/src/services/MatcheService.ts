import { Op } from 'sequelize';
import Team from '../database/models/Team';
import Matche from '../database/models/Matche';
import { IMatche } from '../interfaces/IMatche';
import { IAwayTeams, IHomeTeams } from '../interfaces/IHomeTeams';
import {
  calculateAwayTeamResults,
  calculateHomeTeamResults,
  calculateOverallResults,
} from '../functions/calculateTeamResults';

interface IReturnFindAndCountAllTeam {
  rows: Team[];
  count: number;
}

export default class MatcheService {
  private _matches: Promise<Matche[]>;
  private _matcheCreated: Matche;
  private _result: number;
  private _teams: IReturnFindAndCountAllTeam;
  private _teamRankings: IHomeTeams[] | IAwayTeams[];
  private _homeTeams: Team[];
  private _awayTeams: Team[];

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

  public async updateResult(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    [this._result] = await Matche.update(
      { homeTeamGoals, awayTeamGoals },
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

  private async getHomeTeams() {
    this._homeTeams = await Team.findAll({
      attributes: { exclude: ['id'] },
      include: [
        {
          model: Matche,
          as: 'homeTeamMatches',
          attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
          where: { inProgress: false },
        },
      ],
    });

    return this._homeTeams.map((team) => ({
      teamName: team.teamName,
      homeTeamMatches: team.homeTeamMatches,
    }));
  }

  public async homeTeamRankings() {
    this._teamRankings = (await this.getHomeTeams()) as IHomeTeams[];

    const result = this._teamRankings.map((team) => calculateHomeTeamResults(team));

    return result
      .sort((a, b) => b.goalsOwn - a.goalsOwn)
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }

  private async getAwayTeams() {
    this._awayTeams = await Team.findAll({
      attributes: { exclude: ['id'] },
      include: [
        {
          model: Matche,
          as: 'awayTeamMatches',
          attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
          where: { inProgress: false },
        },
      ],
    });

    return this._awayTeams.map((team) => ({
      teamName: team.teamName,
      awayTeamMatches: team.awayTeamMatches,
    }));
  }

  public async awayTeamRankings() {
    this._teamRankings = (await this.getAwayTeams()) as IAwayTeams[];

    const result = this._teamRankings.map((team) => calculateAwayTeamResults(team));

    return result
      .sort((a, b) => b.goalsOwn - a.goalsOwn)
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }

  public async teamRanking() {
    const homeTeamRankings = await this.homeTeamRankings();
    const awayTeamRankings = await this.awayTeamRankings();

    const result = calculateOverallResults(homeTeamRankings, awayTeamRankings);

    return result
      .sort((a, b) => b.goalsOwn - a.goalsOwn)
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }
}
