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

describe('Rota de Login', () => {
  afterEach(() => {
    Sinon.restore();
  });

  describe('Quando acessar a rota "/login" com dados válidos no front-end', () => {
    beforeEach(() => {
      Sinon.stub(User, 'findOne').resolves(validData as User);
      Sinon.stub(BcryptService, 'compare').resolves(true);
      Sinon.stub(JwtService, 'sign').returns(tokenMock);
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

  describe('Quando acessar a rota "/login" com dados inválidos no front-end', () => {
    describe('Sem o campo email', () => {
      it('A rota deve retornar um status http 400', async () => {
        const response = await chai.request(app).post('/login').send({
          password: 'secret_admin',
        });

        expect(response.status).to.be.equal(400);
      });

      it('A rota deve retornar no corpo da resposta "{ message: "All fields must be filled" }"', async () => {
        const response = await chai.request(app).post('/login').send({
          password: 'secret_admin',
        });

        expect(response.body).to.be.haveOwnProperty('message');
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.be.equal('All fields must be filled');
      });
    });

    describe('Sem o campo password', () => {
      it('A rota deve retornar um status http 400', async () => {
        const response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
        });

        expect(response.status).to.be.equal(400);
      });

      it('A rota deve retornar no corpo da resposta "{ message: "All fields must be filled" }"', async () => {
        const response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
        });

        expect(response.body).to.be.haveOwnProperty('message');
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.be.equal('All fields must be filled');
      });
    });

    describe('Com um email no formato inválido', () => {
      it('A rota deve retornar um status http 401', async () => {
        const response = await chai.request(app).post('/login').send({
          email: 'admin.com',
          password: 'secret_admin',
        });

        expect(response.status).to.be.equal(401);
      });

      it('A rota deve retornar no corpo da resposta "{ message: "Email is not in the correct format" }"', async () => {
        const response = await chai.request(app).post('/login').send({
          email: 'admin.com',
          password: 'secret_admin',
        });

        expect(response.body).to.be.haveOwnProperty('message');
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.be.equal(
          'Email is not in the correct format'
        );
      });
    });

    describe('Com um password no formato inválido', () => {
      it('A rota deve retornar um status http 401', async () => {
        const response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'secre',
        });

        expect(response.status).to.be.equal(401);
      });

      it('A rota deve retornar no corpo da resposta "{ message: "Password must be at least 6 characters long" }"', async () => {
        const response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'secre',
        });

        expect(response.body).to.be.haveOwnProperty('message');
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.be.equal(
          'Password must be at least 6 characters long'
        );
      });
    });

    describe('Com um email inválido', () => {
      beforeEach(() => {
        Sinon.stub(User, 'findOne').resolves(null);
      });

      it('A rota deve retornar um status http 401', async () => {
        const response = await chai.request(app).post('/login').send({
          email: 'admin@xablau.com',
          password: 'secret_admin',
        });

        expect(response.status).to.be.equal(401);
      });

      it('A rota deve retornar no corpo da resposta "{ message: "Incorrect email or password" }"', async () => {
        const response = await chai.request(app).post('/login').send({
          email: 'admin@xablau.com',
          password: 'secret_admin',
        });

        expect(response.body).to.be.haveOwnProperty('message');
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.be.equal(
          'Incorrect email or password'
        );
      });
    });

    describe('Com um password inválido', () => {
      beforeEach(() => {
        Sinon.stub(User, 'findOne').resolves(validData as User);
        Sinon.stub(BcryptService, 'compare').resolves(false);
      });

      it('A rota deve retornar um status http 401', async () => {
        const response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'secret',
        });

        expect(response.status).to.be.equal(401);
      });

      it('A rota deve retornar no corpo da resposta "{ message: "Incorrect email or password" }"', async () => {
        const response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'secret',
        });

        expect(response.body).to.be.haveOwnProperty('message');
        expect(response.body.message).to.be.a('string');
        expect(response.body.message).to.be.equal(
          'Incorrect email or password'
        );
      });
    });
  });
});
