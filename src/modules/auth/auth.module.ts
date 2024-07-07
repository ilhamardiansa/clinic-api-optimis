import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma.module';
import { PrismaService } from 'src/prisma.service';
import { AuthenticationService } from 'src/service/auth/Authentication.service';
import { mailService } from 'src/service/mailer/mailer.service';
import { ProfileService } from 'src/service/profile.service';

@Module({
  imports: [PrismaModule], // Assuming PrismaModule correctly exports PrismaService
  providers: [
    AuthenticationService,
    ProfileService,
    mailService, // Ensure mailService is correctly imported and provided
    PrismaService, // Ensure PrismaService is correctly imported and provided
  ],
  exports: [AuthenticationService, ProfileService], // Export necessary services if needed
})
export class Authmodule {}
