import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  HttpStatus,
  HttpException,
  Query,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';
import {
  CreateUserDto,
  CreateUserResponseDto,
  GetUserResponseDto,
  IAuthenticationResponse,
} from '@common/authentication';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    @Inject('AUTHENTICATION')
    private readonly authenticationClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createAuthenticationDto: CreateUserDto): Promise<CreateUserResponseDto> {
    const request = this.authenticationClient.send({ cmd: 'create' }, createAuthenticationDto);
    const createUserResponse: IAuthenticationResponse = await firstValueFrom(request);

    if (createUserResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          data: null,
          message: createUserResponse.message,
          errors: createUserResponse.errors,
        },
        createUserResponse.status,
      );
    }

    return {
      status: createUserResponse.status,
      message: createUserResponse.message,
      data: createUserResponse.data,
      errors: null,
    };
  }

  @Get()
  async findOne(@Query('email') email: string): Promise<GetUserResponseDto> {
    const request = this.authenticationClient.send({ cmd: 'findOne' }, email);
    const getUserResponse: IAuthenticationResponse = await firstValueFrom(request);

    if (getUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          data: null,
          message: getUserResponse.message,
          errors: getUserResponse.errors,
        },
        getUserResponse.status,
      );
    }

    return {
      status: getUserResponse.status,
      message: getUserResponse.message,
      data: getUserResponse.data,
      errors: null,
    };
  }
}
