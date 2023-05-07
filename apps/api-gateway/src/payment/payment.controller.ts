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
import { CreatePaymentDto } from '@lib/common/payment';
import { ClientProxy } from '@nestjs/microservices';
import { IPaymentResponse } from '@lib/common/payment/payment-response';
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

    return { url: `${process.env.SERVER_URL}/checkout` };
  }

  @Get('checkout')
  getCheckoutPage() {
    return 'This is the checkout page!';
  }
}
