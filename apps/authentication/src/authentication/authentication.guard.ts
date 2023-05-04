import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('AUTHENTICATION') private readonly authenticationClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get('secured', context.getHandler());

    if (!secured) {
      return true;
    }

    const request = await context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split?.(' ')?.[1];

    if (!token) {
      return false;
    }

    try {
      const message = this.authenticationClient.send({ cmd: 'validate' }, token);
      const response = await firstValueFrom(message);

      return response?.isValid;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
