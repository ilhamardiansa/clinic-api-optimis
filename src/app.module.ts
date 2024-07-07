import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Authmodule } from './modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { TokenBlacklistMiddleware } from './middleware/token-blacklist.middleware';
import { PrismaModule } from './prisma.module';
import { AuthController } from './controller/auth/auth.controller';
import { AuthenticationService } from './service/auth/Authentication.service';

@Module({
  controllers: [AuthController],
  providers: [AuthenticationService],
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    Authmodule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
        secure: true,
      },
      template: {
        dir: join(__dirname, '..', 'src', 'template'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    })
  ],
})

export class AppModule {}
