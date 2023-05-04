import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateUserResponseDto,
  GetUserResponseDto,
} from '../../../../packages/common';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    @Inject('AUTHENTICATION')
    private readonly authenticationClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createAuthenticationDto: CreateUserDto) {
    return this.authenticationClient.send<CreateUserResponseDto, any>(
      { cmd: 'create' },
      createAuthenticationDto,
    );
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.authenticationClient.send<GetUserResponseDto, any>(
      { cmd: 'findOne' },
      email,
    );
  }
}
