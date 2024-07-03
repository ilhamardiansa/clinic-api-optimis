import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class mailService {
  constructor(private readonly mailService: MailerService) {}

  sendMail(email: string, subjek: string, otp: number, nama: string) {
    this.mailService.sendMail({
      from: 'Founder DusunWEB <founder.dusunweb@gmail.com>',
      to: email,
      subject: subjek,
      template: './mailer', // Path ke template Anda, sesuaikan sesuai kebutuhan
      context: {
        name: nama,
        otp: otp.toString().split(''), // Ubah OTP menjadi array digit
      },
    });
  }
}
