import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controller/profile_config/user.profile.config.controller';
import { User } from 'src/entity/profile/user.entity';
import { UserService } from 'src/service/profile_config/user.profile.config.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserProfileModule {}
