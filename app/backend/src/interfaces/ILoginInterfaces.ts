export interface ILoginRequestBody {
  email: string;
  password: string;
}

export interface ILoginService {
  login({ email, password }: ILoginRequestBody): Promise<string>;
}
