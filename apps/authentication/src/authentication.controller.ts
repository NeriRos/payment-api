import { Controller, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @MessagePattern({ cmd: 'getHello' })
  getHello(data): string {
    console.log(data);
    return this.authenticationService.getHello();
  }
}
