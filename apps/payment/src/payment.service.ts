import { HttpStatus, Injectable } from '@nestjs/common';
import { IPaymentResponse } from '@lib/common/payment/payment-response';
import { CreatePaymentDto } from '@lib/common/payment';
import { MailService } from '@lib/mail';
import { EmailTemplates } from '@lib/mail/mail.constraints';

@Injectable()
export class PaymentService {
  constructor(private mailerClient: MailService) {}

  async checkout(paymentDto: CreatePaymentDto): Promise<IPaymentResponse> {
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

    if (!paymentMade?.success)
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

    try {
      await this.mailerClient.sendEmail({
        user: paymentDto.user,
        subject: 'Payment successful',
        template: EmailTemplates.PAYMENT_SUCCESS,
        context: {
          order_id: paymentMade.orderId,
        },
      });

      console.log('EMAIL SENT');
    } catch (e) {
      if (e.code === 'EAUTH') {
        console.log("ENSURE YOU'VE ENTERED YOUR SMTP CREDENTIALS CORRECTLY IN THE .ENV FILE");
      } else {
        console.error('EMAIL FAILED', e);
      }
    }

    return {
      status: HttpStatus.OK,
      message: 'payment_checkout_success',
      data: {
        orderId: paymentMade.orderId,
      },
      errors: null,
    };
  }

  takePayment(paymentDto: CreatePaymentDto) {
    // TODO: implement payment gateway
    return {
      success: true,
      orderId: Math.random().toString(36).substring(7),
    };
  }
}
