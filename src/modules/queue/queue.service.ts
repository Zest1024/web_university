import { Queue } from 'bull';

import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ISendMailOptions } from '@nestjs-modules/mailer';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  sendEmail(options: ISendMailOptions) {
    return this.emailQueue.add(options);
  }
}
