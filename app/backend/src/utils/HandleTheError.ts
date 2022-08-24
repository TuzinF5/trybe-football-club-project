import { IStatusMessage } from '../interfaces/IStatusMessage';

export default class HandleTheError extends Error implements IStatusMessage {
  constructor(private _status: number, private _message: string) {
    super();
  }

  public get status(): number {
    return this._status;
  }

  public get message(): string {
    return this._message;
  }
}
