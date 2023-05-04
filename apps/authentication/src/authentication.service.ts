import { User } from './entities/user.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserResponseDto, GetUserResponseDto } from '@common/authentication';

@Injectable()
export class AuthenticationService {
  users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async create(userParams: any): Promise<CreateUserResponseDto> {
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

    const token = await this.createToken(user);

    return {
      status: HttpStatus.CREATED,
      message: 'user_create_success',
      data: { user, token: token.access_token },
      errors: null,
    };
  }

  private async createToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
