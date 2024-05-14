import { IsEmail, IsPhoneNumber, IsStrongPassword, IsString, MaxLength } from 'class-validator';

export class AuthDTO {
  @IsString()
  @MaxLength(64)
  username: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('ID')
  phone_number: string;

  @IsStrongPassword()
  password: string;

  created_at: Date;

  update_at: Date;
}
