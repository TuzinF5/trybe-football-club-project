export interface IUserPayloadJwt {
  id: number;
  role: string;
  email: string;
}

export interface IUser extends IUserPayloadJwt {
  username: string;
  password: string;
}
