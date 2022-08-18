import * as Jwt from 'jsonwebtoken';
import { IUserPayloadJwt } from '../interfaces/IUser';

export default class JwtService {
  static sign(payload: IUserPayloadJwt, jwtSecret: Jwt.Secret) {
    return Jwt.sign(payload, jwtSecret);
  }
}
