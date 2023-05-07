import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from './send-email.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(sendEmailDto: SendEmailDto) {
    const templatePath = `${process.cwd()}/libs/mail/templates/${sendEmailDto.template}`;

    return await this.mailerService.sendMail({
      to: sendEmailDto.user.email,
      subject: sendEmailDto.subject,
      template: templatePath,
      context: sendEmailDto.context,
    });
  }
}
