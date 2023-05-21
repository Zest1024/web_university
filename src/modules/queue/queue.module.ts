import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { QueueService } from './queue.service';

import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.getOrThrow('REDIS_HOST'),
          port: configService.getOrThrow('REDIS_PORT'),
        },
      }),
    }),
    MailerModule,
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
