export default class HandleTheError extends Error {
  constructor(private _status: number, private _message: string) {
    super();
  }

  public get status() {
    return this._status;
  }

  public get message() {
    return this._message;
  }
}
