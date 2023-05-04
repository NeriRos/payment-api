import { IUser } from '@package/common';

export class User implements IUser {
  private readonly _password: string;
  id: string;

  constructor(public readonly email: string, readonly password: string) {
    this._password = password;
  }

  isValidPassword(password: string) {
    return this._password === password;
  }
}
