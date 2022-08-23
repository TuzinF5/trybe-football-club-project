import * as chai from 'chai';
import * as Sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matche from '../database/models/Matche';

chai.use(chaiHttp);

const { expect } = chai;

const matchesMock = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 3,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'São Paulo',
    },
    teamAway: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Internacional',
    },
    teamAway: {
      teamName: 'Santos',
    },
  },
];

describe('Rota de Matche', () => {
  afterEach(() => {
    Sinon.restore();
  });

  describe('Quando acessar a rota GET "/matches"', () => {
    beforeEach(() => {
      Sinon.stub(Matche, 'findAll').resolves(matchesMock as Matche[]);
    });

    it('A rota deve retornar um status http 200', async () => {
      const response = await chai.request(app).get('/matches');

      expect(response.status).to.be.equal(200);
    });

    it('A rota deve retornar um array com todas as partidas', async () => {
      const response = await chai.request(app).get('/matches');

      expect(response.body).to.be.eql(matchesMock);
      expect(response.body).to.be.a('array');
    });
  });
});
