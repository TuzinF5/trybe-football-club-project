import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import {
  awayTeamsMock,
  homeTeamsMock,
  resultAwayTeamsMock,
  resultHomeTeamsMock,
} from './mocks/matche';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota de Leaderboard', () => {
  afterEach(() => {
    Sinon.restore();
  });

  describe('Quando acessar a rota "/leaderboard/home"', () => {
    beforeEach(() => {
      Sinon.stub(Team, 'findAll').resolves(homeTeamsMock as Team[]);
    });

    it('A rota deve retornar um status http 200', async () => {
      const response = await chai.request(app).get('/leaderboard/home');

      expect(response.status).to.be.equal(200);
    });

    it('A rota deve retornar todos os campos e valores corretos considerando os dados iniciais do banco de dados.', async () => {
      const response = await chai.request(app).get('/leaderboard/home');

      expect(response.body).to.be.eql(resultHomeTeamsMock);
    });
  });

  describe('Quando acessar a rota "/leaderboard/away"', () => {
    beforeEach(() => {
      Sinon.stub(Team, 'findAll').resolves(awayTeamsMock as Team[]);
    });

    it('A rota deve retornar um status http 200', async () => {
      const response = await chai.request(app).get('/leaderboard/away');

      expect(response.status).to.be.equal(200);
    });

    it('A rota deve retornar todos os campos e valores corretos considerando os dados iniciais do banco de dados.', async () => {
      const response = await chai.request(app).get('/leaderboard/away');

      expect(response.body).to.be.eql(resultAwayTeamsMock);
    });
  });
});
