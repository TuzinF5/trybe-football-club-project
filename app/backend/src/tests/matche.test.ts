import * as chai from 'chai';
import * as Sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matche from '../database/models/Matche';
import { matchesMock, matchesMockInProgressrue } from './mocks/matche';

chai.use(chaiHttp);

const { expect } = chai;

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

    it('A rota deve retornar um array com todas as partidas finalizadas', async () => {
      const response = await chai.request(app).get('/matches');

      expect(response.body).to.be.eql(matchesMock);
      expect(response.body).to.be.a('array');
    });
  });

  describe('Quando acessar a rota GET "matches?inProgress=true"', () => {
    beforeEach(() => {
      Sinon.stub(Matche, 'findAll').resolves(matchesMockInProgressrue as Matche[]);
    });

    it('A rota deve retornar um status http 200', async () => {
      const response = await chai.request(app).get('/matches?inProgress=truee');

      expect(response.status).to.be.equal(200);
    });

    it('A rota deve retornar um array com todas as partidas em andamento', async () => {
      const response = await chai.request(app).get('/matches');

      expect(response.body).to.be.eql(matchesMockInProgressrue);
      expect(response.body).to.be.a('array');
    });
  });
});
