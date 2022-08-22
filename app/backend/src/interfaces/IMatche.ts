import Matche from '../database/models/Matche';

export interface IMatcheService {
  findAll(): Promise<Matche[]>;
}
