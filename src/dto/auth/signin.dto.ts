import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty({ message: 'should not be empty' })
  email: string;

  @IsNotEmpty({ message: 'should not be empty' })
  password: string;
}
