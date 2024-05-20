import { IsString, IsStrongPassword, Matches } from 'class-validator';
import { IsPasswordMatch } from 'src/middleware/is-password-match.decorator';

export class ChangePassDTO {
  @IsStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  password: string;

  @IsString()
  @IsPasswordMatch('password', { message: 'Kata sandi harus sama' })
  confirmPassword: string;
}
