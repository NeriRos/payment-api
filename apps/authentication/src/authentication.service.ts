import { User } from './entities/user.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserResponseDto, GetUserResponseDto } from '@package/common';

@Injectable()
export class AuthenticationService {
  users: User[] = [];

  create(userParams: any): CreateUserResponseDto {
    if (this.findOne(userParams.email).data?.user)
      return {
        status: HttpStatus.CONFLICT,
        message: 'user_create_conflict',
        data: null,
        errors: {
          email: {
            message: 'Email already exists',
            path: 'email',
          },
        },
      };

    const user = new User(userParams.email, userParams.password);
    this.users.push(user);

    const token = this.createToken(user);

    return {
      status: HttpStatus.CREATED,
      message: 'user_create_success',
      data: { user, token },
      errors: null,
    };
  }

  private createToken(user: User): string {
    return 'token';
  }

  findOne(email: string): GetUserResponseDto {
    const user = this.users.filter((user) => user.email === email)[0];
    if (!user)
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'user_not_found',
        data: null,
        errors: {
          not_found: "user doesn't exist",
        },
      };

    return {
      status: HttpStatus.OK,
      message: 'user_find_success',
      data: { user },
      errors: null,
    };
  }
}
