import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthDTO } from 'src/dto/auth.dto';
import { format_json } from 'src/env';
import { AuthService } from 'src/service/auth.service';
@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  async register(@Body() authDTO: AuthDTO) {
    try {
      const { username, email, phone_number, password } = authDTO;
      const user = await this.authService.register(username, email, phone_number, password);
      if(user){
        return format_json(true, null, null, "User signed up successfully", { user: user });
      } else {
        return format_json(false, null, null,"Silakan cek lagi format anda", null);
      }
    } catch (error) {
      return format_json(false, error, null,"Server Error", null);
    }
  }
}