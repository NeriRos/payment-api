import { Controller, Get, Inject } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject('AUTHENTICATION') private authenticationClient: ClientProxy,
  ) {}

  @Get()
  async getHello() {
    return this.authenticationClient.send<string, any>(
      { cmd: 'getHello' },
      'TEST',
    );
    // return this.apiGatewayService.getHello();
  }
}
