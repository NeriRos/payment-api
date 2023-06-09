import { IUser } from '@lib/common/authentication';

export class User implements IUser {
  private readonly _password: string;
  id: string;

  constructor(public readonly email: string, password: string) {
    this._password = password;
  }

  isValidPassword(password: string) {
    return this._password === password;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
    };
  }
}
