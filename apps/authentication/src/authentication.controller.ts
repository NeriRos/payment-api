import { Controller } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @MessagePattern({ cmd: 'create' })
  create(user: any) {
    return this.authenticationService.create(user);
  }

  @MessagePattern({ cmd: 'findOne' })
  findOne(email: string) {
    return this.authenticationService.findOne(email);
  }

  @MessagePattern({ cmd: 'login' })
  login(loginParams: { email: string; password: string }) {
    return this.authenticationService.login(loginParams.email, loginParams.password);
  }
}
