import * as bcrypt from 'bcryptjs';

export default class BcryptService {
  public static async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
