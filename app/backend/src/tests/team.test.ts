import * as chai from 'chai';
import * as Sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import teamsMock from './mocks/team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota de Team', () => {
  afterEach(() => {
    Sinon.restore();
  });

  describe('Quando acessar a rota "/teams"', () => {
    beforeEach(() => {
      Sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);
    });

    it('A rota deve retornar um status http 200', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
    });

    it('A rota deve retornar um array com todos os times', async () => {
      const response = await chai.request(app).get('/teams');

      expect(response.body).to.be.eql(teamsMock);
      expect(response.body).to.be.a('array');
    });
  });

  describe('Quando acessar a rota "/teams/:id" com id igual a 1', () => {
    beforeEach(() => {
      Sinon.stub(Team, 'findByPk').resolves(teamsMock[1] as Team);
    });

    it('A rota deve retornar um status http 200', async () => {
      const response = await chai.request(app).get('/teams/1');

      expect(response.status).to.be.equal(200);
    });

    it('A rota deve retornar um objeto do time que tenha o id igual a 1', async () => {
      const response = await chai.request(app).get('/teams/1');

      expect(response.body).to.be.eql(teamsMock[1]);
      expect(response.body).to.be.a('object');
    });
  });
});
