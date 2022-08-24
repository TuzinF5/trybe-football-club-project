import * as chai from 'chai';
import { IPayloadJwt } from '../interfaces/IPayloadJwt';
import BcryptService from '../utils/BcryptService';
import JwtService from '../utils/JwtService';

const { expect } = chai;

const payload = { id: 1, role: 'role', email: 'email@email.com' }

describe('Testes unitários', () => {
  describe('Class JwtService', () => {
    describe('Quando usar a função sign', () => {
      it('Ela deve retornar um token', () => {
        const token = JwtService.sign(payload, 'SECRET');

        const result = JwtService.decode(token) as IPayloadJwt;

        expect(token).to.be.a('string');
        expect(result.payload.id).to.be.equal(1);
        expect(result.payload.email).to.be.equal('email@email.com');
        expect(result.payload.role).to.be.equal('role');
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
