import {
  Controller,
  Post,
  Body,
  Inject,
  SetMetadata,
  Get,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { CreatePaymentDto } from '@common/payment';
import { ClientProxy } from '@nestjs/microservices';
import { IPaymentResponse } from '@common/payment/payment-response';
import { firstValueFrom } from 'rxjs';

@Controller('payment')
export class PaymentController {
  constructor(@Inject('PAYMENT') private readonly paymentClient: ClientProxy) {}

  @Post('checkout')
  @SetMetadata('secured', true)
  async create(@Body() createPaymentDto: CreatePaymentDto, @Req() req: any) {
    createPaymentDto.user = req.user;

    const checkoutResponse = await this.paymentClient.send<IPaymentResponse, any>(
      { cmd: 'checkout' },
      createPaymentDto,
    );

    const response = await firstValueFrom(checkoutResponse);

    if (response.status !== HttpStatus.OK) {
      throw new HttpException('Payment failed', HttpStatus.PAYMENT_REQUIRED);
    }

    return { url: '/checkout' };
  }

  @Get('checkout')
  getCheckoutPage() {
    return 'This is the checkout page!';
  }
}
