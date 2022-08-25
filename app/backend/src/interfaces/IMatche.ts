import Matche from '../database/models/Matche';

export interface IMatche {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface ITeamRankings {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export interface IMatcheService {
  findAll(): Promise<Matche[]>;
  searchByTerm(inProgress: boolean): Promise<Matche[]>;
  create(data: IMatche): Promise<Matche>;
  update(id: number): Promise<number>;
  findAndCountAll(teams: number[]): Promise<number>;
  updateResult(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number
  ): Promise<number>;
  homeTeamRankings(): Promise<ITeamRankings[]>;
  awayTeamRankings(): Promise<ITeamRankings[]>;
  teamRanking(): Promise<ITeamRankings[]>;
}
