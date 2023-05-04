import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [AuthenticationModule, PaymentModule],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
