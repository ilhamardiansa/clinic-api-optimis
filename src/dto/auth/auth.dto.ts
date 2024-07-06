import { IsEmail, IsPhoneNumber, IsStrongPassword, IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class AuthDTO {
  @IsString()
  @MaxLength(64)
  @IsNotEmpty({ message: 'should not be empty' })
  fullname: string;

  @IsEmail()
  @IsNotEmpty({ message: 'should not be empty' })
  email: string;

  @IsPhoneNumber('ID')
  @IsNotEmpty({ message: 'should not be empty' })
  phone_number: string;

  @IsStrongPassword({minUppercase: 1, minNumbers: 1,minSymbols: 1})
  @IsNotEmpty({ message: 'should not be empty' })
  password: string;
}
