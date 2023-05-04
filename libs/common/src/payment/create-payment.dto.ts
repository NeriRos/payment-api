import { User } from '@app/authentication/src/entities/user.entity';

export class CreatePaymentDto {
  constructor(public data: any, public user?: User) {}
}
