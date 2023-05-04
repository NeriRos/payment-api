import { NestFactory } from '@nestjs/core';
import { MailerModule } from './mailer.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MailerModule, {
    transport: Transport.TCP,
    options: { port: 3003, host: '127.0.0.1' },
  });
  await app.listen();
}

bootstrap();
