import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { SendEmailDto } from '@app/mail/src/send-email.dto';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @EventPattern('send-email')
  async sendEmail(data: SendEmailDto) {
    console.log('GOT ITTT');
    return this.mailService.sendEmail(data);
  }

  @MessagePattern({ cmd: 'test' })
  async test(data: SendEmailDto) {
    console.log('GOT ITTT');
    return 'Sdds';
  }
}
