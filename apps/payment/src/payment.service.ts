import { HttpStatus, Injectable } from '@nestjs/common';
import { IPaymentResponse } from '@common/payment/payment-response';

@Injectable()
export class PaymentService {
  checkout(data: any): IPaymentResponse {
    return {
      status: HttpStatus.OK,
      message: 'payment_checkout_success',
      data: null,
      errors: null,
    };
  }
}
