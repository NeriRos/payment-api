import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IPaymentResponse } from '@common/payment/payment-response';
import { ClientProxy } from '@nestjs/microservices';
import { SendMailDto } from '@common/mailer';
import { CreatePaymentDto } from '@common/payment';

@Injectable()
export class PaymentService {
  constructor(@Inject('MAILER') private readonly mailerClient: ClientProxy) {}

  checkout(paymentDto: CreatePaymentDto): IPaymentResponse {
    if (!paymentDto)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'payment_checkout_failed',
        data: null,
        errors: {
          data: {
            message: 'No data provided',
            path: 'data',
          },
        },
      };

    const paymentMade = this.takePayment(paymentDto);

    if (!paymentMade)
      return {
        status: HttpStatus.PAYMENT_REQUIRED,
        message: 'payment_checkout_failed',
        data: null,
        errors: {
          credit: {
            message: 'Payment failed due to insufficient credit',
          },
        },
      };

    this.sendEmail({
      to: paymentDto.user.email,
      subject: 'Payment successful',
      template: 'payment-successful',
      data: paymentDto.data,
    });

    return {
      status: HttpStatus.OK,
      message: 'payment_checkout_success',
      data: null,
      errors: null,
    };
  }

  takePayment(paymentDto: CreatePaymentDto): boolean {
    return true;
  }

  async sendEmail(data: SendMailDto) {
    console.log('SHOUDLD SEND');
    const test = await this.mailerClient.send({ cmd: 'test' }, data);
    //
    // const test = await this.mailerClient.emit('send-email', data);
    test.subscribe((res) => console.log(res));
  }
}
