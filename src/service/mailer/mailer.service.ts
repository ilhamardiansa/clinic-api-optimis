import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class mailService {
  constructor(private readonly mailService: MailerService) {}

  sendMail(email: any, subject: any, message: any) {

    this.mailService.sendMail({
      from: 'Founder DusunWEB <founder.dusunweb@gmail.com>',
      to: email,
      subject: subject,
      text: message,
    });
  }
}
