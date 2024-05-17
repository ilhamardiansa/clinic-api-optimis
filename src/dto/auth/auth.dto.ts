import { IsEmail, IsPhoneNumber, IsStrongPassword, IsString, MaxLength } from 'class-validator';

export class AuthDTO {
  @IsString()
  @MaxLength(64)
  fullname: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('ID')
  phone_number: string;

  @IsStrongPassword({minUppercase: 1, minNumbers: 1,minSymbols: 1})
  password: string;
}
