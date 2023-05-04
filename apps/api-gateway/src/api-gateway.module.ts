import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [AuthenticationModule, PaymentModule],
})
export class ApiGatewayModule {}
