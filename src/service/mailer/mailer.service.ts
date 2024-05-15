import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class mailService {
  constructor(private readonly mailService: MailerService) {}

  sendMail(email: any, subject: any, otp: any, name: any) {

    this.mailService.sendMail({
      from: 'Founder DusunWEB <founder.dusunweb@gmail.com>',
      to: email,
      subject: subject,
      template: './mailer',
      context: {
        name,
        otp: otp.split(''),
      },
    });
  }
}
