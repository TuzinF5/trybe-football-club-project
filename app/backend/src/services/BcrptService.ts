import * as bcrypt from 'bcryptjs';

export default class BcryptService {
  static async compare(password: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(password, hash);
    return result;
  }
}
