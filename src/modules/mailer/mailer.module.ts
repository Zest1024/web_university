import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule as Mailer } from '@nestjs-modules/mailer';

import { MailerService } from './mailer.service';

@Module({
  imports: [
    Mailer.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          ignoreTLS: true,
          secure: true,
          auth: {
            user: configService.getOrThrow('MAILER_USERNAME'),
            pass: configService.getOrThrow('MAILER_PASSWORD'),
          },
        },
      }),
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
