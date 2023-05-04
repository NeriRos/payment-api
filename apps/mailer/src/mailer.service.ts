import { Injectable } from '@nestjs/common';
import { SendMailDto } from '@common/mailer';

@Injectable()
export class MailerService {
  sendMail(data: SendMailDto): boolean {
    console.log('SENDING EMAIL', data);
    return true;
  }
}
