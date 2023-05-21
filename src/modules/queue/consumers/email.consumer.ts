import { Job } from 'bull';

import { Process, Processor } from '@nestjs/bull';
import { ISendMailOptions } from '@nestjs-modules/mailer';

import { MailerService } from '../../mailer/mailer.service';

@Processor('email')
export class AudioConsumer {
  constructor(private readonly mailerService: MailerService) {}
  @Process()
  async transcode(job: Job<ISendMailOptions>) {
    return this.mailerService.sendEmail({
      from: job.data.from,
      to: job.data.to,
      subject: job.data.subject,
      text: job.data.text,
    });
  }
}
