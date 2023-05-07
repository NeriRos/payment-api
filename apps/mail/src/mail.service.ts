import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from '@app/mail/src/send-email.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(sendEmailDto: SendEmailDto) {
    console.log('TESTSTST');
    return await this.mailerService.sendMail({
      to: sendEmailDto.user.email,
      subject: sendEmailDto.subject,
      template: `./${sendEmailDto.template}`,
      context: sendEmailDto.context,
    });
  }
}
