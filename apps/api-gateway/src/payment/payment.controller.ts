import { Controller, Post, Body, Inject, SetMetadata } from '@nestjs/common';
import { CreatePaymentDto } from '@common/payment';
import { ClientProxy } from '@nestjs/microservices';

@Controller('payment')
export class PaymentController {
  constructor(@Inject('PAYMENT') private readonly paymentClient: ClientProxy) {}

  @Post('checkout')
  @SetMetadata('secured', false)
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentClient.send({ cmd: 'checkout' }, createPaymentDto);
  }
}
