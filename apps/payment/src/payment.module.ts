import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MailModule } from '@lib/mail';

@Module({
  imports: [MailModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
