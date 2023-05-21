import { Injectable } from '@nestjs/common';
import {
  ISendMailOptions,
  MailerService as Mailer,
} from '@nestjs-modules/mailer';
@Injectable()
export class MailerService {
  constructor(private readonly mailer: Mailer) {}

  sendEmail(options: ISendMailOptions) {
    return this.mailer
      .sendMail(options)
      .then(() => {})
      .catch(() => {});
  }
}
