import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('AUTHENTICATION') private authenticationClient: ClientProxy,
  ) {}

  getHello() {
    return this.authenticationClient.send<string, any>(
      { cmd: 'getHello' },
      'TEST',
    );
  }
}
