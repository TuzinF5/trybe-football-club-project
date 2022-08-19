import * as chai from 'chai';
import { IUserPayloadJwt } from '../interfaces/IUser';
import BcryptService from '../services/BcrptService';
import JwtService from '../services/JwtService';

const { expect } = chai;

describe('Testes unitários', () => {
  describe('Class JwtService', () => {
    describe('Quando usar a função sign', () => {
      it('Ela deve retornar um token', () => {
        const token = JwtService.sign(
          { id: 1, role: 'role', email: 'email@email.com' },
          'SECRET'
        );

        const result = JwtService.decode(token) as IUserPayloadJwt;

        expect(token).to.be.a('string');
        expect(result.id).to.be.equal(1);
        expect(result.email).to.be.equal('email@email.com');
        expect(result.role).to.be.equal('role');
      });
    });
  });

  describe('Class BcryptService', () => {
    describe('Quando usar a função compare com dados válidos', () => {
      it('Ela deve retornar true', async () => {
        const result = await BcryptService.compare(
          'secret_admin',
          '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
        );

        expect(result).to.be.true;
      });
    });

    describe('Quando usar a função compare com dados inválidos', () => {
      it('Ela deve retornar false', async () => {
        const result = await BcryptService.compare(
          'xablau',
          '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
        );

        expect(result).to.be.false;
      });
    });
  });
});
