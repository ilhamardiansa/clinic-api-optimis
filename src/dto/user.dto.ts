import { IsEmail, IsPhoneNumber, IsStrongPassword, IsString, MaxLength } from 'class-validator';

export class UserDto {
  @IsString()
  @MaxLength(64)
  username: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('ID')
  phoneNumber: string;

  @IsStrongPassword()
  password: string;
}
