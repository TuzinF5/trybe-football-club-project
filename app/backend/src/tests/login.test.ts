import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import User from '../database/models/User';
import { app } from '../app';
import JwtService from '../services/JwtService';
import BcryptService from '../services/BcrptService';

chai.use(chaiHttp);

const { expect } = chai;

const validData = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  // senha: secret_admin
};

const tokenMock =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2NjA4NTc3Njl9.O5BSakwxUBcu2Bn6n1wC2ukxJkq6y7EoHR1CpOAzOs0';

describe('Login', () => {
  describe('Quando acessar a rota "/login" com dados válidos no front-end', () => {
    beforeEach(() => {
      Sinon.stub(User, 'findOne').resolves(validData as User);
      Sinon.stub(BcryptService, 'compare').resolves(true);
      Sinon.stub(JwtService, 'sign').returns(tokenMock);
    });

    afterEach(() => {
      Sinon.restore();
    });

    it('A rota deve retornar um status http 200', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

      expect(response.status).to.be.equal(200);
    });

    it('A rota deve retornar um token contendo uma string', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

      expect(response.body).to.be.haveOwnProperty('token');
      expect(response.body.token).to.be.a('string');
    });
  });
});
