import { Controller } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { EventPattern } from '@nestjs/microservices';
import { SendMailDto } from '@common/mailer';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @EventPattern('MAILER')
  sendMail(data: SendMailDto): boolean {
    return this.mailerService.sendMail(data);
  }
}
