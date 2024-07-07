import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma.module';
import { AuthenticationService } from 'src/service/auth/Authentication.service';
import { mailService } from 'src/service/mailer/mailer.service';

@Module({
  imports: [PrismaModule],
  providers: [
    AuthenticationService,
    mailService
  ],
  exports: [AuthenticationService],
})
export class Authmodule {}
