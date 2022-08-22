import Matche from '../database/models/Matche';

export interface IMatcheService {
  findAll(): Promise<Matche[]>;
  searchByTerm(inProgress: boolean): Promise<Matche[]>;
}
