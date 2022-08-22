import Matche from '../database/models/Matche';

export interface IMatche {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatcheService {
  findAll(): Promise<Matche[]>;
  searchByTerm(inProgress: boolean): Promise<Matche[]>;
  create(data: IMatche): Promise<Matche>;
}
