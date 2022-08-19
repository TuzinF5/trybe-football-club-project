import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import User from '../database/models/User';
import { app } from '../app';
import JwtService from '../services/JwtService';
import BcryptService from '../services/BcrptService';
import ValidateRequestBody from '../middlewares/ValidateRequestBody';
import { tokenMock, validData } from './mocks/login';

chai.use(chaiHttp);

const { expect } = chai;

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

  describe('Quando acessar a rota "/login" e por algum motivo gerar um erro', () => {
    describe('Na camada de controller', () => {
      beforeEach(() => {
        Sinon.stub(User, 'findOne').rejects();
      });

      it('A rota deve retornar um status http 500', async () => {
        const response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        });

        expect(response.status).to.be.equal(500);
      });

      it('A rota deve retornar no corpo da resposta um objeto com o atributo message, contendo a mensagem do erro', async () => {
        const response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        });

        expect(response.body).to.be.haveOwnProperty('message');
        expect(response.body.message).to.be.a('string');
      });
    });

    describe('Na camada de middleware', () => {
      beforeEach(() => {
        Sinon.stub(ValidateRequestBody, 'validateEmail').rejects();
        Sinon.stub(ValidateRequestBody, 'validatePassword').rejects();
      });

      it('A rota deve retornar um status http 500', async () => {
        const response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        });

        expect(response.status).to.be.equal(500);
      });

      it('A rota deve retornar no corpo da resposta um objeto com o atributo message, contendo a mensagem do erro', async () => {
        const response = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        });

        expect(response.body).to.be.haveOwnProperty('message');
        expect(response.body.message).to.be.a('string');
      });
    });
  });

  describe('Quando acessar a rota "/login/validate" com token válido', () => {
    it('A rota deve retornar um status http 200', async () => {
      const response = await chai.request(app).get('/login/validate').set({
        Authorization: tokenMock,
      });

      expect(response.status).to.be.equal(200);
    });

    it('A rota deve retornar um objeto contendo a "role" do usuario', async () => {
      const response = await chai.request(app).get('/login/validate').set({
        Authorization: tokenMock,
      });

      expect(response.body).to.be.haveOwnProperty('role');
      expect(response.body.role).to.be.a('string');
    });
  });

  describe('Quando acessar a rota "/login/validate" sem um token', () => {
    it('A rota deve retornar um status http 401', async () => {
      const response = await chai.request(app).get('/login/validate').set({});

      expect(response.status).to.be.equal(401);
    });

    it('A rota deve retornar no corpo de resposta "{ message: "Token does not exist" }"', async () => {
      const response = await chai.request(app).get('/login/validate').set({});

      expect(response.body).to.be.haveOwnProperty('message');
      expect(response.body.message).to.be.a('string');
      expect(response.body.message).to.be.equal('Token does not exist');
    });
  });

  describe('Quando acessar a rota "/login/validate" e por algum motivo gerar um erro', () => {
    describe('Na camada de controller', () => {
      it('A rota deve retornar um status http 500', async () => {
        const response = await chai.request(app).get('/login/validate').set({
          Authorization: 'tokenMock',
        });

        expect(response.status).to.be.equal(500);
      });

      it('A rota deve retornar no corpo da resposta um objeto com o atributo message, contendo a mensagem do erro', async () => {
        const response = await chai.request(app).get('/login/validate').set({
          Authorization: 'tokenMock',
        });

        expect(response.body).to.be.haveOwnProperty('message');
        expect(response.body.message).to.be.a('string');
      });
    });
  });
});
