import { Controller, Body, Post } from '@nestjs/common';
import { User } from 'src/entity/profile/user.entity';
import { UserService } from 'src/service/profile_config/user.profile.config.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: Partial<User>) {
    try {
      const user = await this.userService.createUser(userData);
      return {
        status: 200,
        success: true,
        errors: null,
        meta: null,
        message: 'User successfully created',
        data: user,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        errors: error.message,
        meta: null,
        message: 'Failed to create user',
        data: null,
      };
    }
  }
}
