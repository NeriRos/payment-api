import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { AuthenticationService } from '@app/authentication/src/authentication.service';

@Module({
  imports: [AuthenticationService],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
