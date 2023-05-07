import { NestFactory } from '@nestjs/core';
import { MailModule } from './mail.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MailModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3003,
    },
  });
  await app.listen();
}

bootstrap();
